import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
const { width } = Dimensions.get("window");
const scale = width / 320;
import Logo from "@/assets/icons/logo";
import * as Yup from "yup";
import { Formik } from "formik";
import { useFonts } from "expo-font";

const PhoneNumber = ({ navigation }) => {
  
  // const [loaded]=useFonts({
  //   Satoshi: require("../../assets/fonts/Satoshi-Variable.ttf"),
  //   Gotham: require("../../assets/fonts/GothamMedium.ttf"),
  //   GothamBold: require("../../assets/fonts/GothamBold.ttf")
  // })
  const handleSubmit = (values) => {
    const phoneNumber = values.phoneLength
    console.log(phoneNumber);
    navigation.push("Otp",{number:phoneNumber});
  };
  const phoneNumeberSchema = Yup.object().shape({
    phoneLength: Yup.string()
      .length(10, "Must be 10 numbers")
      .required("Required Field"),
  });
  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
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
              <Logo size={170*scale}/>
            </View>
          </LinearGradient>
          <View style={styles.flex2}>
            <Text style={styles.heading}>EventPoster Pro</Text>
            <Text style={styles.number1}>ENTER MOBILE NUMBER</Text>
            <Formik
              initialValues={{ phoneLength: "" }}
              validationSchema={phoneNumeberSchema}
              onSubmit={handleSubmit}
            >
              {({ handleChange, errors, touched, handleSubmit, values }) => (
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      borderRadius: 10 * scale,
                      borderWidth: 1 * scale,
                      borderColor: "black",
                      width: "80%",
                      alignSelf: "center",
                      paddingVertical: 6 * scale,
                      paddingHorizontal: 6 * scale,
                      marginTop: 8 * scale,
                    }}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        paddingHorizontal: 10 * scale,
                        borderRightWidth: 1,
                      }}
                    >
                      <Text style={{ fontSize: 12 * scale }}>+91</Text>
                    </View>
                    <TextInput
                      onChangeText={handleChange("phoneLength")}
                      value={values.phoneLength}
                      placeholder="93568365221"
                      keyboardType="numeric"
                      placeholderTextColor="#858597"
                      style={{
                        fontSize: 11 * scale,
                        paddingHorizontal: 10 * scale,
                      }}
                    />
                  </View>
                  {errors.phoneLength && touched.phoneLength && (
                    <Text style={{ color: "red", alignSelf: "center" }}>
                      {errors.phoneLength}
                    </Text>
                  )}
                  <TouchableOpacity
                    onPress={
                      handleSubmit
                    }
                    style={styles.btn}
                  >
                    <Text style={{ fontSize: 15 * scale, fontWeight: "500" }}>
                      Get OTP
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default PhoneNumber;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFDBA8",
  },
  linearGradient: {
    height: "55%",
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
    // fontFamily:"Gotham"
  },
  txt2: {
    color: "#7F310F",
    fontSize: 20 * scale,
    // fontFamily:"GothamBold"
  },
  heading: {
    fontSize: 20 * scale,
    fontWeight: "800",
    alignSelf: "center",
  },
  number1: {
    fontSize: 13 * scale,
    marginTop: 25 * scale,
    // fontFamily:"Satoshi",
    
  },
  input: {
    width: "90%",
    alignSelf: "center",
    height: 35 * scale,
    borderRadius: 10 * scale,
    borderWidth: 1,
    borderColor: "#000000",
    paddingHorizontal: 10 * scale,
    marginTop: 10 * scale,
  },
  btn: {
    backgroundColor: "#FF8017",
    width: "80%",
    borderRadius: 8 * scale,
    paddingHorizontal: 15 * scale,
    paddingVertical: 10 * scale,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 25 * scale,
  },
});
