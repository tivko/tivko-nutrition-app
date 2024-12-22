import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { colors, fontsSize } from "../../../styles/base";

const StepTabs = ({ step, handleStepChange }) => {
  const tabs = ["Ціль", "Загальне", "Статус"];

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleStepChange(index + 1)}
        >
          <Text
            style={[
              styles.stepText,
              step === index + 1 && styles.activeStepText,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default StepTabs;

const styles = StyleSheet.create({
  stepText: {
    fontSize: fontsSize.md,
    color: colors.black,
  },
  activeStepText: {
    color: colors.primary,
  },
});
