import { StyleSheet, View, TextInput } from "react-native";
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
    <View style={styles.header}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#8B8585" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for dishes"
          placeholderTextColor="#A7A1A1"
          value={restaurantsSearchText}
          onChangeText={setRestaurantsSearchText}
        />
      </View>
    </View>
  );
};

export default RestaurantscreenHeader;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingTop: 8,
    paddingBottom: 10,
  },
  searchBar: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#EEE4E4",
    shadowColor: "#1F1A1A",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 14,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    color: "#262222",
    fontSize: 14,
    fontWeight: "600",
    paddingVertical: 0,
  },
});
