import { StyleSheet, Text, View } from "react-native";
import React from "react";
import InputBoxForm from "../../components/Form/InputBoxForm";
const ProfileFields = ({ control, withPassword = true }) => {
  return (
    <View style={{ paddingBottom: 10 }}>
      {withPassword && (
        <InputBoxForm
          name="email"
          placeholder="Email"
          keyboardType="email-address"
          control={control}
          rules={{
            required: "Email є обов'язковим",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Введіть валідний email",
            },
          }}
        />
      )}

      <InputBoxForm
        name="firstName"
        placeholder="Ім'я"
        control={control}
        rules={{
          required: "Ім'я є обов'язковим",
          minLength: {
            value: 2,
            message: "Ім'я має містити мінімум 2 символи",
          },
        }}
      />
      <InputBoxForm
        name="lastName"
        placeholder="Прізвище"
        control={control}
        rules={{
          required: "Прізвище є обов'язковим",
          minLength: {
            value: 2,
            message: "Прізвище має містити мінімум 2 символи",
          },
        }}
      />
      {withPassword && (
        <InputBoxForm
          name="password"
          placeholder="Пароль"
          secureTextEntry
          control={control}
          rules={{
            required: "Пароль є обов'язковим",
            minLength: {
              value: 6,
              message: "Пароль має містити мінімум 6 символів",
            },
            validate: (value) => {
              const hasNumber = /[0-9]/.test(value);
              const hasUpperCase = /[A-ZА-ЯҐЄІЇ]/.test(value);
              const hasLowerCase = /[a-zа-яґєії]/.test(value);
              const hasSpecialChar = /[!@#$`~%^&*(),.?":{}|<>]/.test(value);

              if (!hasNumber) {
                return "Пароль має містити хоча б одне число";
              }
              if (!hasUpperCase) {
                return "Пароль має містити хоча б одну велику літеру";
              }
              if (!hasLowerCase) {
                return "Пароль має містити хоча б одну маленьку літеру";
              }
              if (!hasSpecialChar) {
                return "Пароль має містити хоча б один спеціальний символ";
              }
              return true;
            },
          }}
        />
      )}
    </View>
  );
};

export default ProfileFields;
