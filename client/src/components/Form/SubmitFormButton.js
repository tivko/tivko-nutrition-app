import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import { wp, hp, fontsSize, colors } from "../../styles/base";
const SubmitFormButton = ({
  onPress,
  text,
  type = "PRIMARY",
  bgColor,
  width,
  height,
  disabled,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
        width ? { width: width } : { width: wp("80%") },
        height ? { height: height } : { height: hp("6%") },
      ]}
      disabled={disabled}
    >
      <Text style={styles.btntext}>{text}</Text>
    </Pressable>
  );
};

export default SubmitFormButton;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  container_PRIMARY: {
    backgroundColor: colors.primary,
  },
  btntext: {
    fontSize: fontsSize.md,
    color: colors.default,
  },
});
