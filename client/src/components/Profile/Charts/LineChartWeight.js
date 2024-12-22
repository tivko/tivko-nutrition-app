import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { hp, wp } from "../../../styles/base";
import { monthsChart } from "../../../help/namesInUkrainian";

const LineChartWeight = (lineData) => {
  const ref = useRef(null);
  function extractNumber(label) {
    return parseInt(label.split(" ")[0]);
  }

  // Функція для вилучення місяця з рядка
  function extractMonth(label) {
    const month = label.split(" ")[1];
    return monthsChart.indexOf(month);
  }

  if (lineData?.lineData) {
    console.log(lineData);
    lineData?.lineData.sort((a, b) => {
      const numA = extractNumber(a.label);
      const numB = extractNumber(b.label);
      const monthA = extractMonth(a.label);
      const monthB = extractMonth(b.label);

      // Порівнюємо спочатку місяці, а потім дні
      if (monthA === monthB) {
        return numA - numB;
      } else {
        return monthA - monthB;
      }
    });
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", marginLeft: 8 }}>
        <LineChart
          scrollRef={ref}
          spacing={hp(15)}
          data={lineData.lineData}
          curved
          initialSpacing={wp(10)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default LineChartWeight;
