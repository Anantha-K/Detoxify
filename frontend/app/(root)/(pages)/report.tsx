import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Camera, MapPin, X } from "lucide-react-native";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { Link } from "expo-router";

const CrimeReportScreen = () => {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("Fetching location...");
  const [images, setImages] = useState([]);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    getLocationPermission();
    getCameraPermission();
  }, []);

  const getLocationPermission = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Please allow location access to report incidents accurately"
        );
        return;
      }
      getCurrentLocation();
    } catch (error) {
      console.error("Error requesting location permission:", error);
      setLocation("Unable to get location");
    }
  };

  const getCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Please allow camera access to capture evidence photos"
      );
    }
  };

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Please allow location access to report incidents accurately"
        );
        setLocation("Location permission denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setCoordinates({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      const [placeDetails] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (placeDetails) {
        const address = [
          placeDetails.street,
          placeDetails.district,
          placeDetails.city,
          placeDetails.region,
        ]
          .filter(Boolean)
          .join(", ");

        setLocation(address);
      } else {
        setLocation("Location details not found");
      }
    } catch (error) {
      console.error("Error getting location:", error);
      setLocation("Unable to get location");
      Alert.alert("Error", "Failed to get your location. Please try again.");
    }
  };

  const handleAddImage = async () => {
    Alert.alert("Add Photo", "Choose an option", [
      {
        text: "Take Photo",
        onPress: () => pickImage("camera"),
      },
      {
        text: "Choose from Gallery",
        onPress: () => pickImage("gallery"),
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const pickImage = async (type) => {
    try {
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      };

      const result =
        type === "camera"
          ? await ImagePicker.launchCameraAsync(options)
          : await ImagePicker.launchImageLibraryAsync(options);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImages((prevImages) => [...prevImages, result.assets[0]]);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to capture/select image. Please try again.");
    }
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!description.trim()) {
      Alert.alert("Error", "Please provide details about the incident");
      return;
    }

    Alert.alert(
      "Confirm Submission",
      "Are you sure you want to submit this report?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Submit",
          onPress: () => {
            Alert.alert("Success", "Report submitted successfully");
            setDescription("");
            setImages([]);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="px-4 py-3 flex-row items-center border-b border-gray-200">
          <TouchableOpacity className="p-2">
            <Link href="/(root)/(tabs)">
              <ChevronLeft size={24} color="#000" />
            </Link>
          </TouchableOpacity>
          <Text className="text-xl font-semibold ml-2">Report Crime</Text>
        </View>

        <View className="p-4 bg-gray-50">
          <View className="flex-row items-center">
            <MapPin size={20} color="#4B5563" />
            <Text className="ml-2 text-gray-600 flex-1" numberOfLines={2}>
              {location}
            </Text>
            <TouchableOpacity
              className="bg-white px-3 py-1 rounded-full border border-gray-300"
              onPress={getCurrentLocation}
            >
              <Text className="text-sm text-gray-600">Refresh</Text>
            </TouchableOpacity>
          </View>
          {coordinates && (
            <Text className="text-xs text-gray-500 mt-1 ml-7">
              {`${coordinates.latitude.toFixed(
                6
              )}, ${coordinates.longitude.toFixed(6)}`}
            </Text>
          )}
        </View>

        <View className="p-4 space-y-4">
          <Text className="text-lg font-semibold">Incident Details</Text>

          <TextInput
            className="bg-gray-50 p-4 rounded-lg text-base min-h-[120px]"
            placeholder="Please describe the incident in detail:
- What type of crime occurred?
- When did it happen?
- Any suspects or witnesses?
- Description of suspects (if applicable)
- Any damages or losses"
            multiline
            textAlignVertical="top"
            value={description}
            placeholderTextColor="#9CA3AF"
            onChangeText={setDescription}
          />

          <View className="mt-4">
            <Text className="text-lg font-semibold mb-2">Add Evidence</Text>
            <View className="bg-gray-50 p-4 rounded-lg w-full">
              <View className="flex-row flex-wrap gap-2">
                {images.map((image, index) => (
                  <View key={index} className="relative">
                    <Image
                      source={{ uri: image.uri }}
                      className="w-24 h-24 rounded-lg"
                    />
                    <TouchableOpacity
                      onPress={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                    >
                      <X size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

              {images.length < 5 && (
                <TouchableOpacity
                  onPress={handleAddImage}
                  className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 items-center justify-center w-full h-24"
                >
                  <Camera size={24} color="#4B5563" />
                  <Text className="text-gray-600 text-sm mt-2">
                    Add Photo Evidence
                  </Text>
                </TouchableOpacity>
              )}

              {images.length >= 5 && (
                <Text className="text-sm text-gray-500 mt-2">
                  Maximum 5 photos allowed
                </Text>
              )}
            </View>
          </View>

          <View className="bg-red-50 p-4 rounded-lg mt-4">
            <Text className="text-red-700 font-medium">For Emergencies</Text>
            <Text className="text-red-600 mt-1">
              If this is an emergency situation, please call emergency services
              immediately at 100
            </Text>
          </View>
          <View className="bg-green-50 p-4 rounded-lg mt-4">
            <Text className="text-green-700 font-medium">
              Anonymous Reporting
            </Text>
            <Text className="text-green-600 mt-1">
              Your report is completely anonymous and safe. Feel free to report
              any incidents without fear of identification.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View className="p-4 border-t border-gray-200">
        <TouchableOpacity
          className="bg-red-600 py-4 rounded-lg items-center"
          onPress={handleSubmit}
        >
          <Text className="text-white font-semibold text-lg">
            Submit Report
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CrimeReportScreen;
