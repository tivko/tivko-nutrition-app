import { StyleSheet, View, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import useAxios from "../../hooks/useAxios";
import {
  useAppContext,
  setMealProgram,
  setUser,
  setTempId,
} from "../../context/mealContext";
import SubmitFormButton from "../../components/Form/SubmitFormButton";
import HomeComponent from "../../components/MealPlanner/HomeComponent";
import { colors, hp } from "../../styles/base";
import {
  addToDailyItems,
  useDailyFoodContext,
  setConsumedInfo,
  setNumberOfMeals,
  refreshAll,
  updateInfo,
} from "../../context/dailyFoodContext";
import {
  getMealCoefficientDistribution,
  getMealDistribution,
} from "../../help/calculateParams";
import DailyWeight from "../../components/MealPlanner/DailyWeight";

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [userWeight, setUserWeight] = useState(false);
  const [dailyInfo, setDailyInfo] = useState(null);
  const [mealsTotalInfo, setMealsTotalInfo] = useState({});
  const [mealsNumber, setMealsNumber] = useState(3);
  const [food, setFood] = useState([]);

  const { state: dailyFoodState, dispatch: dailyFoodDispatch } =
    useDailyFoodContext();
  const { dispatch, state: appState } = useAppContext();

  const date = new Date().toISOString().slice(0, 10);
  const user = appState?.user;
  const {
    data: programResult,
    loading: programLoading,
    sendRequest: sendProgramRequest,
  } = useAxios();
  const {
    data: dailyInfoResult,
    loading: dailyInfoLoading,
    error: dailyInfoError,
    sendRequest: sendDailyInfoRequest,
  } = useAxios();

  useEffect(() => {
    setDailyInfo(null);
    initialize();
  }, [appState.mealProgram == null]);

  const initialize = () => {
    setLoading(true);
    dailyFoodDispatch(refreshAll());
    sendProgramRequest("mealprogram/mealprogram/Триває");
  };

  useEffect(() => {
    if (programResult?.result?.length > 0) {
      const mealProgram = programResult.result[0];
      setupMealProgram(mealProgram);
      fetchDailyInfo(mealProgram.id);
    } else {
      setUserWeight(false);
      dispatch(setMealProgram(null));
      setDailyInfo(null);
      setLoading(false);
    }
  }, [programResult]);

  const setupMealProgram = (mealProgram) => {
    dispatch(setUser(mealProgram.user));
    dispatch(setMealProgram(mealProgram));
    setMealsTotalInfo({
      calories: mealProgram.requiredCalories,
      carbohydrates: mealProgram.requiredCarbohydrates,
      fat: mealProgram.requiredFat,
      proteins: mealProgram.requiredProteins,
    });
  };

  const fetchDailyInfo = (mealProgramId) => {
    sendDailyInfoRequest(`dailyinfo?date=${date}&mealProgram=${mealProgramId}`);
  };

  useEffect(() => {
    if (dailyInfoResult?.result) {
      handleDailyInfoSuccess(dailyInfoResult.result);
    } else if (!dailyInfoResult?.result) {
      setUserWeight(true);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [dailyInfoResult]);

  useEffect(() => {
    if (dailyInfoError) {
      setUserWeight(true);
      setLoading(false);
    }
  }, [dailyInfoError]);

  const handleDailyInfoSuccess = (result) => {
    setUserWeight(false);
    dailyFoodDispatch(refreshAll());
    setDailyInfo(result);
    setMealsNumber(result?.mealsNumber);
    dailyFoodDispatch(
      setNumberOfMeals({
        mealsNumber: result?.mealsNumber,
      })
    );
    updateConsumedInfo(result);
    setLoading(false);
  };

  const updateConsumedInfo = (result) => {
    const consumed = {
      dailyFat: result.dailyFat,
      dailyProteins: result.dailyProteins,
      dailyCarbohydrates: result.dailyCarbohydrates,
      dailyCalories: result.dailyCalories,
    };
    dailyFoodDispatch(setConsumedInfo(consumed));
  };

  const handleCreateSuccess = (result) => {
    setDailyInfo(result);
    dailyFoodDispatch(
      setConsumedInfo({
        dailyFat: 0,
        dailyProteins: 0,
        dailyCarbohydrates: 0,
        dailyCalories: 0,
      })
    );
    dailyFoodDispatch(
      setNumberOfMeals({
        mealsNumber: 3,
      })
    );
    setLoading(false);
  };

  useEffect(() => {
    if (dailyInfo?.dailyDishes) {
      updateDailyDishes(dailyInfo.dailyDishes);
    }
  }, [dailyInfo]);

  const updateDailyDishes = (dailyDishes) => {
    dailyDishes.forEach((meal) => {
      dailyFoodDispatch(addToDailyItems(meal.mealType, meal.dish));
    });
    setFood(dailyDishes);
    handleMealDistributionUpdate(mealsTotalInfo, mealsNumber);
  };

  useEffect(() => {
    if (mealsTotalInfo && mealsNumber) {
      handleMealDistributionUpdate(mealsTotalInfo, mealsNumber);
    }
  }, [food]);

  const handleMealDistributionUpdate = (mealsTotalInfo, mealsNumber) => {
    const coefficient = getMealCoefficientDistribution(mealsNumber);
    const newMealDistribution = getMealDistribution(
      mealsTotalInfo,
      coefficient
    );
    updateMealDistribution(newMealDistribution);
  };

  const updateMealDistribution = (newMealDistribution) => {
    Object.keys(newMealDistribution).forEach((mealType) => {
      const value = calculateMealValues(
        newMealDistribution[mealType],
        mealType
      );
      dailyFoodDispatch(updateInfo(mealType, value));
    });
  };

  const calculateMealValues = (mealTypeData, mealType) => {
    const initialValue = {
      calories: mealTypeData.calories.average,
      carbohydrates: mealTypeData.carbohydrates.average,
      proteins: mealTypeData.proteins.average,
      fat: mealTypeData.fat.average,
      dish: mealType,
    };
    return dailyFoodState[mealType].items.reduce((acc, dish) => {
      acc.calories -= dish.calories;
      acc.carbohydrates -= dish.carbohydrates;
      acc.proteins -= dish.protein;
      acc.fat -= dish.fat;
      return acc;
    }, initialValue);
  };

  const createProgram = () => {
    dispatch(setTempId(appState.id));
  };

  useEffect(() => {
    if (appState.sub) {
      navigation.navigate("SignUpScreenHealthInfo");
      setLoading(false);
    }
  }, [appState.sub]);

  if (programLoading || dailyInfoLoading || loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (userWeight) {
    return (
      <View style={styles.mainContainer}>
        <DailyWeight
          user={user}
          setUserWeight={setUserWeight}
          date={date}
          handleCreateSuccess={handleCreateSuccess}
          mealProgram={appState?.mealProgram}
          healthInfo={appState?.regData.healthInfo}
        />
      </View>
    );
  }

  return (
    <>
      {dailyInfo ? (
        <ScrollView style={styles.mainContainer}>
          <View style={styles.container}>
            <HomeComponent
              date={date}
              mealsTotalInfo={mealsTotalInfo}
              user={user}
              mealsNumber={mealsNumber}
              idDailyInfo={dailyInfo.id}
            />
          </View>
        </ScrollView>
      ) : (
        <View style={[styles.centeredContainer, styles.mainContainer]}>
          <SubmitFormButton text="Створити програму" onPress={createProgram} />
        </View>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 12,
    backgroundColor: colors.default,
  },
  container: {
    paddingHorizontal: hp(1.2),
    backgroundColor: colors.default,
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: colors.default,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
