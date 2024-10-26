import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
const { width } = Dimensions.get("window");
const scale = width / 320;
import Logo from "@/assets/icons/logo";
const PhoneNumber = () => {
  const [number, onChangeNumber] = useState("");
  console.log(number);
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFEFD4", "#ffffff", "#FFDBA8"]}
        style={styles.linearGradient}
      >
        <View style={styles.Parent}>
          <View style={styles.txt}>
            <Text style={styles.txt1}>Quotes and Wishes </Text>
            <Text style={styles.txt2}>Everyday</Text>
          </View>
          <View style={[styles.txt, { marginBottom: 20 * scale }]}>
            <Text style={styles.txt1}> with </Text>
            <Text style={styles.txt2}>your photo </Text>
            <Text style={styles.txt1}>and </Text>
            <Text style={styles.txt2}>name</Text>
          </View>

          <Logo />
        </View>
      </LinearGradient>
      <View style={styles.flex2}>
        <Text style={styles.heading}>EventPoster Pro</Text>
        <Text style={styles.number1}>ENTER MOBILE NUMBER</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="+91-1234567890"
          keyboardType="numeric"
          placeholderTextColor="#000000"
          maxLength={10}
        />
        <TouchableOpacity style={styles.btn}>
          <Text style={{fontSize:15*scale,fontWeight:"500"}}>Get OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PhoneNumber;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFDBA8",
  },
  linearGradient: {
    height: "50%", // Adjust the gradient height to 50%
    justifyContent: "center",
  },
  flex2: {
    height: "50%",
    borderTopRightRadius: 25 * scale,
    borderTopLeftRadius: 25 * scale,
    backgroundColor: "white",
    paddingVertical: 25 * scale,
    paddingHorizontal: 10 * scale,
  },

  txt: {
    flexDirection: "row",
  },
  Parent: {
    alignItems: "center",
    justifyContent: "center",
  },
  txt1: {
    color: "#000000",
    fontSize: 20 * scale,
    fontWeight: "500",
  },
  txt2: {
    color: "#7F310F",
    fontSize: 20 * scale,
    fontWeight: "800",
  },
  heading: {
    fontSize: 20 * scale,
    fontWeight: "800",
    alignSelf: "center",
  },
  number1: {
    fontSize: 13 * scale,
    marginTop: 25 * scale,
  },
  input: {
    width: "90%",
    alignSelf: "center",
    height: 35 * scale,
    borderRadius: 10 * scale,
    borderWidth: 1,
    borderColor: "#000000",
    paddingHorizontal: 10 * scale,
    marginTop:10*scale
  },
  btn: {
    backgroundColor: "#FF8017",
    width:"80%",
    borderRadius:8*scale,
    paddingHorizontal:15*scale,
    paddingVertical:10*scale,
    alignItems:"center",
    alignSelf:"center",
    marginTop:25*scale
  },
});
