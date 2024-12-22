import { Text, View } from "react-native";
import React from "react";
import { colors, fontsSize } from "../../styles/base";

const BmiInfo = ({ totalRecomendations }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontSize: fontsSize.sm, color: colors.text }}>
        ІМТ: {totalRecomendations?.bmi}
      </Text>
      <Text style={{ fontSize: fontsSize.sm, color: colors.text }}>
        Рекомендована вага:{" "}
        {totalRecomendations?.recommendedWeight?.lowerWeight} -{" "}
        {totalRecomendations?.recommendedWeight?.upperWeight} кг
      </Text>
    </View>
  );
};

export default BmiInfo;
