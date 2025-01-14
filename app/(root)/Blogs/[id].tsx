import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router'


const ArticleScreen = () => {
  const {id} = useLocalSearchParams();
  return (
    <SafeAreaView className="flex-1">
      <View className="bg-green-500 p-4">
        <View className="flex-row justify-between items-center">
          <View className="h-8 w-8 bg-white rounded-full justify-center items-center">
            <Text className="text-gray-800 font-bold">{'<'}</Text>
          </View>

          <View className="h-8 w-8 bg-white rounded-full"></View>
        </View>

        <View className="absolute top-0 left-0 right-0 bottom-0 z-[-1]">
          <Image
            source={{ uri: 'https://via.placeholder.com/300x300' }} 
            className="h-full w-full"
            resizeMode="cover"
          />
        </View>
      </View>

      <View className="bg-white mx-4 -mt-10 p-6 rounded-xl shadow-lg">
        <View className="flex-row items-center">
          <Image
            source={{
              uri: 'https://via.placeholder.com/50', 
            }}
            className="h-12 w-12 rounded-full"
          />
          <View className="ml-4">
            <Text className="text-lg font-semibold">Everything about Cocaine</Text>
            <Text className="text-sm text-gray-500">Joe Doe</Text>
          </View>
        </View>

        <Text className="mt-4 text-gray-700 text-sm">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text...
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ArticleScreen;
