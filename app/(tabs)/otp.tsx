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
import { SafeAreaView } from "react-native-safe-area-context";
import KeyboardAvoidingContainer from "@/components/KeyboardAvoidingContainer";
const Otp = ({ navigation, route }) => {
  const [loaded] = useFonts({
    Satoshi: require("../../assets/fonts/Satoshi-Variable.ttf"),
    Gotham: require("../../assets/fonts/GothamMedium.ttf"),
    GothamBold: require("../../assets/fonts/GothamBold.ttf"),
  });

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

  useEffect(() => {
    let intervalId;
    if (secondsRemaining > 0) {
      intervalId = setInterval(() => {
        setSecondsRemaining(secondsRemaining - 1);
      }, 1000);
    } else {
      // Timer has reached 0
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [secondsRemaining]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView>

  
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
                <Logo size={170 * scale} />
              </View>
            </LinearGradient>
            <View style={styles.flex2}>
              <Text style={styles.heading}>EventPoster Pro</Text>
              <View
                style={{
                  height: 40 * scale,
                  width: 40 * scale,
                  borderWidth: 4,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 20 * scale,
                  borderColor: "#FFC070",
                  alignSelf: "center",
                  marginVertical: 10 * scale,
                }}
                >
                <Text style={{ fontSize: 20 * scale }}>{secondsRemaining}</Text>
              </View>
              <Text
                style={{
                  fontSize: 12 * scale,
                  color: "#000000",
                  fontWeight: "500",
                  marginTop: 10 * scale,
                }}
                >
                OTP sent to {number}, Please wait
              </Text>
              <View style={{ flexDirection: "row", alignSelf: "center" }}>
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
              <Formik
                initialValues={{ otp: "" }}
                onSubmit={(values) => console.log(values)}
                >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <View>
                    <TouchableOpacity
                      disabled={
                        f1 !== "" && f2 !== "" && f3 !== "" && f4 !== ""
                          ? false
                          : true
                      }
                      onPress={async () => {
                        console.log(otp);
                        await AsyncStorage.setItem("isVerified", "true");
                        navigation.replace("Promo");
                      }}
                      style={{
                        backgroundColor:
                          f1 !== "" && f2 !== "" && f3 !== "" && f4 !== ""
                            ? "#FF8017"
                            : "#B3B3B3",
                            width: "80%",
                            alignItems: "center",
                            paddingVertical: 10 * scale,
                            
                            alignSelf: "center",
                            borderRadius: 10 * scale,
                          }}
                          >
                      <Text
                        style={{
                          fontSize: 13 * scale,
                          fontWeight: "500",
                          color:
                            f1 !== "" && f2 !== "" && f3 !== "" && f4 !== ""
                              ? "#000000"
                              : "#ffffff",
                            }}
                            >
                        Continue
                      </Text>
                    </TouchableOpacity>
                    <Text
                      disabled={secondsRemaining > 1}
                      onPress={() => {
                        setSecondsRemaining(30);
                        console.log("Tap");
                      }}
                      style={{
                        alignSelf: "center",
                        fontSize: 14 * scale,
                        textDecorationLine: "underline",
                        marginVertical: 5 * scale,
                        color: secondsRemaining == 0 ? "blue" : "grey",
                      }}
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
    </SafeAreaView>
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
  inputView: {
    borderRadius: 10,
    width: 35 * scale,
    height: 35 * scale,
    color: "#000000",
    textAlign: "center",
    marginLeft: 15 * scale,
    marginVertical: 10 * scale,
    backgroundColor: "#FFEFD4",
  },
});
