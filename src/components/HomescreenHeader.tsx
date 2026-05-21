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
    <View style={styles.header}>
      <View style={styles.topRow}>
        <View style={styles.locationGroup}>
          <View style={styles.locationIcon}>
            <Ionicons name="location" size={16} color="#D33135" />
          </View>

          <View>
            <Text style={styles.locationLabel}>Delivered to</Text>
            <Text style={styles.locationText} numberOfLines={1}>
              {location}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.vegToggle,
            vegOnly ? styles.vegToggleActive : styles.vegToggleInactive,
          ]}
        >
          <Text style={styles.vegText}>Veg Only</Text>
          <Switch
            style={styles.switch}
            trackColor={{ false: "#F3B3B3", true: "#A7E3B1" }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#F3B3B3"
            onValueChange={toggleSwitch}
            value={vegOnly}
          />
        </View>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#8B8585" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for restaurants"
          placeholderTextColor="#A7A1A1"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
    </View>
  );
};

export default HomescreenHeader;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: "#F7F3F3",
    paddingTop: 8,
    paddingBottom: 14,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 14,
  },
  locationGroup: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  locationIcon: {
    width: 34,
    height: 34,
    borderRadius: 999,
    backgroundColor: "#F8EAEA",
    alignItems: "center",
    justifyContent: "center",
  },
  locationLabel: {
    color: "#8B8585",
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 2,
  },
  locationText: {
    color: "#262222",
    fontSize: 14,
    fontWeight: "800",
    maxWidth: 160,
  },
  vegToggle: {
    height: 42,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingLeft: 4,
    paddingRight: 4,
    shadowColor: "#1F1A1A",
    marginRight: 5,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  vegToggleActive: {
    backgroundColor: "#2F9E44",
  },
  vegToggleInactive: {
    backgroundColor: "#D33135",
  },
  vegText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
    marginTop: 20
  },
  switch: {
    transform: [{ scaleX: 0.68 }, { scaleY: 0.68 }],
    marginLeft: -0,
    marginTop: -10,
    marginBottom: 3,
  },
  searchBar: {
    height: 50,
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
