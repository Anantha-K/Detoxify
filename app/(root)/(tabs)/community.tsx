import { BellRing } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Animated,
  Easing,
} from "react-native";

const CommunityFeature = ({ icon, label }) => (
    <TouchableOpacity activeOpacity={0.7}>

    <View className="items-center mx-4">
      <View className="w-16 h-16 rounded-full bg-blue-100 items-center justify-center mb-2">
        <Text className="text-3xl">{icon}</Text>
      </View>
      <Text
        className="text-xs text-center max-w-20"
        style={{
            maxWidth: 80, 
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        }}
        >
        {label}
      </Text>
    </View>
          </TouchableOpacity>
  ); 

const CommunityPost = ({ name, handle, content, hasImage }) => (
  <View className="border-b border-gray-200 pb-6">
    <View className="flex-row items-center mb-4">
      <View className="w-10 h-10 bg-gray-200 rounded-full mr-3" />
      <View>
        <Text className="font-semibold">{name}</Text>
        <Text className="text-gray-500 text-sm">{handle}</Text>
      </View>
    </View>
    <Text className="text-gray-700 mb-4">{content}</Text>
    {hasImage && (
      <Image
        source={{ uri: "https://via.placeholder.com/400x200" }}
        className="w-full h-48 rounded-lg mb-4"
      />
    )}
    <TouchableOpacity>
      <Text className="text-blue-900 text-sm font-medium">Read more</Text>
    </TouchableOpacity>
  </View>
);

const CommunityScreen = () => {
  const [activeTab, setActiveTab] = useState("trending");

  const features = [
    { icon: "🚭", label: "No-Smoking" },
    { icon: "🚫", label: "Alcohol-Free" },
    { icon: "💊", label: "Drug-Free" },
    { icon: "✨", label: "Inspirational Stories" },
    { icon: "💪", label: "Fitness Challenges" },
    { icon: "📚", label: "Education" },
  ];

  const posts = [
    {
      id: "1",
      name: "Joe Doe",
      handle: "@joedoe",
      content:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
      hasImage: true,
    },
    {
      id: "2",
      name: "Foo Bar",
      handle: "@foobar",
      content:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
      hasImage: false,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="border-b flex flex-row justify-between mx-2 border-gray-200 p-4">
        <Text className="text-2xl font-bold">Community</Text>
        <BellRing />
      </View>

      <ScrollView className="flex-1">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row px-4 py-6 space-x-4"
        >
          {features.map((feature, index) => (
            <CommunityFeature
              key={index}
              icon={feature.icon}
              label={feature.label}
            />
          ))}
        </ScrollView>

        <View className="self-center my-5 mb-12 px-20 py-2">
          <View className="flex-row w-full bg-blue-100 rounded-full">
            <TouchableOpacity
              onPress={() => setActiveTab("trending")}
              className={`px-6 py-3 rounded-full ${
                activeTab === "trending" ? "bg-blue-900" : ""
              }`}
              style={{ flex: 1, alignItems: "center" }}
            >
              <Text
                className={`${
                  activeTab === "trending" ? "text-white" : "text-gray-500"
                }`}
              >
                Trending
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab("following")}
              className={`px-6 py-3 rounded-full ${
                activeTab === "following" ? "bg-blue-900" : ""
              }`}
              style={{ flex: 1, alignItems: "center" }}
            >
              <Text
                className={`${
                  activeTab === "following" ? "text-white" : "text-gray-500"
                }`}
              >
                Following
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-4 space-y-6">
          {posts.map((post) => (
            <CommunityPost key={post.id} {...post} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CommunityScreen;
