import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { hp } from "../../styles/base";

const IngredientItem = ({ count, unit, title, index }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 3,
        paddingLeft: hp(1),
        paddingRight: hp(1),
      }}
    >
      <Text style={{ fontSize: hp(2.1) }}>{index + 1}.</Text>
      <Text style={{ fontSize: hp(2.1) }}>{title} - </Text>
      <Text style={{ fontSize: hp(2.1), fontWeight: "500" }}>
        {count}
        {unit}
      </Text>
    </View>
  );
};

export default IngredientItem;

const styles = StyleSheet.create({});
