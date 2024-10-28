import {
    StyleSheet,
    Image,
    Text,
    View,
    useColorScheme,
    Pressable,
  } from "react-native";
  import React from "react";
import { Templete } from "@/hooks/useTemplete";
  import { ThemedView } from "./ThemedView";
  import { Ionicons } from "@expo/vector-icons";
  const ImageCard = ({
    templete,
    onPress,
  }: {
    templete: Templete;
    onPress: () => void;
  }) => {
    const theme = useColorScheme() ?? "light";
    return (
      <Pressable onPress={onPress} style={styles.imageContainer}>
        <Image source={{ uri: templete.url }} style={styles.image} />
        <ThemedView style={styles.labelContainer}>
          <Text style={styles.label}>{templete.name}</Text>
          <Ionicons
            style={styles.icon}
            name={"heart"}
            size={18}
            color={"white"}
          />
        </ThemedView>
      </Pressable>
    );
  };
  export default ImageCard;
  
  const styles = StyleSheet.create({
    image: {
      flex: 1,
      height: 200,
      borderRadius: 15,
      margin: 5,
    },
    label: {
      fontSize: 20,
      color: "white",
    },
    labelContainer: {
      flexDirection: "row",
      position: "absolute",
      bottom: 0,
      width: "90%",
      borderRadius: 10,
      justifyContent: "space-between",
      backgroundColor: "rgba(0,0,0,0.5)",
      paddingHorizontal: 10,
      alignItems: "center",
      alignSelf: "center",
    },
    icon: {
      // left: 100,
    },
    imageContainer: {},
  });
  