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
import { useTempletes } from "@/hooks/useTemplete";
import ImageCard from "@/components/ImageCard";

const { width } = Dimensions.get("window");
const scale = width / 320;

const UploadImage = () => {
  const templetes = useTempletes();
  const [selectedTempletes, setSelectedTempletes] = useState<null | Wallpaper>(
    null
  );

  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={{
          alignItems: "center",
          backgroundColor: "#FFEFD4",
          height: 170 * scale,
          width: 170 * scale,
          borderRadius: 85 * scale,
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
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {image && <Text style={styles.selectedImageText}>Selected Image</Text>}

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
