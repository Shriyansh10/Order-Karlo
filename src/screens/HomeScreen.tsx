import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { restaurantsData } from "../data/restaurantData";
import { type RestaurantsType } from "../context/DataTypes";
import HomescreenRestaurantCard from "../components/HomescreenRestaurantCard";

const Homescreen = ({
  searchText,
  vegOnly,
}: {
  searchText: string;
  vegOnly: boolean;
}) => {
  const navigation = useNavigation<any>();

  const [filteredRestaurants, setFilteredRestaurants] =
    React.useState<RestaurantsType>(restaurantsData);

  React.useEffect(() => {
    if (vegOnly === true) {
      if (searchText === "") {
        setFilteredRestaurants(
          restaurantsData.filter((restaurant) => restaurant.vegOnly === true),
        );
      } else {
        setFilteredRestaurants(
          restaurantsData.filter(
            (restaurant) =>
              restaurant.name
                .toLowerCase()
                .includes(searchText.toLowerCase()) &&
              restaurant.vegOnly === true,
          ),
        );
      }
    } else {
      setFilteredRestaurants(
        restaurantsData.filter((restaurant) =>
          restaurant.name.toLowerCase().includes(searchText.toLowerCase()),
        ),
      );
    }
  }, [searchText, vegOnly]);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Restaurants near you</Text>
        <Text style={styles.subtitle}>
          {vegOnly ? "Showing veg restaurants" : "Showing all restaurants"}
        </Text>
      </View>

      <FlatList
        data={filteredRestaurants}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <Pressable
              style={({ pressed }) => [
                styles.cardButton,
                pressed && styles.cardButtonPressed,
              ]}
              onPress={() =>
                navigation.navigate("Restaurant", { restaurantId: item.id })
              }
            >
              <HomescreenRestaurantCard
                name={item.name}
                location={item.location}
                image={item.image}
                rating={item.rating}
                vegOnly={item.vegOnly}
              />
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No restaurants found</Text>
            <Text style={styles.emptyText}>Try a different search.</Text>
          </View>
        }
      />
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F3F3",
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  header: {
    marginBottom: 18,
  },
  title: {
    color: "#262222",
    fontSize: 24,
    fontWeight: "800",
  },
  subtitle: {
    color: "#8B8585",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 6,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 140,
    gap: 16,
  },
  cardButton: {
    width: "100%",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#1F1A1A",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 4,
  },
  cardButtonPressed: {
    opacity: 0.86,
    transform: [{ scale: 0.99 }],
  },
  emptyState: {
    minHeight: 260,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  emptyTitle: {
    color: "#262222",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6,
  },
  emptyText: {
    color: "#8B8585",
    fontSize: 14,
    fontWeight: "500",
  },
});
