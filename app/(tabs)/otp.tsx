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
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
const { width } = Dimensions.get("window");
const scale = width / 320;
import Logo from "@/assets/icons/logo";
import { Formik } from "formik";
import PhoneNumber from "./phoneNumber";
const Otp = ({ navigation,route }) => {

    const { number = '' } = route?.params || {};

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

            <Formik
              initialValues={{ email: "" }}
              onSubmit={(values) => console.log(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View>
                  

                  <TouchableOpacity
                    style={{
                      backgroundColor: "#FF8017",
                      width: "80%",
                      alignItems: "center",
                      paddingVertical: 10 * scale,
                      alignSelf:"center",
                      borderRadius:10*scale
                    }}
                  >
                    <Text style={{fontSize:13*scale,fontWeight:"500"}}>Continue</Text>
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
});
