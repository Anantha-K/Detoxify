import { LogOut } from 'lucide-react-native';
import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';


const ProfilePage = () => {
  return (
    <SafeAreaView className='flex-1' edges={['top']}>

    
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#f5f5f5' }}>
      <View className='w-full flex flex-row mx-auto justify-between items-center py-4 pt-6 px-6'>
        <View>

        <Image
          source={require("@/assets/images/avatar.png")} 
          style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: '#fff',
              marginBottom: 10,
            }}
            />
        <Text className='text-3xl text-gray-7-- font-bold'>David</Text>
        <Text className='text-3xl text-gray-600 font-bold'>Robinson</Text>
        </View>
        <View className='flex flex-col items-start w-full justify-center h-24 ml-16 align-top '>
        <Text className='text-lg text-gray-400 font-semibold'>Joined</Text>
        <Text className='font-bold text-xl'> 1 year ago</Text>

        </View>
      </View>







      <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
        <View style={styles.optionContainer}>
          <Text style={styles.optionTitle}>Profile</Text>
          <Text style={styles.optionSubtitle}>Manage user</Text>
        </View>

        <View style={styles.optionContainer}>
          <Text style={styles.optionTitle}>Family</Text>
          <Text style={styles.optionSubtitle}>Add or manage family members</Text>
        </View>

        <View style={styles.optionContainer}>
          <Text style={styles.optionTitle}>Friends</Text>
          <Text style={styles.optionSubtitle}>View and manage friends</Text>
        </View>

        <View style={styles.optionContainer}>
          <Text style={styles.optionTitle}>Settings</Text>
          <Text style={styles.optionSubtitle}>Notifications, Dark Mode</Text>
        </View>

        <TouchableOpacity style={styles.signOutButton}>
          <Text style={styles.signOutText}>Sign Out</Text>
          <LogOut color='white' />
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  optionContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  signOutButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    
    alignItems: 'center',
    marginTop: 20,
  },
  signOutText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
};

export default ProfilePage;
