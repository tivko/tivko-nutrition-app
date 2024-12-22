import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";

const LoadingComponent = () => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingComponent;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
