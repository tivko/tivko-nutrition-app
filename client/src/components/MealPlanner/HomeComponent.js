import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import Header from "../../components/Layout/Header";
import PickerComponent from "../Form/PickerComponent";
import { fontsSize, hp, wp } from "../../styles/base";
import MacrosChart from "../../components/MealPlanner/MacrosChart";
import {
  getMealCoefficientDistribution,
  getMealDistribution,
} from "../../help/calculateParams";
import { mealNamesInUkrainian } from "../../help/namesInUkrainian";
import {
  useDailyFoodContext,
  updateInfo,
  setNumberOfMeals,
} from "../../context/dailyFoodContext";
import MealDailyInfo from "../FoodSearch/MealDailyInfo";
import { formatDate } from "../../help/utils";
import { useAppContext } from "../../context/mealContext";

const HomeComponent = ({
  date,
  mealsNumber,
  mealsTotalInfo,
  user,
  idDailyInfo,
}) => {
  const [mealNumbers, setMealNumbers] = useState(mealsNumber);
  const [selectedMeal, setSelectedMeal] = useState("breakfast");
  const [mealDistribution, setMealDistribution] = useState({});

  const { state: dailyFoodState, dispatch: dailyFoodDispatch } =
    useDailyFoodContext();

  const consumedInfo = dailyFoodState?.consumedInfo;
  const mealOptions = Object.keys(mealDistribution).map((meal) => ({
    name: mealNamesInUkrainian[meal],
    id: meal,
  }));

  const mealItems = [
    { name: "3", id: "3" },
    { name: "4", id: "4" },
    { name: "5", id: "5" },
  ];

  useEffect(() => {
    handleMealDistributionUpdate(mealsTotalInfo, mealNumbers);
    dailyFoodDispatch(setNumberOfMeals(mealNumbers));
  }, [mealNumbers, selectedMeal, consumedInfo]);

  const handleMealDistributionUpdate = (mealsTotalInfo, mealNumbers) => {
    const coefficient = getMealCoefficientDistribution(mealNumbers);
    const newMealDistribution = getMealDistribution(
      mealsTotalInfo,
      coefficient
    );
    setMealDistribution(newMealDistribution);
    Object.keys(newMealDistribution).forEach((mealType) => {
      const value = {
        calories: newMealDistribution[mealType].calories.average,
        carbohydrates: newMealDistribution[mealType].carbohydrates.average,
        proteins: newMealDistribution[mealType].proteins.average,
        fat: newMealDistribution[mealType].fat.average,
        dish: mealType,
      };
      dailyFoodState[mealType].items.forEach((dish) => {
        value.calories = value.calories - dish.calories;
        value.carbohydrates = value.carbohydrates - dish.carbohydrates;
        value.proteins = value.proteins - dish.protein;
        value.fat = value.fat - dish.fat;
      });
      dailyFoodDispatch(updateInfo(mealType, value));
    });

    if (!newMealDistribution[selectedMeal]) {
      setSelectedMeal(Object.keys(newMealDistribution)[0]);
    }
  };

  const areAllConsumedValuesZero = (consumedInfo) => {
    return (
      consumedInfo.dailyCalories === 0 &&
      consumedInfo.dailyCarbohydrates === 0 &&
      consumedInfo.dailyFat === 0 &&
      consumedInfo.dailyProteins === 0
    );
  };

  return (
    <View>
      <Header user={user} />
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{formatDate(date)}</Text>
      </View>
      <MacrosChart
        mealsTotalInfo={mealsTotalInfo}
        consumedInfo={consumedInfo}
      />
      <View style={styles.pickerContainer}>
        <PickerComponent
          selectedValue={mealNumbers}
          onValueChange={setMealNumbers}
          items={mealItems}
          alert={true}
          myText={"Кількість прийомів їжі:"}
          enabled={areAllConsumedValuesZero(dailyFoodState.consumedInfo)}
        />

        <PickerComponent
          selectedValue={selectedMeal}
          onValueChange={setSelectedMeal}
          myText={"Прийом їжі: "}
          items={mealOptions}
        />
      </View>
      <View
        style={{
          paddingTop: hp(1),
          paddingBottom: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MealDailyInfo
          consumedInfo={consumedInfo}
          mealDistribution={mealDistribution}
          mealNamesInUkrainian={mealNamesInUkrainian}
          selectedMeal={selectedMeal}
          idDailyInfo={idDailyInfo}
        />
      </View>
    </View>
  );
};

export default HomeComponent;

const styles = StyleSheet.create({
  dateContainer: {
    paddingTop: hp(1.2),
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    paddingTop: 12,
    justifyContent: "center",
    gap: hp(1),
    alignItems: "center",
  },
  dateText: {
    fontSize: fontsSize.lg,
    fontWeight: "600",
  },
});
