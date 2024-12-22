import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import useAxios from "../../../hooks/useAxios";
import { colors, fontsSize, hp, wp } from "../../../styles/base";
import MealProgramChart from "../../../components/Form/MealProgramChart";
import { caloriesIntoKJ } from "../../../help/calculateParams";
import DateDisplay from "../../../components/MealPlanner/DateDisplay";
import { formatDate } from "../../../help/utils";
import ConsumedFood from "../../../components/Profile/ConsumedFood";
import LoadingComponent from "../../../components/Layout/LoadingComponent";
import { useNavigation } from "@react-navigation/native";

const ViewPlanInfo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { idPlan, dietaValues } = route.params;
  const [mealProgram, setMealProgram] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [pcf, setPcf] = useState({});
  const [cal, setCal] = useState();
  const [calKj, setCalKj] = useState();
  const [date, setDate] = useState();
  const [loading, setLoading] = useState();

  const {
    data: result,
    loading: axiosLoading,
    error: axiosError,
    sendRequest: sendRequest,
  } = useAxios();

  useEffect(() => {
    const fetchInfo = async () => {
      sendRequest(`mealprogram/mealprogram-dailyinfo/${idPlan}`);
    };
    setLoading(true);
    fetchInfo();
  }, []);

  useEffect(() => {
    if (result) {
      setMealProgram(result?.result[0]);
      const info = result?.result[0];
      setCal(info.requiredCalories);
      setCalKj(caloriesIntoKJ(info.requiredCalories));
      setDate(info.startDate);
      const macros = {
        carbs: info.macroSplitDietCarbs,
        fat: info.macroSplitDietFat,
        protein: info.macroSplitDietProtein,
      };
      const chart = convertData(macros);
      setChartData(chart);
      const pcf = {
        proteinGrams: info.requiredProteins,
        carbsGrams: info.requiredCarbohydrates,
        fatGrams: info.requiredFat,
      };
      setPcf({ pcf });
      setLoading(false);
    }
  }, [result]);

  useEffect(() => {
    if (axiosError) {
      setLoading(false);
      setDailyInfoResult(null);
    }
  }, [axiosError]);

  const matchingDiet = dietaValues.find(
    (diet) =>
      diet?.carbs === mealProgram?.macroSplitDietCarbs &&
      diet?.fat === mealProgram?.macroSplitDietFat &&
      diet?.protein === mealProgram?.macroSplitDietProtein
  );

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
  if (axiosLoading || loading || chartData || pcf) {
    <LoadingComponent />;
  }
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.default }}>
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
          <Text style={styles.mainText}>Програма харчування</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={[styles.text, styles.bold]}>Початок:</Text>
          <Text style={styles.text}>{formatDate(mealProgram?.startDate)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.text, styles.bold]}>Кінець:</Text>
          <Text style={styles.text}>
            {mealProgram?.endDate !== null
              ? `${formatDate(mealProgram?.endDate)}`
              : "Не визначено"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.text, styles.bold]}>Статус:</Text>
          <Text style={styles.text}>{mealProgram?.status}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.text, styles.bold]}>Ціль:</Text>
          <Text style={styles.text}>{mealProgram?.goal?.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.text, styles.bold]}>Активність:</Text>
          <Text style={styles.text}>{mealProgram?.activityLevel?.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.text, styles.bold]}>Початкова вага:</Text>
          <Text style={styles.text}>{mealProgram?.startWeight}кг.</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.text, styles.bold]}>Цільова вага:</Text>
          <Text style={styles.text}>
            {mealProgram?.expectedWeight !== null
              ? mealProgram?.expectedWeight
              : mealProgram?.startWeight}
            кг.
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.text, styles.bold]}>Дієта:</Text>
          <Text style={styles.text}>
            {matchingDiet !== null
              ? matchingDiet?.name
              : "Самостійно створена дієта"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.text, styles.bold]}>Калорій:</Text>
          <Text style={styles.text}>
            {cal} ккал/день ({calKj} кДж)
          </Text>
        </View>
      </View>
      {chartData && pcf ? (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <MealProgramChart chartData={chartData} mealProgram={pcf} />
        </View>
      ) : (
        <ActivityIndicator size="large" />
      )}
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <DateDisplay
          date={date}
          startDate={mealProgram?.startDate}
          endDate={mealProgram?.actualEndDate}
          setDate={setDate}
        />
      </View>
      <View style={styles.container}>
        <ConsumedFood date={date} id={mealProgram?.id} />
      </View>
    </ScrollView>
  );
};

export default ViewPlanInfo;

const styles = StyleSheet.create({
  mainText: {
    fontSize: fontsSize.lg,
    color: colors.default,
  },
  mainTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingVertical: hp(1),
    gap: 10,
  },
  text: {
    fontSize: fontsSize.md,
  },
  bold: {
    fontWeight: "800",
  },
  container: {
    paddingHorizontal: hp(2),
    paddingTop: hp(1),
  },
});
