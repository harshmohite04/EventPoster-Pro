import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
const { width } = Dimensions.get("window");
const scale = width / 320;
import Feather from "@expo/vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";

const pickImage = async (setImageUri) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.canceled) {
    setImageUri(result.assets[0].uri);
  }
};

const Profile = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [website, setWebsite] = useState("");
  const [logoUri, setLogoUri] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);

  const saveProfile = () => {
    console.log("Save Pressed");
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={{
          height: "8%",
          backgroundColor: "#ffffff",
          marginTop: 20 * scale,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 15 * scale,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Feather name="arrow-left" size={20 * scale} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18 * scale, marginLeft: 15 * scale }}>
          Profile
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 20 * scale,
        }}
      >
        {/* Upload Logo Section */}
        <TouchableOpacity onPress={() => pickImage(setLogoUri)}>
          <View>
            {logoUri ? (
              <Image
                source={{ uri: logoUri }}
                style={{
                  height: 120 * scale,
                  width: 120 * scale,
                  borderRadius: 60 * scale,
                }}
              />
            ) : (
              <View
                style={{
                  backgroundColor: "#D9D9D9",
                  height: 120 * scale,
                  width: 120 * scale,
                  borderRadius: 60 * scale,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Feather name="edit-3" size={24 * scale} color="#FF8017" />
              </View>
            )}
          </View>
          <Text
            style={{
              fontSize: 15 * scale,
              marginTop: 10 * scale,
              textAlign: "center",
            }}
          >
            Upload Logo
          </Text>
        </TouchableOpacity>

        {/* Upload Photo Section */}
        <TouchableOpacity onPress={() => pickImage(setPhotoUri)}>
          <View>
            {photoUri ? (
              <Image
                source={{ uri: photoUri }}
                style={{
                  height: 120 * scale,
                  width: 120 * scale,
                  borderRadius: 60 * scale,
                }}
              />
            ) : (
              <View
                style={{
                  backgroundColor: "#D9D9D9",
                  height: 120 * scale,
                  width: 120 * scale,
                  borderRadius: 60 * scale,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Feather name="edit-3" size={24 * scale} color="#FF8017" />
              </View>
            )}
          </View>
          <Text
            style={{
              fontSize: 15 * scale,
              marginTop: 10 * scale,
              textAlign: "center",
            }}
          >
            Upload Photo
          </Text>
        </TouchableOpacity>
      </View>

      {/* Personal Details Section */}
      <View
        style={{
          backgroundColor: "#ffffff",
          marginTop: 28 * scale,
          paddingHorizontal: 10 * scale,
          paddingVertical: 10 * scale,
        }}
      >
        <Text
          style={{
            fontSize: 15 * scale,
            paddingBottom: 10 * scale,
            fontWeight: "bold",
          }}
        >
          Personal Details
        </Text>

        <Text style={styles.labelText}>Enter your name</Text>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
          placeholder="Enter your name"
          placeholderTextColor="#7c7c7c"
        />

        <Text style={styles.labelText}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="9356836581"
          placeholderTextColor="#7c7c7c"
        />

        <Text style={styles.labelText}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="abc@gmail.com"
          placeholderTextColor="#7c7c7c"
        />
      </View>

      {/* Business Details Section */}
      <View
        style={{
          backgroundColor: "#ffffff",
          marginTop: 20 * scale,
          paddingBottom: 60 * scale,
          paddingTop: 12 * scale,
          paddingHorizontal: 10 * scale,
        }}
      >
        <Text
          style={{
            fontSize: 15 * scale,
            color: "#000000",
            fontWeight: "bold",
            paddingBottom: 5 * scale,
          }}
        >
          Business Details
        </Text>

        <Text style={styles.labelText}>Business Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Event Poster Pro"
          placeholderTextColor="#7c7c7c"
          value={businessName}
          onChangeText={setBusinessName}
        />

        <Text style={styles.labelText}>Website Link</Text>
        <TextInput
          style={styles.input}
          placeholder="https://abc.com"
          placeholderTextColor="#7c7c7c"
          value={website}
          onChangeText={setWebsite}
        />
        <TouchableOpacity
          onPress={saveProfile}
          style={{
            marginTop: 10 * scale,
            borderRadius: 20 * scale,
            backgroundColor: "red",
            paddingVertical: 10 * scale,
            width: "50%",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              color: "#000000",
              textAlign: "center",
              fontSize: 13 * scale,
              fontWeight: "bold",
            }}
          >
            SAVE
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  labelText: {
    color: "#FF8017",
    fontSize: 12 * scale,
    paddingHorizontal: 10 * scale,
    paddingVertical: 3 * scale,
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    width: "95%",
    alignSelf: "center",
    borderRadius: 10 * scale,
    paddingHorizontal: 20 * scale,
    paddingVertical: 5 * scale,
    fontSize: 15 * scale,
    color: "#000000",
  },
});
