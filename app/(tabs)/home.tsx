import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Entypo from "@expo/vector-icons/Entypo";
const { width } = Dimensions.get("window");
const scale = width / 320;

import ProfilePhoto from "@/assets/icons/profilePhoto";

const Home = ({ navigation }) => {
  const [search, setSearch] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flex1}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <View style={styles.search}>
            <EvilIcons name="search" size={20 * scale} color="black" />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search"
              placeholderTextColor={"#49454F"}
              clearButtonMode="always"
              style={{ marginLeft: 5 * scale, fontSize: 14 * scale }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.push("UploadImage");
            }}
            style={{
              flexDirection: "row",
              backgroundColor: "#FF9A37",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 10 * scale,
              paddingVertical: 5 * scale,
              borderRadius: 25 * scale,
            }}
          >
            <Entypo name="plus" size={24} color="black" />
            <Text style={{ fontSize: 12 * scale, marginLeft: 5 * scale }}>
              Create
            </Text>
          </TouchableOpacity>
        </View>
        <ProfilePhoto size={35 * scale} />
      </View>

      <View style={styles.category}></View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 10 * scale,
    paddingVertical: 15 * scale,
  },
  flex1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  search: {
    flexDirection: "row",
    backgroundColor: "#FFEFD4",
    width: "60%",
    borderRadius: 25 * scale,
    paddingHorizontal: 5 * scale,
    paddingVertical: 5 * scale,
    alignItems: "center",
  },
  category: {
    borderTopColor: "#F0F0F0",
    borderBottomColor: "#F0F0F0",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 10 * scale,
    paddingVertical: 10 * scale,
  },
});
