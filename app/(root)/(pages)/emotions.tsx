import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import Slider from "@react-native-community/slider";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";

const App = () => {
  const [sliderValue, setSliderValue] = useState(50);
  const [lastHapticValue, setLastHapticValue] = useState(50);

  const getEmotionDetails = (value) => {
    if (value < 20) {
      return { text: "Very Unpleasant", colors: ["#4facfe", "#00f2fe"] };
    }
    if (value < 40) {
      return { text: "Unpleasant", colors: ["#00f2fe", "#43e97b"] };
    }
    if (value < 60) {
      return { text: "Neutral", colors: ["#43e97b", "#f3aa60"] };
    }
    if (value < 80) {
      return { text: "Pleasant", colors: ["#f3aa60", "#ff7a18"] };
    }
    return { text: "Very Pleasant", colors: ["#ff7a18", "#f78ca0"] };
  };

  const emotion = getEmotionDetails(sliderValue);

  // Trigger haptics on value change
  useEffect(() => {
    if (Math.abs(sliderValue - lastHapticValue) >= 10) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setLastHapticValue(sliderValue);
    }
  }, [sliderValue]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={emotion.colors}
        style={styles.background}
      />

      <View style={styles.card}>
        <View style={styles.flower}>
          <Text style={styles.flowerText}>{emotion.text}</Text>
        </View>

        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={sliderValue}
          onValueChange={(value) => setSliderValue(value)}
          minimumTrackTintColor={emotion.colors[1]}
          maximumTrackTintColor="#ddd"
          thumbTintColor={emotion.colors[0]}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Log Mood</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  flower: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  flowerText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  slider: {
    width: 250,
    height: 40,
    marginVertical: 24,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default App;
