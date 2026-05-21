import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  ProfileContext,
  type ProfileContextType,
  type ProfileType,
} from "../../context/ProfileContext";

const ProfileScreen = () => {
  const context = React.useContext<ProfileContextType>(ProfileContext);
  const profile = context!.profile as ProfileType;

  return (
    <View style={styles.screen}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {profile.name?.charAt(0).toUpperCase()}
        </Text>
      </View>

      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Your account details</Text>

      <View style={styles.card}>
        <View style={styles.field}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{profile.name}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{profile.email}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F3F3",
    paddingHorizontal: 22,
    paddingTop: 38,
  },
  avatar: {
    width: 82,
    height: 82,
    borderRadius: 24,
    backgroundColor: "#D33135",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#D33135",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.22,
    shadowRadius: 16,
    elevation: 5,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "900",
  },
  title: {
    color: "#262222",
    fontSize: 30,
    fontWeight: "900",
  },
  subtitle: {
    color: "#8B8585",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 6,
    marginBottom: 22,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#EEE4E4",
    shadowColor: "#1F1A1A",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
  field: {
    paddingVertical: 16,
  },
  label: {
    color: "#8B8585",
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 6,
  },
  value: {
    color: "#262222",
    fontSize: 16,
    fontWeight: "800",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEE4E4",
  },
});
