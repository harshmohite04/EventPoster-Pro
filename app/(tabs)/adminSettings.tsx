import {
  StyleSheet,
  TextInput,
  Text,
  FlatList,
  Dimensions,
  View,
  Switch,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const { width } = Dimensions.get("window");
const scale = width / 320;

const AdminSettings = ({ navigation }: any) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  // Fetch user data from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const authToken = await AsyncStorage.getItem("authToken");
        const response = await axios.get("https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/admin/getallusers",
          { headers: { "auth-token": authToken } }
        );
        const userData = response.data.map((user) => ({
          id: user._id,
          name: user.name,
          phone: user.phone,
          isAdmin: user.isAdmin,
          isBanned: user.isBanned,
          logo: user.logo,
        }));
        setData(userData);
        setFilteredData(userData);

        // Fetch logged-in user's details
        const loggedInUserResponse = await axios.get(
          "https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/auth/getuser",
          { headers: { "auth-token": authToken } }
        );
        setLoggedInUserId(loggedInUserResponse.data._id); // Save the logged-in user's ID
        //console.log(loggedInUserResponse.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const formatPhoneNumber = (phone) => {
    const phoneString = phone.toString();
    //console.log("Phone value:", phone); // Debugging line to check the value of phone
    if (typeof phoneString === 'string' && phoneString.length > 2) {
      // Remove the first two digits (country code)
      return phoneString.slice(2);
    }
    return phone; // Return the original phone if it's not a valid string or doesn't have a country code
  };
  

  // Handle search functionality
  const handleSearch = (txt) => {
    setSearch(txt);
    if (txt) {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(txt.toLowerCase()) ||
        item.phone.toString().toLowerCase().includes(txt.toLowerCase()) // Convert phone to string for comparison
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };
  

  // Toggle ban/admin switch
  const toggleSwitch = async (id, field) => {
    // Update the UI immediately for the toggled field
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: !item[field] };
      }
      return item;
    });
    setData(updatedData);
    setFilteredData(updatedData);
  
    try {
      const authToken = await AsyncStorage.getItem("authToken");
  
      // Determine the API endpoint based on the field being toggled
      const endpoint =
        field === "isBanned"
          ? `https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/admin/banuser/${id}`
          : `https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/admin/updateadminstatus/${id}`;
  
      // Call the API in the background
      await axios.put(
        endpoint,
        {}, // Empty body
        {
          headers: { "auth-token": authToken },
        }
      );
  
      console.log(`${field} status updated for user with ID: ${id}`);
    } catch (error) {
      console.error(`Error updating ${field} status for user with ID: ${id}`, error);
  
      // Revert the UI toggle if the API call fails
      const revertedData = data.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: !item[field] }; // Revert the toggle
        }
        return item;
      });
      setData(revertedData);
      setFilteredData(revertedData);
    }
  };
  

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 10 * scale,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 1 * scale,
          borderColor: "#F0F0F0",
          alignItems: "center",
          paddingVertical: 10 * scale,
          justifyContent: "space-between",
          paddingHorizontal: 10 * scale,
        }}
      >
        <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AntDesign name="arrowleft" size={25 * scale} />
          </TouchableOpacity>

          <Text style={{ fontSize: 16 * scale, marginLeft: 10 * scale }}>
            Settings
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 10 * scale,
          backgroundColor: "#FFEFD4",
          borderRadius: 28 * scale,
          paddingHorizontal: 10 * scale,
        }}
      >
        <EvilIcons name="search" size={25 * scale} />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          style={{
            fontSize: 15 * scale,
            paddingHorizontal: 10 * scale,
            paddingRight: 30 * scale,
          }}
          placeholder="Search Users"
        />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              marginVertical: 5 * scale,
              backgroundColor: "#F9F9F9",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 10 * scale,
              borderRadius: 8 * scale,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/*<Image
                source={{ uri: item.logo }}
                style={{
                  width: 30 * scale,
                  height: 30 * scale,
                  borderRadius: 20 * scale,
                  marginRight: 10 * scale,
                }}
              />*/}
              <View>
                <Text style={{ fontSize: 13 * scale }}>{item.name}</Text>
                <Text style={{ fontSize: 13 * scale, marginRight: 4 }}>{formatPhoneNumber(item.phone)}</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  marginRight: 10 * scale,
                  alignItems: "center",
                  flexDirection: "row",
                  borderWidth: 1 * scale,
                  borderColor: loggedInUserId === item.id ? "#d3d3d3" : "#000000",
                  borderRadius: 8 * scale,
                  paddingHorizontal: 10 * scale,
                  paddingVertical: 5 * scale,
                  justifyContent: "space-around",
                }}
              >
                <Text style={{ fontSize: 12 * scale, color: loggedInUserId === item.id ? "#a9a9a9" : "#000000" }}>Ban</Text>
                <Switch
                  value={item.isBanned}
                  disabled={loggedInUserId === item.id}
                  onValueChange={() => toggleSwitch(item.id, "isBanned")}
                  trackColor={{
                    false: loggedInUserId === item.id ? "#d3d3d3" : "#767577",
                    true: loggedInUserId === item.id ? "#d3d3d3" : "#81b0ff",
                  }}
                  thumbColor={
                    loggedInUserId === item.id
                      ? "#a9a9a9" // Gray color for disabled switches
                      : item.isBanned
                      ? "#ffffff"
                      : "#ffffff"
                  }
                />
              </View>
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  borderWidth: 1 * scale,
                  borderColor: loggedInUserId === item.id ? "#d3d3d3" : "#000000",
                  borderRadius: 8 * scale,
                  paddingHorizontal: 5 * scale,
                  paddingVertical: 5 * scale,
                  justifyContent: "space-around",
                }}
              >
                <Text style={{ fontSize: 12 * scale, color: loggedInUserId === item.id ? "#a9a9a9" : "#000000" }}>Admin</Text>
                <Switch
                  value={item.isAdmin}
                  disabled={loggedInUserId === item.id}
                  onValueChange={() => toggleSwitch(item.id, "isAdmin")}
                  trackColor={{
                    false: loggedInUserId === item.id ? "#d3d3d3" : "#767577",
                    true: loggedInUserId === item.id ? "#d3d3d3" : "#81b0ff",
                  }}
                  thumbColor={
                    loggedInUserId === item.id
                      ? "#a9a9a9" // Gray color for disabled switches
                      : item.isBanned
                      ? "#ffffff"
                      : "#ffffff"
                  }
                />
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default AdminSettings;

const styles = StyleSheet.create({});
