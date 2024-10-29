import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import PromoImg from "@/assets/icons/promoImg";
import { LinearGradient } from "expo-linear-gradient";
const { width } = Dimensions.get("window");
const scale = width / 320;
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity } from "react-native-gesture-handler";
const Promo = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.flex1}>
        <TouchableOpacity style={styles.skip} onPress={()=>{navigation.push("Home")}}>
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
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <LinearGradient
          colors={["#ffffff", "#fbc293", "#fbc293", "#ffffff"]}
          style={{
            width: "100%",
            height: "90%",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <PromoImg />
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
            <Text style={{ fontSize: 20 * scale }}>Yearly Plan</Text>
            <Text
              style={{
                color: "#14AE5C",
                fontSize: 30 * scale,
                fontWeight: "700",
              }}
            >
              ₹500
            </Text>
            <Text style={{ color: "grey" }}>(₹50/month)</Text>
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
              ₹1800
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
    paddingHorizontal: 10 * scale,marginBottom:15*scale
  },
});
