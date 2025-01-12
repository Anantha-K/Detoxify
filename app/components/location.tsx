import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, Modal, FlatList, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location'; 

const LocationComponent = () => {
  const [location, setLocation] = useState('Fetching location...');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationsList, setLocationsList] = useState(['Kerala', 'Kochi', 'Bangalore', 'Chennai', 'Mumbai']);
  const [isLoading, setIsLoading] = useState(true); 

  const getLocationFromGPS = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High, 
      });

      const geocode = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      if (geocode && geocode[0]) {
        const street = geocode[0].street || 'Street not available';
        const city = geocode[0].city || geocode[0].region || geocode[0].country || 'Unknown Location';
        const preciseLocation = `${street}, ${city}`; 
        setLocation(preciseLocation); 
      } else {
        setLocation('Location not found');
      }
      setIsLoading(false); 
    } else {
      setLocation('Permission Denied');
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    getLocationFromGPS();
  }, []);

  const handleLocationChange = (selectedLocation) => {
    setLocation(selectedLocation);
    setSearchQuery('');
    setModalVisible(false);
  };

  const filteredLocations = locationsList.filter((loc) =>
    loc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const modalData = [
    { type: 'search', value: searchQuery },
    ...filteredLocations.map((item) => ({ type: 'location', value: item }))
  ];

  return (
    <View className="px-4 py-2 max-w-36">
      <Text className="text-gray-500">Location</Text>
      <View className="flex-row justify-between items-center">
        <Pressable className="flex-row items-center" onPress={() => setModalVisible(true)}>
          <Text 
            className="text-lg font-semibold" 
            numberOfLines={1}  
            ellipsizeMode="tail"  
          >
            {isLoading ? <ActivityIndicator size="small" color="#0000ff" /> : location}
          </Text>
          <Text className="ml-2">▼</Text>
        </Pressable>
      </View>

      <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-lg mb-4">Select Location</Text>

          <FlatList
            data={modalData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              if (item.type === 'search') {
                return (
                  <TextInput
                    placeholder="Search for a location"
                    value={item.value}
                    onChangeText={setSearchQuery}
                    className="border border-gray-300 p-2 rounded-md w-80"
                  />
                );
              }

              if (item.type === 'location') {
                return (
                  <Pressable onPress={() => handleLocationChange(item.value)} className="p-2 mt-2 w-80 border-b border-gray-300">
                    <Text 
                      className="text-lg"
                      numberOfLines={1}  
                      ellipsizeMode="tail" 
                    >
                      {item.value}
                    </Text>
                  </Pressable>
                );
              }

              return null;
            }}
            ListFooterComponent={
              <Pressable onPress={() => setModalVisible(false)} className="mt-4 bg-gray-300 p-2 rounded-md">
                <Text>Cancel</Text>
              </Pressable>
            }
          />
        </View>
      </Modal>
    </View>
  );
};

export default LocationComponent;
