import { Link } from "expo-router";
import { Text, View, Image, TouchableOpacity, ScrollView, ImageBackground, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "@/app/components/navbar";
import { Flame, ThumbsUp } from "lucide-react-native";


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
  return (
    <SafeAreaView className="flex-1 bg-gray-200 " edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50}}
      >
     



     <View className="flex flex-row px-6 justify-between items-center py-4 pt-6 w-full">
  <View className="flex-1">
    <Text className="text-2xl font-semibold">{greeting} Joe,</Text>
    <Text className="text-md text-gray-700 mt-1">Stay strong, you're making progress!</Text>
  </View>

  <TouchableOpacity
    activeOpacity={0.7}
    className="w-12 h-12 rounded-full overflow-hidden ml-4"
  >
    <Link href="/(root)/(pages)/profile">
    <Image
      source={require("@/assets/images/avatar.png")}
      
      className="w-full h-full object-cover"
      />
      </Link>
  </TouchableOpacity>
</View>



<TouchableOpacity activeOpacity={0.9}>
  <Link href='/(root)/(pages)/emotions'>
    <View className="flex justify-center items-center w-full">
      <View className="flex w-[90%] flex-row justify-around items-center mx-auto mt-8 bg-white h-40 rounded-3xl shadow-sm shadow-green-200">
        <View className="flex flex-col gap-y-2 justify-center items-start h-full">
          <Text className="text-black text-2xl font-semibold">
            State of Mind
          </Text>
          <Text className="text-gray-500 text-sm">
            How do you feel today?
          </Text>
        </View>
        <Image
          source={require("@/assets/images/mood.jpg")}
          style={{ width: 100, height: 100, resizeMode: 'contain' }} 
        />
      </View>
    </View>
  </Link>
</TouchableOpacity>



        <View className="flex flex-row justify-between items-center p-4 w-[93%] self-center mt-8">
          <TouchableOpacity>
            <Link href="/(root)/(pages)/streaks">
            <View className="w-28 h-28 bg-gray-200  rounded-3xl shadow-sm flex items-center justify-center">
              <Flame color="orange" />
              <Text className="text-black text-xs font-semibold mt-3">
                50 days clean
              </Text>
            </View>
            </Link>
          </TouchableOpacity>

          <TouchableOpacity>
          <View className="w-28 h-28 bg-gray-200  rounded-3xl shadow-sm flex items-center justify-center">
              <Flame color="orange" />
              <Text className="text-black text-xs font-semibold mt-3">
                Family feels Happy
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <Link href="/(root)/(pages)/report">
            
          <View className="w-28 h-28 bg-gray-200  rounded-3xl shadow-sm flex items-center justify-center">

              <Flame color="orange" />
              <Text className="text-black text-xs font-semibold mt-3">
                Report Crime
              </Text>
            </View>

            </Link>
          </TouchableOpacity>
        </View>





<Text className="text-3xl font-semibold text-black mt-10 ml-6">Recent Posts</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
          className="flex w-full mt-4"
        >


<View style={styles.container}>
  <ImageBackground
    source={require('@/assets/images/japan.png')}  
    style={styles.card}
  >
    <View className="flex flex-col justify-start items-start p-4">
      <Text className="text-4xl text-white font-bold">Heading</Text>
      <View className="flex flex-row items-center mt-3">
        <Image
          source={require("@/assets/images/avatar.png")}
          className="w-8 h-8 object-cover rounded-full"
        />
        <View className="flex flex-col ml-2">
          <Text className="text-white text-xs">Joe</Text>
          <Text className="text-white text-xs">2h ago</Text>
        </View>
      </View>
    </View>
  </ImageBackground>
</View>
<View style={styles.container}>
  <ImageBackground
    source={require('@/assets/images/japan.png')}  
    style={styles.card}
  >
    <View className="flex flex-col justify-start items-start p-4">
      <Text className="text-4xl text-white font-bold">Heading</Text>
      <View className="flex flex-row items-center mt-3">
        <Image
          source={require("@/assets/images/avatar.png")}
          className="w-8 h-8 object-cover rounded-full"
        />
        <View className="flex flex-col ml-2">
          <Text className="text-white text-xs">Joe</Text>
          <Text className="text-white text-xs">2h ago</Text>
        </View>
      </View>
    </View>
  </ImageBackground>
</View>
<View style={styles.container}>
  <ImageBackground
    source={require('@/assets/images/japan.png')}  
    style={styles.card}
  >
    <View className="flex flex-col justify-start items-start p-4">
      <Text className="text-4xl text-white font-bold">Heading</Text>
      <View className="flex flex-row items-center mt-3">
        <Image
          source={require("@/assets/images/avatar.png")}
          className="w-8 h-8 object-cover rounded-full"
        />
        <View className="flex flex-col ml-2">
          <Text className="text-white text-xs">Joe</Text>
          <Text className="text-white text-xs">2h ago</Text>
        </View>
      </View>
    </View>
  </ImageBackground>
</View>
<View style={styles.container}>
  <ImageBackground
    source={require('@/assets/images/japan.png')}  
    style={styles.card}
  >
    <View className="flex flex-col justify-start items-start p-4">
      <Text className="text-4xl text-white font-bold">Heading</Text>
      <View className="flex flex-row items-center mt-3">
        <Image
          source={require("@/assets/images/avatar.png")}
          className="w-8 h-8 object-cover rounded-full"
        />
        <View className="flex flex-col ml-2">
          <Text className="text-white text-xs">Joe</Text>
          <Text className="text-white text-xs">2h ago</Text>
        </View>
      </View>
    </View>
  </ImageBackground>
</View>


          

          



        </ScrollView>


        
        <TouchableOpacity activeOpacity={0.9}>
  <View className="flex w-[90%] mt-16 mx-auto h-56 rounded-3xl shadow-lg overflow-hidden mb-16">
    <ImageBackground
      source={require('@/assets/images/japan.png')}
      style={{
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 24, 
        overflow: 'hidden',
      }}
    >
      <View style={{ position: 'absolute', top: 16, left: 16 }}>
        <Text className="text-white text-3xl font-semibold">
          YHeadsing
        </Text>
      </View>
    </ImageBackground>
  </View>
</TouchableOpacity>







<TouchableOpacity activeOpacity={0.9}>
  <View className="flex w-[90%]  mx-auto flex-row bg-white h-40 m-8 border-2 border-gray-100 rounded-3xl shadow-lg">
    <View className="w-1/3 flex items-center justify-center">
      <Image
        source={require("@/assets/images/map.png")}
        className="w-28 ml-4 h-28 rounded-xl"
      />
    </View>
    <View className="w-2/3 flex flex-col items-start pl-8 h-full pt-6">
      <Text className="text-black text-2xl font-semibold">
        Heading
      </Text>
      <View className="flex flex-row items-center mt-3 justify-between w-full">
        <View className="flex flex-row items-center mt-7">
          <Image
            source={require("@/assets/images/avatar.png")}
            className="w-8 h-8 object-cover rounded-full"
          />
          <View className="flex flex-col ml-2">
            <Text className="text-black text-sm">Joe</Text>
            <Text className="text-black text-xs">Role</Text>
          </View>
        </View>
        <View className="flex flex-row items-end mr-5 mt-7">
          <Pressable>

          <ThumbsUp color="black" size={20} />
          </Pressable>
          <Text className="text-black ml-2 text-sm">123</Text>
        </View>
      </View>
    </View>
  </View>
</TouchableOpacity>

<TouchableOpacity activeOpacity={0.9}>
  <View className="flex w-[90%] mx-auto flex-row bg-white h-40 border-2 border-gray-100 rounded-3xl shadow-lg">
    <View className="w-1/3 flex items-center justify-center">
      <Image
        source={require("@/assets/images/map.png")}
        className="w-28 ml-4 h-28 rounded-xl"
      />
    </View>
    <View className="w-2/3 flex flex-col items-start pl-8 h-full pt-6">
      <Text className="text-black text-2xl font-semibold">
        Heading
      </Text>
      <View className="flex flex-row items-center mt-3 justify-between w-full">
        <View className="flex flex-row items-center mt-7">
          <Image
            source={require("@/assets/images/avatar.png")}
            className="w-8 h-8 object-cover rounded-full"
          />
          <View className="flex flex-col ml-2">
            <Text className="text-black text-sm">Joe</Text>
            <Text className="text-black text-xs">Role</Text>
          </View>
        </View>
        <View className="flex flex-row items-end mr-5 mt-7">
          <Pressable>

          <ThumbsUp color="black" size={20} />
          </Pressable>
          <Text className="text-black ml-2 text-sm">123</Text>
        </View>
      </View>
    </View>
  </View>
</TouchableOpacity>



      </ScrollView>

    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    marginRight: 25
  
  },
  card: {
    width: 200, 
    height: 200, 
    borderRadius: 24,  
    justifyContent: 'start',
    alignItems: 'start',
    overflow: 'hidden',  
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
