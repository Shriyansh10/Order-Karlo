import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { Ionicons } from "@react-native-vector-icons/ionicons";

const RestaurantscreenHeader = ({
  restaurantsSearchText,
  setRestaurantsSearchText,
}: {
  restaurantsSearchText: string;
  setRestaurantsSearchText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          marginTop: 10,
        }}
      >
        <TextInput
          placeholder="Search for dishes"
          value={restaurantsSearchText }
          onChangeText={setRestaurantsSearchText}
        />
      </View>
  );
};

export default RestaurantscreenHeader;

const styles = StyleSheet.create({});
