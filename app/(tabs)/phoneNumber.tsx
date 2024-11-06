import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
const { width } = Dimensions.get("window");
const scale = width / 320;
import MiddleLogo from "../../assets/icons/middleLogo";
import * as Yup from "yup";
import { Formik } from "formik";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

const PhoneNumber = ({ navigation }) => {
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

  const [keyboardHeight, setKeyboardHeight] = useState(0);
  useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_600SemiBold,
  });
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  // const [loaded]=useFonts({
  //   Satoshi: require("../../assets/fonts/Satoshi-Variable.ttf"),
  //   Gotham: require("../../assets/fonts/GothamMedium.ttf"),
  //   GothamBold: require("../../assets/fonts/GothamBold.ttf")
  // })
  const handleSubmit = (values) => {
    const phoneNumber = values.phoneLength;
    console.log(phoneNumber);
    navigation.push("Otp", { number: phoneNumber });
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
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Math.max(0, keyboardHeight - 200 * scale),
            backgroundColor: "#ffffff",
          }}
          keyboardShouldPersistTaps="handled"
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
                {/* <Logo size={170*scale} /> */}
                <Image
                  style={{
                    width: 150 * scale * 1.0228310502283105022831050228311,
                    height: 150 * scale,
                  }}
                  source={require("../../assets/images/logo2.png")}
                ></Image>
              </View>
            </LinearGradient>
            <View style={styles.flex2}>
              <MiddleLogo
                style={{
                  position: "absolute",
                  top: -25 * scale, // Adjust to control how much it overlaps
                  alignSelf: "center",
                }}
                size={50 * scale}
              />
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
                        borderRadius: 16 * scale,
                        borderWidth: 1 * scale,
                        borderColor: "black",
                        width: "100%",
                        alignSelf: "center",
                        paddingVertical: 13 * scale,
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
                        <Text
                          style={{
                            fontSize: 16 * scale,
                            fontFamily: "Poppins_700Bold",
                          }}
                        >
                          +91
                        </Text>
                      </View>
                      <TextInput
                        onChangeText={handleChange("phoneLength")}
                        value={values.phoneLength}
                        placeholder="93568365221"
                        keyboardType="numeric"
                        placeholderTextColor="#858597"
                        style={{
                          paddingHorizontal: 10 * scale,
                          width: "80%",
                          fontSize: 16 * scale,
                          fontFamily: "Poppins_600SemiBold",
                        }}
                      />
                    </View>
                    {errors.phoneLength && touched.phoneLength && (
                      <Text style={{ color: "red", alignSelf: "center" }}>
                        {errors.phoneLength}
                      </Text>
                    )}
                    <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
                      <Text
                        style={{
                          fontSize: 15 * scale,
                          fontFamily: "Poppins_700Bold",
                        }}
                      >
                        Get OTP
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </ScrollView>
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
    alignSelf: "center",
    justifyContent: "center",
    width: "60%",
  },
  txt1: {
    color: "#000000",
    fontSize: 18 * scale,
    fontFamily: "Poppins_400Regular",
    lineHeight: 30,
  },
  txt2: {
    color: "#7F310F",
    fontSize: 18 * scale,
    lineHeight: 30,
    fontFamily: "Poppins_700Bold",
  },
  heading: {
    fontSize: 20 * scale,
    alignSelf: "center",
    // fontFamily:"Poppins_800ExtraBold",
    fontFamily: "Poppins_700Bold",
  },
  number1: {
    fontSize: 13 * scale,
    marginTop: 25 * scale,
    fontFamily: "Poppins_400Regular",
  },
  input: {
    width: "100%",
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
    width: "100%",
    borderRadius: 16 * scale,
    paddingHorizontal: 15 * scale,
    paddingVertical: 10 * scale,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 25 * scale,
  },
});
