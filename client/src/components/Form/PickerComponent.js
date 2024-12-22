import React, { useState, useEffect } from "react";
import { View, Alert, Text, TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import styles from "../../styles/login/loginStyles";
import AlertComponent from "../Layout/AlertComponent";
import { pickerDailyInfo } from "../../help/namesInUkrainian";
import { AntDesign } from "@expo/vector-icons";
import { hp } from "../../styles/base";
const PickerComponent = ({
  selectedValue,
  onValueChange,
  items,
  macros = false,
  enabled = true,
  alert = false,
  myText,
  alertMessage = "Ви вже обрали страви, тому прийоми їжі змінити неможливо",
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pickerItems, setPickerItems] = useState([]);

  useEffect(() => {
    const updatedPickerItems = items.map((item) => ({
      label: item.name,
      value: item.id,
    }));

    if (macros) {
      updatedPickerItems.push({
        label: "Вказати самостійно",
        value: updatedPickerItems[updatedPickerItems.length - 1]?.value + 1,
      });
    }

    setPickerItems(updatedPickerItems);
  }, [items, macros]);

  const handlePickerPress = () => {
    if (!enabled) {
      setModalVisible(true); // Відображаємо AlertComponent, якщо RNPickerSelect вимкнено
    }
  };

  return (
    <>
      <View style={styles.pickerContainer}>
        <View
          style={{
            paddingLeft: 10,
          }}
        >
          <Text>{myText}</Text>
        </View>
        <RNPickerSelect
          onValueChange={enabled ? onValueChange : () => {}}
          onOpen={handlePickerPress}
          items={pickerItems}
          value={selectedValue}
          style={{
            inputIOS: styles.picker,
            inputAndroid: styles.picker,
          }}
          disabled={!enabled}
          useNativeAndroidPickerStyle={false}
          placeholder={{}}
        />
        <View
          style={{
            position: "absolute",
            right: 10,
            top: hp(3.5),
            justifyContent: "center",
            alignItems: "center",
            transform: [{ translateY: -12 }],
          }}
        >
          <AntDesign name="caretdown" size={hp(2)} color="black" />
        </View>
      </View>
      <AlertComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        info={pickerDailyInfo}
        title={"Сповіщення"}
      />
    </>
  );
};

export default PickerComponent;
