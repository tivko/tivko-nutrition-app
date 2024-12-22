import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SubmitFormButton from "../Form/SubmitFormButton";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { colors, fontsSize } from "../../styles/base";
import { useDailyFoodContext } from "../../context/dailyFoodContext";
const DailyFoodListItem = ({
  item,
  dish,
  count,
  addToDaily,
  removeFromDaily,
  showButtons = true,
}) => {
  const navigation = useNavigation();
  const { state, dispatch } = useDailyFoodContext();

  const willExceed = () => {
    if (showButtons) {
      const dailyInfo = state[dish]?.info;

      const currentTotal = state[dish]?.items.reduce(
        (acc, i) => ({
          calories: acc.calories + i.calories,
          carbs: acc.carbs + i.carbohydrates,
          fat: acc.fat + i.fat,
          proteins: acc.proteins + i.protein,
        }),
        { calories: 0, carbs: 0, fat: 0, proteins: 0 }
      );
      if (!dailyInfo || !currentTotal) return false;
      const newTotal = {
        calories: dailyInfo.calories - item.calories,
        carbs: dailyInfo.carbohydrates - item.carbohydrates,
        fat: dailyInfo.fat - item.fat,
        proteins: dailyInfo.proteins - item.protein,
      };
      const hasInvalidValues = (obj) => {
        return (
          obj.calories <= 0 ||
          obj.carbs <= 0 ||
          obj.fat <= 0 ||
          obj.proteins <= 0
        );
      };

      if (!hasInvalidValues(newTotal)) {
        return false;
      } else {
        return true;
      }
    }
  };

  const exceed = willExceed();

  return (
    <>
      <TouchableOpacity
        style={{ position: "relative", zIndex: 1, paddingVertical: hp(0.35) }}
        onPress={() =>
          navigation.navigate("DishScreenInfo", { itemId: item.id })
        }
      >
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
                justifyContent: "centers",
              }}
            >
              <Text style={styles.label}>{item.title}</Text>
              <Text style={styles.labelSecond}>{count * 100}г.</Text>
            </View>
            <Text style={styles.brans}>
              {`${(item?.calories * count).toFixed(2)} ккал., ${(
                item?.carbohydrates * count
              ).toFixed(2)} вугл., ${(item?.protein * count).toFixed(
                2
              )} біл., ${(item?.fat * count).toFixed(2)} жир.`}
            </Text>
          </View>
          {showButtons && (
            <View
              style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
            >
              <TouchableOpacity onPress={() => removeFromDaily(item)}>
                <AntDesign name="caretleft" size={hp(2.5)} color="black" />
              </TouchableOpacity>
              <Text>{count}</Text>
              <TouchableOpacity
                onPress={() => !exceed && addToDaily(item)}
                disabled={exceed}
              >
                <AntDesign
                  name="caretright"
                  size={hp(2.5)}
                  color={exceed ? "gray" : "black"}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};

export default DailyFoodListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f6f6f8",
    padding: 10,

    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    gap: 5,
  },
  label: {
    fontWeight: "bold",
    fontSize: fontsSize.md,
  },
  brans: {
    color: "dimgray",
    fontSize: fontsSize.sm,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    gap: 15,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
