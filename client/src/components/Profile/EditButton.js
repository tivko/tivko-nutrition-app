import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const EditButton = ({ pageName, title }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate(pageName);
      }}
    >
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
        <Ionicons name="chevron-forward" size={hp(3)} color="black" />
      </View>
    </Pressable>
  );
};

export default EditButton;

const styles = StyleSheet.create({
  container: {
    height: hp(9),
    width: "100%",
    backgroundColor: "#FCFAEF",
    borderBottomWidth: 1,
    borderColor: "lightgray",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  text: {
    fontSize: hp(2.5),
  },
});
