export type RestaurantsType = {
  id: string;
  name: string;
  image: string;
  location: string;
  tags: string[];
  vegOnly: boolean;
  rating: number;
  dishes: DishesType[];
}[];

export type DishesType = {
  id: string;
  name: string;
  price: number;
  image: string;
  dishType: "veg" | "non-veg";
};

export type ItemType = {
  restaurantId: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type CartType = {
  [key: string]: ItemType;
};

export type OrderType = {
  [key: string]: {
    restaurantId: string;
    cartItems: ItemType[];
    totalPrice: number;
    time: Date;
    id: string;
  };
};