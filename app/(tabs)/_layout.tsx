import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import { Slot,Stack } from 'expo-router'
import { createStackNavigator } from '@react-navigation/stack';
import PhoneNumber from './phoneNumber';
import Otp from './otp';
const Layout = () => {
    const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="PhoneNumberAuth" screenOptions={{headerShown:false}}>
      <Stack.Screen name="PhoneNumberAuth" component={PhoneNumber} />
      <Stack.Screen name="Otp" component={Otp} />
    </Stack.Navigator>
  )
}

export default Layout

const styles = StyleSheet.create({})