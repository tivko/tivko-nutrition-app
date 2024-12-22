import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "../../styles/icons";
import DatePickerModal from "./DatePickerModal";
import { formatDate } from "../../help/utils";
import { fontsSize } from "../../styles/base";

const DateDisplay = ({ date, setDate, startDate, endDate }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Інформація про день</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={{ fontSize: fontsSize.lg, fontWeight: "500" }}>
            {formatDate(date)}{" "}
            <AntDesign name="calendar" size={fontsSize.lg} color="black" />
          </Text>
        </TouchableOpacity>
        <DatePickerModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          date={date}
          setDate={setDate}
          minDate={startDate}
          maxDate={endDate}
        />
      </View>
    </>
  );
};

export default DateDisplay;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  containerTitle: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: fontsSize.lg,
    fontWeight: "500",
  },
});
