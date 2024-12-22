import { TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const DateToggleArrow = ({ toggle, name, size, color }) => {
  return (
    <TouchableOpacity onPress={toggle}>
      <AntDesign name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default DateToggleArrow;
