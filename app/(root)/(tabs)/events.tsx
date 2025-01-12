import React from 'react';
import { View, Text, TextInput, Image, ScrollView, Pressable } from 'react-native';
import { BellRing, Search } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LocationComponent from '@/app/components/location';
// import NotificationsBell from '@/app/components/notificationsBell'; // Import the NotificationsBell component

const EventsScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 py-2">
        <LocationComponent />

        <View className="mt-4 flex-row items-center">
          <View className="flex-1 bg-gray-100 rounded-lg flex-row items-center px-4 py-2">
            <TextInput
              placeholder="Search Events, Workshops"
              className="flex-1 text-black"
              placeholderTextColor="#9CA3AF"
            />
            <Pressable>
              <View className="w-8 h-8 rounded-full items-center justify-center">
                <Search color="#9CA3AF" />
              </View>
            </Pressable>
          </View>
        </View>
      </View>

      <View className="absolute top-20 right-6">
         <BellRing color="blue" />

      </View>

      <ScrollView className="flex-1 px-4">
        <Text className="text-2xl font-bold my-6">Upcoming Events</Text>

        {[1, 2, 3, 4].map((item) => (
          <Pressable key={item} className="mb-4">
            <View className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
              <Image
                source={require('@/assets/images/japan.png')}
                className="w-full h-40"
                resizeMode="cover"
              />
              <View className="p-4">
                <View className="bg-blue-50 self-start px-2 py-1 rounded-md mb-2">
                  <Text className="text-blue-600 text-xs">Workshop</Text>
                </View>
                <Text className="text-lg font-semibold mb-2">Lorem ipsum</Text>
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <Text className="text-gray-500">📍</Text>
                    <Text className="text-gray-500 ml-1">Kochi</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-gray-500">🕐</Text>
                    <Text className="text-gray-500 ml-1">May 29 - 10:00am</Text>
                  </View>
                </View>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventsScreen;
