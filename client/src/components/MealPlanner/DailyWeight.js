import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../Layout/Header";
import useAxios from "../../hooks/useAxios";
import { fontsSize, hp } from "../../styles/base";
import InputBoxForm from "../Form/InputBoxForm";
import { useForm } from "react-hook-form";
import SubmitFormButton from "../Form/SubmitFormButton";
import { countAll } from "../../help/calculateParams";
import AlertComponent from "../Layout/AlertComponent";

const DailyWeight = ({
  user,
  date,
  mealProgram,
  healthInfo,
  setUserWeight,
  handleCreateSuccess,
}) => {
  const [weight, setWeight] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const {
    data: result,
    loading: axiosLoading,
    error: requestError,
    sendRequest,
  } = useAxios();

  const {
    data: createResult,
    loading: createLoading,
    sendRequest: sendCreateRequest,
  } = useAxios();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      weight: healthInfo.weight,
      bodyfat: healthInfo.bodyfat,
    },
  });

  useEffect(() => {
    if (result) {
      if (result?.result.status === "Триває") {
        sendCreateRequest("dailyinfo/create", {
          date: new Date().toISOString().slice(0, 10),
          dailyCarbohydrates: 0,
          dailyCalories: 0,
          dailyProteins: 0,
          dailyFat: 0,
          currentWeight: +weight,
          mealProgram: mealProgram?.id,
          mealsNumber: 3,
        });
      }
    }
  }, [result]);

  useEffect(() => {
    if (createResult?.result) {
      setUserWeight(false);
      handleCreateSuccess(createResult?.result);
    }
  }, [createResult]);

  const onSignUpPressed = async (data) => {
    if (+data.weight === +mealProgram.expectedWeight) {
      setModalVisible(true);
      await updateMealProgram(null, "Завершено");
    } else {
      setWeight(data.weight);
      const macros = {
        protein: Number(mealProgram?.macroSplitDietProtein),
        carbs: Number(mealProgram?.macroSplitDietCarbs),
        fat: Number(mealProgram?.macroSplitDietFat),
      };
      const res = countAll(
        healthInfo?.gender,
        Number(data?.weight),
        Number(healthInfo?.age),
        Number(healthInfo?.height),
        data?.bodyfat,
        mealProgram?.activityLevel,
        mealProgram?.goal,
        Number(mealProgram?.expectedWeight),
        macros
      );
      await updateMealProgram(res);
    }
  };

  const updateMealProgram = async (res = null, status = null) => {
    if (res !== null) {
      const currentDate = new Date();
      let endDate = new Date();
      let weeks = res?.weeks || 0;
      if (res?.weeks) {
        weeks = res?.weeks;
        endDate.setDate(currentDate.getDate() + weeks * 7);
      } else {
        endDate = null;
      }

      await sendRequest(
        `mealprogram/update/${mealProgram.id}`,
        {
          requiredCalories: res?.calories,
          requiredFat: res?.pcf?.fatGrams,
          requiredCarbohydrates: res?.pcf?.carbsGrams,
          requiredProteins: res?.pcf?.proteinGrams,
          actualEndDate:
            endDate !== null ? endDate.toISOString().split("T")[0] : null,
        },
        "PATCH"
      );
    } else if (status !== null) {
      await sendRequest(
        `mealprogram/update/${mealProgram.id}`,
        { status: status },
        "PATCH"
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header user={user} />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></View>
        <Text
          style={{
            fontSize: fontsSize.lg,
            textAlign: "center",
          }}
        >
          Вкажіть параметри щоб оновити програму харчування
        </Text>
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
              value: 300,
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
        <SubmitFormButton
          text={"Оновити"}
          onPress={handleSubmit(onSignUpPressed)}
        />
      </View>
      <AlertComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        info={"Вітаємо, ви досягли мети"}
        title={"Вітаємо!"}
        showContinue={true}
        showClose={false}
        onContinue={() => setUserWeight(false)}
      />
    </View>
  );
};

export default DailyWeight;

const styles = StyleSheet.create({
  dateContainer: {
    paddingTop: hp(1.2),
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    fontSize: fontsSize.lg,
  },
});
