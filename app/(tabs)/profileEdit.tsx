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
// import { TouchableOpacity } from "react-native-gesture-handler";
import { Formik } from "formik";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Yup from "yup";

const profileSchema = Yup.object().shape({
  name: Yup.string().required("Required Field"),
  // phoneNumber: Yup.string()
  //   .required("Required Field")
  //   .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
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
    setImageUri(result.assets[0].uri);
  }
};

const Profile = ({ navigation }: any) => {
  const [logoUri, setLogoUri] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [success, setSuccess] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  useEffect(() => {
    const fetchDetails = async () => {
      console.log("Yo");
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
        console.log(response.data.phone);
        const number = response.data.phone;
        const numberString = number.toString();
        const number1 = numberString.slice(2, 12);

        setPhoneNumber(number1);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDetails();
  }, []);
  // const saveProfile = async (values: any) => {
  //   console.log("api trigger for SAVE");
  //   const authToken = await AsyncStorage.getItem("authToken");
  //   const response = await axios.put(
  //     "https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/auth/updateProfile",
  //     {
  //       name: values.name,
  //       email: values.email,
  //       businessName: values.businessName,
  //       websiteLink: values.url,
  //       Logo: logoUri,
  //       photo: photoUri,
  //     },
  //     {
  //       headers: {
  //         "auth-token": authToken,
  //       },
  //     }
  //   );

  //   console.log(values.name);
  //   console.log(values.email);
  //   console.log(photoUri);
  //   console.log(response.data.success);
  //   setSuccess(response.data.success);
  // };

  const saveProfile = async (values: any) => {
    console.log("api trigger for SAVE");
    console.log(logoUri);
    console.log(photoUri);
    // Retrieve authToken
    const authToken = await AsyncStorage.getItem("authToken");

    // Create FormData object to hold profile data and images
    const formData = new FormData();

    // Append profile information
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("businessName", values.businessName);
    formData.append("websiteLink", values.url);

    // Append Logo image if it exists
    if (logoUri) {
      const logoUriParts = logoUri.split(".");
      const logoExtension = logoUriParts[logoUriParts.length - 1].toLowerCase();
      const logoType = logoExtension === "jpg" || logoExtension === "jpeg" 
        ? "image/jpeg" 
        : logoExtension === "png"
        ? "image/png"
        : `image/${logoExtension}`;
      formData.append("Logo", {
        uri: logoUri,
        type: logoType,
        name: `logo.${logoExtension}`,
      });
      console.log("Logo MIME type:", logoType);
    }
    
    if (photoUri) {
      const photoUriParts = photoUri.split(".");
      const photoExtension = photoUriParts[photoUriParts.length - 1].toLowerCase();
      const photoType = photoExtension === "jpg" || photoExtension === "jpeg" 
        ? "image/jpeg" 
        : photoExtension === "png"
        ? "image/png"
        : `image/${photoExtension}`;
      formData.append("photo", {
        uri: photoUri,
        type: photoType,
        name: `photo.${photoExtension}`,
      });
      console.log("Photo MIME type:", photoType);
    }
    

    try {
      // Make the API request to update the profile
      const response = await axios.post(
        "https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/auth/updateProfile",
        formData,
        {
          headers: {
            "auth-token": authToken,
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
          },
          timeout: 10000
        }
      );

      console.log(response);
      setSuccess(response.data.success);
    } catch (error) {
      console.error(error);
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

      {/* <TextInput
           onChangeText={handleChange('name')}
           onBlur={handleBlur('name')}
           value={values.name}
         />
         <TouchableOpacity onPress={()=>handleSubmit}  >
          <Text>Submit</Text>
         </TouchableOpacity> */}

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
