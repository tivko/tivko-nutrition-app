import { Text, View, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import BackgroundImage from "../../../components/Layout/BackgroundImage";
import styles from "../../../styles/login/loginStyles";
import { setMealProgram, useAppContext } from "../../../context/mealContext";
import MealProgramChart from "../../../components/Form/MealProgramChart";
import { colors, fontsSize, hp, wp } from "../../../styles/base";
import { caloriesIntoKJ } from "../../../help/calculateParams";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import useAxios from "../../../hooks/useAxios";
import { AntDesign } from "@expo/vector-icons";
const ViewPlanInfoScreen = () => {
  const navigation = useNavigation();
  const { state, dispatch } = useAppContext();
  const mealProgram = state?.mealProgram;
  const [chartData, setChartData] = useState(null);
  const [pcf, setPcf] = useState({});
  const cal = mealProgram.requiredCalories;
  const calKj = caloriesIntoKJ(cal);
  const { endDate, startDate, startWeight, expectedWeight } = mealProgram;
  const [info, setInfo] = useState(null);
  const formattedStartDate = moment(startDate).format("DD-MM-YYYY");
  const formattedEndDate = endDate
    ? moment(endDate).format("DD-MM-YYYY")
    : null;
  const {
    data: result,
    loading: axiosLoading,
    error: requestError,
    sendRequest,
  } = useAxios();

  useEffect(() => {
    const macros = {
      carbs: mealProgram.macroSplitDietCarbs,
      fat: mealProgram.macroSplitDietFat,
      protein: mealProgram.macroSplitDietProtein,
    };
    const pcf = {
      proteinGrams: mealProgram.requiredProteins,
      carbsGrams: mealProgram.requiredCarbohydrates,
      fatGrams: mealProgram.requiredFat,
    };
    const chart = convertData(macros);
    setChartData(chart);
    setPcf({ pcf });

    if (endDate) {
      const start = moment(startDate);
      const end = moment(endDate);
      const duration = moment.duration(end.diff(start));
      const days = Math.floor(duration.asDays());
      const weeks = Math.floor(days / 7);

      const remainingDays = days % 7;

      let daysText = "днів";
      if (days % 10 === 1 && days % 100 !== 11) {
        daysText = "день";
      } else if (
        days % 10 > 1 &&
        days % 10 < 5 &&
        !(days % 100 > 10 && days % 100 < 20)
      ) {
        daysText = "дні";
      }

      let remainingDaysText = "днів";
      if (remainingDays === 1) {
        remainingDaysText = "день";
      } else if (remainingDays > 1 && remainingDays < 5) {
        remainingDaysText = "дні";
      }

      const remainingDaysInfo =
        remainingDays > 0 ? ` і ${remainingDays} ${remainingDaysText}` : "";
      setInfo(
        `Очікуваний термін завершення плану - ${days} ${daysText} ${
          weeks > 0 ? `(${weeks} тижнів${remainingDaysInfo})` : ""
        }`
      );
    } else {
      setInfo(
        `План для підтримки ваги.\n Цільова вага: ${state?.regData?.healthInfo?.weight}`
      );
    }
  }, []);

  useEffect(() => {
    if (result?.result) {
      dispatch(setMealProgram(null));
      navigation.reset({
        index: 0,
        routes: [{ name: "ProfileScreen" }],
      });
    }
  }, [result]);

  const deleteProgram = async () => {
    await sendRequest(
      `mealprogram/update/${mealProgram.id}`,
      {
        status: "Не завершено",
      },
      "PATCH"
    );
  };

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
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: colors.primary,
          paddingVertical: hp(1.8),
          paddingHorizontal: wp(5),
          alignItems: "center",
          gap: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <AntDesign
              name="arrowleft"
              size={fontsSize.lg}
              color={colors.default}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.mainTextContainer}>
          <Text style={{ fontSize: fontsSize.lg, color: colors.default }}>
            Програма харчування
          </Text>
        </View>
      </View>
      <BackgroundImage>
        <View style={styles.container}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: fontsSize.md }}>
              Поточний план харчування
            </Text>
            <Text style={{ fontSize: fontsSize.md }}>
              {formattedStartDate}{" "}
              {formattedEndDate ? `- ${formattedEndDate}` : ""}
            </Text>
          </View>
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
              {cal} ккал/день {"("}
              {calKj} кДж/день{")"}
            </Text>
          </View>
          {chartData && pcf ? (
            <MealProgramChart chartData={chartData} mealProgram={pcf} />
          ) : (
            <ActivityIndicator size="large" />
          )}
          <View
            style={{
              flexDirection: "row",
              marginVertical: 10,
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Text
              style={{
                fontSize: fontsSize.md,
                fontWeight: "800",
                textAlign: "center",
              }}
            >
              {info}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
            }}
          >
            <TouchableOpacity onPress={deleteProgram}>
              <FontAwesome name="trash-o" size={fontsSize.lg} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </BackgroundImage>
    </>
  );
};

export default ViewPlanInfoScreen;
