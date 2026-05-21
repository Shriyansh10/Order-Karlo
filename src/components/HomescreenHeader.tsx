import { StyleSheet, Text, View, TextInput, Switch } from "react-native";
import React from "react";
import { Ionicons } from "@react-native-vector-icons/ionicons";

const HomescreenHeader = ({
  location,
  searchText,
  setSearchText,
  vegOnly,
  setVegOnly,
}: {
  location: string;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  vegOnly: boolean;
  setVegOnly: React.Dispatch<React.SetStateAction<boolean>>;
}) => {


  const toggleSwitch = () => {
    setVegOnly((previousState) => !previousState);
  };

  
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
        }}
      >
        <View>
          <Ionicons name="location" size={20} />
          <Text>{location}</Text>
        </View>
        <View>
          <View>
            <Text>Veg mode</Text>
            <Switch
              trackColor={{ false: "#7d1a1a", true: "#3ba70d" }}
              thumbColor="#fff"
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={vegOnly}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          marginTop: 10,
        }}
      >
        <TextInput
          placeholder="Search for restaurants"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
    </View>
  );
};

export default HomescreenHeader;

const styles = StyleSheet.create({});
