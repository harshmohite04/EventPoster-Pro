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
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Entypo from "@expo/vector-icons/Entypo";
import WhatsAppLogo from "@/assets/icons/WhatsLogo";
import ProfilePhoto from "@/assets/icons/profilePhoto";
import Download from "@/assets/icons/download";
import Swipe from "@/assets/icons/swipe";

const { width, height } = Dimensions.get("window");
const scale = width / 320;



const Home = ({ navigation }) => {
  const [search, setSearch] = useState("");
const [images,setImages]=useState([])
  const [modalVisible, setModalVisible] = useState(true);
  const profileClicked = () => {
    navigation.navigate("Profile");
  };
  useEffect(() => {
    setImages([
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
    ]);
  }, []);

  const renderItem = ({ item }) => (
    <View style={[styles.imageContainer, { height, width }]}>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Swipe Up for more</Text>
            <Swipe size={80 * scale} />
            <Text style={styles.modalText}>Just like Instagram</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Image source={{ uri: item.url }} style={styles.image} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => console.log("share to WhatsApp")}
          style={styles.shareButton}
        >
          <Text style={styles.shareButtonText}>Share</Text>
          <WhatsAppLogo size={20 * scale} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log("Download pressed")}
          style={styles.downloadButton}
        >
          <Download size={20 * scale} />
          <Text style={styles.downloadButtonText}>Download</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flex1}>
        <View style={styles.header}>
          <View style={styles.search}>
            <EvilIcons name="search" size={20 * scale} color="black" />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search"
              placeholderTextColor={"#49454F"}
              clearButtonMode="always"
              style={styles.searchInput}
            />
          </View>

          <TouchableOpacity
            onPress={() => navigation.push("UploadImage")}
            style={styles.createButton}
          >
            <Entypo name="plus" size={24} color="black" />
            <Text style={styles.createButtonText}>Create</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={profileClicked}>
          <ProfilePhoto size={35 * scale} />
        </TouchableOpacity>
      </View>

      <View style={styles.categoryContainer}>
        <View style={styles.categoryRow}>
          <Text style={styles.category}>All</Text>
          <Text style={styles.category}>Jokes</Text>
          <Text style={styles.category}>Morning</Text>
          <Text style={styles.category}>Birthday</Text>
          <Text style={styles.category}>Night</Text>
        </View>
      </View>

      {/* <ImageReel /> */}

      <FlatList
      data={images}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      snapToAlignment="start"
      decelerationRate="fast"
    />
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
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
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
  searchInput: {
    marginLeft: 5 * scale,
    fontSize: 14 * scale,
    paddingRight:25*scale,
  },
  createButton: {
    flexDirection: "row",
    backgroundColor: "#FF9A37",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10 * scale,
    paddingVertical: 5 * scale,
    borderRadius: 25 * scale,
  },
  createButtonText: {
    fontSize: 12 * scale,
    marginLeft: 5 * scale,
  },
  categoryContainer: {
    paddingVertical: 15 * scale,
    width: "100%",
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 5 * scale,
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
  imageContainer: {
    alignItems: "center",
    paddingTop: 10 * scale,
    paddingBottom: 50 * scale,
  },
  image: {
    width: "80%",
    height: "65%",
    resizeMode: "cover",
  },
  buttonContainer: {
    width: "100%",
  },
  shareButton: {
    backgroundColor: "#60D669",
    width: "90%",
    paddingVertical: 10 * scale,
    marginTop: 10 * scale,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 50 * scale,
    alignSelf: "center",
  },
  shareButtonText: {
    color: "#ffffff",
    fontSize: 15 * scale,
    paddingRight: 10 * scale,
  },
  downloadButton: {
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
  },
  downloadButtonText: {
    color: "#000000",
    fontSize: 15 * scale,
    paddingLeft: 10 * scale,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.155)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    padding: 30 * scale,
    borderRadius: 10 * scale,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18 * scale,
    marginBottom: 10 * scale,
  },
  closeButton: {
    marginTop: 20 * scale,
  },
  closeButtonText: {
    fontSize: 16 * scale,
    color: "#FF9A37",
  },
});
