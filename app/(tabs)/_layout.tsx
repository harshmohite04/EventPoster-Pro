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
import EditFlyer from "./EditFlyer";

import { useFonts } from "expo-font";
import AppLoading from 'expo-app-loading';
import Library from "./library";
import Profile from "./profile";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const checkVerificationStatus = async () => {
      const verified = await AsyncStorage.getItem("isVerified");
      const role = await AsyncStorage.getItem("role");
        
      if (verified === "true") {
        if(role ==="admin"){
          navigation.replace("Library"); // change when before going to production

        }
        else if(role ==="user"){
          
          navigation.replace("Home"); // change when before going to production
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
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <AppLoading />
    )
  }

  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="UploadImage"
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
      <Stack.Screen name="Profile" component={Profile} />

      {/* Admin */}
      <Stack.Screen name="Library" component={Library} />

    </Stack.Navigator>
  );
};

export default Layout;

const styles = StyleSheet.create({});
