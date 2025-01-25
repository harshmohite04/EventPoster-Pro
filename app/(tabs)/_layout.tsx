import { StyleSheet, Text, View, ActivityIndicator, Alert } from "react-native";
import React, { useEffect, useState } from "react";
// import { Slot,Stack } from 'expo-router'
import { createStackNavigator } from "@react-navigation/stack";
import PhoneNumber from "./phoneNumber";
import Otp from "./otp";
import Promo from "./promo";
import Home from "./home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UploadImage from "./uploadImage";
import EditImage from "./editImage";
import ProfileEditor from "./profileEditor";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import Library from "./library";
import ProfileEdit from "./profileEdit";
import AdminEditImage from "./adminEditImage";
import Delete from "./delete";
import EditFlyer from "./EditFlyer";
import AdminSettings from "./adminSettings";
import Profile from "./profile";
import UserSettings from "./userSettings";
import {CommonActions } from "@react-navigation/native";

const SplashScreen = ({ navigation }: any) => {
  
  useEffect(() => {
    const checkVerificationStatus = async () => {
      try {
      const authToken = await AsyncStorage.getItem("authToken");

      if (authToken == null) {
        navigation.dispatch(
          // StackActions.replace('Splash') // Replace 'Login' with the name of your start screen
          CommonActions.reset({
            index: 0, // The first screen in the stack
            routes: [{ name: "PhoneNumberAuth" }], // Replace 'Login' with your start screen
          })
        );
        return;
      }

      if (authToken == "") {
        throw new Error("Auth Token not found");
      }

      const response = await fetch(
        "https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/auth/getuser",
        {
          method: "GET",
          headers: {
            "auth-token": authToken,
          },
        }
      )

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const data = await response.json();
      console.log("authToken")
      if (data.isAdmin == true) {
        navigation.replace("Library"); // change when before going to production
      } else if (data.isAdmin == false) {
        navigation.replace("Promo"); // change when before going to production
      }
    } catch (error) {
      console.error(error);
      await AsyncStorage.removeItem("authToken");
      Alert.alert("Invalid Auth Token", "Please login again!!");
      navigation.dispatch(
        // StackActions.replace('Splash') // Replace 'Login' with the name of your start screen
        CommonActions.reset({
          index: 0, // The first screen in the stack
          routes: [{ name: "PhoneNumberAuth" }], // Replace 'Login' with your start screen
        })
      );
    }
    };

    checkVerificationStatus();
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading...</Text>
    </View>
  );
};

const Layout = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="PhoneNumberAuth" component={PhoneNumber} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="Promo" component={Promo} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="UploadImage" component={UploadImage} />
      <Stack.Screen name="EditImage" component={EditImage} />
      <Stack.Screen name="EditFlyer" component={EditFlyer} />
      {/* <Stack.Screen name="EditFlyer" component={ProfileEditor} /> */}
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
      <Stack.Screen name="MainProfile" component={Profile} />
      <Stack.Screen name="UserSettings" component={UserSettings} />

      {/* Admin */}
      <Stack.Screen name="Library" component={Library} />
      <Stack.Screen name="AdminEditImage" component={AdminEditImage} />
      <Stack.Screen name="AdminSettings" component={AdminSettings} />

      {/* User Side Logo Poistion */}
      <Stack.Screen name="Delete" component={Delete} />
    </Stack.Navigator>
  );
};

export default Layout;

const styles = StyleSheet.create({});
