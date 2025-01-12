import { Tabs } from "expo-router";
import { Calendar, House, Sparkles, UsersRound } from "lucide-react-native";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1a1a1a", 
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#b0b0b0", 
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <House color={color} />,
          tabBarLabel: () => null, 
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ color }) => <Sparkles color={color} />,
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          tabBarIcon: ({ color }) => <UsersRound color={color} />,
          tabBarLabel: () => null, 
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          tabBarIcon: ({ color }) => <Calendar color={color} />,
          tabBarLabel: () => null,
        }}
      />
    </Tabs>
  );
}
