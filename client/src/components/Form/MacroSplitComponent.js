import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { colors, fontsSize, hp, wp } from "../../styles/base";

const MacroSplitComponent = ({ editable, macros, setMacros }) => {
  const handleInputChange = (field, value) => {
    const newValue = parseInt(value) || 0;
    const newMacros = { ...macros, [field]: newValue };
    const total = newMacros.carbs + newMacros.fat + newMacros.protein;
    if (total <= 100) {
      setMacros(newMacros);
    }
  };

  const macroConfig = [
    { label: "Білки %", value: macros.protein, key: "protein" },
    { label: "Жири %", value: macros.fat, key: "fat" },
    { label: "Вуглеводи %", value: macros.carbs, key: "carbs" },
  ];

  return (
    <View style={styles.inputContainer}>
      {macroConfig.map((macro) => (
        <MacroInput
          key={macro.key}
          label={macro.label}
          value={macro.value}
          editable={editable}
          onChangeText={(value) => handleInputChange(macro.key, value)}
        />
      ))}
    </View>
  );
};

const MacroInput = ({ label, value, editable, onChangeText }) => (
  <View style={styles.inputGroup}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder="0"
      keyboardType="numeric"
      value={`${value}`}
      editable={editable}
      onChangeText={onChangeText}
    />
  </View>
);

export default MacroSplitComponent;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    width: wp(80),
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.text,
    borderRadius: 5,
    paddingVertical: 10,
    fontSize: fontsSize.sm,
    width: wp(25),
    textAlign: "center",
  },
  inputLabel: {
    marginBottom: 5,
    fontSize: hp(2),
    color: colors.text,
  },
});
