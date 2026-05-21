import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const HomescreenRestaurantCard = ({
  name,
  image,
  rating,
  vegOnly,
  location,
}: {
  name: string;
  image: string;
  rating: number;
  vegOnly: boolean;
  location: string;
}) => {
  return (
    <View style={{ flex: 1, alignItems: "center", gap: 5, width: "100%" }}>
      <View>
        <Image source={{ uri: image }} style={{ width: "100%", height: 100 }} />
      </View>
      <View>
        <Text>{name}</Text>
        <Text>{location}</Text>
      </View>
      <View>
        <Text>{rating} stars</Text>
        {vegOnly ? (
          <View
            style={{
              width: 18,
              height: 18,
              borderWidth: 1.5,
              borderColor: "green",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        ) : (
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              backgroundColor: "green",
            }}
          />
        )}
      </View>
    </View>
  );
};

export default HomescreenRestaurantCard;

const styles = StyleSheet.create({});
