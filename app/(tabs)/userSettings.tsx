import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Linking,
  Alert,
} from "react-native";
import React from "react";
const { width } = Dimensions.get("window");
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity } from "react-native-gesture-handler";
const scale = width / 320;

const UserSettings = () => {
  const handleWhatsAppRedirect = () => {
    const phoneNumber = "+919356836581"; // Replace with the target phone number
    const message = "Hello!"; // Replace with your desired message
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    Linking.openURL(url).catch(() => {
      Alert.alert(
        "Error",
        "WhatsApp is not installed on your device or the URL is invalid."
      );
    });
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <TouchableOpacity
        onPress={() => {
          handleWhatsAppRedirect();
        }}
        style={{
          borderBottomWidth: 1,
          borderTopWidth: 1,
          paddingVertical: 12 * scale,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20 * scale,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16 * scale }}>Developer Options</Text>
        <AntDesign name="arrowright" size={20 * scale} />
      </TouchableOpacity>
    </View>
  );
};

export default UserSettings;

const styles = StyleSheet.create({});
