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
  ScrollView,
  Alert,
  RefreshControl,
  PermissionsAndroid,
  ActivityIndicator,
  Button,
  Platform
} from "react-native";
import React, { useEffect, useState } from "react";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Entypo from "@expo/vector-icons/Entypo";
import WhatsAppLogo from "@/assets/icons/WhatsLogo";
import ProfilePhoto from "@/assets/icons/profilePhoto";
import Download from "@/assets/icons/download";
import Swipe from "@/assets/icons/swipe";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { array } from "yup";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { CommonActions } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const scale = width / 320;

const Home = ({ navigation }: any) => {
  const [search, setSearch] = useState("");
  const [images, setImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const [isListEnd, setIsListEnd] = useState(false);  
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const profileClicked = () => {
    navigation.push("MainProfile");
  };

  const [userLogo, setUserLogo] = useState("");
  useEffect(() => {
    console.log("Hello");
    const apiCall = async () => {
      try {
        const authToken = await AsyncStorage.getItem("authToken");
        if (!authToken) {
          console.error("Auth Token not found");
          return;
        }
        const response = await axios.get(
          "https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/auth/getuser",
          {
            headers: {
              "auth-token": authToken,
            },
          }
        );
        console.log(authToken);
        console.log(response.data);
        setUserLogo(response.data.photo);
        console.log(response.data.name);
        console.log("Api");
      } catch (error) {
        console.log(error);
      }
    };
    apiCall();
  }, []);

  const handleCategoryPress = (name: string) => {
    setSelectedCategory(name);
  };

  const requestStoragePermission = async (imageUrl: string) => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);
      if (
        granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log("Storage permission granted");
        handleDownload(imageUrl);
      } else {
        console.log("Storage permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
   //console.log("Hello", imageUrl);
  };
  

  // Add this function to handle download
const handleDownload = async (imageUrl: string) => {
  {/*
  try {
    // Get the download path in the device storage (can be adjusted for your needs)
    const downloadPath = `${RNFS.DownloadDirectoryPath}/${imageUrl.split('/').pop()}`;
    console.log("Download Path:", downloadPath);
    
    // Start the download process
    const downloadOptions = {
      fromUrl: imageUrl,
      toFile: downloadPath,
    };

    const result = await RNFS.downloadFile(downloadOptions).promise;

    if (result.statusCode === 200) {
      Alert.alert('Download successful', 'Image has been downloaded to your device.');
    } else {
      Alert.alert('Download failed', 'There was an error downloading the image.');
    }
  } catch (error) {
    console.error('Download failed:', error);
    Alert.alert('Download failed', 'There was an error downloading the image.');
  }
    */}

    try {
      // Step 1: Request permission to access the media library (for iOS)
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'You need to grant media library permissions.');
        return;
      }
  
      // Step 2: Download the image from the URL
      const fileUri = FileSystem.documentDirectory + 'downloaded-image.jpg';
      const { uri } = await FileSystem.downloadAsync(imageUrl, fileUri);
  
      // Step 3: Save the downloaded image to the gallery
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('EventPoster Pro', asset, false);
  
      // Success alert
      Alert.alert('Image Downloaded', 'The image has been saved to your gallery.');
    } catch (error) {
      console.error('Error downloading and saving image:', error);
      Alert.alert('Error', 'An error occurred while downloading the image.');
    }

    console.log("Image URL:", imageUrl);
};

const shareImageOnWhatsApp = async (imageUrl) => {
  try {
    // Step 1: Download the image to the app's document directory
    const fileUri = FileSystem.documentDirectory + 'shared-image.jpg';
    const { uri } = await FileSystem.downloadAsync(imageUrl, fileUri);

    // Step 2: Check if sharing is available
    if (!(await Sharing.isAvailableAsync())) {
      Alert.alert('Sharing Not Available', 'Sharing is not available on this device.');
      return;
    }

    // Step 3: Share the downloaded image using the Sharing API
    await Sharing.shareAsync(uri, {
      mimeType: 'image/jpeg', // Ensure proper MIME type
      dialogTitle: 'Share this image on WhatsApp',
    });

    // Optional: Delete the file after sharing (clean up)
    await FileSystem.deleteAsync(uri);
  } catch (error) {
    console.error('Error sharing image:', error);
    Alert.alert('Error', 'An error occurred while sharing the image.');
  }
};

const getExtention = filename =>{
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
}

const categories = [
    { name: "All" },
    { name: "Jokes" },
    { name: "Birthday" },
  ];

  const languages = [
    { name: "English" },
    { name: "Hindi" },
    { name: "Marathi" },
  ];

  const callApi = async () => {
    try {
      console.log("Fetching templates...page", currentPage);

      setIsLoading(true);
      const authToken = await AsyncStorage.getItem("authToken");
      if (!authToken) {
        console.error("Auth token not found!");
        setIsLoading(false);
        return;
      }

      if (!isListEnd) {
      const response = await axios.get(
        `https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/templets/fetchtemplets?page=${currentPage}&limit=10`,
        {
          headers: {
            "auth-token": authToken,
          },
        }
      );
      console.log(response.data);

      if (response.status === 200 && response.data.results > 0) {
        setImages((prevImages) => [...prevImages, ...response.data.templets]);
      }
      else {
        setIsListEnd(true);
      }
    }
    } catch (error) {
      console.error("Error fetching templates:", error);
      if (error.response?.status === 401) {
        Alert.alert("Token Expired", "Logging out...");
        await AsyncStorage.removeItem("authToken");
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "PhoneNumberAuth" }],
          })
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    callApi();
  }, [currentPage]);

  const onRefresh = () => {
    setCurrentPage(1);
    setIsListEnd(false);
    setImages([]);
    setRefreshing(true);
    callApi().then(() => setRefreshing(false));
  };

  const loadMoreTemplates = () => {
    if (!isListEnd && !isLoading) {
      console.log("loadMoreTemplates",currentPage);
      console.log("loader state = ",isLoading);
      
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

/*   if (isLoading && currentPage === 1) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#FF8017" />
          <Text>Loading templates...</Text>
        </View>
      );
    } */

  const bottomLoader = () => {
      console.log("loader");
      return (
        isLoading ? <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#FF8017" />
        </View> : null
      );
    }

  const handleLanguagePress = (name: string) => {
    setSelectedLanguage(name);
  };
  const renderItem = ({ item }: any) => (
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

      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => shareImageOnWhatsApp(item.image)}
          style={styles.shareButton}
        >
          <Text style={styles.shareButtonText}>Share</Text>
          <WhatsAppLogo size={20 * scale} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDownload(item.image)}
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
          <Image
            source={{
              uri: userLogo
                ? userLogo
                : "https://ideogram.ai/assets/progressive-image/balanced/response/dxJM-M2cSvaceVnuURCJCA",
            }}
            style={{
              width: 30 * scale,
              height: 30 * scale,
              borderRadius: 30 * scale,
              borderWidth: 2,
              borderColor: "black",
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={{ paddingVertical: 15 * scale, width: "100%" }}>
        <ScrollView horizontal={true} persistentScrollbar={false}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              paddingHorizontal: 5 * scale,
            }}
          >
            {categories.map((category) => (
              <RenderCategory
                key={category.name}
                name={category.name}
                isSelected={selectedCategory === category.name}
                onPress={handleCategoryPress}
              />
            ))}
          </View>
        </ScrollView>
        <ScrollView horizontal={true} persistentScrollbar={false}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              paddingHorizontal: 5 * scale,
              marginTop: 10,
            }}
          >
            {languages.map((language) => (
              <RenderCategory
                key={language.name}
                name={language.name}
                isSelected={selectedLanguage === language.name}
                onPress={handleLanguagePress}
              />
            ))}
          </View>
        </ScrollView>
      </View>

      {/* <ImageReel /> */}

      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        windowSize={10}
        maxToRenderPerBatch={5}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate="fast"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        onEndReached={loadMoreTemplates}
        onEndReachedThreshold={0.5}
        ListFooterComponent={bottomLoader}
      />
    </SafeAreaView>
  );
};
const RenderCategory = ({
  name,
  isSelected,
  onPress,
}: {
  name: string;
  isSelected: boolean;
  onPress: (name: string) => void;
}) => {
  return (
    <TouchableOpacity
      style={{ marginRight: 5 * scale }}
      onPress={() => onPress(name)}
    >
      <Text
        style={{
          color: isSelected ? "#ffffff" : "#000000",
          backgroundColor: isSelected ? "#FF9A37" : "transparent",
          borderWidth: 1,
          borderColor: "#FF9A37",
          borderRadius: 25 * scale,
          paddingHorizontal: 8 * scale,
          paddingVertical: 2 * scale,
          fontSize: 12 * scale,
        }}
      >
        {name}
      </Text>
    </TouchableOpacity>
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
    paddingRight: 25 * scale,
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

  imageContainer: {
    alignItems: "center",
    paddingTop: 10 * scale,
    paddingBottom: 60 * scale,
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
