import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import styles from "../../styles/login/InputBoxFormStyle";
import AlertComponent from "../Layout/AlertComponent";
import { bodyFatInfo } from "../../help/namesInUkrainian";
const InputBoxForm = ({
  control,
  name,
  rules = {},
  placeholder,
  label = true,
  secureTextEntry,
  keyboardType = "default",
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View>
          {label && (
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>{placeholder}</Text>
            </View>
          )}
          <View
            style={[styles.container, { borderColor: error ? "red" : "grey" }]}
          >
            <TextInput
              value={
                value !== undefined && value !== null ? value.toString() : ""
              }
              onChangeText={(text) => onChange(text.trim())}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={name === "password" && isPasswordVisible}
              keyboardType={keyboardType}
            />

            {name === "password" ? (
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.showPasswordContainer}
                testID="passwordToggle"
              >
                <Feather
                  name={isPasswordVisible ? "eye-off" : "eye"}
                  size={hp(2.5)}
                  color="black"
                />
              </TouchableOpacity>
            ) : (
              ""
            )}
            {name === "bodyfat" ? (
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={styles.showPasswordContainer}
                testID="infoButton"
              >
                <Feather name={"info"} size={hp(2.5)} color="black" />
              </TouchableOpacity>
            ) : (
              ""
            )}
          </View>
          <View style={styles.errorContainer}>
            {error && (
              <Text style={styles.error}>{error.message || "Error"}</Text>
            )}
          </View>
          <AlertComponent
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            info={bodyFatInfo}
            title={"Відсоток жиру"}
          />
        </View>
      )}
    />
  );
};

export default InputBoxForm;
