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
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import ViewShot, { captureRef } from "react-native-view-shot";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import Feather from "@expo/vector-icons/Feather";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  useFonts,
  Kanit_400Regular,
  Kanit_500Medium,
  Kanit_700Bold,
} from "@expo-google-fonts/kanit";
import { Fondamento_400Regular } from "@expo-google-fonts/fondamento";
import { FjallaOne_400Regular } from "@expo-google-fonts/fjalla-one";
import { PinchGestureHandler } from "react-native-gesture-handler";
import LeftAlign from "@/assets/icons/left-align";
import RightAlign from "@/assets/icons/right-align";
import CenterAlign from "@/assets/icons/center-align";
import Entypo from "@expo/vector-icons/Entypo";
import SkipLogo from "@/assets/icons/skip";
const { width } = Dimensions.get("window");
const scale = width / 320;
const Tab = createMaterialTopTabNavigator();
import { throttle } from "lodash";
import Slider from "@react-native-community/slider";

const AdminEditImage = ({ navigation, route }) => {
  let { image } = route?.params || {};
  // let image =
  // "https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg";
  const [fontW, setFontW] = useState(true);
  const [fontI, setFontI] = useState(true);
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
  const [choosing, setChoosing] = useState(0);
  const [textPosition, setTextPosition] = useState({ x: 10, y: 10 });
  const [textDimensions, setTextDimensions] = useState({ width: 0, height: 0 });
  
  const imageRef = useRef(null); // Reference to the image for getting its dimensions
  const viewShotRef = useRef(null); // Reference to ViewShot for capturing the screen
  
  // Position Of Logo and Photo
  const [logoImage, setLogoImage] = useState(false);
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });
  const [logoSize, setLogoSize] = useState({ width: 200, height: 200 });
  
  const [photoImage, setPhotoImage] = useState(false);
  const [photoPosition, setPhotoPosition] = useState({ x: 0, y: 0 });
  const [photoSize, setPhotoSize] = useState({ width: 200, height: 200 });

  useFonts({
    Kanit_400Regular,
    Kanit_500Medium,
    Kanit_700Bold,
    FjallaOne_400Regular,
    Fondamento_400Regular,
  });

  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const throttledSetTextPosition = throttle((newX, newY) => {
    setTextPosition({ x: newX, y: newY });
  }, 16);

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

  const handleUpload = async () => {
    try {
      console.log(logoPosition);
      console.log(photoPosition);
      console.log(image);
    } catch (error) {
      console.error("Error capturing and sharing image:", error);
    }
  };

  const Features = () => {
    return (
      <View style={{ backgroundColor: "#ffffff", flex: 1 }}>
        <Text>Features</Text>
      </View>
    );
  };

  const FontTab = React.memo(() => {
    const [text1, setText1] = useState(text);
    const [fontSize1, setFontSize1] = useState(20);
    const [fontFamily1, setFontFamily1] = useState("");

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              paddingVertical: 5 * scale,
              paddingHorizontal: 5 * scale,
              marginTop: 15 * scale,
            }}
          ></View>
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
                onPress={() => {
                  setFontW(!fontW);
                  console.log("Bold");
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
                onPress={() => {
                  setFontI(!fontI);
                }}
              >
                ITALIC
              </Text>
            </View>
          </View>
          <Slider
            style={{ width: "80%", height: 40 * scale, alignSelf: "center" }}
            onValueChange={(value) => {
              setFontSize(Math.round(value));
            }}
            value={fontSize}
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
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setFontFamily("Kanit_400Regular");
                  }}
                  style={styles.fontView}
                >
                  <Text
                    style={[
                      styles.fontText,
                      { fontFamily: "Kanit_400Regular" },
                    ]}
                  >
                    Select
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setFontFamily("FjallaOne_400Regular");
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
                    setFontFamily("Fondamento_400Regular");
                  }}
                  style={styles.fontView}
                >
                  <Text
                    style={[
                      styles.fontText,
                      { fontFamily: "Fondamento_400Regular" },
                    ]}
                  >
                    Select
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setFontFamily("Pressed");
                  }}
                  style={styles.fontView}
                >
                  <Text style={[styles.fontText]}>Select</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setFontFamily("Pressed");
                  }}
                  style={styles.fontView}
                >
                  <Text style={[styles.fontText]}>Select</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setFontFamily("Pressed");
                  }}
                  style={styles.fontView}
                >
                  <Text style={[styles.fontText]}>Select</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setFontFamily("Pressed");
                  }}
                  style={styles.fontView}
                >
                  <Text style={[styles.fontText]}>Select</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  });

  const BoxColorTab = () => {
    const [opacity1, setOpacity1] = useState(1);
    const [BgColor1, setBgColor1] = useState("rgba(0, 0, 0, 0)");
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          paddingVertical: 20 * scale,
          paddingLeft: 10 * scale,
        }}
      >
        <View>
          <Text style={{}}>Opacity</Text>
          <Slider
            style={{ width: "80%", height: 40 * scale, alignSelf: "center" }}
            onValueChange={(value) => {
              setOpacity(Number(value.toFixed(1)));
            }}
            value={opacity}
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
                setBgColor("rgba(0, 0, 0, 0)");
              }}
              style={{
                width: 35 * scale,
                height: 35 * scale,
                backgroundColor: "rgba(0, 0, 0, 0)",
                marginRight: 5 * scale,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SkipLogo size={20 * scale} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setBgColor("rgba(249, 255, 0, 1)");
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
                setBgColor("rgba(246, 203, 0, 1)");
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
                setBgColor("rgba(243, 140, 0, 1)");
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
                setBgColor("rgba(241, 73, 0, 1)");
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
                setBgColor("rgba(240, 0, 0, 1)");
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
                setBgColor("rgba(240, 0, 64, 1)");
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
                setBgColor("rgba(242, 0, 138, 1)");
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
                setBgColor("rgba(244, 0, 201, 1)");
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
                setBgColor("rgba(247, 0, 255, 1)");
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
                setBgColor("rgba(196, 0, 255, 1)");
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
                setBgColor("rgba(143, 0, 255, 1)");
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
                setBgColor("rgba(199, 255, 0, 1)");
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
                setBgColor("rgba(148, 255, 0, 1)");
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
                setBgColor("rgba(100, 255, 0, 1)");
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
                setBgColor("rgba(74, 255, 0, 1)");
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
                setBgColor("rgba(81, 255, 131, 1)");
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
                setBgColor("rgba(98, 255, 255, 1)");
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
                setBgColor("rgba(85, 196, 255, 1)");
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
                setBgColor("rgba(75, 131, 255, 1)");
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
                setBgColor("rgba(68, 44, 255, 1)");
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
                setBgColor("rgba(65, 0, 255, 1)");
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
                setBgColor("rgba(68, 44, 255, 1)");
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
      </ScrollView>
    );
  };

  const ColorTab = () => {
    const [fontColor1, setFontColor1] = useState("");

    // useEffect to apply the fontColor1 to the textColor whenever fontColor1 changes
    useEffect(() => {
      setFontColor(fontColor1);
    }, [fontColor1]); // Runs whenever fontColor1 changes

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
            {[
              "rgba(249, 255, 0, 1)",
              "rgba(246, 203, 0, 1)",
              "rgba(243, 140, 0, 1)",
              "rgba(241, 73, 0, 1)",
              "rgba(240, 0, 0, 1)",
              "rgba(240, 0, 64, 1)",
              "rgba(242, 0, 138, 1)",
              "rgba(244, 0, 201, 1)",
              "rgba(247, 0, 255, 1)",
              "rgba(196, 0, 255, 1)",
              "rgba(143, 0, 255, 1)",
            ].map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => setFontColor1(color)} // Apply color directly on press
                style={{
                  width: 35 * scale,
                  height: 35 * scale,
                  backgroundColor: color,
                  marginRight: 5 * scale,
                }}
              ></TouchableOpacity>
            ))}
          </ScrollView>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 10 * scale }}
          >
            {[
              "rgba(199, 255, 0, 1)",
              "rgba(148, 255, 0, 1)",
              "rgba(100, 255, 0, 1)",
              "rgba(74, 255, 0, 1)",
              "rgba(81, 255, 131, 1)",
              "rgba(98, 255, 255, 1)",
              "rgba(85, 196, 255, 1)",
              "rgba(75, 131, 255, 1)",
              "rgba(68, 44, 255, 1)",
              "rgba(65, 0, 255, 1)",
              "rgba(0, 0, 0, 255)",
            ].map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => setFontColor1(color)} // Apply color directly on press
                style={{
                  width: 35 * scale,
                  height: 35 * scale,
                  backgroundColor: color,
                  marginRight: 5 * scale,
                }}
              ></TouchableOpacity>
            ))}
          </ScrollView>
        </View>
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
          paddingHorizontal: 10 * scale,
        }}
      >
        <Text style={{ color: "#686868" }}>Line Spacing</Text>
        <Slider
          style={{ width: "80%", height: 40 * scale, alignSelf: "center" }}
          onValueChange={(value) => {
            setLineSpacing(Number(Math.round(value)));
            console.log(lineSpacing1);
          }}
          value={lineSpacing}
          minimumValue={70}
          maximumValue={150}
          minimumTrackTintColor="#FF9A37"
          maximumTrackTintColor="#DBDBDB"
        />
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity
            onPress={() => {
              setAlign("left");
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
              setAlign("center");
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
              setAlign("right");
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
            setShadow(Number(Math.round(value)));
            console.log(shadow1);
            console.log(shadow1);
          }}
          value={shadow}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#FF9A37"
          maximumTrackTintColor="#DBDBDB"
        />

        <View style={{ marginTop: 10 * scale }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              onPress={() => {
                setShadowColor("rgba(0, 0, 0, 0)");
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
                setShadowColor("rgba(249, 255, 0, 1)");
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
                setShadowColor("rgba(246, 203, 0, 1)");
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
                setShadowColor("rgba(243, 140, 0, 1)");
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
                setShadowColor("rgba(241, 73, 0, 1)");
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
                setShadowColor("rgba(240, 0, 0, 1)");
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
                setShadowColor("rgba(240, 0, 64, 1)");
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
                setShadowColor("rgba(242, 0, 138, 1)");
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
                setShadowColor("rgba(244, 0, 201, 1)");
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
                setShadowColor("rgba(247, 0, 255, 1)");
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
                setShadowColor("rgba(196, 0, 255, 1)");
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
                setShadowColor("rgba(143, 0, 255, 1)");
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
                setShadowColor("rgba(199, 255, 0, 1)");
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
                setShadowColor("rgba(148, 255, 0, 1)");
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
                setShadowColor("rgba(100, 255, 0, 1)");
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
                setShadowColor("rgba(74, 255, 0, 1)");
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
                setShadowColor("rgba(81, 255, 131, 1)");
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
                setShadowColor("rgba(98, 255, 255, 1)");
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
                setShadowColor("rgba(85, 196, 255, 1)");
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
                setShadowColor("rgba(75, 131, 255, 1)");
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
                setShadowColor("rgba(68, 44, 255, 1)");
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
                setShadowColor("rgba(65, 0, 255, 1)");
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
                setShadowColor("rgba(68, 44, 255, 1)");
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
                setShadowColor("rgba(0, 0, 0, 255)");
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
      </View>
    );
  };
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const newX = textPosition.x + gestureState.dx;
        const newY = textPosition.y + gestureState.dy;
        throttledSetTextPosition(newX, newY);
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  const LogoPanResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        // Record the current position when the gesture starts
        setLogoPosition({
          x: logoPosition.x + gestureState.dx,
          y: logoPosition.y + gestureState.dy,
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        const newX = logoPosition.x + gestureState.dx;
        const newY = logoPosition.y + gestureState.dy;

        // Optional: Check for bounds here to prevent dragging outside
        setLogoPosition({
          x: newX,
          y: newY,
        });
      },
      onPanResponderRelease: () => {
        // Can include logic for smooth stop or reset if necessary
      },
    })
  ).current;

  const PhotoPanResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        // Record the current position when the gesture starts
        setPhotoPosition({
          x: photoPosition.x + gestureState.dx,
          y: photoPosition.y + gestureState.dy,
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        const newX = photoPosition.x + gestureState.dx;
        const newY = photoPosition.y + gestureState.dy;

        // Optional: Check for bounds here to prevent dragging outside
        setPhotoPosition({
          x: newX,
          y: newY,
        });
      },
      onPanResponderRelease: () => {
        // Can include logic for smooth stop or reset if necessary
      },
    })
  ).current;

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
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
        <Text style={{ fontSize: 16 * scale }}>Add Placeholders</Text>
        {choosing ? (
          <TouchableOpacity
            onPress={handleUpload}
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
        ) : (
          <TouchableOpacity
            onPress={() => {
              setChoosing(1);
            }}
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
              Finish
            </Text>
          </TouchableOpacity>
        )}
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
            {logoImage ? (
              <PinchGestureHandler>
                <View
                  {...LogoPanResponder.panHandlers}
                  style={{
                    position: "absolute",
                    left: logoPosition.x,
                    top: logoPosition.y,
                    width: logoSize.width,
                    height: logoSize.height,
                  }}
                >
                  <Image
                    // source={{ uri: "https://www.svgrepo.com/show/497407/profile-circle.svg" }}
                    source={require("../../assets/images/profileIcon.png")}
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                    }}
                  />
                </View>
              </PinchGestureHandler>
            ) : null}

            {photoImage ? (
              <PinchGestureHandler>
                <View
                  {...PhotoPanResponder.panHandlers}
                  style={{
                    position: "absolute",
                    left: photoPosition.x,
                    top: photoPosition.y,
                    width: photoSize.width,
                    height: photoSize.height,
                  }}
                >
                  <Image
                    source={{
                      uri: "https://toolxox.com/images/result-circle-cropped.png",
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                    }}
                  />
                </View>
              </PinchGestureHandler>
            ) : null}

            {choosing ? (
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
                    fontWeight: fontW ? "100" : "bold",
                    fontStyle: fontI ? "normal" : "italic",
                  },
                ]}
              >
                {text}
              </Text>
            ) : null}
          </ViewShot>
        ) : (
          <Text>Image not selected</Text>
        )}

        {choosing ? (
          <TextInput
            style={{
              borderWidth: 1,
              width: "70%",
              borderRadius: 10 * scale,
              paddingHorizontal: 10 * scale,
              paddingVertical: 3 * scale,
              marginTop: 10 * scale,
              alignSelf: "center",
            }}
            value={text}
            onChangeText={setText}
            placeholder="Type your text"
          />
        ) : null}
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "#f7f7f7",
          borderTopRightRadius: 20 * scale,
          borderTopLeftRadius: 20 * scale,
        }}
      >
        {choosing ? (
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
        ) : (
          <View style={{ paddingHorizontal: 10 * scale }}>
            {logoImage ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 10 * scale,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    alignSelf: "center",
                    fontSize: 15 * scale,
                  }}
                >
                  Logo :
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#007BFF",
                    height:25*scale,
                    alignSelf:"center",
                    paddingHorizontal:15*scale,
                    borderRadius:8*scale,
                    justifyContent:"center",
                    marginHorizontal:5*scale
                  }}
                  onPress={() => {
                    // Decrease image size (min limit 50px)
                    if (
                      logoSize.width > 50 * scale &&
                      logoSize.height > 50 * scale
                    ) {
                      setLogoSize({
                        width: logoSize.width - 20 * scale, // Decrease width by 20
                        height: logoSize.height - 20 * scale, // Decrease height by 20
                      });
                    }
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 16 * scale }}>-</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#007BFF",
                    height:25*scale,
                    alignSelf:"center",
                    paddingHorizontal:15*scale,
                    borderRadius:8*scale,
                    justifyContent:"center",
                    marginHorizontal:5*scale
                  }}
                  onPress={() => {
                    // Increase image size (max limit 400px)
                    if (
                      logoSize.width < 400 * scale &&
                      logoSize.height < 400 * scale
                    ) {
                      setLogoSize({
                        width: logoSize.width + 20 * scale, // Increase width by 20
                        height: logoSize.height + 20 * scale, // Increase height by 20
                      });
                    }
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 16 * scale }}>+</Text>
                </TouchableOpacity>
              </View>
            ) : null}


{photoImage ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 10 * scale,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    alignSelf: "center",
                    fontSize: 15 * scale,
                  }}
                >
                  Photo :
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#007BFF",
                    height:25*scale,
                    alignSelf:"center",
                    paddingHorizontal:15*scale,
                    borderRadius:8*scale,
                    justifyContent:"center",
                    marginHorizontal:5*scale
                  }}
                  onPress={() => {
                    // Decrease image size (min limit 50px)
                    if (
                      photoSize.width > 50 * scale &&
                      photoSize.height > 50 * scale
                    ) {
                      setPhotoSize({
                        width: photoSize.width - 20 * scale, // Decrease width by 20
                        height: photoSize.height - 20 * scale, // Decrease height by 20
                      });
                    }
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 16 * scale }}>-</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#007BFF",
                    height:25*scale,
                    alignSelf:"center",
                    paddingHorizontal:15*scale,
                    borderRadius:8*scale,
                    justifyContent:"center",
                    marginHorizontal:5*scale
                  }}
                  onPress={() => {
                    // Increase image size (max limit 400px)
                    if (
                      photoSize.width < 400 * scale &&
                      photoSize.height < 400 * scale
                    ) {
                      setPhotoSize({
                        width: photoSize.width + 20 * scale, // Increase width by 20
                        height: photoSize.height + 20 * scale, // Increase height by 20
                      });
                    }
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 16 * scale }}>+</Text>
                </TouchableOpacity>
              </View>
            ) : null}


            <View style={{ flexDirection: "row", marginTop: 25 * scale }}>
              <TouchableOpacity
                onPress={() => {
                  setLogoImage(!logoImage);
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#FFEFD4",
                  paddingHorizontal: 15 * scale,
                  paddingVertical: 12 * scale,
                  borderRadius: 8 * scale,
                  width: "30%",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 12 * scale }}>Logo</Text>
                <Entypo name="plus" size={15 * scale} color="#FF8017" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPhotoImage(!photoImage);
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#FFEFD4",
                  paddingHorizontal: 15 * scale,
                  paddingVertical: 12 * scale,
                  borderRadius: 8 * scale,
                  marginLeft: 10 * scale,
                  width: "30%",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 12 * scale }}>Photo</Text>
                <Entypo name="plus" size={15 * scale} color="#FF8017" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#FFEFD4",
                  paddingHorizontal: 12 * scale,
                  paddingVertical: 12 * scale,
                  borderRadius: 8 * scale,
                  marginLeft: 10 * scale,
                  width: "30%",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 12 * scale }}>Name</Text>
                <Entypo name="plus" size={15 * scale} color="#FF8017" />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", marginTop: 18 * scale }}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#FFEFD4",
                  paddingHorizontal: 15 * scale,
                  paddingVertical: 12 * scale,
                  borderRadius: 8 * scale,
                  width: "30%",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 12 * scale }}>Business Name</Text>
                <Entypo name="plus" size={15 * scale} color="#FF8017" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#FFEFD4",
                  paddingHorizontal: 15 * scale,
                  paddingVertical: 12 * scale,
                  borderRadius: 8 * scale,
                  marginLeft: 10 * scale,
                  width: "30%",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 12 * scale }}>Website Link</Text>
                <Entypo name="plus" size={15 * scale} color="#FF8017" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#FFEFD4",
                  paddingHorizontal: 15 * scale,
                  paddingVertical: 12 * scale,
                  borderRadius: 8 * scale,
                  marginLeft: 10 * scale,
                  width: "30%",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 12 * scale }}>Phone Number</Text>
                <Entypo name="plus" size={15 * scale} color="#FF8017" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#FFEFD4",
                paddingHorizontal: 15 * scale,
                paddingVertical: 12 * scale,
                borderRadius: 8 * scale,
                marginTop: 18 * scale,
                width: "30%",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 12 * scale }}>Email</Text>
              <Entypo name="plus" size={15 * scale} color="#FF8017" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default AdminEditImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20 * scale,
  },
  imageContainer: {
    position: "relative",
    marginVertical: 20 * scale,
  },
  image: {
    width: "100%",
    height: 250 * scale,
    resizeMode: "contain",
  },
  textOverlay: {
    position: "absolute",
    padding: 5 * scale,
  },
  input: {
    height: 40 * scale,
    borderColor: "gray",
    borderWidth: 1 * scale,
    marginBottom: 10 * scale,
    padding: 10 * scale,
  },
  fontView: {
    borderWidth: 1,
    alignSelf: "center",
    marginLeft: 5 * scale,
    borderColor: "#FF9A37",
    marginTop: 5 * scale,
  },
  fontText: {
    textAlign: "center",
    paddingHorizontal: 10 * scale,
    paddingVertical: 15 * scale,
  },
});
