import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors, fontsSize, hp } from "../../styles/base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const NutrientInfoBox = ({ name, value, icon }) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={icon} size={hp(2.8)} color="black" />
      <View style={styles.text}>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>{value} гр</Text>
      </View>
    </View>
  );
};

export default NutrientInfoBox;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.primary,
    borderWidth: 2,
    width: hp(10),
    height: hp(10),
    borderRadius: 100,
  },
  text: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: fontsSize.sm,
  },
});
