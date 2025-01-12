import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { ArrowLeft, SendHorizontal } from 'lucide-react-native';
import { Link } from 'expo-router';


const AIChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [suggestedQuestions] = useState([
    "What's the weather like today?",
    "Tell me a fun fact",
    "How can I learn programming?",
  ]);

  const scrollViewRef = useRef();

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = () => {
    if (inputText.trim()) {
      setMessages([...messages, { text: inputText, isUser: true }]);
      setInputText('');
     
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: "This is a simulated AI response. In a real app, you would integrate with your AI backend here.",
          isUser: false
        }]);
      }, 1000);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <KeyboardAvoidingView 
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="flex-row items-center p-4 border-b border-slate-800">
          <TouchableOpacity className="p-2">
        <Link href='/(root)/(tabs)'>

            <ArrowLeft size={24} color="white" strokeWidth={2} />
        </Link>
          </TouchableOpacity>
          <Text className="text-white text-xl font-semibold ml-2">Nova</Text>
        </View>

        <ScrollView
          ref={scrollViewRef}
          className="flex-1 p-4"
          keyboardShouldPersistTaps="handled"
        >
          {messages.length === 0 ? (
            <View className="space-y-4">
              <Text className="text-white text-2xl font-bold text-center mb-3">
                Hello Joe , 
              </Text>
              <Text className="text-white text-2xl font-bold text-center mb-8">
                How can I help you today?
              </Text>
              <View className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <TouchableOpacity
                    key={index}
                    className="bg-slate-800 p-4 rounded-xl"
                    onPress={() => {
                      setInputText(question);
                      sendMessage();
                    }}
                  >
                    <Text className="text-white">{question}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : (
            messages.map((message, index) => (
              <View
                key={index}
                className={`mb-4 ${message.isUser ? 'items-end' : 'items-start'}`}
              >
                <View
                  className={`p-3 rounded-xl max-w-[80%] ${
                    message.isUser
                      ? 'bg-blue-600 rounded-br-none'
                      : 'bg-slate-800 rounded-bl-none'
                  }`}
                >
                  <Text className="text-white">{message.text}</Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>

        {/* Input Area */}
        <View className="p-4 border-t border-slate-800">
          <View className="flex-row items-center space-x-2">
            <TextInput
              className="flex-1 bg-slate-800 text-white p-4 rounded-full"
              placeholder="Ask me anything..."
              placeholderTextColor="#9CA3AF"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity
              className="bg-blue-600 p-3 rounded-full"
              onPress={sendMessage}
            >
              <SendHorizontal size={24} color="white" strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AIChatInterface;
