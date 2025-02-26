import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation,CommonActions  } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");
const scale = width / 320;

const UserSettings = () => {
  const navigation = useNavigation();

  const handleAccountDelete = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      await axios.delete(
        "https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/auth/deleteaccount",
        {
          headers: { "auth-token": authToken },
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
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      if (!authToken) throw new Error("Auth Token not found");

      await axios.post(
        "https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/auth/logout",
        {},
        { headers: { "auth-token": authToken } }
      );
      
      await AsyncStorage.removeItem("authToken");
      navigation.dispatch(
        // StackActions.replace('Splash') // Replace 'Login' with the name of your start screen
        CommonActions.reset({
          index: 0, // The first screen in the stack
          routes: [{ name: "PhoneNumberAuth" }], // Replace 'Login' with your start screen
        })
      );
    } catch (error) {
      console.error(error);
      await AsyncStorage.removeItem("authToken");
      navigation.dispatch(
        // StackActions.replace('Splash') // Replace 'Login' with the name of your start screen
        CommonActions.reset({
          index: 0, // The first screen in the stack
          routes: [{ name: "PhoneNumberAuth" }], // Replace 'Login' with your start screen
        })
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Delete Account Button */}
      <TouchableOpacity onPress={handleAccountDelete} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete Account Permanently</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 18 * scale,
    fontWeight: "bold",
    marginLeft: 10,
  },
  logoutButton: {
    width: "90%",
    paddingVertical: 14 * scale,
    borderWidth: 2,
    borderColor: "#E07A5F",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 16 * scale,
    color: "#000",
    fontWeight: "bold",
  },
  deleteButton: {
    width: "90%",
    paddingVertical: 14 * scale,
    backgroundColor: "#D90429",
    borderRadius: 8,
    alignItems: "center",
  },
  deleteText: {
    fontSize: 16 * scale,
    color: "#ffffff",
    fontWeight: "bold",
  },
});
