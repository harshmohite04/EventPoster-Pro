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
import { useFonts, Kanit_400Regular, Kanit_500Medium, Kanit_700Bold } from '@expo-google-fonts/kanit';
import { FjallaOne_400Regular } from '@expo-google-fonts/fjalla-one';

const { width } = Dimensions.get("window");
const scale = width / 320;
const Tab = createMaterialTopTabNavigator();

const EditImage = ({ navigation, route }) => {
  let { image } = route?.params || {};
  const [text, setText] = useState("Your Text Here");
  const [fontSize, setFontSize] = useState(20);
  const [fontColor, setFontColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [textPosition, setTextPosition] = useState({ x: 10, y: 10 });
  const [textDimensions, setTextDimensions] = useState({ width: 0, height: 0 });
  const imageRef = useRef(null); // Reference to the image for getting its dimensions
  const viewShotRef = useRef(null); // Reference to ViewShot for capturing the screen
  
  useFonts({Kanit_400Regular, Kanit_500Medium, Kanit_700Bold,FjallaOne_400Regular})

  image =
    "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FEventPosterPro-471475fa-868c-45b2-8da3-eeebe21dea7a/ImagePicker/2bcc8ffe-01e0-40be-b879-662fef673535.jpeg";

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
  const okk = (text1) => {
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
              okk(text1);
              setFontSize(Number(fontSize1));
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

        <View style={{paddingVertical:10*scale,width:"95%",alignSelf:"center"}}>
          <Text>Select Font</Text>
          <View
            style={{ flexDirection: "row", width: "100%", height: 30 * scale }}
          >
            <View
              style={styles.fontView}
            >
              <Text style={[styles.fontText,{fontFamily:"Kanit_400Regular"}]}>Select</Text>
            </View>
            <View
              style={styles.fontView}
            >
              <Text style={[styles.fontText,{fontFamily:"FjallaOne_400Regular"}]}>Select</Text>
            </View>
            <View
              style={styles.fontView}
            >
              <Text style={styles.fontText}>Select</Text>
            </View>
            <View
              style={styles.fontView}
            >
              <Text style={styles.fontText}>Select</Text>
            </View>
          </View>
        </View>
        <TextInput
          style={styles.input}
          value={String(fontSize)}
          keyboardType="numeric"
          onChangeText={(value) => setFontSize(Number(value))}
          placeholder="Font Size"
        />
        <TextInput
          style={styles.input}
          value={fontColor}
          onChangeText={setFontColor}
          placeholder="Font Color (hex)"
        />
        <TextInput
          style={styles.input}
          value={backgroundColor}
          onChangeText={setBackgroundColor}
          placeholder="Background Color (hex)"
        />
      </ScrollView>
    );
  });

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
        <Feather name="arrow-left" size={24 * scale} color="black" />
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
                  backgroundColor,
                  left: textPosition.x,
                  top: textPosition.y,
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
        >
          <Tab.Screen
            name="Fonts"
            component={FontTab}
            options={{ tabBarLabel: "Font" }}
          />
          <Tab.Screen
            name="Boxcolor"
            component={() => <Text>Box Color</Text>}
            options={{ tabBarLabel: "Box Color" }}
          />
          <Tab.Screen
            name="Color"
            component={() => <Text>Color</Text>}
            options={{ tabBarLabel: "Color" }}
          />
          <Tab.Screen
            name="Align"
            component={() => <Text>Align</Text>}
            options={{ tabBarLabel: "Align" }}
          />
          <Tab.Screen
            name="Shadow"
            component={() => <Text>Shadow</Text>}
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
    paddingHorizontal:10*scale,
    paddingVertical:5*scale
  },
});
