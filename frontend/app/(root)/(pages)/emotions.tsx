import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Platform,
  Vibration,
  Animated,
} from 'react-native';
import Slider from '@react-native-community/slider';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { ArrowLeft } from 'lucide-react-native';
import { Link } from 'expo-router';

const { width, height } = Dimensions.get('window');

const App = () => {
  const [sliderValue, setSliderValue] = useState(50);
  const [lastHapticValue, setLastHapticValue] = useState(50);
  const [animation, setAnimation] = useState(new Animated.Value(1));

  const getEmotionDetails = (value) => {
    if (value < 12.5) {
      return {
        text: "Furious",
        emoji: "🤬",
        colors: ["#ef4444", "#dc2626"]
      };
    }
    if (value < 25) {
      return {
        text: "Angry",
        emoji: "😠",
        colors: ["#dc2626", "#ea580c"]
      };
    }
    if (value < 37.5) {
      return {
        text: "Sad",
        emoji: "😢",
        colors: ["#2563eb", "#4f46e5"]
      };
    }
    if (value < 50) {
      return {
        text: "Worried",
        emoji: "😟",
        colors: ["#4f46e5", "#7c3aed"]
      };
    }
    if (value < 62.5) {
      return {
        text: "Neutral",
        emoji: "😐",
        colors: ["#6b7280", "#475569"]
      };
    }
    if (value < 75) {
      return {
        text: "Content",
        emoji: "🙂",
        colors: ["#22c55e", "#059669"]
      };
    }
    if (value < 87.5) {
      return {
        text: "Happy",
        emoji: "😊",
        colors: ["#eab308", "#22c55e"]
      };
    }
    return {
      text: "Ecstatic",
      emoji: "🤩",
      colors: ["#facc15", "#f59e0b"]
    };
  };

  const emotion = getEmotionDetails(sliderValue);

  useEffect(() => {
    if (Math.abs(sliderValue - lastHapticValue) >= 10) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setLastHapticValue(sliderValue);
    }
  }, [sliderValue]);

  const handleLogMood = async () => {
    await triggerHapticFeedback();

    

    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
    await delay(800);
    Vibration.vibrate();
    console.log('Mood logged:', emotion.text);

 
  };

  const triggerHapticFeedback = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await delay(300);

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await delay(600); 

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={emotion.colors}
        style={StyleSheet.absoluteFill}
      />

      <LinearGradient
        colors={[
          'rgba(255, 255, 255, 0.3)',
          'rgba(255, 255, 255, 0.2)',
          'rgba(255, 255, 255, 0.1)'
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {Platform.OS === 'ios' && (
        <BlurView
          intensity={90}
          tint="dark"
          blurtype="dark"
          style={StyleSheet.absoluteFill}
        />
      )}

      <LinearGradient
        colors={[`${emotion.colors[0]}40`, `${emotion.colors[1]}30`]}
        style={[StyleSheet.absoluteFill, { opacity: 0.6 }]}
      />

      <SafeAreaView style={styles.safeArea}>
        <Link href='/(root)/(tabs)' style={{ marginLeft: 30 }}>
        <ArrowLeft color='white'  />
        </Link>
        <View style={styles.content}>
          <View style={styles.emojiContainer}>
            <Animated.Text
              style={[styles.emoji, { transform: [{ scale: animation }] }]}
            >
              {emotion.emoji}
            </Animated.Text>
            <Animated.Text
              style={[styles.emotionText, { transform: [{ scale: animation }] }]}
            >
              {emotion.text}
            </Animated.Text>
          </View>

          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              value={sliderValue}
              onValueChange={(value) => setSliderValue(value)}
              minimumTrackTintColor="#ffffff"
              maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
              thumbTintColor="#ffffff"
            />
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>Negative</Text>
              <Text style={styles.labelText}>Positive</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogMood}
          >
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.2)']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Log Mood</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emojiContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  emotionText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  sliderContainer: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    marginVertical: 40,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  labelText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '500',
  },
  button: {
    width: '80%',
    height: 56,
    marginBottom: 40,
    overflow: 'hidden',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  buttonGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default App;
