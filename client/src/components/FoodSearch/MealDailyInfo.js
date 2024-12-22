import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { colors, fontsSize, wp } from "../../styles/base";
import { useNavigation } from "@react-navigation/native";

const MealDailyInfo = ({
  mealDistribution,
  mealNamesInUkrainian,
  selectedMeal,
  idDailyInfo,
  consumedInfo,
}) => {
  const meal = mealDistribution[selectedMeal];
  const navigation = useNavigation();
  if (!meal) return null;

  return (
    <View style={styles.mealInfoContainer}>
      <Text style={styles.mealTitle}>{mealNamesInUkrainian[selectedMeal]}</Text>
      <Text style={{ fontWeight: "600", fontSize: fontsSize.md }}>
        Калорії: {meal.calories.average}ккал
      </Text>
      <Text style={{ fontSize: fontsSize.sm }}>
        min: {meal.calories.min}ккал - max: {meal.calories.max}ккал
      </Text>
      <Text style={{ fontWeight: "600", fontSize: fontsSize.md }}>
        Білки: {meal.proteins.average}г
      </Text>
      <Text style={{ fontSize: fontsSize.sm }}>
        min: {meal.proteins.min}г - max: {meal.proteins.max}г
      </Text>
      <Text style={{ fontWeight: "600", fontSize: fontsSize.md }}>
        Жири: {meal.fat.average}г
      </Text>
      <Text style={{ fontSize: fontsSize.sm }}>
        min: {meal.fat.min}г - max: {meal.fat.max}г
      </Text>
      <Text style={{ fontWeight: "600", fontSize: fontsSize.md }}>
        Вуглеводи: {meal.carbohydrates.average}г
      </Text>
      <Text style={{ fontSize: fontsSize.sm }}>
        min: {meal.carbohydrates.min}г. - max: {meal.carbohydrates.max}г.
      </Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("DailyDishes", {
            info: {
              dish: selectedMeal,
              idDailyInfo: idDailyInfo,
              consumedInfo: consumedInfo,
            },
          })
        }
        style={styles.viewDishesButton}
      >
        <Text style={styles.viewDishesButtonText}>
          Переглянути обрані страви
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MealDailyInfo;

const styles = StyleSheet.create({
  mealsContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  mealInfoContainer: {
    width: wp(80),
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    paddingTop: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    alignItems: "center",
  },
  mealTitle: {
    fontSize: fontsSize.lg,
    fontWeight: "bold",
    marginBottom: 5,
  },
  viewDishesButton: {
    paddingTop: 10,
  },
  viewDishesButtonText: {
    color: colors.primary,
    fontSize: fontsSize.md,
    paddingBottom: 15,
  },
});
