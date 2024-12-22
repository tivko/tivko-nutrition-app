import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { CircularProgressBase } from "react-native-circular-progress-indicator";
import { fontsSize, hp, wp } from "../../styles/base";

const { width } = Dimensions.get("window");
const isTablet = width > 600;

const chartColors = {
  red: "#EB0901",
  green: "#64EB28",
  blue: "#0702EB",
  yellow: "#EAE700",
};

const MacrosChart = ({ consumedInfo, mealsTotalInfo }) => {
  const [percentages, setPercentages] = useState(null);

  useEffect(() => {
    if (consumedInfo && mealsTotalInfo) {
      setPercentages({
        calories: consumedInfo.dailyCalories,
        carbohydrates: consumedInfo.dailyCarbohydrates,
        fat: consumedInfo.dailyFat,
        proteins: consumedInfo.dailyProteins,
      });
    }
  }, [consumedInfo, mealsTotalInfo]);

  const props = {
    activeStrokeWidth: hp(isTablet ? 5 : 4),
    inActiveStrokeWidth: hp(isTablet ? 5 : 4),
    inActiveStrokeOpacity: 0.2,
    startAngle: -90,
    clockwise: true,
  };

  const renderNutrientInfo = (color, label, value) => (
    <View style={styles.nutrientRow}>
      <View style={[styles.colorIndicator, { backgroundColor: color }]} />
      <Text style={styles.nutrientText}>{`${label}: ${value}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {percentages ? (
        <>
          <CircularProgressBase
            {...props}
            value={percentages.calories}
            maxValue={mealsTotalInfo.calories}
            radius={hp(isTablet ? 20 : 16)}
            activeStrokeColor={
              percentages.calories > 0 ? chartColors.red : "transparent"
            }
            inActiveStrokeColor={chartColors.red}
          >
            <CircularProgressBase
              {...props}
              value={percentages.proteins}
              radius={hp(isTablet ? 15 : 12)}
              maxValue={mealsTotalInfo.proteins}
              activeStrokeColor={
                percentages.proteins > 0 ? chartColors.green : "transparent"
              }
              inActiveStrokeColor={chartColors.green}
            >
              <CircularProgressBase
                {...props}
                value={percentages.fat}
                radius={hp(isTablet ? 10 : 8)}
                maxValue={mealsTotalInfo.fat}
                activeStrokeColor={
                  percentages.fat > 0 ? chartColors.blue : "transparent"
                }
                inActiveStrokeColor={chartColors.blue}
              >
                <CircularProgressBase
                  {...props}
                  value={percentages.carbohydrates}
                  radius={hp(isTablet ? 5 : 4)}
                  maxValue={mealsTotalInfo.carbohydrates}
                  activeStrokeColor={
                    percentages.carbohydrates > 0
                      ? chartColors.yellow
                      : "transparent"
                  }
                  inActiveStrokeColor={chartColors.yellow}
                />
              </CircularProgressBase>
            </CircularProgressBase>
          </CircularProgressBase>
          <View style={styles.nutrientInfo}>
            <View style={styles.nutrientColumn}>
              {renderNutrientInfo(
                chartColors.red,
                "Ккал",
                `${consumedInfo.dailyCalories} ккал.`
              )}
              {renderNutrientInfo(
                chartColors.green,
                "Білки",
                `${consumedInfo.dailyProteins} г.`
              )}
            </View>
            <View style={styles.nutrientColumn}>
              {renderNutrientInfo(
                chartColors.blue,
                "Жири",
                `${consumedInfo.dailyFat} г.`
              )}
              {renderNutrientInfo(
                chartColors.yellow,
                "Вугл.",
                `${consumedInfo.dailyCarbohydrates} г.`
              )}
            </View>
          </View>
        </>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
};

export default MacrosChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: hp(2),
  },
  nutrientInfo: {
    flexDirection: "row",
    marginTop: hp(2),
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  nutrientRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp(1),
    marginVertical: hp(0.5),
  },
  colorIndicator: {
    width: fontsSize.md,
    height: fontsSize.md,
    borderRadius: wp(2),
    marginRight: wp(2),
  },
  nutrientText: {
    fontSize: fontsSize.md,
    color: "#333",
  },
});
