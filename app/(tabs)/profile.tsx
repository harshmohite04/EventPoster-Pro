import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");
const scale = width / 320;
const Tab = createMaterialTopTabNavigator();

const Created = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Text>Created</Text>
    </View>
  );
};
const Downloaded = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Text>Downloaded</Text>
    </View>
  );
};
const Profile = ({ navigation }: any) => {
  const [userData, setUserData] = useState("");
  const [userName, setUserName] = useState("");
  const [userLogo, setUserLogo] = useState("");
  useEffect(() => {
    console.log("Hello")
    const apiCall = async () => {
      try {
        const authToken = await AsyncStorage.getItem("authToken");
        if (!authToken) {
          console.error("Auth Token not found");
          return;
        }
        const response = await axios.get(
          "https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/auth/getuser",
          {
            headers: {
              "auth-token": authToken,
            },
          }
        );
        console.log(authToken)
        console.log(response.data);
        setUserName(response.data.name)
        setUserLogo(response.data.photo)
        console.log(response.data.name)
        console.log("Api");
      } catch (error) {
        console.log(error)
      }
    };
    apiCall();
  }, [userName,userLogo]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#ffffff",
          marginTop: 10 * scale,
          paddingVertical: 10 * scale,
          paddingHorizontal: 10 * scale,
          justifyContent: "space-between",
          paddingRight: 10 * scale,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text>{userData}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AntDesign name="arrowleft" size={20 * scale} />
          </TouchableOpacity>
          <Text style={{ fontSize: 16 * scale, marginLeft: 10 * scale }}>
            Profile
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.push("UserSettings");
          }}
        >
          <Feather name="settings" size={20 * scale} color="#000000" />
        </TouchableOpacity>
      </View>

      <View style={{ marginVertical: 20 * scale }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 10 * scale,
            paddingHorizontal: 30 * scale,
          }}
        >
          <Image
            source={{
              uri: userLogo?userLogo:"https://ideogram.ai/assets/progressive-image/balanced/response/jcV_Ea1sQga0NYL0jPyUYQ"
            }}

            style={{
              width: 100 * scale,
              height: 100 * scale,
              borderRadius: 50 * scale,
            }}
          />
          <Text
            style={{
              alignSelf: "center",
              fontSize: 16 * scale,
              marginLeft: 10 * scale,
              paddingHorizontal: 40 * scale,
            }}
          >
            {userName}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.push("ProfileEdit");
          }}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "#FF8017",
            width: "90%",
            alignSelf: "center",
            borderRadius: 10 * scale,
            paddingVertical: 10 * scale,
            marginTop: 10 * scale,
          }}
        >
          <FontAwesome5 name="pen" size={20 * scale} color="#000000" />
          <Text style={{ marginLeft: 10 * scale, fontSize: 15 * scale }}>
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>

      <Tab.Navigator
        style={{
          backgroundColor: "#ffffff",
          flex: 1,
          marginTop: 20 * scale,
          borderTopRightRadius: 30 * scale,
          borderTopLeftRadius: 30 * scale,
          paddingTop: 10 * scale,
        }}
        screenOptions={{
          tabBarActiveTintColor: "#000000",
          tabBarIndicatorStyle: {
            backgroundColor: "#FF8017", // Change this to your desired color
            height: 3, // Adjust the height of the line
          },
        }}
      >
        <Tab.Screen name="Created" component={Created} />
        <Tab.Screen name="Downloaded" component={Downloaded} />
      </Tab.Navigator>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
