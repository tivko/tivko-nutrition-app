import { Text, View } from "react-native";
import React from "react";
import styles from "../../styles/login/loginStyles";
import Checkbox from "expo-checkbox";
import { colors } from "../../styles/base";
const RememberMe = ({ isChecked, setChecked }) => {
  return (
    <View style={styles.rememberMeContainer}>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={setChecked}
        color={isChecked ? colors.primary : undefined}
      />
      <Text style={styles.text}> Запам'ятати мене </Text>
    </View>
  );
};

export default RememberMe;
