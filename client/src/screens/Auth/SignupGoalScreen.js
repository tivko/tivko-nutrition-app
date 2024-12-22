import { ScrollView, View, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import SubmitFormButton from "../../components/Form/SubmitFormButton";
import { getTotalRecomendations } from "../../help/bmiCalculator";
import { useAppContext, setRegData } from "../../context/mealContext";
import TitleText from "../../components/Form/TitleText";
import styles from "../../styles/login/loginStyles";
import BackgroundImage from "../../components/Layout/BackgroundImage";
import BmiInfo from "../../components/Form/BmiInfo";
import CheckboxItemForm from "../../components/Form/CheckboxItemForm";
import InputBoxForm from "../../components/Form/InputBoxForm";
import { hp, wp } from "../../styles/base";
import useAxios from "../../hooks/useAxios";
const SignupGoalScreen = ({ navigation }) => {
  const [originalData, setOriginalData] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [totalRecomendations, setTotalRecomendations] = useState({});
  const { dispatch, state } = useAppContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      weight: state.regData?.mealProgram
        ? state.regData.mealProgram?.expectedWeight
        : "",
    },
  });
  const {
    data: result,
    loading: axiosLoading,
    error: requestError,
    sendRequest,
  } = useAxios();

  const watchedWeight = watch("weight");
  const healthData = state.regData?.healthInfo;

  useEffect(() => {
    sendRequest("goals");
    setTotalRecomendations(
      getTotalRecomendations(healthData.weight, healthData.height)
    );
  }, []);

  useEffect(() => {
    if (result) {
      const filteredGoals = result?.result
        ?.filter((goal) => {
          console.log(goal)
          return goal.bmiCategory.includes(totalRecomendations.bmiCategory);
        })
        .sort((a, b) => a.id - b.id);
      setOriginalData(filteredGoals);
      if (
        state.regData?.mealProgram?.goal !== null &&
        state.regData?.mealProgram?.goal !== undefined
      ) {
        setSelectedItem(state.regData?.mealProgram?.goal);
      } else {
        setSelectedItem(filteredGoals[0]);
      }
    }
  }, [result]);

  useEffect(() => {
    if (selectedItem != null) {
      reset({
        weight: state.regData?.mealProgram?.expectedWeight || "",
      });
      clearErrors("weight");

      dispatch(
        setRegData({
          ...state.regData,
          mealProgram: {
            ...state.regData?.mealProgram,
            goal: selectedItem,
          },
        })
      );
    }
  }, [selectedItem]);

  useEffect(() => {
    dispatch(
      setRegData({
        ...state.regData,
        mealProgram: {
          ...state.regData.mealProgram,
          expectedWeight: watchedWeight,
        },
      })
    );
  }, [watchedWeight]);

  const onSignUpPressed = async (data) => {
    let userweight = data?.weight;
    if (selectedItem.name === "Підтримувати поточну вагу" || !userweight) {
      userweight = null;
    }
    dispatch(
      setRegData({
        ...state.regData,
        mealProgram: {
          goal: selectedItem,
          expectedWeight: userweight,
        },
      })
    );
    navigation.navigate("SignUpMacroSplit");
  };

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <TitleText main={"Створення програми"} />
        {totalRecomendations?.bmi !== null && (
          <BmiInfo totalRecomendations={totalRecomendations} />
        )}
        {axiosLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View
            style={{
              height: originalData?.length <= 2 ? hp(23) : hp(40),
              paddingVertical: 5,
              width: wp(80),
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <CheckboxItemForm
                originalData={originalData}
                setSelectedItem={setSelectedItem}
                selectedItem={selectedItem}
              />
            </ScrollView>
          </View>
        )}
        {selectedItem?.name === "Підтримувати поточну вагу" ? (
          ""
        ) : (
          <View style={{ paddingVertical: 5 }}>
            <InputBoxForm
              name="weight"
              placeholder="Цільова вага, кг"
              control={control}
              rules={{
                required: "Вага є обов'язковою",
                min: {
                  value: totalRecomendations?.recommendedWeight?.lowerWeight,
                  message: "Вага не відповідає рекомендації",
                },
                max: {
                  value: totalRecomendations?.recommendedWeight?.upperWeight,
                  message: "Вага не відповідає рекомендації",
                },
                validate: (value) => {
                  const hasValidNumberFormat =
                    /^([1-9][0-9]*)(\.[0-9]+)?$/.test(value);
                  if (!hasValidNumberFormat) {
                    return "Неприпустимий формат";
                  }
                  const currentWeight = healthData.weight;
                  if (
                    [5, 6].includes(selectedItem.id) &&
                    parseFloat(value) <= currentWeight
                  ) {
                    return `Ваша поточна вага ${currentWeight}`;
                  }
                  if (
                    [2, 3, 4].includes(selectedItem.id) &&
                    parseFloat(value) >= currentWeight
                  ) {
                    return `Ваша поточна вага ${currentWeight}`;
                  }
                  return true;
                },
              }}
            />
          </View>
        )}
        <SubmitFormButton
          text={axiosLoading ? "Завантаження..." : "Продовжити"}
          onPress={handleSubmit(onSignUpPressed)}
        />
      </View>
    </BackgroundImage>
  );
};

export default SignupGoalScreen;
