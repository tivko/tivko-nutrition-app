import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import InputBoxForm from "../../../components/Form/InputBoxForm";
import { Picker } from "@react-native-picker/picker";
import SubmitFormButton from "../../../components/Form/SubmitFormButton";
import { useAppContext } from "../../../context/mealContext";
import useAxios from "../../../hooks/useAxios";
import {
  calculateBMI,
  calculateRecommendedWeight,
  getBMICategory,
} from "../../../help/bmiCalculator";
const EditPhysicalDataScreen = ({ navigation }) => {
  const [error, setError] = useState("");
  const [newGoal, setNewGoal] = useState();
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useAppContext();
  const data = state?.user?.user;
  const [currentBMICategoty, setCurrentBMICategoty] = useState("");
  const [newBMICategoty, setNewBMICategoty] = useState("");
  const [userPhysicalData, setUserPhysicalData] = useState({
    age: data?.age || "",
    weight: data?.weight || "",
    height: data?.height || "",
    gender: data?.gender || "",
    bodyfat: data?.bodyfat,
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      age: userPhysicalData?.age || "",
      weight: userPhysicalData?.weight || "",
      height: userPhysicalData?.height || "",
      gender: userPhysicalData?.gender || "",
      bodyfat: userPhysicalData?.bodyfat,
    },
  });

  const {
    data: result,
    loading: axiosLoading,
    error: requestError,
    sendRequest,
  } = useAxios();

  const onEditUserDetails = async (data) => {
    const { age, weight, height } = data;
    if (age < 18 || age > 99) {
      Alert.alert("Age must be between 18 and 99.");
    }

    if (weight < 20 || weight > 600) {
      Alert.alert("Weight must be between 20kg to 600kg.");
    }
    setLoading(true);
    let userBmi = calculateBMI(
      state?.user?.user?.weight,
      state?.user?.user?.height
    );

    const currentBMICategoty = getBMICategory(userBmi);
    const newBMI = calculateBMI(weight, height);
    let newBMICategoty = getBMICategory(newBMI);
    let newGoal = state?.user?.user?.goal?.id;
    setCurrentBMICategoty(currentBMICategoty);
    setNewBMICategoty(newBMICategoty);
    if (currentBMICategoty !== newBMICategoty) {
      if (
        newBMICategoty === "OVERWEIGHT" ||
        newBMICategoty === "NORMAL_WEIGHT"
      ) {
        newGoal = 1;
      } else if (newBMICategoty === "UNDERWEIGHT") {
        newGoal = 5;
      } else {
        newGoal = 2;
      }
    }

    await sendRequest(
      "health/update",
      {
        user: state?.userId?.userId,
        age: +data?.age,
        height: +data?.height,
        weight: +data?.weight,
        bodyfat: +data?.bodyfat,
        goal: newGoal,
      },
      (method = "PATCH")
    );
    setLoading(false);
  };

  useEffect(() => {
    if (result && result.success) {
      const data = {
        ...state?.user?.user,
        ...result?.result,
        additionalData: {
          bmi: calculateBMI(result.result.weight, result.result.height),
        },
      };
      dispatch({
        type: "SET_USER",
        payload: { user: data },
      });

      if (currentBMICategoty !== newBMICategoty) {
        createTwoButtonAlert(newBMICategoty);
      } else {
        navigation.goBack();
      }
    }
  }, [result]);
  const createTwoButtonAlert = (newBMICategoty) =>
    Alert.alert(
      "Вам потрібно змінити ціль",
      `Ми виявили у вас ${newBMICategoty}. Ціль була змінена автоматично, відредагуйте її за потреби`,
      [
        {
          text: "Закрити",
          onPress: () => navigation.goBack(),
          style: "cancel",
        },
        {
          text: "Відредагувати ціль",
          onPress: () => navigation.navigate("EditGoalDataScreen"),
        },
      ]
    );

  useEffect(() => {
    if (userPhysicalData) {
      setValue("age", JSON.stringify(userPhysicalData?.age));
      setValue("weight", JSON.stringify(userPhysicalData?.weight));
      setValue("height", JSON.stringify(userPhysicalData?.height));
      setValue("gender", JSON.stringify(userPhysicalData?.gender));
      setValue("bodyfat", userPhysicalData?.bodyfat);
    }
  }, [userPhysicalData, setValue]);

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Оновлення</Text>
      <Text style={styles.secondText}>Фізичні показники</Text>
      <InputBoxForm
        name="age"
        placeholder="Вік"
        control={control}
        rules={{
          required: "Вік є обов'язковим",
          min: {
            value: 18,
            message: "Вам повинно бути щонайменше 18 років",
          },
          max: {
            value: 99,
            message: "Вік не може перевищувати 99 років",
          },
          validate: (value) => {
            const hasNumberOnly = /^[0-9]+$/.test(value); // Перевіряємо, чи є в рядку лише цифри

            if (!hasNumberOnly) {
              return "Поле повинно містити лише числа";
            }
            return true;
          },
        }}
        disabled={loading}
      />
      <InputBoxForm
        name="weight"
        placeholder="Вага"
        control={control}
        rules={{
          required: "Вага є обов'язковою",
          min: {
            value: 20,
            message: "Неприпустима вага",
          },
          max: {
            value: 500,
            message: "Неприпустима вага",
          },
          validate: (value) => {
            const hasValidNumberFormat = /^[0-9]+(\.[0-9]+)?$/.test(value); // Перевіряємо, чи є в рядку числа з десятковою крапкою

            if (!hasValidNumberFormat) {
              return "Поле повинно містити числа";
            }
            return true;
          },
        }}
      />
      <InputBoxForm
        name="height"
        placeholder="Зріст"
        control={control}
        rules={{
          required: "Зріст є обов'язковим",
          min: {
            value: 10,
            message: "Неприпустимий зріст",
          },
          max: {
            value: 300,
            message: "Неприпустимий зріст",
          },
          validate: (value) => {
            const hasValidNumberFormat = /^[0-9]+(\.[0-9]+)?$/.test(value); // Перевіряємо, чи є в рядку числа з десятковою крапкою

            if (!hasValidNumberFormat) {
              return "Поле повинно містити числа";
            }
            return true;
          },
        }}
        disabled={loading}
      />
      <InputBoxForm
        name="bodyfat"
        placeholder="Відсоток жиру"
        control={control}
        rules={{
          min: {
            value: 0,
            message: "Неприпустимий відсоток жиру",
          },
          max: {
            value: 100,
            message: "Неприпустимий відсоток жиру",
          },
          validate: (value) => {
            const hasValidNumberFormat = /^[0-9]+(\.[0-9]+)?$/.test(value); // Перевіряємо, чи є в рядку числа з десятковою крапкою

            if (value && !hasValidNumberFormat) {
              return "Поле повинно містити числа";
            }
            return true;
          },
        }}
        disabled={loading}
      />

      <SubmitFormButton
        text={loading ? "Завантаження..." : "Зберегти"}
        onPress={handleSubmit(onEditUserDetails)}
      />
    </View>
  );
};

export default EditPhysicalDataScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 20,
    paddingLeft: 20,
    paddingVertical: 20,
    gap: 10,
    borderRadius: 10,
    flex: 1,
  },
  mainText: {
    fontWeight: "500",
    fontSize: hp(4),
    color: "#808080",
  },
  secondText: {
    fontWeight: "400",
    fontSize: hp(2.8),
    color: "#808080",
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
  },
  label: {
    marginRight: 10,
    fontSize: hp(2),
  },
  picker: {
    width: wp(80),
    height: hp(5),
    borderRadius: 7,
  },
});
