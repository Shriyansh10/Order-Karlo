import {
  StyleSheet,
  Text,
  View,
  Switch,
  Modal,
  Pressable,
  FlatList,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { restaurantsData } from "../data/restaurantData";
import { type RestaurantsType } from "../context/DataTypes";
import HomescreenRestaurantCard from "../components/HomescreenRestaurantCard";

const Homescreen = ({ searchText, vegOnly }: { searchText: string; vegOnly: boolean }) => {
  const navigation = useNavigation<any>();
  // const [vegOnly, setVegOnly] = React.useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);

  const [filteredRestaurants, setFilteredRestaurants] =
    React.useState<RestaurantsType>(restaurantsData);

  // const toggleSwitch = () => {
  //   setVegOnly((previousState) => !previousState);
  //   if (vegOnly === false) {
  //     setFilteredRestaurants(
  //       restaurantsData.filter((restaurant) => {
  //         if (restaurant.vegOnly === true) {
  //           return true;
  //         }
  //       }),
  //     );
  //   } else {
  //     setFilteredRestaurants(restaurantsData);
  //   }
  // };

  React.useEffect(() => {
    if (vegOnly === true) {
      if (searchText === "") {
        setFilteredRestaurants(
          restaurantsData.filter((restaurant) => {
            if (restaurant.vegOnly === true) {
              return true;
            }
          }),
        );
      } else
        setFilteredRestaurants(
          restaurantsData.filter((restaurant) => {
            if (
              restaurant.name
                .toLowerCase()
                .includes(searchText.toLowerCase()) &&
              restaurant.vegOnly === true
            ) {
              return true;
            }
          }),
        );
    } else {
      setFilteredRestaurants(
        restaurantsData.filter((restaurant) => {
          if (
            restaurant.name.toLowerCase().includes(searchText.toLowerCase())
          ) {
            return true;
          }
        }),
      );
    }
  }, [searchText, vegOnly]);

  return (
    <View
      style={{
        width: "90%",
        marginHorizontal: "auto",
        alignItems: "center",
        gap: 20,
        marginBottom: 10,
      }}
    >
      <View>
        {/* <View>
          <Text>Veg mode</Text>
          <Switch
            trackColor={{ false: "#7d1a1a", true: "#3ba70d" }}
            thumbColor="#fff"
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={vegOnly}
          />
        </View> */}
        {/* <View>
          <Pressable
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text>Filters</Text>
          </Pressable>

          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
          >
            <View>
              <Text>Filters</Text>
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text>X</Text>
              </Pressable>
            </View>
            <View>
              <Text>Sort by</Text>
              <Pressable>
                <Text>Ratings</Text>
              </Pressable>
            </View>
          </Modal>
        </View> */}
      </View>

      <FlatList
        data={filteredRestaurants}
        style={{ width: "100%", marginBottom: 120 }}
        renderItem={({ item }) => {
          return (
            <Pressable
              style={{ width: "100%", marginBottom: 20 }}
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
      />
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({});
