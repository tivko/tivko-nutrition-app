import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DatePickerModal from "./../DatePickerModal";
import { formatDate } from "../../../help/utils";
import Checkbox from "expo-checkbox";
import { fontsSize, hp } from "../../../styles/base";
import { AntDesign, FontAwesome } from "../../../styles/icons";
import {
  useMealProgramsContext,
  setSort,
  setDates,
} from "../../../context/mealProgramsContext";
const StepOne = ({ checkedColor }) => {
  const { state: filterState, dispatch: filterDispatch } =
    useMealProgramsContext();
  const [startDate, setStartDate] = useState(
    filterState?.startDate ? filterState?.startDate : null
  );
  const [endDate, setEndDate] = useState(
    filterState?.endDate ? filterState?.endDate : null
  );
  const [startDateModalVisible, setStartDateModalVisible] = useState(false);
  const [endDateModalVisible, setEndDateModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState(
    filterState?.sortOption ? filterState?.sortOption : ""
  );

  useEffect(() => {
    filterDispatch(setDates(startDate, endDate));
  }, [endDate, startDate]);

  useEffect(() => {
    filterDispatch(setSort(sortOption));
  }, [sortOption]);

  const handleDateChange = (visibilitySetter) => {
    visibilitySetter(true);
  };

  const handleSortOptionChange = (option) => {
    setSortOption(option);
  };

  const renderDateField = (title, date, setDate, visibilitySetter) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <TouchableOpacity onPress={() => handleDateChange(visibilitySetter)}>
          <Text style={{ fontSize: fontsSize.md, fontWeight: "500" }}>
            <AntDesign name="calendar" size={fontsSize.md} color="black" />{" "}
            {title}: {formatDate(date)}
          </Text>
        </TouchableOpacity>
        {date && (
          <TouchableOpacity onPress={() => setDate(null)}>
            <FontAwesome name="trash-o" size={fontsSize.md} color="black" />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderSortOption = (optionValue, label, icon) => {
    return (
      <View style={styles.optionContainer}>
        <Checkbox
          value={sortOption === optionValue}
          onValueChange={() => handleSortOptionChange(optionValue)}
          style={styles.checkbox}
          color={sortOption === optionValue ? checkedColor : ""}
        />
        <TouchableOpacity onPress={() => handleSortOptionChange(optionValue)}>
          <Text style={styles.option}>
            {label}{" "}
            <FontAwesome name={icon} size={fontsSize.md} color="black" />
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ paddingHorizontal: hp(2), paddingVertical: hp(2), gap: 10 }}>
      {renderDateField(
        "Дата початку",
        startDate,
        setStartDate,
        setStartDateModalVisible
      )}
      <DatePickerModal
        setModalVisible={setStartDateModalVisible}
        modalVisible={startDateModalVisible}
        setDate={setStartDate}
      />
      {renderDateField(
        "Дата завершення",
        endDate,
        setEndDate,
        setEndDateModalVisible
      )}
      <View style={{ paddingTop: hp(2), gap: 5 }}>
        <Text style={{ fontSize: fontsSize.md, fontWeight: "500" }}>
          Сортувати за:
        </Text>
        {renderSortOption(
          "asc",
          "Зростанням початкової ваги",
          "sort-numeric-asc"
        )}
        {renderSortOption(
          "desc",
          "Спаданням початкової ваги",
          "sort-numeric-desc"
        )}
      </View>
      <DatePickerModal
        setModalVisible={setEndDateModalVisible}
        modalVisible={endDateModalVisible}
        setDate={setEndDate}
      />
    </View>
  );
};

export default StepOne;

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    gap: 5,
  },
  checkbox: {
    width: fontsSize.md,
    height: fontsSize.md,
  },
  option: {
    fontSize: fontsSize.md,
  },
});
