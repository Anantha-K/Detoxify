import { Link } from "expo-router";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "@/app/components/navbar";
import { Flame } from "lucide-react-native";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex flex-row justify-between items-center p-4 w-full">
          <View>
            <Text className="text-3xl font-semibold">Hello Joe,</Text>
            <Text className="text-md text-gray-700">Good morning</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            className="w-12 h-12 rounded-full"
          >
            <Image
              source={require("@/assets/images/avatar.png")}
              className="w-12 h-12 rounded-full"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity activeOpacity={0.9}>
          <View className="flex w-[90%] mx-auto mt-8 bg-black h-40 rounded-3xl shadow-lg"></View>
        </TouchableOpacity>

        <View className="flex flex-row justify-between items-center p-4 w-[85%] self-center mt-12">
          <TouchableOpacity>
            <View className="w-24 h-24 bg-gray-200  rounded-3xl shadow-sm flex items-center justify-center">
              <Flame color="orange" />
              <Text className="text-black text-xs font-semibold mt-3">
                50 days clean
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View className="w-24 h-24 bg-blue-500 rounded-3xl shadow-sm"></View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View className="w-24 h-24 bg-green-500 rounded-3xl shadow-sm"></View>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
          className="flex w-full mt-12"
        >
          <View className="w-56 h-56 bg-purple-500 rounded-3xl shadow-lg mr-4 flex justify-center items-center">
            <Text className="text-white text-xl font-semibold">Card 1</Text>
          </View>

          <View className="w-56 h-56 bg-yellow-500 rounded-3xl shadow-lg mr-4 flex justify-center items-center">
            <Text className="text-black text-xl font-semibold">Card 2</Text>
          </View>

          <View className="w-56 h-56 bg-pink-500 rounded-3xl shadow-lg mr-4 flex justify-center items-center">
            <Text className="text-white text-xl font-semibold">Card 3</Text>
          </View>

          <View className="w-56 h-56 bg-teal-500 rounded-3xl shadow-lg flex justify-center items-center">
            <Text className="text-white text-xl font-semibold">Card 4</Text>
          </View>
        </ScrollView>

        <TouchableOpacity activeOpacity={0.9}>
          <View className="flex w-[90%] mt-12 mx-auto bg-black h-40 rounded-3xl shadow-lg"></View>
        </TouchableOpacity>
      </ScrollView>

      {/* Fixed Navbar */}
    </SafeAreaView>
  );
}
