import React, { Component } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Calendar, House, Sparkles, UsersRound } from "lucide-react-native";
import { Link } from "expo-router";


class Navbar extends Component {
  render() {
    return (
      <SafeAreaView className="w-full absolute h-24 rounded-sm pt-4 flex flex-row justify-evenly bottom-0 items-center bg-blue-500">
        <TouchableOpacity>
          <House color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Sparkles color="white" />
        </TouchableOpacity>
        <Link to="/community">
        <TouchableOpacity>
          <UsersRound color="white" />
        </TouchableOpacity>
        </Link>
        
        <TouchableOpacity>
          <Calendar color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default Navbar;
