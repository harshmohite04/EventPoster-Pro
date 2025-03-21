import {
  StyleSheet,
  Dimensions,
  Image,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Upload from "@/assets/icons/upload";
import { ScrollView } from "react-native-gesture-handler";
import { Templete, useTempletes } from "@/hooks/useTemplete";
import Edit from "@/assets/icons/edit";
import ImageCard from "@/components/ImageCard";
const { width } = Dimensions.get("window");
const scale = width / 320;

const UploadImage = ({ navigation }) => {
  const templetes = useTempletes();
  const [selectedTempletes, setSelectedTempletes] = useState<null | Templete>(
    null
  );

  let image ="../../assets/images/No_Image.png"

  
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,

      quality: 1,
    });

    console.log("result",result);
    if (!result.canceled) {
      console.log("This image was sent",result.assets[0].uri)
      image=result.assets[0].uri
      navigation.push("EditImage", { image: image });
    }
  };

  const editFlyer=()=>{
    navigation.navigate("EditFlyer")
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{flexDirection:"row",justifyContent:"space-around"}}>

      <TouchableOpacity
        style={{
          alignItems: "center",
          backgroundColor: "#FFEFD4",
          height: 140 * scale,
          width: 140 * scale,
          borderRadius: 200 * scale,
          justifyContent: "center",
          alignSelf: "center",
        }}
        onPress={pickImage}
        >
        <Upload size={20 * scale} />
        <View
          style={{
            marginTop: 10 * scale,
            alignItems: "center",
            justifyContent: "center",
          }}
          >
          <Text style={{ fontSize: 12 * scale, fontWeight: "400" }}>
            Upload your
          </Text>
          <Text style={{ fontSize: 12 * scale, fontWeight: "400" }}>
            desired image
          </Text>
        </View>
      </TouchableOpacity>
      {/* {image && <Image source={{ uri: image }} style={styles.image} />} */}
      {/* {image && <Text style={styles.selectedImageText}>Selected Image</Text>} */}
      {/* <TouchableOpacity
        style={{
          alignItems: "center",
          backgroundColor: "#FFEFD4",
          height: 140 * scale,
          width: 140 * scale,
          borderRadius: 85 * scale,
          justifyContent: "center",
          alignSelf: "center",
        }}
        onPress={editFlyer}
        >
        <Edit size={20 * scale} />
        <View
          style={{
            marginTop: 10 * scale,
            alignItems: "center",
            justifyContent: "center",
          }}
          >
          <Text style={{ fontSize: 12 * scale, fontWeight: "400" }}>
            Edit Flyer
          </Text>
          
        </View>
      </TouchableOpacity> */}
      
      </View>

      <Text
        style={{
          fontSize: 12 * scale,
          borderTopWidth: 1,
          textAlign: "center",
          paddingTop: 15 * scale,
          marginTop: 25 * scale,
          borderTopColor: "#F0F0F0",
        }}
      >
        OR Choose from these
      </Text>

      <View style={styles.icontainer}>
        <View style={styles.innerContainer}>
          <FlatList
            data={templetes.filter((_, index) => index % 2 === 0)}
            renderItem={({ item }) => (
              <ImageCard
                onPress={() => {
                  setSelectedTempletes(item);
                  console.log(item.url)
                  image=item.url
                  navigation.push("EditImage", { image: image });
                }}
                templete={item}
                />
              )}
              keyExtractor={(item) => item.name}
              />
        </View>
        <View style={styles.innerContainer}>
          <FlatList
            data={templetes.filter((_, index) => index % 2 === 1)}
            renderItem={({ item }) => (
              <ImageCard
              onPress={() => {
                setSelectedTempletes(item);
                image=item.url
                navigation.push("EditImage", { image: image });
                }}
                templete={item}
              />
            )}
            keyExtractor={(item) => item.name}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50 * scale,
    backgroundColor: "#ffffff",
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  selectedImageText: {
    textAlign: "center",
    fontSize: 16,
    marginVertical: 10,
    fontWeight: "500",
  },
  innerContainer: { flex: 1 },
  icontainer: { flexDirection: "row", flex: 1 },
});
