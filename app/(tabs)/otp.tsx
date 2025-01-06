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
  Image,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
const { width } = Dimensions.get("window");
const scale = width / 320;
import Logo from "@/assets/icons/logo";
import { Formik } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import MiddleLogo from "@/assets/icons/middleLogo";
import axios from "axios";

const Otp = ({ navigation, route }:any) => {
  const [inCorrect, setInCorrect] = useState(false);
  const listOfNumbers = ["+919356836581", "+910123456789", "+919876543210"];
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const { number = "" } = route?.params || {};

  const et1 = useRef();
  const et2 = useRef();
  const et3 = useRef();
  const et4 = useRef();

  const [f1, setF1] = useState("");
  const [f2, setF2] = useState("");
  const [f3, setF3] = useState("");
  const [f4, setF4] = useState("");
  const otp = f1 + f2 + f3 + f4;
  const [secondsRemaining, setSecondsRemaining] = useState(30);

  // State for keyboard height
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    let intervalId:any;
    if (secondsRemaining > 0) {
      intervalId = setInterval(() => {
        setSecondsRemaining(secondsRemaining - 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [secondsRemaining]);

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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Math.max(0, keyboardHeight - 150 * scale),
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
                {/* <Logo size={170 * scale} /> */}
                <Image
                  style={{
                    width: 200 * scale * 1.0228310502283105022831050228311,
                    height: 200 * scale,
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
              <View style={styles.timerContainer}>
                <Text style={{ fontSize: 20 * scale }}>{secondsRemaining}</Text>
              </View>
              <Text style={styles.otpSentText}>
                OTP sent to {number}, Please wait
              </Text>
              <View style={styles.otpContainer}>
                <TextInput
                  ref={et1}
                  style={[
                    styles.inputView,
                    { borderColor: f1.length >= 1 ? "blue" : "#000" },
                  ]}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={f1}
                  onChangeText={(txt) => {
                    setF1(txt);
                    if (txt.length === 1) et2.current.focus();
                  }}
                />
                <TextInput
                  ref={et2}
                  style={[
                    styles.inputView,
                    { borderColor: f2.length >= 1 ? "blue" : "#000" },
                  ]}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={f2}
                  onChangeText={(txt) => {
                    setF2(txt);
                    if (txt.length === 1) et3.current.focus();
                    else if (txt.length == 0) et1.current.focus();
                  }}
                />
                <TextInput
                  ref={et3}
                  style={[
                    styles.inputView,
                    { borderColor: f3.length >= 1 ? "blue" : "#000" },
                  ]}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={f3}
                  onChangeText={(txt) => {
                    setF3(txt);
                    if (txt.length === 1) et4.current.focus();
                    else if (txt.length == 0) et2.current.focus();
                  }}
                />
                <TextInput
                  ref={et4}
                  style={[
                    styles.inputView,
                    { borderColor: f4.length >= 1 ? "blue" : "#000" },
                  ]}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={f4}
                  onChangeText={(txt) => {
                    setF4(txt);
                    if (txt.length == 0) et3.current.focus();
                  }}
                />
              </View>
              {inCorrect ? (
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "red",
                      fontSize: 14 * scale,
                    }}
                  >
                    Incorrect OTP
                  </Text>
                </View>
              ) : null}
              <Formik
                initialValues={{ otp: "" }}
                onSubmit={(values) => console.log(values)}
              >
                {({ handleSubmit }) => (
                  <View>
                    <TouchableOpacity
                      disabled={otp.length < 4}
                      onPress={async () => {
                        console.log(otp);
                        // if (listOfNumbers.includes(number)) {
                        //   navigation.replace("Library");
                        //   await AsyncStorage.setItem("isVerified", "true");
                        //   await AsyncStorage.setItem("role", "admin");
                        // } else {
                        //   navigation.replace("Promo");
                        //   await AsyncStorage.setItem("isVerified", "true");
                        //   await AsyncStorage.setItem("role", "user");
                        // }
                        try {
                          const response = await axios.post(
                            "https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/auth/verify-otp",
                            {
                              phoneNumber: number,
                              otp: otp,
                            },
                            {
                              headers: {
                                "Content-Type": "application/json", // Explicitly set content type
                              },
                            }
                          );
                          console.log(response.data);
                          console.log(response.data.authToken);
                          if (response.data.success) {
                            navigation.push("Promo",{ number:number });
                            if (listOfNumbers.includes(number)) {
                              navigation.replace("Library");
                              await AsyncStorage.setItem("authToken", response.data.authToken);
                              await AsyncStorage.setItem("role", "admin");
                            } else {
                              navigation.replace("Promo");
                              await AsyncStorage.setItem("authToken", response.data.authToken);
                              await AsyncStorage.setItem("role", "user");
                            }
                          }
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                      style={[
                        styles.continueButton,
                        {
                          backgroundColor:
                            otp.length === 4 ? "#FF8017" : "#B3B3B3",
                        },
                      ]}
                    >
                      <Text style={styles.continueText}>Continue</Text>
                    </TouchableOpacity>

                    <Text
                      disabled={secondsRemaining > 1}
                      onPress={() => setSecondsRemaining(30)}
                      style={[
                        styles.resendOtpText,
                        {
                          color: secondsRemaining === 0 ? "#FF8017" : "grey",
                        },
                      ]}
                    >
                      Resend OTP
                    </Text>
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

export default Otp;

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
    // fontWeight: "500",
    fontFamily: "Poppins_400Regular",
  },
  txt2: {
    color: "#7F310F",
    fontSize: 20 * scale,
    // fontWeight: "800",
    fontFamily: "Poppins_700Bold",
  },
  heading: {
    fontSize: 20 * scale,
    fontWeight: "800",
    alignSelf: "center",
  },
  timerContainer: {
    height: 40 * scale,
    width: 40 * scale,
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20 * scale,
    borderColor: "#FFC070",
    alignSelf: "center",
    marginVertical: 10 * scale,
  },
  otpSentText: {
    fontSize: 12 * scale,
    color: "#000000",
    // fontWeight: "500",
    // marginTop: 10 * scale,
    fontFamily: "Poppins_400Regular",
  },
  otpContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  inputView: {
    borderRadius: 10,
    width: 50 * scale,
    height: 45 * scale,
    color: "#000000",
    textAlign: "center",
    marginLeft: 10 * scale,
    marginRight: 10 * scale,
    marginVertical: 10 * scale,
    backgroundColor: "#FFEFD4",
    fontSize: 15 * scale,
    fontFamily: "Poppins_400Regular",
  },
  continueButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 10 * scale,
    alignSelf: "center",
    borderRadius: 10 * scale,
  },
  continueText: {
    fontSize: 13 * scale,
    // fontWeight: "500",
    color: "#000000",
    fontFamily: "Poppins_400Regular",
  },
  resendOtpText: {
    alignSelf: "center",
    fontSize: 14 * scale,
    textDecorationLine: "underline",
    marginVertical: 5 * scale,
    marginTop: 15 * scale,
    fontFamily: "Poppins_400Regular",
  },
});
