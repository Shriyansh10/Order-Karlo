import { View, ActivityIndicator, StyleSheet } from "react-native";

function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#D33135" />
    </View>
  );
}

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
  },
});
