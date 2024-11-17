import { StyleSheet, Text, View, Dimensions,Image } from "react-native";
import React from "react";
import PromoImg from "@/assets/icons/promoImg";
import { LinearGradient } from "expo-linear-gradient";
const { width } = Dimensions.get("window");
const scale = width / 320;
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

const Promo = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.flex1}>
        <TouchableOpacity
          style={styles.skip}
          onPress={() => {
            navigation.push("Home");
          }}
        >
          <Text
            style={{
              marginTop: 20 * scale,
              fontSize: 15 * scale,
              marginRight: 5 * scale,
            }}
          >
            Skip
          </Text>
          <AntDesign
            style={{ alignSelf: "flex-end" }}
            name="arrowright"
            size={20*scale}
            color="black"
          />
        </TouchableOpacity>
        <LinearGradient
          colors={["#ffffff", "#fbc293", "#fbc293", "#ffffff"]}
          style={{
            width: "100%",
            height: "90%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
                  style={{
                    width: 280 * scale * 1.0228310502283105022831050228311,
                    height: 280 * scale,
                  }}
                  source={require("../../assets/images/logo3.png")}
                ></Image>
        </LinearGradient>
      </View>
      <View style={styles.flex2}>
        <Text style={{ fontSize: 17 * scale, textAlign: "center" }}>
          Your photo and fancy name tag
        </Text>
        <Text style={{ fontSize: 17 * scale, textAlign: "center" }}>
          (Premium Feature)
        </Text>

        <TouchableOpacity
          style={{
            width: "90%",
            backgroundColor: "#ffefd4",
            alignSelf: "center",
            borderRadius: 10 * scale,
            flexDirection: "row",
            paddingHorizontal: 15 * scale,
            paddingVertical: 5 * scale,
            marginTop: 10 * scale,
            borderColor: "#FF8017",
            borderWidth: 1,
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 20 * scale,
                fontFamily: "Poppins-Regular",
                lineHeight: 25 * scale,
              }}
            >
              Yearly Plan
            </Text>
            <Text
              style={{
                color: "#14AE5C",
                fontSize: 30 * scale,
                fontFamily: "Poppins-Bold",
                lineHeight: 45 * scale,
              }}
            >
              ₹500
            </Text>
            <Text
              style={{
                color: "grey",
                lineHeight: 12 * scale,
                fontFamily: "Poppins-Regular",
              }}
            >
              (₹50/month)
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "red",

              width: "45%",
              alignSelf: "center",
              //   alignItems: "center",
              borderRadius: 10 * scale,
              paddingLeft: 10 * scale,
              paddingVertical: 1 * scale,
            }}
          >
            <Text
              style={{
                textDecorationLine: "line-through",
                color: "#ffffff",
                fontSize: 25 * scale,
                fontFamily: "Poppins-Bold",
                lineHeight: 30 * scale,
              }}
            >
              ₹1800
            </Text>
            <Text
              style={{
                color: "#ffffff",
                fontSize: 20 * scale,
                fontFamily: "Poppins-Bold",
                lineHeight: 25 * scale,
              }}
            >
              SAVE 67%
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: "90%",
            backgroundColor: "#FFF8ED",
            alignSelf: "center",
            borderRadius: 10 * scale,
            flexDirection: "row",
            paddingHorizontal: 15 * scale,
            paddingVertical: 5 * scale,
            marginTop: 15 * scale,

            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 20 * scale }}>Yearly Plan</Text>
            <Text
              style={{
                color: "#000000",
                fontSize: 30 * scale,
              }}
            >
              ₹99
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "red",

              width: "45%",
              alignSelf: "center",
              //   alignItems: "center",
              borderRadius: 10 * scale,
              paddingLeft: 10 * scale,
              paddingVertical: 1 * scale,
            }}
          >
            <Text
              style={{
                textDecorationLine: "line-through",
                color: "#ffffff",
                fontSize: 25 * scale,
                fontWeight: "bold",
              }}
            >
              ₹149
            </Text>
            <Text
              style={{
                color: "#ffffff",
                fontSize: 20 * scale,
                fontWeight: "bold",
              }}
            >
              SAVE 67%
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Promo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  flex1: {
    flex: 1,
    justifyContent: "center",
  },

  flex2: {
    flex: 1,
  },
  skip: {
    flexDirection: "row",
    alignSelf: "flex-end",
    paddingHorizontal: 10 * scale,
    marginBottom: 5 * scale,
  },
});
