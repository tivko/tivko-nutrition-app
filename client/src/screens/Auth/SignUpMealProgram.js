import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import BackgroundImage from "../../components/Layout/BackgroundImage";
import styles from "../../styles/login/loginStyles";
import TitleText from "../../components/Form/TitleText";
import { countAll } from "../../help/calculateParams";
import { colors, fontsSize } from "../../styles/base";
import SubmitFormButton from "../../components/Form/SubmitFormButton";
import MealProgramChart from "../../components/Form/MealProgramChart";
import { getAuth } from "firebase/auth";
import {
  setRegData,
  setTempId,
  setUserId,
  setMealProgram,
  useAppContext,
} from "../../context/mealContext";
import useAxios from "../../hooks/useAxios";
const SignUpMealProgram = ({ navigation }) => {
  const [program, setProgram] = useState(null);
  const [chartData, setChartData] = useState(null);
  const { dispatch, state } = useAppContext();
  const auth = getAuth();
  const {
    data: result,
    loading: axiosLoading,
    error: requestError,
    sendRequest,
  } = useAxios();
  const {
    data: createDailyInfo,
    loading: createLoadingDailyInfo,
    sendRequest: sendCreateDailyInfo,
  } = useAxios();

  const convertData = (macros) => {
    const total = macros.carbs + macros.fat + macros.protein;
    return [
      {
        value: macros?.carbs,
        color: colors.chartColor1,
        text: `${((macros.carbs / total) * 100).toFixed(1)}%`,
      },
      {
        value: macros?.fat,
        color: colors.chartColor2,
        text: `${((macros.fat / total) * 100).toFixed(1)}%`,
      },
      {
        value: macros?.protein,
        color: colors.chartColor3,
        text: `${((macros.protein / total) * 100).toFixed(1)}%`,
      },
    ];
  };

  useEffect(() => {
    const healthData = state?.regData?.healthInfo;
    const activityLevel = state?.regData?.activityLevel;
    const mealProgram = state?.regData?.mealProgram;
    const macros = state?.regData?.macros;
    const res = countAll(
      healthData?.gender,
      healthData?.weight,
      healthData?.age,
      healthData?.height,
      healthData?.bodyfat,
      activityLevel,
      mealProgram?.goal,
      mealProgram?.expectedWeight,
      macros
    );
    setProgram(res);
    const chart = convertData(macros);
    setChartData(chart);
  }, []);

  const nextPressed = () => {
    createInfo();
  };

  useEffect(() => {
    if (result) {
      sendCreateDailyInfo("dailyinfo/create", {
        date: new Date().toISOString().slice(0, 10),
        dailyCarbohydrates: 0,
        dailyCalories: 0,
        dailyProteins: 0,
        dailyFat: 0,
        currentWeight: result?.result.startWeight,
        mealProgram: result?.result.id,
        mealsNumber: 3,
      });
    }
  }, [result]);

  useEffect(() => {
    if (createDailyInfo) {
      if (!state.id) {
        dispatch(setUserId(auth.currentUser?.uid));
        dispatch(setTempId(null));
        dispatch(setRegData({ healthInfo: state.regData.healthInfo }));
        dispatch(setMealProgram(result?.result));
      } else {
        dispatch(setTempId(null));
        dispatch(setRegData({ healthInfo: state.regData.healthInfo }));
        dispatch(setMealProgram(result?.result));
      }
    }
  }, [createDailyInfo]);

  const createInfo = async () => {
    const currentDate = new Date();
    let endDate = new Date();
    let weeks = program?.weeks || 0;
    if (program?.weeks) {
      weeks = program?.weeks;
      endDate.setDate(currentDate.getDate() + weeks * 7);
    } else {
      endDate = null;
    }

    await sendRequest("mealprogram/create", {
      goal: state?.regData?.mealProgram?.goal?.id,
      activityLevel: state?.regData?.activityLevel.id,
      requiredCalories: program?.calories,
      requiredFat: program?.pcf?.fatGrams,
      requiredCarbohydrates: program?.pcf?.carbsGrams,
      requiredProteins: program?.pcf?.proteinGrams,
      startWeight: state?.regData?.healthInfo?.weight,
      expectedWeight:
        state?.regData?.mealProgram?.expectedWeight ===
        state?.regData?.healthInfo?.weight
          ? null
          : state?.regData?.mealProgram?.expectedWeight,
      macroSplitDietCarbs: state?.regData?.macros?.carbs,
      macroSplitDietProtein: state?.regData?.macros?.protein,
      macroSplitDietFat: state?.regData?.macros?.fat,
      startDate: currentDate.toISOString().split("T")[0],
      endDate: endDate !== null ? endDate.toISOString().split("T")[0] : null,
      actualEndDate:
        endDate !== null ? endDate.toISOString().split("T")[0] : null,
    });
    return;
  };

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <TitleText main={"Програма харчування"} />
        <View>
          <View
            style={{
              marginVertical: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: fontsSize.md }}>
              Норма калорій на день:
            </Text>
            <Text style={{ fontSize: fontsSize.md, fontWeight: "800" }}>
              {program?.calories} Калорії/день {"("}
              {program?.kJ} кДж/день{")"}
            </Text>
          </View>

          {chartData ? (
            <MealProgramChart chartData={chartData} mealProgram={program} />
          ) : (
            <ActivityIndicator size="large" />
          )}

          {program?.weeks && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: fontsSize.md }}>
                Орієнтовний термін досягнення цілі:
              </Text>
              <Text style={{ fontSize: fontsSize.md, fontWeight: "800" }}>
                {program?.weeks} тижнів
              </Text>
            </View>
          )}
        </View>
        <SubmitFormButton
          text={axiosLoading ? "Завантаження..." : "Розпочати програму"}
          onPress={nextPressed}
        />
      </View>
    </BackgroundImage>
  );
};

export default SignUpMealProgram;
