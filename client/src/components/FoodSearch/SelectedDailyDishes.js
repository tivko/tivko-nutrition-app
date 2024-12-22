import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { fontsSize, hp, wp } from "../../styles/base";
import { Feather } from "@expo/vector-icons";
const SelectedDailyDishes = ({ dailyRecomendation, dailyItems }) => {
  return (
    <>
      <View style={styles.infoPanel}>
        <Text style={styles.infoText}>
          Ккал.: {dailyRecomendation?.calories.toFixed(2)}
        </Text>
        <Text style={styles.infoText}>
          Вугл.: {dailyRecomendation?.carbohydrates.toFixed(2)}
        </Text>
        <Text style={styles.infoText}>
          Білки: {dailyRecomendation?.proteins.toFixed(2)}
        </Text>
        <Text style={styles.infoText}>
          Жири: {dailyRecomendation?.fat.toFixed(2)}
        </Text>
      </View>
      <View style={styles.dailyItemsContainer}>
        <Text style={styles.dailyItemsTitle}>
          Обрані страви ({dailyItems.length}):
        </Text>
      </View>
    </>
  );
};

export default SelectedDailyDishes;

const styles = StyleSheet.create({
  infoPanel: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: wp(2),
    backgroundColor: "#f2f2f2",
    borderRadius: hp(1),
    marginBottom: wp(2),
  },
  infoText: {
    fontSize: fontsSize.sm,
    color: "#333",
  },
  dailyItemsContainer: {
    paddingBottom: wp(2),
  },
  dailyItemsTitle: {
    fontSize: fontsSize.sm,
  },
});
