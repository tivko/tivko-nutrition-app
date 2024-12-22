import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import InputBoxForm from "../../components/Form/InputBoxForm";
import Checkbox from "expo-checkbox";

const LoginFields = ({ control }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View>
      <InputBoxForm
        name="email"
        placeholder="Email"
        control={control}
        rules={{
          required: "Email є обов'язковим",
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Введіть валідний email",
          },
        }}
      />
      <InputBoxForm
        name="password"
        placeholder="Пароль"
        secureTextEntry={!showPassword}
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
    </View>
  );
};

export default LoginFields;
