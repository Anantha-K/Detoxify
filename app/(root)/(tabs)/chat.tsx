import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Set the initial messages for the chat
    setMessages([
      {
        _id: 1,
        text: "Hello, how can I help you today?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Dr. Smith",
          avatar: 'https://placeimg.com/140/140/people',
        },
      },
      {
        _id: 2,
        text: "I have a headache and a sore throat. What should I do?",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "User",
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 1, // Current user's id (e.g. User)
        }}
        renderUsernameOnMessage={true}
        renderAvatarOnMessage={true}
      />
    </SafeAreaView>
  );
}
