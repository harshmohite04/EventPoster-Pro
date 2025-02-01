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
  Keyboard,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Entypo from "@expo/vector-icons/Entypo";
import WhatsAppLogo from "@/assets/icons/WhatsLogo";
import Download from "@/assets/icons/download";
import Swipe from "@/assets/icons/swipe";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { CommonActions } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const scale = width / 320;

const Home = ({ navigation }: any) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [images, setImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [isListEnd, setIsListEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [userLogo, setUserLogo] = useState("");
  const [noData, setNoData] = useState(false);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
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
        setUserLogo(response.data.photo);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserProfile();
  }, []);

  // Fetch templates
  const callApi = useCallback(async () => {
    try {
      setNoData(false);
      setIsLoading(true);
      const authToken = await AsyncStorage.getItem("authToken");
      if (!authToken) {
        console.error("Auth token not found!");
        setIsLoading(false);
        return;
      }

      const response = await axios.get(
        `https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/templets/fetchtemplets?limit=5&page=${currentPage}&language=${selectedLanguage}&category=${selectedCategory}&title=${debouncedSearch}`,
        {
          headers: {
            "auth-token": authToken,
          },
        }
      );
      if (response.status === 200 && response.data.totalTemplets === 0) {
        console.log(response);
        setNoData(true);
      }

      if (response.status === 200 && response.data.results > 0) {
        if (currentPage === 1) {
          setImages(response.data.templets); // Replace data for first page
        } else {
          setImages((prevImages) => [...prevImages, ...response.data.templets]); // Append data for subsequent pages
        }
      } else {
        setIsListEnd(true); // No more data to load
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
  }, [currentPage, selectedCategory, selectedLanguage, debouncedSearch]);

  // Fetch data when filters or search change
  useEffect(() => {
    setCurrentPage(1); // Reset to first page
    setIsListEnd(false); // Reset end of list flag
    setImages([]); // Clear existing data
    callApi(); // Fetch new data
  }, [selectedCategory, selectedLanguage, debouncedSearch]);

  // Fetch more data when scrolling
  useEffect(() => {
    if (currentPage > 1) {
      callApi(); // Fetch more data for subsequent pages
    }
  }, [currentPage]);

  // Load more templates
  const loadMoreTemplates = () => {
    if (!isListEnd && !isLoading) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Refresh data
  const onRefresh = () => {
    setCurrentPage(1);
    setIsListEnd(false);
    setImages([]);
    setRefreshing(true);
    callApi().then(() => setRefreshing(false));
  };

  // Handle category selection
  const handleCategoryPress = (name: string) => {
    setSelectedCategory(name.toLowerCase());
  };

  // Handle language selection
  const handleLanguagePress = (name: string) => {
    setSelectedLanguage(name.toLowerCase());
  };

  // Download image
  const handleDownload = async (imageUrl: string) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "You need to grant media library permissions.");
        return;
      }

      const fileUri = FileSystem.documentDirectory + "downloaded-image.jpg";
      const { uri } = await FileSystem.downloadAsync(imageUrl, fileUri);
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("EventPoster Pro", asset, false);
      Alert.alert("Image Downloaded", "The image has been saved to your gallery.");
    } catch (error) {
      console.error("Error downloading and saving image:", error);
      Alert.alert("Error", "An error occurred while downloading the image.");
    }
  };

  // Share image on WhatsApp
  const shareImageOnWhatsApp = async (imageUrl: string) => {
    try {
      const fileUri = FileSystem.documentDirectory + "shared-image.jpg";
      const { uri } = await FileSystem.downloadAsync(imageUrl, fileUri);

      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert("Sharing Not Available", "Sharing is not available on this device.");
        return;
      }

      await Sharing.shareAsync(uri, {
        mimeType: "image/jpeg",
        dialogTitle: "Share this image on WhatsApp",
      });

      await FileSystem.deleteAsync(uri);
    } catch (error) {
      console.error("Error sharing image:", error);
      Alert.alert("Error", "An error occurred while sharing the image.");
    }
  };

  // Render a single template
  const renderItem = ({ item }: any) => (
    <View style={[styles.imageContainer, { height, width }]}>
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

  // Categories and languages
  const categories = [
    { name: "All" },
    { name: "Jokes" },
    { name: "Birthday" },
  ];

  const languages = [
    { name: "All" },
    { name: "English" },
    { name: "Hindi" },
    { name: "Marathi" },
  ];

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
              placeholderTextColor="#49454F"
              style={styles.searchInput}
              returnKeyType="search"
              onSubmitEditing={() => Keyboard.dismiss()}
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
        <TouchableOpacity onPress={() => navigation.push("MainProfile")}>
          <Image
            source={{
              uri: userLogo || "https://via.placeholder.com/150",
            }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      <View style={{ paddingVertical: 15 * scale, width: "100%" }}>
        <ScrollView horizontal={true} persistentScrollbar={false}>
          <View style={styles.categoryContainer}>
            {categories.map((category) => (
              <RenderCategory
                key={category.name}
                name={category.name}
                isSelected={selectedCategory === category.name.toLowerCase()}
                onPress={handleCategoryPress}
              />
            ))}
          </View>
        </ScrollView>
        <ScrollView horizontal={true} persistentScrollbar={false}>
          <View style={styles.categoryContainer}>
            {languages.map((language) => (
              <RenderCategory
                key={language.name}
                name={language.name}
                isSelected={selectedLanguage === language.name.toLowerCase()}
                onPress={handleLanguagePress}
              />
            ))}
          </View>
        </ScrollView>
      </View>

      {!noData ? <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        windowSize={10}
        maxToRenderPerBatch={5}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate="fast"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        onEndReached={loadMoreTemplates}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoading && !refreshing ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#FF8017" />
            </View>
          ) : null
        }
      /> : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No Templates found</Text>
          <Text style={styles.message}>Try changing the filters</Text>
        </View>)}
    </SafeAreaView>
  );
};

// RenderCategory component
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
    <TouchableOpacity style={styles.categoryButton} onPress={() => onPress(name)}>
      <Text style={[styles.categoryText, isSelected && styles.selectedCategoryText]}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

// Styles (same as before)
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
  profileImage: {
    width: 30 * scale,
    height: 30 * scale,
    borderRadius: 30 * scale,
    borderWidth: 2,
    borderColor: "black",
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
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 5 * scale,
  },
  categoryButton: {
    marginRight: 5 * scale,
  },
  categoryText: {
    color: "#000000",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#FF9A37",
    borderRadius: 25 * scale,
    paddingHorizontal: 8 * scale,
    paddingVertical: 2 * scale,
    fontSize: 12 * scale,
  },
  selectedCategoryText: {
    color: "#ffffff",
    backgroundColor: "#FF9A37",
  },
  loaderContainer: {
    padding: 20 * scale,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: 16 * scale,
    color: "#000000",
  },
  message: {
    fontSize: 10 * scale,
    color: "#000000",
  },
});

export default Home;