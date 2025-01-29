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
import AntDesign from "@expo/vector-icons/AntDesign";
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
import TagInput from "react-native-tag-input";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AdminEditImage = ({ navigation, route }: any) => {
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
  const [choosing, setChoosing] = useState(false);
  const [textPosition, setTextPosition] = useState({ x: 10, y: 10 });
  const [textDimensions, setTextDimensions] = useState({ width: 0, height: 0 });
  const [uploadFlag, setUploadFlag] = useState(false);
  const [title, setTitle] = useState("");
  const imageRef = useRef(null); // Reference to the image for getting its dimensions
  const viewShotRef = useRef(null); // Reference to ViewShot for capturing the screen

  // Position Of Logo and Photo
  const [logoImage, setLogoImage] = useState(false);
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });
  const [logoSize, setLogoSize] = useState({ width: 200, height: 200 });

  const [photoImage, setPhotoImage] = useState(false);
  const [photoPosition, setPhotoPosition] = useState({ x: 0, y: 0 });
  const [photoSize, setPhotoSize] = useState({ width: 200, height: 200 });

  const [nameText, setNameText] = useState(false);
  const [namePosition, setNamePosition] = useState({ x: 0, y: 0 });
  const [nameDimensions, setNameDimensions] = useState({ width: 0, height: 0 });
  const [nameSize, setNameSize] = useState(20);

  const [businessText, setBusinessText] = useState(false);
  const [businessPosition, setBusinessPosition] = useState({ x: 0, y: 0 });
  const [businessDimensions, setBusinessDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [businessSize, setBusinessSize] = useState(20);

  const [websiteNameText, setWebsiteNameText] = useState(false);
  const [websiteNamePosition, setWebsiteNamePosition] = useState({
    x: 0,
    y: 0,
  });
  const [websiteNameDimensions, setWebsiteNameDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [websiteNameSize, setWebsiteNameSize] = useState(20);

  const [phoneNumberText, setPhoneNumberText] = useState(false);
  const [phoneNumberPosition, setPhoneNumberPosition] = useState({
    x: 0,
    y: 0,
  });
  const [phoneNumberDimensions, setPhoneNumberDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [phoneNumberSize, setPhoneNumberSize] = useState(20);

  const [emailText, setEmailText] = useState(false);
  const [emailPosition, setEmailPosition] = useState({ x: 0, y: 0 });
  const [emailDimensions, setEmailDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [emailSize, setEmailSize] = useState(20);

  const [dropDownTag, setDropDownTag] = useState(true);
  const [dropDownLTag, setDropDownLTag] = useState(true);

  const [finalImg, setfinalImg] = useState("");

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

  const throttledSetTextPosition = throttle((newX: any, newY: any) => {
    setTextPosition({ x: newX, y: newY });
  }, 30);

  const throttledSetNamePosition = throttle((newX: any, newY: any) => {
    setNamePosition({ x: newX, y: newY });
  }, 30);

  const throttledSetBusinessPosition = throttle((newX: any, newY: any) => {
    setBusinessPosition({ x: newX, y: newY });
  }, 30);

  const throttledSetWebsiteNamePosition = throttle((newX: any, newY: any) => {
    setWebsiteNamePosition({ x: newX, y: newY });
  }, 30);

  const throttledSetPhoneNumberPosition = throttle((newX: any, newY: any) => {
    setPhoneNumberPosition({ x: newX, y: newY });
  }, 30);

  const throttledSetEmailPosition = throttle((newX: any, newY: any) => {
    setEmailPosition({ x: newX, y: newY });
  }, 30);

  useEffect(() => {
    if (image) {
      Image.getSize(image, (width, height) => {
        setImageDimensions({ width, height });
      });
    }
  }, [image]);

  const handleDownload = async () => {
    try {
      const uri = await captureRef(viewShotRef, {
        format: "png",
        quality: 1,
      });
      const newUri = `${FileSystem.documentDirectory}edited_image.png`;
      console.log(newUri);
      await FileSystem.moveAsync({
        from: uri,
        to: newUri,
      });
      // Store the new URI in a variable for further use
      const savedImageUri = newUri;

      // Return the image URI or perform further operations here
      return savedImageUri;
    } catch (error) {
      console.error("Error capturing and sharing image:", error);
    }
  };
  const [tags, setTags] = useState([]);
  const [tagsInputValue, setTagsInputValue] = useState("");

  /* const handleUpload = async () => {
    try {
      console.log("Logo");
      console.log(logoPosition);
      console.log(logoImage);
      console.log(logoSize);
      console.log("Photo");
      console.log(photoPosition);
      console.log(photoImage);
      console.log(photoSize);
      console.log("Name");
      console.log(nameText);
      console.log(namePosition);
      console.log(nameDimensions);
      console.log(nameSize);
      console.log("Business");
      console.log(businessText);
      console.log(businessPosition);
      console.log(businessDimensions);
      console.log(businessSize);
      console.log("Website");
      console.log(websiteNameText);
      console.log(websiteNamePosition);
      console.log(websiteNameDimensions);
      console.log(websiteNameSize);
      console.log("Phone Number");
      console.log(phoneNumberText);
      console.log(phoneNumberPosition);
      console.log(phoneNumberDimensions);
      console.log(phoneNumberSize);
      console.log("Email");
      console.log(emailText);
      console.log(emailPosition);
      console.log(emailDimensions);
      console.log(emailSize);
      console.log("BackGround Image");
      console.log(image);



      try {
        const uri = await captureRef(viewShotRef, {
          format: "png",
          quality: 1,
        });
        const newUri = `${FileSystem.documentDirectory}edited_image.png`;
        console.log(newUri);
        await FileSystem.moveAsync({
          from: uri,
          to: newUri,
        });
        // Store the new URI in a variable for further use
        setfinalImg(newUri)
        console.log("savedImageUri "+newUri)
        // Return the image URI or perform further operations here
        
      } catch (error) {
        console.error("Error capturing and sharing image:", error);
      }

      
      
      const authToken = await AsyncStorage.getItem("authToken");
      const formData = new FormData();


      const logoUriParts = finalImg.split(".");
      const logoExtension = logoUriParts[logoUriParts.length - 1].toLowerCase();
      const logoType = logoExtension === "jpg" || logoExtension === "jpeg" 
        ? "image/jpeg" 
        : logoExtension === "png"
        ? "image/png"
        : `image/${logoExtension}`;
      formData.append("templetImage", {
        uri: finalImg,
        type: logoType,
        name: `logo.${logoExtension}`,
      });
      console.log("Logo MIME type:", logoType);

      formData.append("title",title);
      console.log(tags)
      formData.append("category",tags);
      const response = axios.post(
        "https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/templets/addtemplet",
        {},{
          headers:{
            "auth-token":authToken
          }
        }
      );
    } catch (error) {
      console.error("Error capturing and sharing image:", error);
    }
  }; */

  const predefinedTags = ["Birthday", "Jokes"];
  const predefinedLanguageTags = ["English", "Marathi", "Hindi", "Gujrati"];

  const handleUpload = async () => {
    try {
      /* console.log("Logo");
      console.log(logoPosition);
      console.log(logoImage);
      console.log(logoSize);
      console.log("Photo");
      console.log(photoPosition);
      console.log(photoImage);
      console.log(photoSize);
      console.log("Name");
      console.log(nameText);
      console.log(namePosition);
      console.log(nameDimensions);
      console.log(nameSize);
      console.log("Business");
      console.log(businessText);
      console.log(businessPosition);
      console.log(businessDimensions);
      console.log(businessSize);
      console.log("Website");
      console.log(websiteNameText);
      console.log(websiteNamePosition);
      console.log(websiteNameDimensions);
      console.log(websiteNameSize);
      console.log("Phone Number");
      console.log(phoneNumberText);
      console.log(phoneNumberPosition);
      console.log(phoneNumberDimensions);
      console.log(phoneNumberSize);
      console.log("Email");
      console.log(emailText);
      console.log(emailPosition);
      console.log(emailDimensions);
      console.log(emailSize);
      console.log("BackGround Image");
      console.log(image);
 */
      // Capture image and save it locally
      const uri = await captureRef(viewShotRef, {
        format: "png",
        quality: 1,
      });
      const newUri = `${FileSystem.documentDirectory}edited_image.png`;
      await FileSystem.moveAsync({ from: uri, to: newUri });

      // Update the final image state
      setfinalImg(newUri);

      const authToken = await AsyncStorage.getItem("authToken");
      if (!authToken) {
        throw new Error("Authentication token not found.");
      }

      // Create FormData for upload
      const formData = new FormData();
      const logoUriParts = newUri.split(".");
      const logoExtension = logoUriParts[logoUriParts.length - 1].toLowerCase();
      const logoType =
        logoExtension === "jpg" || logoExtension === "jpeg"
          ? "image/jpeg"
          : logoExtension === "png"
          ? "image/png"
          : `image/${logoExtension}`;

      formData.append("templetImage", {
        uri: newUri,
        type: logoType,
        name: `templet.${logoExtension}`,
      });

      formData.append("title", "teat1");
      formData.append("category", JSON.stringify(tags));
      formData.append("language", JSON.stringify(languageTags));
      formData.append(
        "logo",
        `{"present":${logoImage},"x":${logoPosition.x},"y":${logoPosition.y},"size":${logoSize.width}}`
      );
      formData.append(
        "photo",
        `{"present":${photoImage},"x":${photoPosition.x},"y":${photoPosition.y},"size":${photoSize.width}}`
      );
      formData.append(
        "name",
        `{"present":${nameText},"x":${namePosition.x},"y":${namePosition.y},"size":${nameSize},"height":${nameDimensions.height},"width":${nameDimensions.width}}`
      );
      formData.append(
        "businessName",
        `{"present":${businessText},"x":${businessPosition.x},"y":${businessPosition.y},"size":${businessSize},"height":${businessDimensions.height},"width":${businessDimensions.width}}`
      );
      formData.append(
        "websiteLink",
        `{"present":${websiteNameText},"x":${websiteNamePosition.x},"y":${websiteNamePosition.y},"size":${websiteNameSize},"height":${websiteNameDimensions.height},"width":${websiteNameDimensions.width}}`
      );
      formData.append(
        "phoneNo",
        `{"present":${phoneNumberText},"x":${phoneNumberPosition.x},"y":${phoneNumberPosition.y},"size":${phoneNumberSize},"height":${phoneNumberDimensions.height},"width":${phoneNumberDimensions.width}}`
      );
      formData.append(
        "email",
        `{"present":${emailText},"x":${emailPosition.x},"y":${emailPosition.y},"size":${emailSize},"height":${emailDimensions.height},"width":${emailDimensions.width}}`
      );

      console.log("formData", formData);
      // API call to upload
      const response = await axios.post(
        "https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/templets/addtemplet",
        formData,
        {
          headers: {
            "auth-token": authToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(
        "upload response-------------------------------------------------",
        response.data
      );

      // Handle server response
      if (response.status === 201) {
        Alert.alert("Success", "Image uploaded successfully!");
        navigation.replace("Library");
      } else {
        throw new Error("Failed to upload the image.");
      }
    } catch (error) {
      console.error("Error during upload:", error.message);
      Alert.alert("Error", "An error occurred while uploading the image.");
    }
  };

  const FontTab = React.memo(() => {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
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
                    setFontW(true);
                    setFontI(true);
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
                    setFontW(true);
                    setFontI(true);
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
                    setFontW(true);
                    setFontI(true);
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
                    setFontW(true);
                    setFontI(true);
                  }}
                  style={styles.fontView}
                >
                  <Text style={[styles.fontText]}>Select</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setFontFamily("Pressed");
                    setFontW(true);
                    setFontI(true);
                  }}
                  style={styles.fontView}
                >
                  <Text style={[styles.fontText]}>Select</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setFontFamily("Pressed");
                    setFontW(true);
                    setFontI(true);
                  }}
                  style={styles.fontView}
                >
                  <Text style={[styles.fontText]}>Select</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setFontFamily("Pressed");
                    setFontW(true);
                    setFontI(true);
                  }}
                  style={styles.fontView}
                >
                  <Text style={[styles.fontText]}>Select</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  });

  const BoxColorTab = () => {
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
              "rgba(255, 255, 255, 1)",
            ].map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => setFontColor(color)} // Apply color directly on press
                style={{
                  width: 35 * scale,
                  height: 35 * scale,
                  backgroundColor: color,
                  marginRight: 5 * scale,
                  borderWidth: 1,
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
                onPress={() => setFontColor(color)} // Apply color directly on press
                style={{
                  width: 35 * scale,
                  height: 35 * scale,
                  backgroundColor: color,
                  marginRight: 5 * scale,
                  borderWidth: 1,
                }}
              ></TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  };

  const AlignTab = () => {
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

  const namePanResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const newX = namePosition.x + gestureState.dx;
        const newY = namePosition.y + gestureState.dy;
        throttledSetNamePosition(newX, newY);
      },
      onPanResponderRelease: () => {},
    })
  ).current;
  const businessPanResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const newX = businessPosition.x + gestureState.dx;
        const newY = businessPosition.y + gestureState.dy;
        throttledSetBusinessPosition(newX, newY);
      },
      onPanResponderRelease: () => {},
    })
  ).current;
  const websiteNamePanResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const newX = websiteNamePosition.x + gestureState.dx;
        const newY = websiteNamePosition.y + gestureState.dy;
        throttledSetWebsiteNamePosition(newX, newY);
      },
      onPanResponderRelease: () => {},
    })
  ).current;
  const phoneNumberPanResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const newX = phoneNumberPosition.x + gestureState.dx;
        const newY = phoneNumberPosition.y + gestureState.dy;
        throttledSetPhoneNumberPosition(newX, newY);
      },
      onPanResponderRelease: () => {},
    })
  ).current;
  const emailPanResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const newX = emailPosition.x + gestureState.dx;
        const newY = emailPosition.y + gestureState.dy;
        throttledSetEmailPosition(newX, newY);
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  const addTag = () => {
    if (tagsInputValue.trim() && !tags.includes(tagsInputValue.trim())) {
      setTags([...tags, tagsInputValue.trim()]);
      setTagsInputValue("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const [languageTags, setLanguageTags] = useState([]);
  const [languageTagsInputValue, setLanguageTagsInputValue] = useState("");

  const languageAddTag = () => {
    if (
      languageTagsInputValue.trim() &&
      !languageTags.includes(languageTagsInputValue.trim())
    ) {
      setLanguageTags([...languageTags, languageTagsInputValue.trim()]);
      setLanguageTagsInputValue("");
    }
  };

  const languageRemoveTag = (languageTagToRemove) => {
    setLanguageTags(languageTags.filter((tag) => tag !== languageTagToRemove));
  };

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
          uploadFlag ? (
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
              <Feather name="check" size={24 * scale} color="black" />
              <Text style={{ fontSize: 14 * scale, paddingLeft: 8 * scale }}>
                Upload
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setUploadFlag(!uploadFlag);
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
              <Feather name="check" size={24 * scale} color="black" />
              <Text style={{ fontSize: 14 * scale, paddingLeft: 8 * scale }}>
                Done
              </Text>
            </TouchableOpacity>
          )
        ) : (
          <TouchableOpacity
            onPress={() => {
              setChoosing(true);
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

            {nameText ? (
              <Text
                {...namePanResponder.panHandlers}
                onLayout={(event) => {
                  const { width, height } = event.nativeEvent.layout;
                  setNameDimensions({ width, height });
                }}
                style={[
                  styles.textOverlay,
                  {
                    fontSize: nameSize,
                    color: "#000000",
                    left: namePosition.x,
                    top: namePosition.y,
                  },
                ]}
              >
                Your Name
              </Text>
            ) : null}

            {businessText ? (
              <Text
                {...businessPanResponder.panHandlers}
                onLayout={(event) => {
                  const { width, height } = event.nativeEvent.layout;
                  setBusinessDimensions({ width, height });
                }}
                style={[
                  styles.textOverlay,
                  {
                    fontSize: businessSize,
                    color: "#000000",
                    left: businessPosition.x,
                    top: businessPosition.y,
                  },
                ]}
              >
                Business Name
              </Text>
            ) : null}

            {websiteNameText ? (
              <Text
                {...websiteNamePanResponder.panHandlers}
                onLayout={(event) => {
                  const { width, height } = event.nativeEvent.layout;
                  setWebsiteNameDimensions({ width, height });
                }}
                style={[
                  styles.textOverlay,
                  {
                    fontSize: websiteNameSize,
                    color: "#000000",
                    left: websiteNamePosition.x,
                    top: websiteNamePosition.y,
                  },
                ]}
              >
                Website URL
              </Text>
            ) : null}

            {phoneNumberText ? (
              <Text
                {...phoneNumberPanResponder.panHandlers}
                onLayout={(event) => {
                  const { width, height } = event.nativeEvent.layout;
                  setPhoneNumberDimensions({ width, height });
                }}
                style={[
                  styles.textOverlay,
                  {
                    fontSize: phoneNumberSize,
                    color: "#000000",
                    left: phoneNumberPosition.x,
                    top: phoneNumberPosition.y,
                  },
                ]}
              >
                93568365412
              </Text>
            ) : null}

            {emailText ? (
              <Text
                {...emailPanResponder.panHandlers}
                onLayout={(event) => {
                  const { width, height } = event.nativeEvent.layout;
                  setEmailDimensions({ width, height });
                }}
                style={[
                  styles.textOverlay,
                  {
                    fontSize: emailSize,
                    color: "#000000",
                    left: emailPosition.x,
                    top: emailPosition.y,
                  },
                ]}
              >
                abc@gmail.com
              </Text>
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
          uploadFlag ? null : (
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
          )
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
          uploadFlag ? (
            <ScrollView>
              {/* Template Name Input */}
              <TextInput
                style={{
                  borderWidth: 1 * scale,
                  width: "80%",
                  borderRadius: 4 * scale,
                  paddingHorizontal: 10 * scale,
                  paddingVertical: 5 * scale,
                  marginTop: 10 * scale,
                  alignSelf: "center",
                  borderColor: "#6B737A",
                  marginBottom: 5 * scale,
                }}
                value={title}
                onChangeText={setTitle}
                placeholder="Name of template"
              />

              {/* Tag Section */}
              <View
                style={{
                  alignItems: "flex-start",
                  width: "80%",
                  alignSelf: "center",
                  marginTop: 10 * scale,
                  borderWidth: 1 * scale,
                  paddingHorizontal: 10 * scale,
                  paddingVertical: 10 * scale,
                  borderRadius: 4 * scale,
                  borderColor: "#6B737A",
                  marginBottom: 5 * scale,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  {dropDownTag ? (
                    <TextInput
                      style={{
                        flex: 1,
                        paddingRight: 100 * scale,
                        paddingVertical: 6 * scale,
                      }}
                      placeholder="Type Here"
                      value={tagsInputValue}
                      onChangeText={setTagsInputValue}
                      onSubmitEditing={addTag}
                    />
                  ) : null}
                  <TouchableOpacity
                    onPress={() => setDropDownTag(!dropDownTag)}
                  >
                    <AntDesign
                      name={dropDownTag ? "caretup" : "caretdown"}
                      size={14 * scale}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>

                {/* Display Selected Tags */}
                <View>
                  {tags.map((tag, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => removeTag(tag)}
                    >
                      <Text style={{ fontSize: 12 * scale }}>{tag}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text
                  style={{
                    fontSize: 12 * scale,
                    textDecorationLine: "underline",
                  }}
                >
                  Suggestions Tags
                </Text>
                {/* Suggested Predefined Tags */}
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginTop: 10,
                  }}
                >
                  {predefinedTags.map((tag, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        if (!tags.includes(tag)) {
                          setTags([...tags, tag]);
                        }
                      }}
                      style={{
                        backgroundColor: "#FF8017",
                        padding: 5 * scale,
                        borderRadius: 4 * scale,
                        margin: 3 * scale,
                      }}
                    >
                      <Text style={{ color: "white", fontSize: 12 * scale }}>
                        {tag}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity onPress={addTag}>
                  <Text style={{ color: "#FF8017", fontSize: 14 * scale }}>
                    Add tag
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Language Tag Section */}
              <View
                style={{
                  marginBottom: 16 * scale,
                  width: "80%",
                  alignSelf: "center",
                  marginTop: 10 * scale,
                  borderWidth: 1 * scale,
                  paddingHorizontal: 10 * scale,
                  paddingVertical: 10 * scale,
                  borderRadius: 4 * scale,
                  borderColor: "#6B737A",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  {dropDownLTag ? (
                    <TextInput
                      style={{
                        flex: 1,
                        padding: 8 * scale,
                      }}
                      placeholder="Add a Language tag"
                      value={languageTagsInputValue}
                      onChangeText={setLanguageTagsInputValue}
                      onSubmitEditing={languageAddTag}
                    />
                  ) : null}
                  <TouchableOpacity
                    onPress={() => setDropDownLTag(!dropDownLTag)}
                  >
                    <AntDesign
                      name={dropDownLTag ? "caretup" : "caretdown"}
                      size={14 * scale}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
                {/* Display Selected Language Tags */}
                <View>
                  {languageTags.map((tag, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => languageRemoveTag(tag)}
                    >
                      <Text style={{ fontSize: 14 * scale }}>{tag}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text
                  style={{
                    fontSize: 12 * scale,
                    textDecorationLine: "underline",
                  }}
                >
                  Suggestions Tags
                </Text>
                {/* Suggested Predefined Language Tags */}
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginTop: 10,
                  }}
                >
                  {predefinedLanguageTags.map((tag, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        if (!languageTags.includes(tag)) {
                          setLanguageTags([...languageTags, tag]);
                        }
                      }}
                      style={{
                        backgroundColor: "#FF8017",
                        padding: 5 * scale,
                        borderRadius: 4 * scale,
                        margin: 3 * scale,
                      }}
                    >
                      <Text style={{ color: "white", fontSize: 12 * scale }}>
                        {tag}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity onPress={languageAddTag}>
                  <Text style={{ color: "#FF8017", fontSize: 14 * scale }}>
                    Add tag
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          ) : (
            <Tab.Navigator
              screenOptions={{
                tabBarLabelStyle: {
                  fontSize: 10 * scale,
                  textTransform: "none",
                },
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
          )
        ) : (
          <ScrollView>
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
                      height: 25 * scale,
                      alignSelf: "center",
                      paddingHorizontal: 15 * scale,
                      borderRadius: 8 * scale,
                      justifyContent: "center",
                      marginHorizontal: 5 * scale,
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
                    <Text style={{ color: "#fff", fontSize: 16 * scale }}>
                      -
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      backgroundColor: "#007BFF",
                      height: 25 * scale,
                      alignSelf: "center",
                      paddingHorizontal: 15 * scale,
                      borderRadius: 8 * scale,
                      justifyContent: "center",
                      marginHorizontal: 5 * scale,
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
                    <Text style={{ color: "#fff", fontSize: 16 * scale }}>
                      +
                    </Text>
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
                      height: 25 * scale,
                      alignSelf: "center",
                      paddingHorizontal: 15 * scale,
                      borderRadius: 8 * scale,
                      justifyContent: "center",
                      marginHorizontal: 5 * scale,
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
                    <Text style={{ color: "#fff", fontSize: 16 * scale }}>
                      -
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      backgroundColor: "#007BFF",
                      height: 25 * scale,
                      alignSelf: "center",
                      paddingHorizontal: 15 * scale,
                      borderRadius: 8 * scale,
                      justifyContent: "center",
                      marginHorizontal: 5 * scale,
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
                    <Text style={{ color: "#fff", fontSize: 16 * scale }}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              {nameText ? (
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
                    Name :
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#007BFF",
                      height: 25 * scale,
                      alignSelf: "center",
                      paddingHorizontal: 15 * scale,
                      borderRadius: 8 * scale,
                      justifyContent: "center",
                      marginHorizontal: 5 * scale,
                    }}
                    onPress={() => {
                      // Decrease image size (min limit 50px)
                      if (nameSize > 20 * scale) {
                        setNameSize(
                          nameSize - 5 * scale // Decrease by 20
                        );
                      }
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 16 * scale }}>
                      -
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      backgroundColor: "#007BFF",
                      height: 25 * scale,
                      alignSelf: "center",
                      paddingHorizontal: 15 * scale,
                      borderRadius: 8 * scale,
                      justifyContent: "center",
                      marginHorizontal: 5 * scale,
                    }}
                    onPress={() => {
                      // Increase image size (max limit 400px)
                      if (nameSize < 100 * scale) {
                        setNameSize(
                          nameSize + 5 * scale // Increase width by 20
                        );
                      }
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 16 * scale }}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              {businessText ? (
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
                    Business :
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#007BFF",
                      height: 25 * scale,
                      alignSelf: "center",
                      paddingHorizontal: 15 * scale,
                      borderRadius: 8 * scale,
                      justifyContent: "center",
                      marginHorizontal: 5 * scale,
                    }}
                    onPress={() => {
                      // Decrease image size (min limit 50px)
                      if (businessSize > 20 * scale) {
                        setBusinessSize(
                          businessSize - 5 * scale // Decrease by 20
                        );
                      }
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 16 * scale }}>
                      -
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      backgroundColor: "#007BFF",
                      height: 25 * scale,
                      alignSelf: "center",
                      paddingHorizontal: 15 * scale,
                      borderRadius: 8 * scale,
                      justifyContent: "center",
                      marginHorizontal: 5 * scale,
                    }}
                    onPress={() => {
                      // Increase image size (max limit 400px)
                      if (businessSize < 100 * scale) {
                        setBusinessSize(
                          businessSize + 5 * scale // Increase width by 20
                        );
                      }
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 16 * scale }}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              {websiteNameText ? (
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
                    Website URL :
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#007BFF",
                      height: 25 * scale,
                      alignSelf: "center",
                      paddingHorizontal: 15 * scale,
                      borderRadius: 8 * scale,
                      justifyContent: "center",
                      marginHorizontal: 5 * scale,
                    }}
                    onPress={() => {
                      // Decrease image size (min limit 50px)
                      if (websiteNameSize > 20 * scale) {
                        setWebsiteNameSize(
                          websiteNameSize - 5 * scale // Decrease by 20
                        );
                      }
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 16 * scale }}>
                      -
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      backgroundColor: "#007BFF",
                      height: 25 * scale,
                      alignSelf: "center",
                      paddingHorizontal: 15 * scale,
                      borderRadius: 8 * scale,
                      justifyContent: "center",
                      marginHorizontal: 5 * scale,
                    }}
                    onPress={() => {
                      // Increase image size (max limit 400px)
                      if (websiteNameSize < 100 * scale) {
                        setWebsiteNameSize(
                          websiteNameSize + 5 * scale // Increase width by 20
                        );
                      }
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 16 * scale }}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              {phoneNumberText ? (
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
                    Phone Number :
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#007BFF",
                      height: 25 * scale,
                      alignSelf: "center",
                      paddingHorizontal: 15 * scale,
                      borderRadius: 8 * scale,
                      justifyContent: "center",
                      marginHorizontal: 5 * scale,
                    }}
                    onPress={() => {
                      // Decrease image size (min limit 50px)
                      if (phoneNumberSize > 20 * scale) {
                        setPhoneNumberSize(
                          phoneNumberSize - 5 * scale // Decrease by 20
                        );
                      }
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 16 * scale }}>
                      -
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      backgroundColor: "#007BFF",
                      height: 25 * scale,
                      alignSelf: "center",
                      paddingHorizontal: 15 * scale,
                      borderRadius: 8 * scale,
                      justifyContent: "center",
                      marginHorizontal: 5 * scale,
                    }}
                    onPress={() => {
                      // Increase image size (max limit 400px)
                      if (phoneNumberSize < 100 * scale) {
                        setPhoneNumberSize(
                          phoneNumberSize + 5 * scale // Increase width by 20
                        );
                      }
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 16 * scale }}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              {emailText ? (
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
                    Email :
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#007BFF",
                      height: 25 * scale,
                      alignSelf: "center",
                      paddingHorizontal: 15 * scale,
                      borderRadius: 8 * scale,
                      justifyContent: "center",
                      marginHorizontal: 5 * scale,
                    }}
                    onPress={() => {
                      // Decrease image size (min limit 50px)
                      if (emailSize > 20 * scale) {
                        setEmailSize(
                          emailSize - 5 * scale // Decrease by 20
                        );
                      }
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 16 * scale }}>
                      -
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      backgroundColor: "#007BFF",
                      height: 25 * scale,
                      alignSelf: "center",
                      paddingHorizontal: 15 * scale,
                      borderRadius: 8 * scale,
                      justifyContent: "center",
                      marginHorizontal: 5 * scale,
                    }}
                    onPress={() => {
                      // Increase image size (max limit 400px)
                      if (emailSize < 100 * scale) {
                        setEmailSize(
                          emailSize + 5 * scale // Increase width by 20
                        );
                      }
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 16 * scale }}>
                      +
                    </Text>
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
                  onPress={() => {
                    setNameText(!nameText);
                  }}
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
                  onPress={() => {
                    setBusinessText(!businessText);
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
                  <Text style={{ fontSize: 12 * scale }}>Business Name</Text>
                  <Entypo name="plus" size={15 * scale} color="#FF8017" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setWebsiteNameText(!websiteNameText);
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
                  <Text style={{ fontSize: 12 * scale }}>Website Link</Text>
                  <Entypo name="plus" size={15 * scale} color="#FF8017" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setPhoneNumberText(!phoneNumberText);
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
                  <Text style={{ fontSize: 12 * scale }}>Phone Number</Text>
                  <Entypo name="plus" size={15 * scale} color="#FF8017" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => {
                  setEmailText(!emailText);
                }}
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
          </ScrollView>
        )}
        {}
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
