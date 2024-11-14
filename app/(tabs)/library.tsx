import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
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
        <Ionicons name="eye-off-outline" size={19 * scale} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
        <AntDesign name="delete" size={19 * scale} color="black" />
      </TouchableOpacity>
    </View>
  </View>
);

const Library = ({navigation}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={{ flex: 1 }}>
        <View style={{ paddingBottom: 5 * scale }}>
          <Text
            style={{
              color: "#000000",
              fontSize: 20 * scale,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Library
          </Text>
        </View>
        <ScrollView>
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
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 20 * scale, 
            right: 20 * scale, 
            backgroundColor: "red",
            borderRadius: 50, 
            width: 50 * scale, 
            height: 50 * scale,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={()=>{
            navigation.push("UploadImage")
          }}
        >
          <Entypo name="plus" size={25 * scale} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Library;

const styles = StyleSheet.create({});
