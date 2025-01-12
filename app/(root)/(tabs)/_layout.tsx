import { Tabs } from "expo-router";
import { Calendar, House, Sparkles, UsersRound } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import * as Haptics from 'expo-haptics'; 

export default function RootLayout() {
  const triggerHapticFeedback = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); 
  };

  return (
    <Tabs
      screenOptions={{
        
        headerShown: false,
        tabBarStyle: {
            padding:0,
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
          tabBarButton: (props) => (
            <TouchableOpacity 
              {...props} 
              onPress={() => { triggerHapticFeedback(); props.onPress(); }} 
            />
          ),
        }}
      />

      {/* Explore Tab */}
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ color }) => <Sparkles color={color} />,
          tabBarLabel: () => null,
          tabBarButton: (props) => (
            <TouchableOpacity 
              {...props} 
              onPress={() => { triggerHapticFeedback(); props.onPress(); }} 
            />
          ),
        }}
      />

      {/* Community Tab */}
      <Tabs.Screen
        name="community"
        options={{
          tabBarIcon: ({ color }) => <UsersRound color={color} />,
          tabBarLabel: () => null,
          tabBarButton: (props) => (
            <TouchableOpacity 
              {...props} 
              onPress={() => { triggerHapticFeedback(); props.onPress(); }} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="streaks"
        options={{
          tabBarIcon: ({ color }) => <UsersRound color={color} />,
          tabBarLabel: () => null,
          tabBarButton: (props) => (
            <TouchableOpacity 
              {...props} 
              onPress={() => { triggerHapticFeedback(); props.onPress(); }} 
            />
          ),
        }}
      />

      {/* Events Tab */}
      <Tabs.Screen
        name="events"
        options={{
          tabBarIcon: ({ color }) => <Calendar color={color} />,
          tabBarLabel: () => null,
          tabBarButton: (props) => (
            <TouchableOpacity 
              {...props} 
              onPress={() => { triggerHapticFeedback(); props.onPress(); }} 
            />
          ),
        }}
      />
    </Tabs>
  );
}
