import { Link } from "expo-router";
import { Text, View, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PoliceHomePage() {
  const currentHour = new Date().getHours();
  let greeting = "";
  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  const crimeReports = [
    {
      id: "1",
      title: "Burglary at City Mall",
      date: "2025-01-12",
      description: "A burglary occurred at City Mall. CCTV footage available.",
      image: require("@/assets/images/avatar.png"),
    },
    {
      id: "2",
      title: "Street Assault",
      date: "2025-01-11",
      description: "An assault was reported near Main Street. Victim is in stable condition.",
      image: require("@/assets/images/avatar.png"),
    },
    {
      id: "3",
      title: "Drug Deal Bust",
      date: "2025-01-10",
      description: "A drug deal was intercepted near Park Avenue.",
      image: require("@/assets/images/avatar.png"),
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* Top Bar */}
        <View className="flex flex-row px-6 justify-between items-center py-4 pt-6 w-full">
          <View className="flex-1">
            <Text className="text-2xl font-semibold">{greeting} Officer,</Text>
            <Text className="text-md text-gray-700 mt-1">Stay updated with recent reports!</Text>
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

        <Text className="text-3xl font-semibold text-black mt-10 ml-6">Recent Crime Reports</Text>

        {crimeReports.map((report, index) => (
          <Link href='/(root)/(pages)/crimes' key={index}>
            <View
              className="flex flex-row justify-start items-center p-4 w-[93%] self-center mt-4 bg-white rounded-3xl shadow-lg"
            >
              <Image
                source={report.image}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <View className="flex-1 ml-4">
                <Text className="text-xl font-semibold">{report.title}</Text>
                <Text className="text-gray-500">{report.date}</Text>
                <Text className="text-gray-700 mt-1">{report.description}</Text>
              </View>
            </View>
          </Link>
        ))}
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
