import {
  Dimensions,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  SafeAreaView,
  PanResponder,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import ViewShot, { captureRef } from "react-native-view-shot";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import Feather from "@expo/vector-icons/Feather";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Slider from "@react-native-community/slider";
import {
  useFonts,
  Kanit_400Regular,
  Kanit_500Medium,
  Kanit_700Bold,
} from "@expo-google-fonts/kanit";
import { FjallaOne_400Regular } from "@expo-google-fonts/fjalla-one";
import LeftAlign from "@/assets/icons/left-align";
import RightAlign from "@/assets/icons/right-align";
import CenterAlign from "@/assets/icons/center-align";
import SkipLogo from "@/assets/icons/skip";
const { width } = Dimensions.get("window");
const scale = width / 320;
const Tab = createMaterialTopTabNavigator();

const EditImage = ({ navigation, route }) => {
  let { image } = route?.params || {};
  const [text, setText] = useState("Your Text Here");
  const [fontSize, setFontSize] = useState(20);
  const [fontFamily, setFontFamily] = useState("");
  const [fontColor, setFontColor] = useState("#000000");
  const [opacity, setOpacity] = useState(1);
  const [BgColor, setBgColor] = useState("rgba(0, 0, 0, 0)");
  const [align, setAlign] = useState("left");
  const [lineSpacing, setLineSpacing] = useState();
  const [shadow, setShadow] = useState();
  const [shadowColor, setShadowColor] = useState();

  const [textPosition, setTextPosition] = useState({ x: 10, y: 10 });
  const [textDimensions, setTextDimensions] = useState({ width: 0, height: 0 });
  const imageRef = useRef(null); // Reference to the image for getting its dimensions
  const viewShotRef = useRef(null); // Reference to ViewShot for capturing the screen

  useFonts({
    Kanit_400Regular,
    Kanit_500Medium,
    Kanit_700Bold,
    FjallaOne_400Regular,
  });
  console.log("This image got", image);

  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (image) {
      Image.getSize(image, (width, height) => {
        setImageDimensions({ width, height });
      });
    }
  }, [image]);
  const ok = (text1) => {
    setText(text1);
  };
  const handleDownload = async () => {
    try {
      const uri = await captureRef(viewShotRef, {
        format: "png",
        quality: 1,
      });
      const newUri = `${FileSystem.documentDirectory}edited_image.png`;
      await FileSystem.moveAsync({
        from: uri,
        to: newUri,
      });
      await Sharing.shareAsync(newUri);
    } catch (error) {
      console.error("Error capturing and sharing image:", error);
    }
  };
  const FontTab = React.memo(() => {
    const [text1, setText1] = useState("");
    const [fontSize1, setFontSize1] = useState(20);
    const [fontFamily1, setFontFamily1] = useState("");
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: "#FFFFFF" }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            borderWidth: 1,
            paddingVertical: 5 * scale,
            paddingHorizontal: 5 * scale,
          }}
        >
          <TextInput
            style={{
              borderWidth: 1,
              width: "70%",
              borderRadius: 10 * scale,
              paddingHorizontal: 10 * scale,
            }}
            value={text1}
            onChangeText={setText1}
            placeholder="Type your text"
          />
          <TouchableOpacity
            style={{
              width: "10%",
              borderWidth: 1,
              borderRadius: 15 * scale,
              alignItems: "center",
            }}
            onPress={() => {
              ok(text1);
              setFontSize(Number(fontSize1));
              setFontFamily(fontFamily1);

              console.log("fontSize", fontSize);
              console.log(typeof fontSize);
            }}
          >
            <Text
              style={{
                paddingVertical: 3 * scale,
                textAlign: "center",
                fontSize: 15 * scale,
              }}
            >
              ok
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "90%",
            alignSelf: "center",
            marginTop: 10 * scale,
          }}
        >
          <Text>Text Size</Text>
          <View
            style={{
              flexDirection: "row",
              width: "30%",
              justifyContent: "space-around",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                backgroundColor: "#FFEFD4",
                color: "#9E380E",
                paddingVertical: 3 * scale,
                paddingHorizontal: 3 * scale,
              }}
            >
              BOLD
            </Text>
            <Text
              style={{
                backgroundColor: "#FFEFD4",
                color: "#9E380E",
                paddingVertical: 3 * scale,
                paddingHorizontal: 3 * scale,
                fontStyle: "italic",
              }}
            >
              ITALIC
            </Text>
          </View>
        </View>
        <Slider
          style={{ width: "80%", height: 40 * scale, alignSelf: "center" }}
          onValueChange={(value) => {
            setFontSize1(Math.round(value));
            console.log(fontSize1);
            console.log(fontSize);
          }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#FF9A37"
          maximumTrackTintColor="#DBDBDB"
        />

        <View
          style={{
            paddingVertical: 10 * scale,
            width: "95%",
            alignSelf: "center",
          }}
        >
          <Text>Select Font</Text>
          <View
            style={{ flexDirection: "row", width: "100%", height: 30 * scale }}
          >
            <TouchableOpacity
              onPress={() => {
                setFontFamily1("Kanit_400Regular");
              }}
              style={styles.fontView}
            >
              <Text
                style={[styles.fontText, { fontFamily: "Kanit_400Regular" }]}
              >
                Select
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFontFamily1("FjallaOne_400Regular");
              }}
              style={styles.fontView}
            >
              <Text
                style={[
                  styles.fontText,
                  { fontFamily: "FjallaOne_400Regular" },
                ]}
              >
                Select
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFontFamily1("Pressed");
              }}
              style={styles.fontView}
            >
              <Text style={styles.fontText}>Select</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFontFamily1("Pressed");
              }}
              style={styles.fontView}
            >
              <Text style={styles.fontText}>Select</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  });

  const BoxColorTab = () => {
    const [opacity1, setOpacity1] = useState(1);
    const [BgColor1, setBgColor1] = useState("rgba(0, 0, 0, 0)");
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "#ffffff" ,paddingVertical:20*scale,paddingLeft:10*scale}}>
        <View>
          <Text style={{}}>Opacity</Text>
          <Slider
            style={{ width: "80%", height: 40 * scale, alignSelf: "center" }}
            onValueChange={(value) => {
              setOpacity1(Number(value.toFixed(1)));
              console.log(opacity1);
              console.log(value.toFixed(1));
            }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FF9A37"
            maximumTrackTintColor="#DBDBDB"
          />
        </View>
        <View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              onPress={() => {
                setBgColor1("rgba(0, 0, 0, 0)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(0, 0, 0, 0)",
                marginRight: 5 * scale,
                justifyContent: "center",
                alignItems:"center"
              }}
            >
              <SkipLogo size={20*scale}/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setBgColor1("rgba(249, 255, 0, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(249, 255, 0, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setBgColor1("rgba(246, 203, 0, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(246, 203, 0, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setBgColor1("rgba(243, 140, 0, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(243, 140, 0, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setBgColor1("rgba(241, 73, 0, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(241, 73, 0, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setBgColor1("rgba(240, 0, 0, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(240, 0, 0, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setBgColor1("rgba(240, 0, 64, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(240, 0, 64, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setBgColor1("rgba(242, 0, 138, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(242, 0, 138, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setBgColor1("rgba(244, 0, 201, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(244, 0, 201, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setBgColor1("rgba(247, 0, 255, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(247, 0, 255, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setBgColor1("rgba(196, 0, 255, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(196, 0, 255, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setBgColor1("rgba(143, 0, 255, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(143, 0, 255, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
          </ScrollView>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 5 * scale }}
          >
            <TouchableOpacity
              onPress={() => {
                setBgColor1("rgba(199, 255, 0, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(199, 255, 0, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setBgColor1("rgba(148, 255, 0, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(148, 255, 0, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setBgColor1("rgba(100, 255, 0, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(100, 255, 0, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setBgColor1("rgba(74, 255, 0, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(74, 255, 0, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setBgColor1("rgba(81, 255, 131, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(81, 255, 131, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setBgColor1("rgba(98, 255, 255, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(98, 255, 255, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setBgColor1("rgba(85, 196, 255, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(85, 196, 255, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setBgColor1("rgba(75, 131, 255, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(75, 131, 255, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setBgColor1("rgba(68, 44, 255, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(68, 44, 255, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setBgColor1("rgba(65, 0, 255, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(65, 0, 255, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setBgColor1("rgba(68, 44, 255, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(68, 44, 255, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
          </ScrollView>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            alignSelf: "center",
            paddingVertical: 5 * scale,
            paddingHorizontal: 10 * scale,
            borderRadius: 5 * scale,
          }}
          onPress={() => {
            setOpacity(opacity1);
            setBgColor(BgColor1);
          }}
        >
          <Text>OK</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };
  const ColorTab = () => {
    const [fontColor1, setFontColor1] = useState("rgba(255, 255, 255, 255)");
    return (
      <View
        style={{
          paddingVertical: 20 * scale,
          backgroundColor: "#ffffff",
          flex: 1,
          paddingLeft: 10 * scale,
        }}
      >
        <View style={{ marginBottom: 15 * scale }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              onPress={() => {
                setFontColor1("rgba(255, 255, 255, 255)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(255, 255, 255, 255)",
                marginRight: 5 * scale,
                justifyContent: "center",
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFontColor1("rgba(249, 255, 0, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(249, 255, 0, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFontColor1("rgba(246, 203, 0, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(246, 203, 0, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFontColor1("rgba(243, 140, 0, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(243, 140, 0, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFontColor1("rgba(241, 73, 0, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(241, 73, 0, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFontColor1("rgba(240, 0, 0, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(240, 0, 0, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFontColor1("rgba(240, 0, 64, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(240, 0, 64, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFontColor1("rgba(242, 0, 138, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(242, 0, 138, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFontColor1("rgba(244, 0, 201, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(244, 0, 201, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFontColor1("rgba(247, 0, 255, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(247, 0, 255, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFontColor1("rgba(196, 0, 255, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(196, 0, 255, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFontColor1("rgba(143, 0, 255, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(143, 0, 255, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
          </ScrollView>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 5 * scale }}
          >
            <TouchableOpacity
              onPress={() => {
                setFontColor1("rgba(199, 255, 0, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(199, 255, 0, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFontColor1("rgba(148, 255, 0, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(148, 255, 0, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFontColor1("rgba(100, 255, 0, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(100, 255, 0, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFontColor1("rgba(74, 255, 0, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(74, 255, 0, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFontColor1("rgba(81, 255, 131, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(81, 255, 131, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFontColor1("rgba(98, 255, 255, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(98, 255, 255, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFontColor1("rgba(85, 196, 255, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(85, 196, 255, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFontColor1("rgba(75, 131, 255, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(75, 131, 255, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFontColor1("rgba(68, 44, 255, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(68, 44, 255, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFontColor1("rgba(65, 0, 255, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(65, 0, 255, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFontColor1("rgba(68, 44, 255, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(68, 44, 255, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFontColor1("rgba(0, 0, 0, 255)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(0, 0, 0, 255)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
          </ScrollView>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            alignSelf: "center",
            paddingVertical: 5 * scale,
            paddingHorizontal: 10 * scale,
            borderRadius: 5 * scale,
          }}
          onPress={() => {
            setFontColor(fontColor1);
          }}
        >
          <Text>Ok</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const AlignTab = () => {
    const [align1, setAlign1] = useState("");
    const [lineSpacing1, setLineSpacing1] = useState();
    return (
      <View
        style={{
          backgroundColor: "#ffffff",
          flex: 1,
          paddingVertical: 25 * scale,
        }}
      >
        <Text>Line Spacing</Text>
        <Slider
          style={{ width: "80%", height: 40 * scale, alignSelf: "center" }}
          onValueChange={(value) => {
            setLineSpacing1(Number(Math.round(value)));
            console.log(lineSpacing1);
          }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#FF9A37"
          maximumTrackTintColor="#DBDBDB"
        />
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity
            onPress={() => {
              setAlign1("left");
            }}
          >
            <View
              style={{
                borderWidth: 1.5 * scale,
                width: 60 * scale,
                height: 60 * scale,
                borderColor: "#FF9A37",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LeftAlign size={24 * scale} />
            </View>
            <Text style={{ textAlign: "center", fontSize: 15 * scale }}>
              Left
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setAlign1("center");
            }}
          >
            <View
              style={{
                borderWidth: 1.5 * scale,
                width: 60 * scale,
                height: 60 * scale,
                borderColor: "#FF9A37",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CenterAlign size={24 * scale} />
            </View>
            <Text style={{ textAlign: "center", fontSize: 15 * scale }}>
              Center
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setAlign1("right");
            }}
          >
            <View
              style={{
                borderWidth: 1.5 * scale,
                width: 60 * scale,
                height: 60 * scale,
                borderColor: "#FF9A37",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RightAlign size={24 * scale} />
            </View>
            <Text style={{ textAlign: "center", fontSize: 15 * scale }}>
              Right
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            alignItems: "center",
            marginTop: 10 * scale,
          }}
          onPress={() => {
            setAlign(align1);
            setLineSpacing(lineSpacing1);
          }}
        >
          <Text
            style={{
              paddingVertical: 5 * scale,
              paddingHorizontal: 10 * scale,
              backgroundColor: "red",
              borderRadius: 8 * scale,
            }}
          >
            OK
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const ShadowTab = () => {
    const [shadow1, setShadow1] = useState();
    const [shadowColor1, setShadowColor1] = useState();
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          paddingVertical: 15 * scale,
          paddingLeft: 10 * scale,
        }}
      >
        <Text>Shadow</Text>
        <Slider
          style={{ width: "80%", height: 40 * scale, alignSelf: "center" }}
          onValueChange={(value) => {
            setShadow1(Number(Math.round(value)));
            console.log(shadow1);
            console.log(shadow1);
          }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#FF9A37"
          maximumTrackTintColor="#DBDBDB"
        />

        <View style={{ marginTop: 10 * scale }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              onPress={() => {
                setShadowColor1("rgba(0, 0, 0, 0)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(255, 255, 255, 255)",
                marginRight: 5 * scale,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SkipLogo size={20 * scale} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShadowColor1("rgba(249, 255, 0, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(249, 255, 0, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShadowColor1("rgba(246, 203, 0, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(246, 203, 0, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShadowColor1("rgba(243, 140, 0, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(243, 140, 0, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShadowColor1("rgba(241, 73, 0, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(241, 73, 0, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShadowColor1("rgba(240, 0, 0, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(240, 0, 0, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShadowColor1("rgba(240, 0, 64, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(240, 0, 64, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShadowColor1("rgba(242, 0, 138, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(242, 0, 138, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShadowColor1("rgba(244, 0, 201, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(244, 0, 201, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShadowColor1("rgba(247, 0, 255, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(247, 0, 255, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShadowColor1("rgba(196, 0, 255, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(196, 0, 255, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShadowColor1("rgba(143, 0, 255, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(143, 0, 255, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
          </ScrollView>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 5 * scale }}
          >
            <TouchableOpacity
              onPress={() => {
                setShadowColor1("rgba(199, 255, 0, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(199, 255, 0, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShadowColor1("rgba(148, 255, 0, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(148, 255, 0, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShadowColor1("rgba(100, 255, 0, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(100, 255, 0, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShadowColor1("rgba(74, 255, 0, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(74, 255, 0, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShadowColor1("rgba(81, 255, 131, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(81, 255, 131, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShadowColor1("rgba(98, 255, 255, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(98, 255, 255, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShadowColor1("rgba(85, 196, 255, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(85, 196, 255, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShadowColor1("rgba(75, 131, 255, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(75, 131, 255, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShadowColor1("rgba(68, 44, 255, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(68, 44, 255, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShadowColor1("rgba(65, 0, 255, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(65, 0, 255, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShadowColor1("rgba(68, 44, 255, 1)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(68, 44, 255, 1)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShadowColor1("rgba(0, 0, 0, 255)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(0, 0, 0, 255)",
                marginRight: 5 * scale,
              }}
            ></TouchableOpacity>
          </ScrollView>
        </View>
        <TouchableOpacity
          style={{
            alignItems: "center",
            marginTop: 10 * scale,
          }}
          onPress={() => {
            setShadow(shadow1);
            setShadowColor(shadowColor1);
          }}
        >
          <Text
            style={{
              paddingVertical: 5 * scale,
              paddingHorizontal: 10 * scale,
              backgroundColor: "red",
              borderRadius: 8 * scale,
            }}
          >
            OK
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const newX = textPosition.x + gestureState.dx;
        const newY = textPosition.y + gestureState.dy;
        const imageWidth = imageRef.current ? imageRef.current.width : 0;
        const imageHeight = imageRef.current ? imageRef.current.height : 0;
        const boundedX = Math.min(
          Math.max(newX, 0),
          imageWidth - textDimensions.width
        );
        const boundedY = Math.min(
          Math.max(newY, 0),
          imageHeight - textDimensions.height
        );
        setTextPosition({
          x: boundedX,
          y: boundedY,
        });
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10 * scale,
          backgroundColor: "#FFFFFF",
          alignItems: "center",
          paddingVertical: 10 * scale,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Feather name="arrow-left" size={24 * scale} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDownload}
          style={{
            backgroundColor: "#FF9A37",
            flexDirection: "row",
            paddingHorizontal: 18 * scale,
            paddingVertical: 8 * scale,
            borderRadius: 28 * scale,
            alignItems: "center",
          }}
        >
          <Feather name="check" size={24} color="black" />
          <Text style={{ fontSize: 14 * scale, paddingLeft: 8 * scale }}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingVertical: 20 * scale }}>
        {image ? (
          <ViewShot ref={viewShotRef} style={{ alignItems: "center" }}>
            <Image
              ref={imageRef}
              source={{ uri: image }}
              style={styles.image}
              onLayout={(event) => {
                const { width, height } = event.nativeEvent.layout;
                imageRef.current = { width, height };
              }}
            />
            <Text
              {...panResponder.panHandlers}
              onLayout={(event) => {
                const { width, height } = event.nativeEvent.layout;
                setTextDimensions({ width, height });
              }}
              style={[
                styles.textOverlay,
                {
                  fontSize,
                  color: fontColor,
                  backgroundColor: BgColor,
                  left: textPosition.x,
                  top: textPosition.y,
                  fontFamily: fontFamily,
                  opacity: opacity,
                  textAlign: align,
                  lineHeight: lineSpacing,
                  textShadowColor: shadowColor,
                  textShadowOffset: { width: -1, height: 1 },
                  textShadowRadius: shadow,
                },
              ]}
            >
              {text}
            </Text>
          </ViewShot>
        ) : (
          <Text>Image not selected</Text>
        )}
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "#f7f7f7",
          borderTopRightRadius: 20 * scale,
          borderTopLeftRadius: 20 * scale,
        }}
      >
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: 10 * scale, textTransform: "none" },
            tabBarItemStyle: { width: 65 * scale },
            tabBarStyle: { backgroundColor: "#ffffff" },
          }}
          style={{
            borderTopLeftRadius: 20 * scale,
            borderTopRightRadius: 20 * scale,
          }}
          swipeEnabled={false}
        >
          <Tab.Screen
            name="Fonts"
            component={FontTab}
            options={{ tabBarLabel: "Font" }}
          />
          <Tab.Screen
            name="Boxcolor"
            component={BoxColorTab}
            options={{ tabBarLabel: "Box Color" }}
          />
          <Tab.Screen
            name="Color"
            component={ColorTab}
            options={{ tabBarLabel: "Color" }}
          />
          <Tab.Screen
            name="Align"
            component={AlignTab}
            options={{ tabBarLabel: "Align" }}
          />
          <Tab.Screen
            name="Shadow"
            component={ShadowTab}
            options={{ tabBarLabel: "Shadow" }}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

export default EditImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    position: "relative",
    marginVertical: 20,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  textOverlay: {
    position: "absolute",
    padding: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  fontView: {
    borderWidth: 1,
    alignSelf: "center",
    marginLeft: 5 * scale,
  },
  fontText: {
    textAlign: "center",
    paddingHorizontal: 10 * scale,
    paddingVertical: 5 * scale,
  },
});
