import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Linking,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
const { width } = Dimensions.get("window");
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions, CommonActions } from "@react-navigation/native";
const scale = width / 320;

const UserSettings = ({ navigation }: any) => {
  // const handleWhatsAppRedirect = () => {
  //   const phoneNumber = "+919356836581"; // Replace with the target phone number
  //   const message = "Hello!"; // Replace with your desired message
  //   const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
  //     message
  //   )}`;

  //   Linking.openURL(url).catch(() => {
  //     Alert.alert(
  //       "Error",
  //       "WhatsApp is not installed on your device or the URL is invalid."
  //     );
  //   });
  // };

  const handleAccountDelete = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await axios.delete(
        "https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/auth/deleteaccount",
        {
          headers: {
            "auth-token": authToken,
          },
        }
      );

      console.log(response);
      console.log(authToken);
      await AsyncStorage.setItem("authToken", "");
      navigation.dispatch(
        // StackActions.replace('Splash') // Replace 'Login' with the name of your start screen
        CommonActions.reset({
          index: 0, // The first screen in the stack
          routes: [{ name: "Splash" }], // Replace 'Login' with your start screen
        })
      );
      console.log(authToken);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    const authToken = await AsyncStorage.getItem("authToken");
    const response = await axios.post(
      "https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/auth/logout",
      {},
      {
        headers: {
          "auth-token": authToken,
        },
      }
    );
    await AsyncStorage.removeItem("authToken");
    navigation.dispatch(
      // StackActions.replace('Splash') // Replace 'Login' with the name of your start screen
      CommonActions.reset({
        index: 0, // The first screen in the stack
        routes: [{ name: "PhoneNumberAuth" }], // Replace 'Login' with your start screen
      })
    );
    console.log(authToken);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <TouchableOpacity
        onPress={handleAccountDelete}
        style={{
          borderBottomWidth: 1,
          paddingVertical: 12 * scale,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20 * scale,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16 * scale, color: "red" }}>
          Permenently delete account{" "}
        </Text>
        {/* <AntDesign name="arrowright" size={20 * scale} /> */}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          borderBottomWidth: 1,
          paddingVertical: 12 * scale,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20 * scale,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16 * scale, color: "red" }}>Log Out</Text>
        {/* <AntDesign name="arrowright" size={20 * scale} /> */}
      </TouchableOpacity>
    </View>
  );
};

export default UserSettings;

const styles = StyleSheet.create({});
