import React, { useState, useEffect } from "react";
import { View, Alert, Text } from "react-native";
import { useForm } from "react-hook-form";
import SubmitFormButton from "../../components/Form/SubmitFormButton";
import BackgroundImage from "../../components/Layout/BackgroundImage";
import HealthInfoFields from "../../components/Form/HealthInfoFields";
import TitleText from "../../components/Form/TitleText";
import styles from "../../styles/login/loginStyles";
import PickerComponent from "../../components/Form/PickerComponent";
import { useAppContext, setRegData } from "../../context/mealContext";
import useAxios from "../../hooks/useAxios";
const SignUpScreenHealthInfo = ({ navigation }) => {
  const [gender, setGender] = useState("male");
  const { dispatch, state } = useAppContext();
  const [loading, setLoading] = useState(false);

  const {
    data: resultUpdateHealthInfo,
    loading: axiosLoadingUpdateHealthInfo,
    error: requestErrorUpdateHealthInfo,
    sendRequest: sendRequestUpdateHealthInfo,
  } = useAxios();
  const {
    data: resultCreateHealthInfo,
    loading: axiosLoadingCreateHealthInfo,
    error: requestErrorCreateHealthInfo,
    sendRequest: sendRequestCreateHealthInfo,
  } = useAxios();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      age: state.regData?.healthInfo?.age || "",
      height: state.regData?.healthInfo?.height || "",
      weight: state.regData?.healthInfo?.weight || "",
      bodyfat: state.regData?.healthInfo?.bodyfat || "",
    },
  });

  useEffect(() => {
    if (state.regData?.healthInfo?.gender) {
      setGender(state.regData?.healthInfo?.gender);
    }
  }, []);

  useEffect(() => {
    if (resultCreateHealthInfo) {
      dispatch(
        setRegData({
          healthInfo: resultCreateHealthInfo?.result,
        })
      );
      navigation.navigate("SignupGoalScreen");
    }
    setLoading(false);
  }, [resultCreateHealthInfo]);

  useEffect(() => {
    if (resultUpdateHealthInfo) {
      const res = resultUpdateHealthInfo?.result;
      if (
        res.age !== state.regData?.healthInfo?.age ||
        res.weight !== state.regData?.healthInfo?.weight ||
        res.height !== state.regData?.healthInfo?.height ||
        res.bodyfat !== state.regData?.healthInfo?.bodyfat ||
        res.gender !== state.regData?.healthInfo?.gender
      ) {
        dispatch(
          setRegData({
            healthInfo: resultUpdateHealthInfo?.result,
          })
        );
      } else {
        dispatch(
          setRegData({
            ...state.regData,
            healthInfo: resultUpdateHealthInfo?.result,
          })
        );
      }
      navigation.navigate("SignupGoalScreen");
    }
    setLoading(false);
  }, [resultUpdateHealthInfo]);

  useEffect(() => {
    if (requestErrorCreateHealthInfo?.status) {
      Alert.alert(requestErrorCreateHealthInfo);
    } else if (requestErrorUpdateHealthInfo?.status) {
      Alert.alert(requestErrorUpdateHealthInfo);
    }
  }, [requestErrorCreateHealthInfo, requestErrorUpdateHealthInfo]);

  const onSignUpPressed = async (data) => {
    setLoading(true);
    const { age, weight, height, bodyfat } = data;
    if (age && weight && height && gender) {
      if (!state.regData?.healthInfo && state.user === null) {
        await sendRequestCreateHealthInfo("health/create", {
          age: Number(data?.age),
          weight: Number(data?.weight),
          height: Number(data?.height),
          gender: gender,
          bodyfat: bodyfat ? Number(bodyfat) : null,
          user: state.sub,
        });
      } else {
        await sendRequestUpdateHealthInfo(
          "health/update",
          {
            age: Number(data?.age),
            weight: Number(data?.weight),
            height: Number(data?.height),
            gender: gender,
            bodyfat: bodyfat ? Number(bodyfat) : null,
            user: state.sub,
          },
          "PATCH"
        );
      }
    }
  };

  const genderItems = [
    { name: "Чоловік", id: "male" },
    { name: "Жінка", id: "female" },
  ];

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <TitleText main={"Створення програми"} second={"Фізичні показники"} />
        <HealthInfoFields control={control} />
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Стать</Text>
        </View>
        <PickerComponent
          selectedValue={gender}
          onValueChange={setGender}
          items={genderItems}
        />
        <View></View>
        <SubmitFormButton
          text={
            axiosLoadingCreateHealthInfo ||
            axiosLoadingUpdateHealthInfo ||
            loading
              ? "Завантаження..."
              : "Продовжити"
          }
          onPress={handleSubmit(onSignUpPressed)}
        />
      </View>
    </BackgroundImage>
  );
};
export default SignUpScreenHealthInfo;
