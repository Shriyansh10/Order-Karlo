import { StyleSheet, Text, View, TextInput} from 'react-native'
import React from 'react'
import { Ionicons } from "@react-native-vector-icons/ionicons";

const HomescreenHeader = ({location, searchText, setSearchText} : {location: string, searchText: string, setSearchText: React.Dispatch<React.SetStateAction<string>>}) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          
        }}
      >
        <Ionicons name="location" size={20} />
        <Text>{location}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          marginTop: 10,
        }}
      >
        <TextInput
          placeholder="Search for restaurants"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
    </View>
  );
}

export default HomescreenHeader

const styles = StyleSheet.create({})