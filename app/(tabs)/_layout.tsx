import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
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

const SplashScreen = ({ navigation }: any) => {
  
  useEffect(() => {
    const checkVerificationStatus = async () => {
      const authToken = await AsyncStorage.getItem("authToken");
      const role = await AsyncStorage.getItem("role");
      console.log("authToken")
      if (authToken!=null) {
        console.log(authToken)
        if (role === "admin") {
          navigation.replace("Library"); // change when before going to production
        } else if (role === "user") {
          navigation.replace("Promo"); // change when before going to production
        }
        // navigation.replace('Home');
      } else {
        navigation.replace("PhoneNumberAuth");
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
