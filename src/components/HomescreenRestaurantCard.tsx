import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

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
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={styles.restaurantInfo}>
            <Text style={styles.name} numberOfLines={1}>
              {name}
            </Text>
            <Text style={styles.location} numberOfLines={1}>
              {location}
            </Text>
          </View>

          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
            <AntDesign name="star" size={12} color="gold" />
          </View>
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.metaPill}>
            <Text style={styles.metaText}>Free delivery</Text>
          </View>

          <View style={styles.metaPill}>
            <Text style={styles.metaText}>25-30 min</Text>
          </View>

          <View style={styles.dietRow}>
            <View
              style={[
                styles.dietMarker,
                vegOnly ? styles.vegMarker : styles.nonVegMarker,
              ]}
            >
              <View
                style={[
                  styles.dietDot,
                  vegOnly ? styles.vegDot : styles.nonVegDot,
                ]}
              />
            </View>
            <Text style={styles.dietText}>{vegOnly ? "Veg" : "Non-veg"}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomescreenRestaurantCard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: "100%",
    height: 150,
    backgroundColor: "#EFEAEA",
  },
  content: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 14,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  restaurantInfo: {
    flex: 1,
  },
  name: {
    color: "#262222",
    fontSize: 18,
    fontWeight: "800",
  },
  location: {
    color: "#8B8585",
    fontSize: 13,
    fontWeight: "500",
    marginTop: 4,
  },
  ratingBadge: {
    minWidth: 48,
    height: 30,
    borderRadius: 999,
    backgroundColor: "#D33135",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    flexDirection: "row",
    gap: 4,

  },
  ratingText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14,
  },
  metaPill: {
    borderRadius: 999,
    backgroundColor: "#F8EFEF",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  metaText: {
    color: "#6F6666",
    fontSize: 12,
    fontWeight: "700",
  },
  dietRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 999,
    backgroundColor: "#F8EFEF",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  dietMarker: {
    width: 15,
    height: 15,
    borderWidth: 1.4,
    alignItems: "center",
    justifyContent: "center",
  },
  vegMarker: {
    borderColor: "#2F9E44",
  },
  nonVegMarker: {
    borderColor: "#D33135",
  },
  dietDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
  },
  vegDot: {
    backgroundColor: "#2F9E44",
  },
  nonVegDot: {
    backgroundColor: "#D33135",
  },
  dietText: {
    color: "#6F6666",
    fontSize: 12,
    fontWeight: "700",
  },
});
