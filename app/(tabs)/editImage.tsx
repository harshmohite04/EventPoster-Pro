import {
  Dimensions,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  SafeAreaView,
  PanResponder,
  TextInput
} from "react-native";
import React, { useState, useEffect,useRef } from "react";
const { width } = Dimensions.get("window");
const scale = width / 320;
import Feather from "@expo/vector-icons/Feather";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PanGestureHandler,State  } from "react-native-gesture-handler";
import Svg, { Text as SvgText } from "react-native-svg";
const Tab = createMaterialTopTabNavigator();


const EditImage = ({ navigation, route }) => {
  let { image } = route?.params || {};

  const [text, setText] = useState('Your Text Here');
  const [fontSize, setFontSize] = useState(20);
  const [fontColor, setFontColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const [textPosition, setTextPosition] = useState({ x: 10, y: 10 }); // Default position
  const [textDimensions, setTextDimensions] = useState({ width: 0, height: 0 }); // To store text dimensions
  const imageRef = useRef(null); // Reference to the image for getting its dimensions



  image =
    "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FEventPosterPro-471475fa-868c-45b2-8da3-eeebe21dea7a/ImagePicker/9dcf6f7a-c29c-4852-9e4a-8902c6247816.jpeg";
  console.log(image);

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


  
const FontTab = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Type your text"
      />
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
        value ={backgroundColor}
        onChangeText={setBackgroundColor}
        placeholder="Background Color (hex)"
      />
    </View>
  );
};
const BoxcolorTab = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Text>Hello this is BoxcolorTab</Text>
    </View>
  );
};

const ColorTab = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Text>This is ColorTab</Text>
    </View>
  );
};
const AlignTab = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Text>This is AlignTab</Text>
    </View>
  );
};
const Shadowtab = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Text>This is ShadowTab</Text>
    </View>
  );
};

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // Calculate new position
        const newX = textPosition.x + gestureState.dx;
        const newY = textPosition.y + gestureState.dy;

        // Get image dimensions
        const imageWidth = imageRef.current ? imageRef.current.width : 0;
        const imageHeight = imageRef.current ? imageRef.current.height : 0;

        // Check boundaries
        const boundedX = Math.min(Math.max(newX, 0), imageWidth - textDimensions.width);
        const boundedY = Math.min(Math.max(newY, 0), imageHeight - textDimensions.height);

        setTextPosition({
          x: boundedX,
          y: boundedY,
        });
      },
      onPanResponderRelease: () => {
        // Reset the dragging state if needed
      },
    })
  ).current;


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f7f7f7",
        justifyContent: "space-between",
      }}
    >
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
        {image && (
          <View style={{}}>
            <Image
            ref={imageRef}
            source={{ uri: image }}
            style={styles.image}
            onLayout={(event) => {
              const { width, height } = event.nativeEvent.layout;
              imageRef.current = { width, height }; // Store image dimensions
            }}
        
            />
             <Text
            {...panResponder.panHandlers}
            onLayout={(event) => {
              const { width, height } = event.nativeEvent.layout;
              setTextDimensions({ width, height }); // Store text dimensions
            }}
            style={[
              styles.textOverlay,
              {
                fontSize,
                color: fontColor,
                backgroundColor,
                left: textPosition.x,
                top: textPosition.y,
                position: 'absolute',
              },
            ]}
          >
            {text}
          </Text>
          </View>
        )}
        {!image && <Text>Image not selected </Text>}
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
            tabBarLabelStyle: { fontSize: 10 * scale, TextTransform: "none" },
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
            component={BoxcolorTab}
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
            component={Shadowtab}
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
    position: 'relative',
    marginVertical: 20,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  textOverlay: {
    position: 'absolute',
    padding: 5, // Padding to improve text visibility
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});
