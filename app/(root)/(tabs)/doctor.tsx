import { Link } from "expo-router";
import { Text, View, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const currentHour = new Date().getHours();
  let greeting = "";
  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  const patients = [
    {
      name: "John Doe",
      daysSober: 120,
      currentMood: "Feeling hopeful",
      image: require("@/assets/images/avatar.png"),
    },
    {
      name: "Jane Smith",
      daysSober: 85,
      currentMood: "Staying strong",
      image: require("@/assets/images/avatar.png"),
    },
    {
      name: "Alice Johnson",
      daysSober: 150,
      currentMood: "Proud of my progress",
      image: require("@/assets/images/avatar.png"),
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-wheat " edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View className="flex flex-row px-6 justify-between items-center py-4 pt-6 w-full">
          <View className="flex-1">
            <Text className="text-2xl font-semibold">{greeting} Joe,</Text>
            <Text className="text-md text-gray-700 mt-1">Wishing you a great day ahead!</Text>
            </View>

          <TouchableOpacity
            activeOpacity={0.7}
            className="w-16 h-16 rounded-full overflow-hidden ml-4"
          >
            <Link href="/(root)/(pages)/profile">
              <Image
                source={require("@/assets/images/avatar.png")}
                className="w-full h-full object-cover"
              />
            </Link>
          </TouchableOpacity>
        </View>

        <Text className="text-3xl font-semibold text-black mt-10 ml-6">Patient List</Text>

        {patients.map((patient, index) => (
          <View
            key={index}
            className="flex flex-row justify-between items-center p-4 w-[93%] self-center mt-4 bg-white rounded-3xl shadow-sm"
          >
            <Image
              source={patient.image}
              className="w-20 h-20 rounded-full object-cover"
            />
            <View className="flex-1 ml-4">
              <Text className="text-xl font-semibold">{patient.name}</Text>
              <Text className="text-gray-500">{patient.daysSober} days sober</Text>
              <Text className="text-gray-700 mt-1">{patient.currentMood}</Text>
            </View>
          </View>
        ))}

        {/* Add other sections as needed */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 25,
  },
  card: {
    width: 200,
    height: 200,
    borderRadius: 24,
    justifyContent: "start",
    alignItems: "start",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
