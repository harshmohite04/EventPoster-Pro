import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");
const scale = width / 320;

const Library = ({ navigation }) => {
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [refreshing, setRefreshing] = useState(false); // Refresh state
  const [token, setToken] = useState("");

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

  const fetchTemplates = async () => {
    try {
      setIsLoading(true); // Start loading
      const authToken = await AsyncStorage.getItem("authToken");
      if (!authToken) {
        console.error("Auth token not found!");
        setIsLoading(false); // Stop loading in case of no authToken
        return;
      }
      setToken(authToken);
      console.log("Auth Token:", authToken); // Debugging the token

      // Retry fetching templates until successful response
      let success = false;
      while (!success) {
        const response = await axios.get(
          "https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/templets/fetchtemplets",
          { headers: { "auth-token": authToken } }
        );

        if (response.status === 200) {
          setTemplates(response.data);
          console.log(response.data);
          setIsLoading(false); // Stop loading once we get a valid response
          success = true; // Exit the loop
        } else {
          console.log("Retrying fetching templates...");
        }
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
      setIsLoading(false); // Stop loading on error
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTemplates().then(() => setRefreshing(false)); // Refresh templates
  };

  const deleteTemplate = async (id) => {
    try {
      const response = await axios.delete(
        `https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/templets/deletetemplet/${id}`,
        { headers: { "auth-token": token } }
      );
      if (response.status === 200) {
        console.log("Template deleted successfully");
        setTemplates((prevTemplates) =>
          prevTemplates.filter((template) => template._id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting template:", error);
    }
  };

  const changeVisible = async (id) => {
    try {
      const response = await axios.put(
        `https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/templets/togglevisibility/${id}`,
        {},
        { headers: { "auth-token": token } }
      );
      if (response.status === 200) {
        setTemplates((prevTemplates) =>
          prevTemplates.map((template) =>
            template._id === id
              ? { ...template, visibility: !template.visibility }
              : template
          )
        );
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error changing template visibility:", error);
    }
  };

  

  const renderTemplate = ({ item }) => (
    <View style={styles.templateCard}>
      <Image source={{ uri: item.image }} style={styles.templateImage} />
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={() => changeVisible(item._id)}>
          {item.visibility ? (
            <Ionicons name="eye-outline" size={20 * scale} color="white" />
          ) : (
            <Ionicons name="eye-off-outline" size={20 * scale} color="white" />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTemplate(item._id)}>
          <MaterialCommunityIcons name="delete" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FF8017" />
        <Text>Loading templates...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.push("AdminSettings")}
          style={styles.settingsButton}
        >
          <Feather name="users" size={30 * scale} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Library</Text>
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
      <FlatList
        data={templates}
        numColumns={3}
        keyExtractor={(item) => item._id}
        renderItem={renderTemplate}
        contentContainerStyle={styles.gridContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.push("AdminEditImage")}
      >
        <Entypo name="plus" size={25 * scale} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Library;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  settingsButton: {},
  headerTitle: {
    color: "#000000",
    fontSize: 20 * scale,
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: 90 * scale,
    marginRight: 90 * scale,
  },
  gridContainer: {
    padding: 2 * scale,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  templateCard: {
    width: (width - 40) / 3,
    margin: 6,
    backgroundColor: "#292929",
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
    marginHorizontal: 4 * scale,
    paddingBottom: 8 * scale,
    borderBottomRightRadius: 20 * scale,
    borderBottomLeftRadius: 20 * scale,
    marginVertical: 5 * scale,
  },
  templateImage: {
    width: 100 * scale,
    height: 100 * scale,
    borderBottomRightRadius: 20 * scale,
    borderBottomLeftRadius: 20 * scale,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    marginTop: 8 * scale,
  },
  fab: {
    position: "absolute",
    bottom: 50 * scale,
    right: 20 * scale,
    backgroundColor: "#FF8017",
    borderRadius: 50,
    width: 50 * scale,
    height: 50 * scale,
    alignItems: "center",
    justifyContent: "center",
  },
});
