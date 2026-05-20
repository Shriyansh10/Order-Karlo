import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Label } from "@react-navigation/elements";
import {
  ProfileContext,
  type ProfileContextType,
  type ProfileType,
} from "../../context/ProfileContext";

const ProfileScreen = () => {
  const context = React.useContext<ProfileContextType>(ProfileContext);
  const profile = context!.profile as ProfileType;

  return (
    <View>
      <Label>Name</Label>
      <Text>{profile.name}</Text>
      <Label>Email</Label>
      <Text>{profile.email}</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
