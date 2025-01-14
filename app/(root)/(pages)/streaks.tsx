import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
  Pressable,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { X, FlameIcon } from "lucide-react-native";
import { Heart, BarChart } from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { Link } from "expo-router";

const StreakTracker = () => {
  const [selectedMonth, setSelectedMonth] = useState("2025-01");
  const [activeTab, setActiveTab] = useState("personal");
  const [friends] = useState([
    "John Doe",
    "Jane Smith",
    "Carlos Lopez",
    "Emily Watson",
    "Jake White",
  ]);

  const markedDates = {
    "2025-01-01": {
      selected: true,
      selectedColor: "#f59e0b",
      selectedTextColor: "#ffffff",
    },
    "2025-01-02": {
      selected: true,
      selectedColor: "#f59e0b",
      selectedTextColor: "#ffffff",
    },
    "2025-01-03": {
      selected: true,
      selectedColor: "#f59e0b",
      selectedTextColor: "#ffffff",
    },
    "2025-01-04": {
      selected: true,
      selectedColor: "#f59e0b",
      selectedTextColor: "#ffffff",
    },
    "2025-01-05": {
      selected: true,
      selectedColor: "#f59e0b",
      selectedTextColor: "#ffffff",
    },
    "2025-01-06": {
      selected: true,
      selectedColor: "#f59e0b",
      selectedTextColor: "#ffffff",
    },
    "2025-01-07": {
      selected: true,
      selectedColor: "#f59e0b",
      selectedTextColor: "#ffffff",
    },
    "2025-01-08": {
      selected: true,
      selectedColor: "#f59e0b",
      selectedTextColor: "#ffffff",
    },
    "2025-01-09": {
      selected: true,
      selectedColor: "#f59e0b",
      selectedTextColor: "#ffffff",
    },
    "2025-01-10": {
      selected: true,
      selectedColor: "#f59e0b",
      selectedTextColor: "#ffffff",
    },
    "2025-01-11": {
      selected: true,
      selectedColor: "#f59e0b",
      selectedTextColor: "#ffffff",
    },
    "2025-01-12": {
      selected: true,
      selectedColor: "#f59e0b",
      selectedTextColor: "#ffffff",
    },
    "2025-01-13": {
      selected: true,
      selectedColor: "#f59e0b",
      selectedTextColor: "#ffffff",
    },
    "2025-01-14": {
      selected: true,
      selectedColor: "#f59e0b",
      selectedTextColor: "#ffffff",
    },
    "2025-01-15": {
      selected: true,
      selectedColor: "#f59e0b",
      selectedTextColor: "#ffffff",
    },
    "2025-01-16": {
      selected: true,
      selectedColor: "#f59e0b",
      selectedTextColor: "#ffffff",
    },
    "2025-01-17": {
      selected: true,
      selectedColor: "#f59e0b",
      selectedTextColor: "#ffffff",
    },
    "2025-01-18": {
      selected: true,
      selectedColor: "#f59e0b",
      selectedTextColor: "#ffffff",
    },
  };

  const customTheme = {
    backgroundColor: "#1f2937",
    calendarBackground: "#1f2937",
    textSectionTitleColor: "#6b7280",
    selectedDayBackgroundColor: "#f59e0b",
    selectedDayTextColor: "#ffffff",
    todayTextColor: "#f59e0b",
    dayTextColor: "#ffffff",
    textDisabledColor: "#4b5563",
    arrowColor: "#ffffff",
    monthTextColor: "#ffffff",
    textDayFontFamily: "System",
    textMonthFontFamily: "System",
    textDayHeaderFontFamily: "System",
    textDayFontSize: 16,
    textMonthFontSize: 18,
    textDayHeaderFontSize: 14,
  };

  const handleTabChange = (tab) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveTab(tab);
  };

  const renderFriends = () => (
    <FlatList
      data={friends}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View className="bg-gray-800 rounded-lg p-4 mb-2">
          <Text className="text-white text-lg">{item}</Text>
        </View>
      )}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-4">
          <View className="flex-row justify-between items-center mb-6">
            <TouchableOpacity>
              <Link href='/(root)/(tabs)'>
                <X color="white" size={24} />
              </Link>
            </TouchableOpacity>

            <Text className="text-white text-xl font-bold flex-1 text-center">
              Streak
            </Text>
          </View>

          <View className="flex-row mb-6">
            <TouchableOpacity
              onPress={() => handleTabChange("personal")}
              className={`flex-1 border-b-2 ${
                activeTab === "personal" ? "border-blue-500" : "border-gray-700"
              } pb-2`}
            >
              <Text
                className={`${
                  activeTab === "personal" ? "text-blue-500" : "text-gray-500"
                } text-center font-semibold`}
              >
                PERSONAL
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleTabChange("friends")}
              className={`flex-1 border-b-2 ${
                activeTab === "friends" ? "border-blue-500" : "border-gray-700"
              } pb-2`}
            >
              <Text
                className={`${
                  activeTab === "friends" ? "text-blue-500" : "text-gray-500"
                } text-center font-semibold`}
              >
                FRIENDS
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === "personal" && (
            <>
              <View className="bg-gray-800 flex flex-row justify-around gap-x-24 items-center rounded-lg p-4 mb-6">
                <View className="flex flex-col">
                  <Text className="text-gray-500 text-sm mb-4 font-semibold">
                    STREAK SOCIETY
                  </Text>
                  <Text className="text-white text-5xl font-bold mb-4">
                    356
                  </Text>
                  <Text className="text-gray-500 text-xl font-semibold">
                    days clean!
                  </Text>
                </View>
                <View>
                  <FlameIcon color="orange" size={80} />
                </View>
              </View>
              <View className="mb-6">
                <Text className="text-white text-2xl font-bold mb-4">
                  Streak Challenge
                </Text>
                <View className="bg-gray-800 rounded-lg p-4">
                  <Text className="text-white mb-2">30 Day Challenge</Text>
                  <View className="h-2 bg-gray-700 rounded-full">
                    <View className="h-2 bg-orange-500 rounded-full w-3/4" />
                  </View>
                  <Text className="text-gray-500 text-right mt-2">
                    Day 24 of 30
                  </Text>
                </View>
              </View>

              <View className="flex-row justify-between mb-6">
                <View className="bg-gray-800 rounded-lg p-4 flex-1 gap-y-2 mr-2">
                  <View className="flex-row items-center">
                    <Heart color="#f59e0b" size={24} />
                    <Text className="text-white text-md font-bold ml-2">
                      Lungs Health
                    </Text>
                  </View>
                  <Text className="text-gray-500">
                    Cardiovascular efficiency
                  </Text>
                  <Text className="text-white text-lg font-bold mt-2">
                    +15% Improvement
                  </Text>
                </View>

                <View className="bg-gray-800 rounded-lg p-4 flex-1 ml-2 gap-y-2">
                  <View className="flex-row items-center">
                    <BarChart color="#f59e0b" size={24} />
                    <Text className="text-white text-md font-bold ml-2">
                      Fitness Progress
                    </Text>
                  </View>
                  <Text className="text-gray-500">
                    Overall physical fitness
                  </Text>
                  <Text className="text-white text-lg font-bold mt-2">
                    +20% Improvement
                  </Text>
                </View>
              </View>

              <View className="bg-gray-800 rounded-lg overflow-hidden">
                <Calendar
                  current={selectedMonth}
                  onMonthChange={(month) => setSelectedMonth(month.dateString)}
                  markedDates={markedDates}
                  theme={customTheme}
                  hideExtraDays={true}
                  enableSwipeMonths={true}
                />
              </View>

              <View className="w-full items-center mt-8">
                <Pressable className="bg-red-300 py-3 px-5 rounded-3xl">
                  <Text className="text-3xl text-white ">
                    Relapsed
                    </Text>
                </Pressable>
              </View>
            </>
          )}

          {activeTab === "friends" && renderFriends()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StreakTracker;
