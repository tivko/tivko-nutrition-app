import { View, ScrollView, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import SubmitFormButton from "../../components/Form/SubmitFormButton";
import { useRoute } from "@react-navigation/native";
import TitleText from "../../components/Form/TitleText";
import BackgroundImage from "../../components/Layout/BackgroundImage";
import styles from "../../styles/login/loginStyles";
import { hp, wp } from "../../styles/base";
import CheckboxItemForm from "../../components/Form/CheckboxItemForm";
import { useAppContext, setRegData } from "../../context/mealContext";
import useAxios from "../../hooks/useAxios";

const SignUpActivityLevel = ({ navigation }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { dispatch, state } = useAppContext();
  const prevScreenData = useRoute();
  const prevData = prevScreenData;
  const {
    data: result,
    loading: axiosLoading,
    error: requestError,
    sendRequest,
  } = useAxios();

  useEffect(() => {
    sendRequest("activity-level");
  }, []);

  useEffect(() => {
    if (result) {
      setOriginalData(result?.result);
      if (
        state.regData?.activityLevel &&
        state.regData?.activityLevel !== null
      ) {
        setSelectedItem(state.regData?.activityLevel);
      } else {
        setSelectedItem(result?.result[0]);
      }
    }
  }, [result]);

  useEffect(() => {
    if (selectedItem != null) {
      dispatch(
        setRegData({
          ...state.regData,
          activityLevel: selectedItem,
        })
      );
    }
  }, [selectedItem]);

  const nextPressed = () => {
    setLoading(true);
    dispatch(
      setRegData({
        ...state.regData,
        activityLevel: selectedItem,
      })
    );
    navigation.navigate("SignUpMealProgram");
    setLoading(false);
  };

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <TitleText main={"Створення програми"} second={"Фізична активність"} />

        {axiosLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View
            style={{
              height: originalData.length <= 2 ? hp(23) : hp(40),
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
        <SubmitFormButton
          text={axiosLoading || loading ? "Завантаження..." : "Продовжити"}
          onPress={nextPressed}
        />
      </View>
    </BackgroundImage>
  );
};

export default SignUpActivityLevel;
