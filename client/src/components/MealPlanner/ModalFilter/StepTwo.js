import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { fontsSize, hp } from "../../../styles/base";
import { FontAwesome } from "../../../styles/icons";
import Checkbox from "expo-checkbox";
import {
  useMealProgramsContext,
  setGoals,
} from "../../../context/mealProgramsContext";

const StepTwo = ({ options, checkedColor }) => {
  const { state: filterState, dispatch: filterDispatch } =
    useMealProgramsContext();
  const [selectedOptions, setSelectedOptions] = useState(
    filterState?.goals ? filterState?.goals : []
  );

  useEffect(() => {
    filterDispatch(setGoals(selectedOptions));
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
        <View key={option.id} style={styles.optionContainer}>
          <Checkbox
            value={selectedOptions.includes(option.id)}
            onValueChange={() => handleOptionChange(option.id)}
            style={styles.checkbox}
            color={selectedOptions.includes(option.id) ? checkedColor : ""}
          />
          <TouchableOpacity onPress={() => handleOptionChange(option.id)}>
            <Text style={styles.option}>{option.name}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default StepTwo;

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
