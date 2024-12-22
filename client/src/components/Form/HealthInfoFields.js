import { StyleSheet, Text, View } from "react-native";
import React from "react";
import InputBoxForm from "../../components/Form/InputBoxForm";
const HealthInfoFields = ({ control }) => {
  return (
    <View>
      <InputBoxForm
        name="age"
        keyboardType="numeric"
        placeholder="Вік"
        control={control}
        rules={{
          required: "Вік є обов'язковим",
          min: {
            value: 15,
            message: "Вам повинно бути щонайменше 15 років",
          },
          max: {
            value: 80,
            message: "Вік не може перевищувати 80 років",
          },
          validate: (value) => {
            const hasNumberOnly = /^(?!0\d)\d+$/.test(value);
            if (!hasNumberOnly) {
              return "Неприпустимий формат";
            }
            return true;
          },
        }}
      />
      <InputBoxForm
        name="weight"
        placeholder="Вага, кг"
        keyboardType="decimal-pad"
        control={control}
        rules={{
          required: "Вага є обов'язковою",
          min: {
            value: 20,
            message: "Неприпустима вага",
          },
          max: {
            value: 200,
            message: "Неприпустима вага",
          },
          validate: (value) => {
            const hasValidNumberFormat = /^([1-9][0-9]*)(\.[0-9]+)?$/.test(
              value
            );
            if (!hasValidNumberFormat) {
              return "Неприпустимий формат";
            }
            return true;
          },
        }}
      />
      <InputBoxForm
        name="height"
        placeholder="Зріст, см"
        keyboardType="decimal-pad"
        control={control}
        rules={{
          required: "Зріст є обов'язковим",
          min: {
            value: 100,
            message: "Неприпустимий зріст",
          },
          max: {
            value: 300,
            message: "Неприпустимий зріст",
          },
          validate: (value) => {
            const hasValidNumberFormat = /^[0-9]+(\.[0-9]+)?$/.test(value);
            if (!hasValidNumberFormat) {
              return "Неприпустимий формат";
            }
            return true;
          },
        }}
      />
      <InputBoxForm
        name="bodyfat"
        placeholder="Відсоток жиру (не обов'язково)"
        keyboardType="decimal-pad"
        control={control}
        rules={{
          min: {
            value: 1,
            message: "Неприпустимий відсоток жиру",
          },
          max: {
            value: 100,
            message: "Неприпустимий відсоток жиру",
          },
          validate: (value) => {
            const hasValidNumberFormat = /^[0-9]+(\.[0-9]+)?$/.test(value);
            if (value && !hasValidNumberFormat) {
              return "Неприпустимий формат";
            }
            return true;
          },
        }}
      />
    </View>
  );
};

export default HealthInfoFields;
