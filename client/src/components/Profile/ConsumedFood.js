import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { filterAndCount, formatYearFirst } from "../../help/utils";
import InfoProgramCard from "./InfoProgramCard";
import { mealNamesInUkrainian } from "../../help/namesInUkrainian";
import { fontsSize, hp } from "../../styles/base";
import { useNavigation } from "@react-navigation/native";
import LoadingComponent from "../Layout/LoadingComponent";

const ConsumedFood = ({ date, id }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [dailyInfoResult, setDailyInfoResult] = useState();
  const [dishes, setDishes] = useState([]);
  const {
    data: result,
    loading: axiosLoading,
    error: axiosError,
    sendRequest: sendRequest,
  } = useAxios();
  useEffect(() => {
    const fetchInfo = async () => {
      const formattedDate = formatYearFirst(new Date(date));
      await sendRequest(`dailyinfo?date=${formattedDate}&mealProgram=${id}`);
    };
    if (date) {
      setLoading(true);
      fetchInfo();
    }
  }, [date]);
  useEffect(() => {
    if (result) {
      setDailyInfoResult(result?.result);
      const val = filterAndCount(result?.result.dailyDishes);
      setDishes(val);
      setLoading(false);
    }
  }, [result]);
  useEffect(() => {
    if (axiosError) {
      setLoading(false);
      setDailyInfoResult(null);
    }
  }, [axiosError]);
  if (loading) {
    <LoadingComponent />;
  }
  return (
    <View style={{ flex: 1, paddingBottom: hp(2) }}>
      {!dailyInfoResult || !dishes || dishes.length == 0 ? (
        <View style={{ alignItems: "center", paddingTop: hp(1) }}>
          <Text style={{ fontSize: fontsSize.md, fontWeight: "800" }}>
            Жодних записів цього дня
          </Text>
        </View>
      ) : (
        <>
          <InfoProgramCard dailyInfo={dailyInfoResult} />
          {Object.keys(dishes).map((mealType, index) => (
            <View key={index} style={{ gap: 5 }}>
              <View style={{ alignItems: "center", paddingTop: hp(1) }}>
                <Text style={{ fontSize: fontsSize.md, fontWeight: "800" }}>
                  {mealNamesInUkrainian[mealType]}
                </Text>
              </View>
              {dishes[mealType].map((dish, dishIndex) => (
                <TouchableOpacity key={dishIndex}>
                  <Text
                    style={{ fontSize: fontsSize.md }}
                    onPress={() =>
                      navigation.navigate("DishScreenInfo", {
                        itemId: dish.dish.id,
                      })
                    }
                  >
                    {dish.dish.title} (порцій: {dish.count}, ккал:{" "}
                    {dish.count * dish.dish.calories}){" "}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </>
      )}
    </View>
  );
};

export default ConsumedFood;

const styles = StyleSheet.create({});
