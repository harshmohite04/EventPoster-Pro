import {
  StyleSheet,
  TextInput,
  Text,
  FlatList,
  Dimensions,
  View,
  Switch,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";

const { width } = Dimensions.get("window");
const scale = width / 320;

const AdminSettings = () => {
  const [data, setData] = useState([
    {
      id: "1",
      name: "Alice Johnson",
      phoneNumber: "9356836581",
      ban: false,
      admin: false,
    },
    {
      id: "2",
      name: "Bob Smith",
      phoneNumber: "9356836581",
      ban: true,
      admin: false,
    },
    {
      id: "3",
      name: "Catherine Brown",
      phoneNumber: "9356836581",
      ban: false,
      admin: false,
    },
    {
      id: "4",
      name: "Daniel White",
      phoneNumber: "9356836581",
      ban: false,
      admin: true,
    },
    {
      id: "5",
      name: "Eliza Martinez",
      phoneNumber: "9356836581",
      ban: false,
      admin: false,
    },
  ]);

  const [search, setSearch] = useState();
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (txt:any) => {
    setSearch(txt);
    if (txt) {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(txt.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  const toggleSwitch = (id:any, field:any) => {
    const updatedData = data.map((item:any) => {
      if (item.id === id) {
        return { ...item, [field]: !item[field] };
      }
      return item;
    });
    setData(updatedData);
    setFilteredData(updatedData);
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
          <AntDesign name="arrowleft" size={25 * scale} />
          <Text style={{ fontSize: 16 * scale, marginLeft: 10 * scale }}>
            Settings
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#FF8017",
            paddingHorizontal: 10 * scale,
            paddingVertical: 5 * scale,
            borderRadius: 10 * scale,
          }}
        >
          <Text style={{ fontSize: 12 * scale }}>Apply Changes</Text>
        </TouchableOpacity>
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
            <View>
              <Text style={{ fontSize: 13 * scale }}>{item.name}</Text>
              <Text style={{ fontSize: 13 * scale }}>{item.phoneNumber}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  marginRight: 10 * scale,
                  alignItems: "center",
                  flexDirection: "row",
                  borderWidth: 1 * scale,
                  borderColor: "#000000",
                  borderRadius: 8 * scale,
                  paddingHorizontal: 10 * scale,
                  paddingVertical: 5 * scale,
                  justifyContent: "space-around",
                }}
              >
                <Text style={{ fontSize: 12 * scale }}>Ban</Text>
                <Switch
                  value={item.ban}
                  onValueChange={() => toggleSwitch(item.id, "ban")}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={item.ban ? "#fff" : "#fff"}
                />
              </View>
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  borderWidth: 1 * scale,
                  borderColor: "#000000",
                  borderRadius: 8 * scale,
                  paddingHorizontal: 5 * scale,
                  paddingVertical: 5 * scale,
                  justifyContent: "space-around",
                }}
              >
                <Text style={{ fontSize: 12 * scale }}>Admin</Text>
                <Switch
                  value={item.admin}
                  onValueChange={() => toggleSwitch(item.id, "admin")}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={item.admin ? "#ffffff" : "#ffffff"}
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
