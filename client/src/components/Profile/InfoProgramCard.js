import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { fontsSize, hp } from "../../styles/base";

const InfoProgramCard = ({ dailyInfo }) => {
  const { currentWeight, dailyCalories, dailyFat, dailyProteins, date } =
    dailyInfo;

  return (
    <>
      <View style={styles.row}>
        <Text style={[styles.text, styles.bold]}>Вага:</Text>
        <Text style={styles.text}>{currentWeight} кг</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.text, styles.bold]}>Спожито калорій:</Text>
        <Text style={styles.text}>{dailyCalories} ккал/день</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.text, styles.bold]}>Спожито жирів:</Text>
        <Text style={styles.text}>{dailyFat} г/день</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.text, styles.bold]}>Спожито білків:</Text>
        <Text style={styles.text}>{dailyProteins} г/день</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: fontsSize.lg,
  },
  text: {
    fontSize: fontsSize.md,
  },
  bold: {
    fontWeight: "800",
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingVertical: hp(1),
    gap: 10,
  },
});

export default InfoProgramCard;
