import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, Linking, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, MapPin } from 'lucide-react-native';

const CrimeReportViewScreen = ({ navigation }) => {
  // Hardcoded data
  const reportData = {
    location: '123 Main St, City, Country',
    coordinates: { latitude: 40.748817, longitude: -73.985428 }, // Hardcoded coordinates (New York, for example)
    description: 'A robbery occurred at this location at 10 PM. The suspect was wearing a black jacket and a hat. Police are investigating.',
    images: [
      { uri: 'https://via.placeholder.com/150' },
      { uri: 'https://via.placeholder.com/150' },
    ]
  };

  const { location, coordinates, description, images } = reportData;

  const handleGetDirections = () => {
    const { latitude, longitude } = coordinates;
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="px-4 py-3 flex-row items-center border-b border-gray-200">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2"
          >
            <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold ml-2">Crime Report Details</Text>
        </View>

        <View className="p-4 bg-gray-50">
          {/* Displaying Location */}
          <View className="flex-row items-center">
            <MapPin size={20} color="#4B5563" />
            <Text className="ml-2 text-gray-600 flex-1" numberOfLines={2}>{location}</Text>
            <TouchableOpacity
              className="bg-white px-3 py-1 rounded-full border border-gray-300"
              onPress={handleGetDirections}
            >
              <Text className="text-sm text-gray-600">Get Directions</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="p-4 space-y-4">
          {/* Incident Details */}
          <Text className="text-lg font-semibold">Incident Details</Text>
          <Text className="bg-gray-50 p-4 rounded-lg text-base min-h-[120px]">
            {description}
          </Text>

          {/* Displaying Images */}
          <View className="mt-4">
            <Text className="text-lg font-semibold mb-2">Evidence Photos</Text>
            <View className="bg-gray-50 p-4 rounded-lg w-full">
              <View className="flex-row flex-wrap gap-2">
                {images.map((image, index) => (
                  <View key={index} className="relative">
                    <Image
                      source={{ uri: image.uri }}
                      className="w-24 h-24 rounded-lg"
                    />
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CrimeReportViewScreen;
