import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Download from "@/assets/icons/download";
const { width } = Dimensions.get("window");
import ShareLogo from "@/assets/icons/shareLogo";
const scale = width / 320;
const ProfileEditor = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        paddingVertical: 25 * scale,
        paddingHorizontal: 5 * scale,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <View style={{}}>
          <Image
            style={{ height: 170 * scale, width: 170 * scale }}
            source={require("../../assets/images/logo3.png")}
          ></Image>
        </View>
        <View style={{ justifyContent: "center" }}>
          <Text style={{ color: "#000000", fontSize: 14 * scale }}>
            Personlized with
          </Text>
          <Text
            style={{
              color: "#000000",
              fontSize: 14 * scale,
              fontWeight: "bold",
            }}
          >
            you name & photo
          </Text>
          <Text style={{ color: "#000000", fontSize: 14 * scale }}>
            (premium feature)
          </Text>
        </View>
      </View>

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
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 2,  
          elevation: 5
        }}
      >
        <View>
          <Text style={{ fontSize: 20 * scale }}>Monthy Plan</Text>
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

      <Text
        style={{
          fontSize: 12 * scale,
          color: "#000000",
          marginVertical: 15 * scale,
          marginTop: 20 * scale,
          paddingHorizontal: 5 * scale,
        }}
      >
        Share without your photo(free)
      </Text>





      <View style={{ flexDirection: "row" , paddingHorizontal: 10 * scale,}}>
        <Image
          style={{ width: 150 * scale, height: 150 * 1.15 * scale }}
          source={require("../../assets/images/logo4.png")}
        ></Image>

        <View style={{ width: "55%", alignItems: "center" ,justifyContent:"center"}}>
          <TouchableOpacity
            style={{
              backgroundColor: "#ffffff",
              paddingVertical: 8 * scale,
              paddingHorizontal: 20 * scale,
              flexDirection: "row",
              borderRadius: 25 * scale,
              justifyContent: "space-around",
              alignItems: "center",
              width: "80%",
              borderWidth: 1,
              borderColor: "#FF9A37",
            }}
          >
            <Text style={{ color: "#000000", fontSize: 15 * scale }}>
              Share
            </Text>
            <ShareLogo size={20 * scale} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#FF9A37",
              paddingVertical: 8 * scale,
              paddingHorizontal: 20 * scale,
              flexDirection: "row",
              borderRadius: 25 * scale,
              alignItems: "center",
              width: "80%",
              justifyContent: "space-around",
              marginTop:10*scale
            }}
          >
            <Download size={20 * scale} />
            <Text style={{ color: "#000000", fontSize: 15 * scale }}>
              Download
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileEditor;

const styles = StyleSheet.create({});
