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
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type CartType = {
  [key: string]: ItemType;
};
