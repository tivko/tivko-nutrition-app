import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, FontAwesome } from "../../styles/icons";
import { fontsSize, hp, wp, colors } from "../../styles/base";
import DatePickerModal from "./DatePickerModal";
import { formatDate } from "../../help/utils";
import Checkbox from "expo-checkbox";
import StepOne from "./ModalFilter/StepOne";
import StepTabs from "./ModalFilter/StepTabs";
import StepTwo from "./ModalFilter/StepTwo";
import StepThree from "./ModalFilter/StepThree";

const ModalFilterComponent = ({ modalVisible, setModalVisible, goals }) => {
  const [step, setStep] = useState(1);
  const checkedColor = colors.primary;

  const status = ["Триває", "Завершено", "Не завершено"];

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepTwo options={goals} checkedColor={checkedColor} />;
      case 2:
        return <StepOne checkedColor={checkedColor} />;
      case 3:
        return <StepThree options={status} checkedColor={checkedColor} />;
      default:
        return null;
    }
  };

  const handleStepChange = (stepNumber) => {
    setStep(stepNumber);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <StepTabs step={step} handleStepChange={handleStepChange} />
          <View style={styles.content}>{renderStep()}</View>
          <TouchableOpacity
            style={styles.buttonClose}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Закрити</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    justifyContent: "space-between",
    width: wp(89),
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  stepText: {
    fontSize: fontsSize.md,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 15,
  },
  textStyle: {
    fontSize: fontsSize.md,
    textAlign: "center",
  },
  subHeader: {
    fontSize: fontsSize.md,
    marginTop: 10,
    textDecorationLine: "underline",
  },
  modalText: {
    fontSize: fontsSize.md,
    fontWeight: "bold",
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    gap: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    width: fontsSize.sm,
    height: fontsSize.md,

    borderColor: "#000",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    width: fontsSize.md,
    height: fontsSize.md,
  },
  option: {
    fontSize: 16,
  },
});

export default ModalFilterComponent;
