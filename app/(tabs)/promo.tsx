import { StyleSheet, Text, View, Dimensions, Image, Alert } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import AntDesign from "@expo/vector-icons/AntDesign";
import RazorpayCheckout from "react-native-razorpay";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");
const scale = width / 320;

const Promo = ({ navigation }: any) => {
  const handlePayment = async (planType: string) => { // Removed amount parameter
    try {
      const authToken = await AsyncStorage.getItem("authToken");

      // Step 1: Create an order from the backend
      const response = await axios.post(
        "https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/subscription/create-order",
        { planType },
        { headers: { "auth-token": authToken } }
      );

      if (response.status !== 200) {
        throw new Error("Failed to create order");
      }

      const { orderId: order_id, currency, amount } = response.data; // Correctly extract data

      // Step 2: Open Razorpay payment gateway
      const options = {
        description: `Subscription - ${planType}`,
        image: "https://your-logo-url.com/logo.png",
        currency,
        key: "rzp_test_wmpZ8GCg0c1UTJ", // Replace with your Razorpay Key
        amount: amount, // Use amount from backend (already in paise)
        name: "epp",
        order_id,
        prefill: {
          email: "user@example.com",
          contact: "9999999999",
          name: "John Doe",
        },
        theme: { color: "#FF8017" },
      };

      RazorpayCheckout.open(options)
        .then((paymentData) => {
          Alert.alert("Payment Successful", `Payment ID: ${paymentData.razorpay_payment_id}`);
          // Optionally verify payment with your backend here
        })
        .catch((error) => {
          console.error("Payment Error:", error);
          Alert.alert("Payment Failed", error.description);
        });
    } catch (error) {
      Alert.alert("Error", "Something went wrong with the payment process.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.flex1}>
        <TouchableOpacity style={styles.skip} onPress={() => navigation.push("Home")}>
          <Text style={styles.skipText}>Skip</Text>
          <AntDesign name="arrowright" size={20 * scale} color="black" />
        </TouchableOpacity>

        <LinearGradient colors={["#ffffff", "#fbc293", "#fbc293", "#ffffff"]} style={styles.gradient}>
          <Image style={styles.logo} source={require("../../assets/images/logo3.png")} />
        </LinearGradient>
      </View>

      <View style={styles.flex2}>
        <Text style={styles.text}>Your photo and fancy name tag</Text>
        <Text style={styles.text}>(Premium Feature)</Text>

        {/* Yearly Plan */}
        <TouchableOpacity style={styles.planContainer} onPress={() => handlePayment("yearly")}>
          <View>
            <Text style={styles.planTitle}>Yearly Plan</Text>
            <Text style={styles.planPrice}>₹500</Text>
            <Text style={styles.perMonth}>(₹50/month)</Text>
          </View>
          <View style={styles.discountContainer}>
            <Text style={styles.strikethrough}>₹1800</Text>
            <Text style={styles.discountText}>SAVE 67%</Text>
          </View>
        </TouchableOpacity>

        {/* Monthly Plan */}
        <TouchableOpacity style={styles.planContainer} onPress={() => handlePayment("monthly")}>
          <View>
            <Text style={styles.planTitle}>Monthly Plan</Text>
            <Text style={styles.planPrice}>₹99</Text>
          </View>
          <View style={styles.discountContainer}>
            <Text style={styles.strikethrough}>₹149</Text>
            <Text style={styles.discountText}>SAVE 34%</Text>
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
  skipText: {
    marginTop: 20 * scale,
    fontSize: 15 * scale,
    marginRight: 5 * scale,
  },
  gradient: {
    width: "100%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 280 * scale * 1.02,
    height: 280 * scale,
  },
  text: {
    fontSize: 17 * scale,
    textAlign: "center",
  },
  planContainer: {
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
  },
  planTitle: {
    fontSize: 20 * scale,
    fontFamily: "Poppins-Regular",
    lineHeight: 25 * scale,
  },
  planPrice: {
    color: "#14AE5C",
    fontSize: 30 * scale,
    fontFamily: "Poppins-Bold",
    lineHeight: 45 * scale,
  },
  perMonth: {
    color: "grey",
    fontFamily: "Poppins-Regular",
  },
  discountContainer: {
    backgroundColor: "red",
    width: "45%",
    alignSelf: "center",
    borderRadius: 10 * scale,
    paddingLeft: 10 * scale,
    paddingVertical: 1 * scale,
  },
  strikethrough: {
    textDecorationLine: "line-through",
    color: "#ffffff",
    fontSize: 25 * scale,
    fontFamily: "Poppins-Bold",
  },
  discountText: {
    color: "#ffffff",
    fontSize: 20 * scale,
    fontFamily: "Poppins-Bold",
  },
});
