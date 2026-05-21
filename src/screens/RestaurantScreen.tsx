import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { restaurantsData } from "../data/restaurantData";
import AddtoCartButton from "../components/AddtoCartButton";
import AddDishButton from "../components/AddDishButton";
import SubtractDishButton from "../components/SubtractDishButton";
import { CartContext, type CartContextType } from "../context/CartContext";
import CustomModal from "../components/CustomModal";

const RestaurantScreen = ({ searchText }: { searchText: string }) => {
  const route = useRoute<any>();
  const { restaurantId } = route.params;
  const restaurant = restaurantsData.find(
    (restaurant) => restaurant.id === restaurantId,
  );

  const context = React.useContext<CartContextType>(CartContext);
  const { cart, setCart } = context!;
  const [modalVisible, setModalVisible] = React.useState(false);

  const filteredDishes = React.useMemo(() => {
    const dishes = restaurant?.dishes ?? "";

    if (!restaurant?.dishes) {
      return [];
    }

    if (!searchText.trim()) {
      return restaurant.dishes;
    }

    return restaurant.dishes.filter((dish) =>
      dish.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [restaurant, searchText]);

  React.useEffect(() => {
    console.log(cart);
    if (Object.entries(cart).some((cartItem) => cartItem[1].quantity > 0)) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [cart]);

  return (
    <View style={styles.screen}>
      <FlatList
        data={filteredDishes}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Image
              source={{ uri: restaurant?.image }}
              style={styles.heroImage}
            />

            <View style={styles.restaurantPanel}>
              <View style={styles.titleRow}>
                <View style={styles.titleGroup}>
                  <Text style={styles.restaurantName}>{restaurant?.name}</Text>
                  <View style={styles.locationRow}>
                    <Ionicons
                      name="location-outline"
                      size={15}
                      color="#8B8585"
                    />
                    <Text style={styles.locationText}>
                      {restaurant?.location}
                    </Text>
                  </View>
                </View>

                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={13} color="#FFFFFF" />
                  <Text style={styles.ratingText}>
                    {restaurant?.rating.toFixed(1)}
                  </Text>
                </View>
              </View>

              <View style={styles.metaRow}>
                <View style={styles.metaPill}>
                  <Ionicons name="time-outline" size={14} color="#D33135" />
                  <Text style={styles.metaText}>25-30 min</Text>
                </View>

                <View style={styles.metaPill}>
                  <Ionicons name="bicycle-outline" size={14} color="#D33135" />
                  <Text style={styles.metaText}>Free delivery</Text>
                </View>

                <View style={styles.metaPill}>
                  <Ionicons name="pricetag-outline" size={14} color="#D33135" />
                  <Text style={styles.metaText}>
                    {restaurant?.vegOnly ? "Pure veg" : "Non-veg"}
                  </Text>
                </View>
              </View>

              <View style={styles.couponBanner}>
                <Text style={styles.couponText}>Coupons are available!</Text>
                <View style={styles.couponIcon}>
                  <Ionicons name="arrow-forward" size={15} color="#FFFFFF" />
                </View>
              </View>

              <Text style={styles.menuTitle}>Menu</Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.dishCard}>
            <View style={styles.dishInfo}>
              <View
                style={[
                  styles.dietMarker,
                  item.dishType === "veg"
                    ? styles.vegMarker
                    : styles.nonVegMarker,
                ]}
              >
                <View
                  style={[
                    styles.dietDot,
                    item.dishType === "veg" ? styles.vegDot : styles.nonVegDot,
                  ]}
                />
              </View>

              <Text style={styles.dishName} numberOfLines={2}>
                {item.name}
              </Text>

              <Text style={styles.dishDescription} numberOfLines={2}>
                Freshly prepared with house spices and served hot.
              </Text>

              <Text style={styles.price}>₹{item.price.toFixed(2)}</Text>
            </View>

            <View style={styles.dishImageGroup}>
              <Image source={{ uri: item.image }} style={styles.dishImage} />

              {cart[item.id]?.quantity > 0 ? (
                <View style={styles.quantityControl}>
                  <SubtractDishButton item={item} setCart={setCart} />
                  <Text style={styles.quantityText}>
                    {cart[item.id]?.quantity}
                  </Text>
                  <AddDishButton item={item} setCart={setCart} />
                </View>
              ) : (
                <View style={styles.addButtonWrap}>
                  <AddtoCartButton item={item} setCart={setCart} />
                </View>
              )}
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No dishes found</Text>
            <Text style={styles.emptyText}>Try another search.</Text>
          </View>
        }
      />

      {modalVisible && (
        <CustomModal
          restaurantId={restaurantId}
          textToDisplay="Proceed to Cart"
          comp="Cart"
        />
      )}

      {!modalVisible && (
        <CustomModal textToDisplay="Your cart is empty" comp="" />
      )}
    </View>
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F3F3",
  },
  listContent: {
    paddingBottom: 130,
  },
  header: {
    backgroundColor: "#F7F3F3",
  },
  heroImage: {
    width: "100%",
    height: 210,
    backgroundColor: "#EFEAEA",
  },
  restaurantPanel: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: -28,
    borderRadius: 22,
    padding: 16,
    shadowColor: "#1F1A1A",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  titleGroup: {
    flex: 1,
  },
  restaurantName: {
    color: "#262222",
    fontSize: 24,
    fontWeight: "800",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
  },
  locationText: {
    color: "#8B8585",
    fontSize: 13,
    fontWeight: "500",
  },
  ratingBadge: {
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 999,
    backgroundColor: "#D33135",
    paddingHorizontal: 10,
  },
  ratingText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 16,
  },
  metaPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 999,
    backgroundColor: "#F8EFEF",
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  metaText: {
    color: "#6F6666",
    fontSize: 12,
    fontWeight: "700",
  },
  couponBanner: {
    height: 50,
    marginTop: 16,
    borderRadius: 16,
    backgroundColor: "#FFF3F3",
    borderWidth: 1,
    borderColor: "#F5DCDC",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  couponText: {
    color: "#D33135",
    fontSize: 14,
    fontWeight: "800",
  },
  couponIcon: {
    width: 26,
    height: 26,
    borderRadius: 999,
    backgroundColor: "#D33135",
    alignItems: "center",
    justifyContent: "center",
  },
  menuTitle: {
    color: "#262222",
    fontSize: 17,
    fontWeight: "800",
    marginTop: 18,
  },
  dishCard: {
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 14,
    shadowColor: "#1F1A1A",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 3,
  },
  dishInfo: {
    flex: 1,
    paddingVertical: 2,
  },
  dietMarker: {
    width: 16,
    height: 16,
    borderWidth: 1.4,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
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
  dishName: {
    color: "#262222",
    fontSize: 16,
    fontWeight: "800",
  },
  dishDescription: {
    color: "#8B8585",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 17,
    marginTop: 5,
  },
  price: {
    color: "#262222",
    fontSize: 15,
    fontWeight: "800",
    marginTop: 10,
  },
  dishImageGroup: {
    width: 118,
    alignItems: "center",
  },
  dishImage: {
    width: 118,
    height: 96,
    borderRadius: 15,
    backgroundColor: "#EFEAEA",
  },
  addButtonWrap: {
    minWidth: 86,
    minHeight: 34,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F0DADA",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -17,
    shadowColor: "#1F1A1A",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  quantityControl: {
    minWidth: 112,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#0F8F45",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: -21,
    paddingHorizontal: 8,
    shadowColor: "#0F8F45",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 5,
  },
  quantityText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
  },
  emptyState: {
    paddingVertical: 46,
    alignItems: "center",
  },
  emptyTitle: {
    color: "#262222",
    fontSize: 18,
    fontWeight: "800",
  },
  emptyText: {
    color: "#8B8585",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 6,
  },
});
