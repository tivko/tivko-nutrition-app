import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { fontsSize, hp } from "../../../styles/base";
import Checkbox from "expo-checkbox";
import {
  useMealProgramsContext,
  setStatus,
} from "../../../context/mealProgramsContext";
const StepThree = ({ options, checkedColor }) => {
  const { state: filterState, dispatch: filterDispatch } =
    useMealProgramsContext();
  const [selectedOptions, setSelectedOptions] = useState(
    filterState?.status ? filterState?.status : []
  );

  useEffect(() => {
    filterDispatch(setStatus(selectedOptions));
  }, [selectedOptions]);

  const handleOptionChange = (option) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.includes(option)
        ? prevOptions.filter((item) => item !== option)
        : [...prevOptions, option]
    );
  };

  return (
    <View style={{ paddingHorizontal: hp(2), paddingVertical: hp(2), gap: 10 }}>
      {options.map((option) => (
        <View key={option} style={styles.optionContainer}>
          <Checkbox
            value={selectedOptions.includes(option)}
            onValueChange={() => handleOptionChange(option)}
            style={styles.checkbox}
            color={selectedOptions.includes(option) ? checkedColor : ""}
          />
          <TouchableOpacity onPress={() => handleOptionChange(option)}>
            <Text style={styles.option}>{option}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default StepThree;

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    gap: 5,
  },
  checkbox: {
    width: fontsSize.md,
    height: fontsSize.md,
  },
  option: {
    fontSize: fontsSize.md,
  },
});
