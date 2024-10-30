import {
  Dimensions,
  StyleSheet,
  Text as RNText,
  Image,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
const { width } = Dimensions.get("window");
const scale = width / 320;
import Feather from "@expo/vector-icons/Feather";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PanGestureHandler } from "react-native-gesture-handler";
import Svg ,{Text as SvgText}from "react-native-svg";
const Tab = createMaterialTopTabNavigator();

const DraggableText = ({ initialX, initialY, text, fontSize, color="#fff" }) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });

  const onGestureEvent = (event) => {
    setPosition({
      x: event.nativeEvent.translationX + initialX,
      y: event.nativeEvent.translationY + initialY,
    });
  };

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Svg style={{ position: "absolute", left: position.x, top: position.y }}>
        <SvgText
          fill={color}
          fontSize={fontSize}
          fontWeight="bold"
          x={50*scale}
          y={50*scale}
          textAnchor="middle"
        >
          {text}
        </SvgText>
      </Svg>
    </PanGestureHandler>
  );
};
const FontTab = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <RNText>Hello this is FontTab</RNText>
    </View>
  );
};
const BoxcolorTab = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <RNText>Hello this is BoxcolorTab</RNText>
    </View>
  );
};

const ColorTab = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <RNText>This is ColorTab</RNText>
    </View>
  );
};
const AlignTab = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <RNText>This is AlignTab</RNText>
    </View>
  );
};
const Shadowtab = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <RNText>This is ShadowTab</RNText>
    </View>
  );
};

const EditImage = ({ navigation, route }) => {
  let { image } = route?.params || {};
  image =
    "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FEventPosterPro-471475fa-868c-45b2-8da3-eeebe21dea7a/ImagePicker/9dcf6f7a-c29c-4852-9e4a-8902c6247816.jpeg";
  console.log(image);

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
          <RNText style={{ fontSize: 14 * scale, paddingLeft: 8 * scale }}>
            Done
          </RNText>
        </TouchableOpacity>
      </View>
      <View style={{ paddingVertical: 20 * scale }}>
        {image && (
          <View style={{}}>
            <Image
              source={{ uri: image }}
              style={{
                width: 300 * scale,
                height: 300 * scale,
                alignSelf: "center",
              }}
            />
            <DraggableText
              initialX={100}
              initialY={200}
              text="what"
              fontSize={24}
              color="red"
            />
          </View>
        )}
        {!image && <RNText>Image not selected</RNText>}
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
            tabBarLabelStyle: { fontSize: 10 * scale, RNTextTransform: "none" },
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

const styles = StyleSheet.create({});
