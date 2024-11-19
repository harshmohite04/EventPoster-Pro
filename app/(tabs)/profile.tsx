import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
const { width } = Dimensions.get("window");
const scale = width / 320;
import Feather from "@expo/vector-icons/Feather";
const Profile = () => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: "8%",
          backgroundColor: "#ffffff",
          marginTop: 20 * scale,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 15 * scale,
        }}
      >
        <Feather name="arrow-left" size={20 * scale} color="black" />
        <Text style={{ fontSize: 18 * scale, marginLeft: 15 * scale }}>
          Profile
        </Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-around" ,marginTop:20*scale}}>
        <View>
          <View
            style={{
              backgroundColor: "#D9D9D9",
              height: 120 * scale,
              width: 120 * scale,
              borderRadius: 500 * scale,
            }}
          ></View>
          <Text
            style={{
              fontSize: 15 * scale,
              marginTop: 10 * scale,
              textAlign: "center",
            }}
          >
            Upload Logo
          </Text>
        </View>

        <View>
          <View
            style={{
              backgroundColor: "#D9D9D9",
              height: 120 * scale,
              width: 120 * scale,
              borderRadius: 500 * scale,
            }}
          ></View>
          <Text
            style={{
              fontSize: 15 * scale,
              marginTop: 10 * scale,
              textAlign: "center",
            }}
          >
            Upload your photo
          </Text>
        </View>
      </View>

      <View style={{backgroundColor:"#ffffff",marginTop:10*scale}}>
        <Text>Personal Details</Text>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
