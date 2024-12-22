import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { PieChart } from "react-native-gifted-charts";
import { fontsSize, hp, wp, colors } from "../../styles/base";

const MealProgramChart = ({ chartData, mealProgram }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Розподіл Б-Ж-В</Text>
      <View style={styles.chartWrapper}>
        <PieChart
          showText
          textColor={colors.default}
          radius={hp(9)}
          textSize={hp(1.7)}
          data={chartData}
        />
        <View>
          {["carbs", "fat", "protein"].map((macro, idx) => (
            <View key={macro} style={styles.macroRow}>
              <View
                style={[
                  styles.macroColor,
                  { backgroundColor: colors[`chartColor${idx + 1}`] },
                ]}
              />
              <Text style={styles.text}>
                {macro === "fat" ? "Ж" : macro === "carbs" ? "В" : "Б"}:{" "}
                {mealProgram.pcf[`${macro}Grams`]} г/день
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default MealProgramChart;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    width: wp(80),
  },
  title: {
    fontSize: fontsSize.lg,
    fontWeight: "500",
    paddingBottom: 10,
  },
  chartWrapper: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
  },
  macroRow: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  macroColor: {
    height: hp(1),
    width: hp(1),
    borderRadius: 100,
  },
  text: {
    fontSize: fontsSize.md,
  },
});
