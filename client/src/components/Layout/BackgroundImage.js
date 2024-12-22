import { StyleSheet, ImageBackground } from "react-native";
import React from "react";

const BackgroundImage = ({ children }) => {
  return (
    <ImageBackground
      source={require("../../../assets/img6.jpg")}
      resizeMode="cover"
      style={styles.imageBackground}
      blurRadius={0}
    >
      {children}
    </ImageBackground>
  );
};

export default BackgroundImage;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    backgroundColor: "#f6f6f8",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 20,
    paddingLeft: 20,
    gap: 10,
  },
});
