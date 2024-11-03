import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
// import { Slot,Stack } from 'expo-router'
import { createStackNavigator } from "@react-navigation/stack";
import PhoneNumber from "./phoneNumber";
import Otp from "./otp";
import Promo from "./promo";
import Home from "./home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UploadImage from "./uploadImage";
import EditImage from "./editImage";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const checkVerificationStatus = async () => {
      const verified = await AsyncStorage.getItem("isVerified");
      if (verified === "true") {
        // navigation.replace('Home');  
        navigation.replace("PhoneNumberAuth"); // change when before going to production
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
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="EditImage"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="PhoneNumberAuth" component={PhoneNumber} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="Promo" component={Promo} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="UploadImage" component={UploadImage} />
      <Stack.Screen name="EditImage" component={EditImage} />
    </Stack.Navigator>
  );
};

export default Layout;

const styles = StyleSheet.create({});
