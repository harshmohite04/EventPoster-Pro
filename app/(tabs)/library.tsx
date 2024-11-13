import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
const { width } = Dimensions.get("window");
const scale = width / 320;

const DATA = [
  {
    id: "1",
    imageUrl:
      "https://ideogram.ai/assets/progressive-image/balanced/response/jcV_Ea1sQga0NYL0jPyUYQ",
  },
  {
    id: "2",
    imageUrl:
      "https://ideogram.ai/assets/image/lossless/response/A7eOEfrLRdK8gZI88L3Yjw",
  },
  {
    id: "3",
    imageUrl:
      "https://ideogram.ai/assets/progressive-image/balanced/response/d6I5TyfcRYy8Pb_MSEjAQw",
  },
  {
    id: "5",
    imageUrl:
      "https://ideogram.ai/assets/progressive-image/balanced/response/mZKT1ae5SPWexGn5OTnOWQ",
  },
  {
    id: "6",
    imageUrl:
      "https://ideogram.ai/assets/progressive-image/balanced/response/2T3vLk22TZiHRo2ROTUH6A",
  },
  {
    id: "1",
    imageUrl:
      "https://ideogram.ai/assets/progressive-image/balanced/response/jcV_Ea1sQga0NYL0jPyUYQ",
  },
  {
    id: "2",
    imageUrl:
      "https://ideogram.ai/assets/image/lossless/response/A7eOEfrLRdK8gZI88L3Yjw",
  },
  {
    id: "3",
    imageUrl:
      "https://ideogram.ai/assets/progressive-image/balanced/response/d6I5TyfcRYy8Pb_MSEjAQw",
  },
  {
    id: "5",
    imageUrl:
      "https://ideogram.ai/assets/progressive-image/balanced/response/mZKT1ae5SPWexGn5OTnOWQ",
  },
  {
    id: "6",
    imageUrl:
      "https://ideogram.ai/assets/progressive-image/balanced/response/2T3vLk22TZiHRo2ROTUH6A",
  },
  {
    id: "1",
    imageUrl:
      "https://ideogram.ai/assets/progressive-image/balanced/response/jcV_Ea1sQga0NYL0jPyUYQ",
  },
  {
    id: "2",
    imageUrl:
      "https://ideogram.ai/assets/image/lossless/response/A7eOEfrLRdK8gZI88L3Yjw",
  },
  {
    id: "3",
    imageUrl:
      "https://ideogram.ai/assets/progressive-image/balanced/response/d6I5TyfcRYy8Pb_MSEjAQw",
  },
  {
    id: "5",
    imageUrl:
      "https://ideogram.ai/assets/progressive-image/balanced/response/mZKT1ae5SPWexGn5OTnOWQ",
  },
  {
    id: "6",
    imageUrl:
      "https://ideogram.ai/assets/progressive-image/balanced/response/2T3vLk22TZiHRo2ROTUH6A",
  },
];

type ItemProps = { imageUrl: string };
const Item = ({ imageUrl }: ItemProps) => (
  <View
    style={{
      alignItems: "center",
      backgroundColor: "rgb(255, 255, 200)",
      marginHorizontal: 2 * scale,
      paddingBottom: 8 * scale,
      borderBottomRightRadius: 20 * scale,
      borderBottomLeftRadius: 20 * scale,
      marginVertical: 5 * scale,
    }}
  >
    <Image
      source={{ uri: imageUrl }}
      style={{
        width: 100 * scale,
        height: 100 * scale,
        borderBottomRightRadius: 20 * scale,
        borderBottomLeftRadius: 20 * scale,
      }}
    />
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "70%",
        marginTop: 8 * scale,
      }}
    >
      <TouchableOpacity>
        <Ionicons name="eye-off-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
        <AntDesign name="delete" size={24} color="black" />
      </TouchableOpacity>
    </View>
  </View>
);

const Library = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView>
        <Text
          style={{
            color: "#000000",
            fontSize: 15 * scale,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Library
        </Text>
        <View style={{ flexDirection: "row" }}>
          <FlatList
            data={DATA.filter((_, index) => index % 3 === 0)}
            renderItem={({ item }) => <Item imageUrl={item.imageUrl} />}
            keyExtractor={(item) => item.id}
          />
          <FlatList
            data={DATA.filter((_, index) => index % 3 === 1)}
            renderItem={({ item }) => <Item imageUrl={item.imageUrl} />}
            keyExtractor={(item) => item.id}
          />
          <FlatList
            data={DATA.filter((_, index) => index % 3 === 2)}
            renderItem={({ item }) => <Item imageUrl={item.imageUrl} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Library;

const styles = StyleSheet.create({});
