import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
const { width } = Dimensions.get("window");
const scale = width / 320;
import Feather from "@expo/vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Yup from "yup";

const profileSchema = Yup.object().shape({
  name: Yup.string().required("Required Field"),
  email: Yup.string().email().required("Required Field"),
  businessName: Yup.string().required("Required Field"),
  url: Yup.string().url().required("Required Field"),
});

const pickImage = async (setImageUri: any) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.canceled) {
    setImageUri({
      name: result.assets[0].fileName,
      fileName: result.assets[0].fileName,
      uri: result.assets[0].uri,
      type: result.assets[0].mimeType,
    });
  }
  console.log("setImageUri",result);
};

const Profile = ({ navigation }: any) => {
  const [logoUri, setLogoUri] = useState({
    name: "",
    fileName: "",
    uri: "",
    type: "",
  });
  const [photoUri, setPhotoUri] = useState({
    name: "",
    fileName: "",
    uri: "",
    type: "",
  });
  const [success, setSuccess] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const authToken = await AsyncStorage.getItem("authToken");
        if (!authToken) {
          console.error("Auth Token not found");
          return;
        }

        const response = await fetch(
          "https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/auth/getuser",
          {
            method: "GET",
            headers: {
              "auth-token": authToken,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch user details");

        const data = await response.json();
        const numberString = data.phone.toString();
        const formattedNumber = numberString.slice(2, 12);
        setPhoneNumber(formattedNumber);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDetails();
  }, []);

  const saveProfile = async (values: any) => {
    //console.log("---------------------------", photoUri);
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      if (!authToken) {
        console.error("Auth Token not found");
        return;
      }

      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("businessName", values.businessName);
      formData.append("websiteLink", values.url);

      if (logoUri.uri) {
        formData.append("logo", {
          name: logoUri.name,
          fileName: logoUri.fileName,
          uri: logoUri.uri,
          type: logoUri.type,
        });
      }

      if (photoUri.uri) {
        formData.append("photo", {
          name: photoUri.name,
          fileName: photoUri.fileName,
          uri: photoUri.uri,
          type: photoUri.type,
        });
      }
      console.log("---------------------- form data -------------------", JSON.stringify(formData));

      const response = await fetch(
        "https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/auth/updateProfile",
        {
          method: "POST",
          headers: {
            "auth-token": authToken, // Do NOT include "Content-Type"
          },
          body: formData, // `fetch` will set the correct Content-Type with the boundary
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to save profile: ${errorData}`);
      }
    
      const data = await response.json();
      console.log("Profile updated successfully:", data);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
        <TouchableOpacity onPress={() => pickImage(setLogoUri)}>
          <View>
            {logoUri.uri ? (
              <Image
                source={{ uri: logoUri.uri }}
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

        <TouchableOpacity onPress={() => pickImage(setPhotoUri)}>
          <View>
            {photoUri.uri ? (
              <Image
                source={{ uri: photoUri.uri }}
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
      <Formik
        initialValues={{
          name: "",
          // phoneNumber: "",
          email: "",
          businessName: "",
          url: "https://",
        }}
        onSubmit={(values) => saveProfile(values)}
        validationSchema={profileSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
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

              <Text style={[styles.labelText]}>Enter your name</Text>

              <TextInput
                style={styles.input}
                placeholder="Aryan Sharma"
                placeholderTextColor="#7c7c7c"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />
              {errors.name && touched.name ? (
                <Text style={{ color: "red", fontWeight: "800" }}>
                  *{errors.name}
                </Text>
              ) : null}
              <Text style={styles.labelText}>Phone Number</Text>
              {/* <TextInput
                style={styles.input}
                placeholder="9988776655"
                placeholderTextColor="#7c7c7c"
                // onChangeText={handleChange("phoneNumber")}
                // onBlur={handleBlur("phoneNumber")}
                value={phoneNumber}
              /> */}
              {/* {errors.phoneNumber && touched.phoneNumber ? (
                <Text style={{ color: "red", fontWeight: "800" }}>
                  *{errors.phoneNumber}
                </Text>
              ) : null} */}
              <Text style={styles.input}>{phoneNumber}</Text>
              <Text style={styles.labelText}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="abc@gmail.com"
                placeholderTextColor="#7c7c7c"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {errors.email && touched.email ? (
                <Text style={{ color: "red", fontWeight: "800" }}>
                  *{errors.email}
                </Text>
              ) : null}
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
                onChangeText={handleChange("businessName")}
                onBlur={handleBlur("businessName")}
                value={values.businessName}
              />
              {errors.businessName && touched.businessName ? (
                <Text style={{ color: "red", fontWeight: "800" }}>
                  *{errors.businessName}
                </Text>
              ) : null}
              <Text style={styles.labelText}>Website Link</Text>
              <TextInput
                style={styles.input}
                placeholder="https://abc.com"
                placeholderTextColor="#7c7c7c"
                onChangeText={handleChange("url")}
                onBlur={handleBlur("url")}
                value={values.url}
              />
              {errors.url && touched.url ? (
                <Text style={{ color: "red", fontWeight: "800" }}>
                  *{errors.url}
                </Text>
              ) : null}
              <TouchableOpacity
                onPress={() => handleSubmit()}
                style={{
                  marginTop: 10 * scale,
                  borderRadius: 20 * scale,
                  backgroundColor: "#FF8017",
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
              {success ? (
                <Text
                  style={{
                    color: "green",
                    fontSize: 12 * scale,
                    fontWeight: "800",
                    alignSelf: "center",
                  }}
                >
                  Successfully Saved
                </Text>
              ) : null}
            </View>
          </View>
        )}
      </Formik>
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
    marginTop: 8 * scale,
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