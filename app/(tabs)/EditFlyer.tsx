import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
const { width } = Dimensions.get("window");
const scale = width / 320;
import { Keyboard, TouchableWithoutFeedback } from "react-native";

const EditFlyer = ({ navigation }: any) => {
  const [text1, setText1] = useState("");
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10 * scale,
            backgroundColor: "#FFFFFF",
            alignItems: "center",
            paddingVertical: 20 * scale,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Feather name="arrow-left" size={24 * scale} color="black" />
            </TouchableOpacity>
            <Text
              style={{ fontSize: 16 * scale, paddingHorizontal: 10 * scale }}
            >
              Upload Frame
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: "#FF9A37",
                flexDirection: "row",
                paddingHorizontal: 18 * scale,
                paddingVertical: 8 * scale,
                borderRadius: 28 * scale,
                alignItems: "center",
              }}
            >
              <Feather name="check" size={16 * scale} color="black" />
              <Text style={{ fontSize: 14 * scale, paddingLeft: 8 * scale }}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Image
          style={{ width: "100%", height: "50%" }}
          source={{
            uri: "https://devtop.io/wp-content/uploads/2022/10/react-native-1.png",
          }}
        />

        <View style={{ width: "90%", alignSelf: "center" }}>
          <TextInput
            style={{
              borderRadius: 5 * scale,
              borderWidth: 1 * scale,
              paddingHorizontal: 10 * scale,
            }}
            onChangeText={setText1}
            value={text1}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditFlyer;

const styles = StyleSheet.create({});
