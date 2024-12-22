import React, { useState, useEffect } from "react";
import { View, Modal, Pressable, Text, StyleSheet } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { customLabels, months, weekDays } from "../../help/namesInUkrainian";

const DatePickerModal = ({
  modalVisible = false,
  setModalVisible = () => {},
  setDate = () => {},
  minDate = null,
  maxDate = null,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date(minDate));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSaveDate = () => {
    setDate(selectedDate.toISOString().slice(0, 10));
    setModalVisible(false);
  };

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <View style={{ alignItems: "center", marginBottom: 10 }}>
            <CalendarPicker
              selectedStartDate={selectedDate}
              onDateChange={handleDateChange}
              width={wp(90)}
              height={hp(50)}
              textStyle={{ fontSize: hp(1.8) }}
              startFromMonday={true}
              weekdays={weekDays}
              months={months}
              previousTitle="Попередній"
              nextTitle="Наступний"
              customLabels={customLabels}
              minDate={minDate}
              maxDate={maxDate}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Pressable style={styles.modalButton} onPress={handleSaveDate}>
              <Text style={{ fontSize: hp(1.9), color: "#3B71F3" }}>
                Зберегти
              </Text>
            </Pressable>
            <Pressable
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ fontSize: hp(1.9) }}>Закрити</Text>
            </Pressable>
          </View>
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
    width: wp(95),
    height: hp(48),
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    alignItems: "center",
  },
});

export default DatePickerModal;
