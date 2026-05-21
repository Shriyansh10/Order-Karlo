import AsyncStorage from "@react-native-async-storage/async-storage";

export type ExpectedDataType = {
  name: string;
  email: string;
  password: string;
} | boolean | {
  name: string;
  email: string;
}| string;

export const setData = async (
  key: string,
  data: ExpectedDataType,
) => {
  try {
    await AsyncStorage.setItem(
      key,
      JSON.stringify(data === false ? null : data),
    );
    console.log("User data saved to AsyncStorage");
  } catch (error) {
    console.error("Error saving user data to AsyncStorage", error);
  }
};

export const getData = async (key: string) => {
    try {

        const userData = await AsyncStorage.getItem(key);
        if (userData) {
            return JSON.parse(userData);
        }   
        return null;
    }
    catch (error) { 
        console.error("Error retrieving user data from AsyncStorage", error);
        return null;
    }
}

export const removeData = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
        console.log("User data removed from AsyncStorage");
    }
    catch (error) { 
        console.error("Error removing user data from AsyncStorage", error);
    }
}

