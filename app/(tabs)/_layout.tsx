import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import { Slot,Stack } from 'expo-router'
import { createStackNavigator } from '@react-navigation/stack';
import PhoneNumber from './phoneNumber';
const Layout = () => {
    const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="First" component={PhoneNumber} />
    </Stack.Navigator>
  )
}

export default Layout

const styles = StyleSheet.create({})