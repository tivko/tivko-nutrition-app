import { View, Alert, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import TitleText from "../../components/Form/TitleText";
import { useRoute } from "@react-navigation/native";
import SubmitFormButton from "../../components/Form/SubmitFormButton";
import BackgroundImage from "../../components/Layout/BackgroundImage";
import PickerComponent from "../../components/Form/PickerComponent";
import MacroSplitComponent from "../../components/Form/MacroSplitComponent";
import styles from "../../styles/login/loginStyles";
import { useAppContext, setRegData } from "../../context/mealContext";
import useAxios from "../../hooks/useAxios";
import AlertComponent from "../../components/Layout/AlertComponent";
const SignUpMacroSplit = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [originalData, setOriginalData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [macros, setMacros] = useState({ carbs: 0, fat: 0, protein: 0 });
  const { dispatch, state } = useAppContext();
  const [editable, setEditable] = useState(false);
  const prevScreenData = useRoute();
  const prevData = prevScreenData;
  const {
    data: result,
    loading: axiosLoading,
    error: requestError,
    sendRequest,
  } = useAxios();

  useEffect(() => {
    sendRequest("macrosplit");
  }, []);

  const saveAllInfo = () => {
    dispatch(
      setRegData({
        ...state.regData,
        macros: { ...macros, selectedItem: selectedItem },
      })
    );
  };

  useEffect(() => {
    if (result) {
      setOriginalData(result?.result);
      if (state.regData?.macros) {
        setSelectedItem(state.regData?.macros.selectedItem);
      } else {
        setMacros({
          carbs: result?.result[0].carbs,
          fat: result?.result[0].fat,
          protein: result?.result[0].protein,
        });
      }
    }
  }, [result]);

  useEffect(() => {
    if (selectedItem === 6) {
      saveAllInfo();
    }
  }, [macros]);

  useEffect(() => {
    if (selectedItem === 6) {
      setEditable(true);
      if (state.regData?.macros) {
        setMacros({
          carbs: state.regData?.macros?.carbs,
          fat: state.regData?.macros?.fat,
          protein: state.regData?.macros?.protein,
        });
      } else {
        setMacros({ carbs: 0, fat: 0, protein: 0 });
      }
      saveAllInfo();
    } else {
      setEditable(false);
      const selectedMacro = originalData.find(
        (item) => item.id === selectedItem
      );
      if (selectedMacro) {
        setMacros({
          carbs: selectedMacro.carbs,
          fat: selectedMacro.fat,
          protein: selectedMacro.protein,
        });
        saveAllInfo();
      }
    }
  }, [selectedItem]);

  const onSignUpPressed = async () => {
    setLoading(true);
    if (macros.carbs && macros.fat && macros.protein) {
      if (macros.carbs + macros.fat + macros.protein != 100) {
        setModalVisible(true);
        return;
      }
      saveAllInfo();
      navigation.navigate("SignUpActivityLevel");
    } else {
      setModalVisible(true);
    }
    setLoading(false);
  };

  return (
    <BackgroundImage>
      <View style={styles.container}>
        {axiosLoading === true ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <TitleText main={"Створення програми"} second={"Дієта"} />
            <PickerComponent
              selectedValue={selectedItem}
              onValueChange={setSelectedItem}
              items={originalData}
              macros={true}
            />

            <MacroSplitComponent
              editable={editable}
              macros={macros}
              setMacros={setMacros}
            />

            <SubmitFormButton
              text={axiosLoading || loading ? "Завантаження..." : "Продовжити"}
              onPress={onSignUpPressed}
            />
          </>
        )}
      </View>
      <AlertComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        info={
          "Помилка введення даних. Можливо ви неправильно вказали кількість макронутрієнтів. Їх сума має бути 100."
        }
        title={"Помилка"}
      />
    </BackgroundImage>
  );
};

export default SignUpMacroSplit;
