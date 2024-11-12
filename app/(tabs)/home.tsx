import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Image,
  FlatList,
  Modal,
} from "react-native";
import React, { useState } from "react";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Entypo from "@expo/vector-icons/Entypo";
const { width } = Dimensions.get("window");
const scale = width / 320;
import WhatsAppLogo from "@/assets/icons/WhatsLogo";
import ProfilePhoto from "@/assets/icons/profilePhoto";
import Upload from "@/assets/icons/upload";
import Download from "@/assets/icons/download";
import Swipe from "@/assets/icons/swipe";
const images = [
  {
    url: "https://ideogram.ai/assets/progressive-image/balanced/response/jcV_Ea1sQga0NYL0jPyUYQ",
    id: "1",
  },
  {
    url: "https://ideogram.ai/assets/image/lossless/response/A7eOEfrLRdK8gZI88L3Yjw",
    id: "2",
  },
  {
    url: "https://ideogram.ai/assets/progressive-image/balanced/response/d6I5TyfcRYy8Pb_MSEjAQw",
    id: "3",
  },
  {
    url: "https://ideogram.ai/assets/progressive-image/balanced/response/mZKT1ae5SPWexGn5OTnOWQ",
    id: "5",
  },
  {
    url: "https://ideogram.ai/assets/progressive-image/balanced/response/2T3vLk22TZiHRo2ROTUH6A",
    id: "6",
  },
  {
    url: "https://ideogram.ai/assets/progressive-image/balanced/response/POhRvFN5QRmud-vx75SUYQ",
    id: "7",
  },
  {
    url: "https://ideogram.ai/assets/progressive-image/balanced/response/H9kSy8zhR3-J16Jy-OeSKQ",
    id: "8",
  },
  {
    url: "https://ideogram.ai/assets/progressive-image/balanced/response/dxJM-M2cSvaceVnuURCJCA",
    id: "9",
  },
];

const ImageReel = () => {
  const { height, width } = Dimensions.get("window");
  const [modalVisible, setModalVisible] = useState(true);
  const renderItem = ({ item }) => (
    <View style={[styles.imageContainer, { height, width }]}>
      <Modal
        // animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
        style={{ justifyContent: "center", alignContent: "center" }}
      >
        <View
          style={{
            backgroundColor: "#FFF8ED",
            alignSelf: "center",
            justifyContent: "center",
            marginTop: 150 * scale,
            paddingVertical: 30 * scale,
            paddingHorizontal: 30 * scale,
            borderRadius: 10 * scale,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#000000",
              fontSize: 16 * scale,
              marginBottom: 10 * scale,
            }}
          >
            Swipe Up for more
          </Text>
          <Swipe size={80 * scale} />
          <Text
            style={{
              color: "#000000",
              fontSize: 16 * scale,
              marginTop: 10 * scale,
              marginBottom: 20 * scale,
            }}
          >
            Just like Instagram
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#FF8017",
              paddingHorizontal: 30 * scale,
              paddingVertical: 5 * scale,
              borderRadius: 25 * scale,
            }}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text
              style={{
                color: "#000000",
                fontSize: 16 * scale,
                textAlign: "center",
              }}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Image source={{ uri: item.url }} style={styles.image} />

      <View style={{ width: "100%" }}>
        <View
          style={{
            backgroundColor: "#60D669",
            width: "90%",
            paddingVertical: 10 * scale,
            marginTop: 10 * scale,
            flexDirection: "row",
            justifyContent: "center",
            borderRadius: 50 * scale,
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: 15 * scale,
              paddingRight: 10 * scale,
            }}
          >
            Share
          </Text>
          <WhatsAppLogo size={20 * scale} />
        </View>
        <View
          style={{
            backgroundColor: "#ffffff",
            width: "90%",
            paddingVertical: 10 * scale,
            marginTop: 10 * scale,
            flexDirection: "row",
            justifyContent: "center",
            borderRadius: 50 * scale,
            alignSelf: "center",
            borderWidth: 2,
            borderColor: "#FF9A37",
          }}
        >
          <Download size={20 * scale} />
          <Text
            style={{
              color: "#000000",
              fontSize: 15 * scale,
              paddingLeft: 10 * scale,
            }}
          >
            Download
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={images}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      snapToAlignment="start"
      decelerationRate="fast"
    />
  );
};

const Home = ({ navigation }) => {
  const [search, setSearch] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flex1}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <View style={styles.search}>
            <EvilIcons name="search" size={20 * scale} color="black" />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search"
              placeholderTextColor={"#49454F"}
              clearButtonMode="always"
              style={{ marginLeft: 5 * scale, fontSize: 14 * scale }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.push("UploadImage");
            }}
            style={{
              flexDirection: "row",
              backgroundColor: "#FF9A37",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 10 * scale,
              paddingVertical: 5 * scale,
              borderRadius: 25 * scale,
            }}
          >
            <Entypo name="plus" size={24} color="black" />
            <Text style={{ fontSize: 12 * scale, marginLeft: 5 * scale }}>
              Create
            </Text>
          </TouchableOpacity>
        </View>
        <ProfilePhoto size={35 * scale} />
      </View>

      <View
        style={{
          paddingVertical: 15 * scale,
          width: "100%",
        }}
      >
        <View
          style={{
            paddingHorizontal: 5 * scale,
            borderBottomColor: "#F0F0F0",
            borderBottomWidth: 1,
            paddingVertical: 10 * scale,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Text style={styles.category}>All</Text>
            <Text style={styles.category}>Jokes</Text>
            <Text style={styles.category}>Morning</Text>
            <Text style={styles.category}>Birthday</Text>
            <Text style={styles.category}>Birthday</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 5 * scale,
            }}
          >
            <Text style={styles.category}>Birthday</Text>
            <Text style={styles.category}>Jokes</Text>
            <Text style={styles.category}>Morning</Text>
            <Text style={styles.category}>Birthday</Text>
            <Text style={styles.category}>All</Text>
          </View>
        </View>
      </View>
      <View style={{}}>
        <ImageReel />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingVertical: 15 * scale,
  },
  flex1: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#F0F0F0",
    borderBottomWidth: 1,
    paddingHorizontal: 10 * scale,
    paddingBottom: 5 * scale,
  },
  search: {
    flexDirection: "row",
    backgroundColor: "#FFEFD4",
    width: "60%",
    borderRadius: 25 * scale,
    paddingHorizontal: 5 * scale,
    paddingVertical: 5 * scale,
    alignItems: "center",
  },

  imageContainer: {
    alignItems: "center",
    paddingTop: 10 * scale,
    paddingBottom: 50 * scale,
  },
  image: {
    width: "80%",
    height: "60%",
    resizeMode: "cover",
  },
  category: {
    color: "#000000",
    borderWidth: 1,
    borderColor: "#FF9A37",
    borderRadius: 25 * scale,
    paddingHorizontal: 8 * scale,
    paddingVertical: 2 * scale,
    fontSize: 12 * scale,
  },
});
