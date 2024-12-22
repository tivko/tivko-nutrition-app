import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import ItemsSelectionModal from "./ItemsSelectionModal";
import useFetchData from "../../hooks/useFetchData";
import { useFocusEffect } from "@react-navigation/native";
import { wp } from "../../styles/base";
import {
  useDailyFoodContext,
  addToDailyItems,
  removeFromDailyItems,
  updateInfo,
  setConsumedInfo,
} from "../../context/dailyFoodContext";
import SearchBar from "./SearchBar";
import { filterData, countItems } from "../../help/utils";
import FoodList from "./FoodList";
import DailyRecommendationView from "./DailyRecommendationView";
import useAxios from "../../hooks/useAxios";

const SearchableList = ({
  endpoint,
  placeholder,
  menuOptions,
  info,
  ell,
  categories,
}) => {
  const [search, setSearch] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { data, originalData, setData, loading, fetchData } =
    useFetchData(endpoint);
  const { state, dispatch } = useDailyFoodContext();
  const dailyItems = state[info?.dish]?.items || [];
  const dailyInfo = state[info?.dish]?.info || null;
  const idDailyInfo = info?.idDailyInfo;
  const consumedInfo = info?.consumedInfo;
  const { sendRequest } = useAxios();

  useFocusEffect(
    useCallback(() => {
      fetchData();
      return () => setData(null);
    }, [])
  );

  useEffect(() => {
    setData(filterData(originalData, search, selectedItems, dailyInfo));
    console.log(originalData)
  }, [search, selectedItems, originalData, dailyInfo]);

  const handleRemoveItem = (id) => {
    setData((prevData) => {
      const newData = prevData.filter((item) => item.id !== id);
      return newData;
    });
  };

  const roundToTwo = (value) => {
    return parseFloat(value.toFixed(2));
  };

  const updateDailyRecommendation = (item, operation) => {
    const factor = operation === "add" ? -1 : 1;
    const values = {
      calories: roundToTwo((dailyInfo?.calories ?? 0) + factor * item.calories),
      carbohydrates: roundToTwo(
        (dailyInfo?.carbohydrates ?? 0) + factor * item.carbohydrates
      ),
      fat: roundToTwo((dailyInfo?.fat ?? 0) + factor * item.fat),
      proteins: roundToTwo((dailyInfo?.proteins ?? 0) + factor * item.protein),
      dish: dailyInfo?.dish,
    };
    consumedInfo.dailyCalories = roundToTwo(
      consumedInfo.dailyCalories - factor * item.calories
    );
    consumedInfo.dailyCarbohydrates = roundToTwo(
      consumedInfo.dailyCarbohydrates - factor * item.carbohydrates
    );
    consumedInfo.dailyProteins = roundToTwo(
      consumedInfo.dailyProteins - factor * item.protein
    );
    consumedInfo.dailyFat = roundToTwo(
      consumedInfo.dailyFat - factor * item.fat
    );
    return values;
  };

  const addToDaily = async (item) => {
    try {
      await sendRequest("daily-dishes", {
        dishId: item.id,
        dailyInfoId: info.idDailyInfo,
        mealType: info.dish,
      });

      const values = updateDailyRecommendation(item, "add");

      dispatch(updateInfo(dailyInfo?.dish, values));
      dispatch(addToDailyItems(dailyInfo?.dish, item));
      await updateDailyInfo();
    } catch (error) {
      console.error("Error adding to daily", error);
    }
  };

  const removeFromDaily = async (item) => {
    try {
      await sendRequest(
        `daily-dishes`,
        {
          dishId: item.id,
          dailyInfoId: info.idDailyInfo,
          mealType: info.dish,
        },
        "DELETE"
      );
      const values = updateDailyRecommendation(item, "remove");
      dispatch(updateInfo(dailyInfo?.dish, values));
      dispatch(removeFromDailyItems(dailyInfo?.dish, item.id));
      await updateDailyInfo();
    } catch (error) {
      console.error("Error removing from daily", error);
    }
  };

  const updateDailyInfo = async () => {
    try {
      await sendRequest(
        `dailyinfo/update/${idDailyInfo}`,
        {
          dailyCarbohydrates: consumedInfo.dailyCarbohydrates,
          dailyProteins: consumedInfo.dailyProteins,
          dailyCalories: consumedInfo.dailyCalories,
          dailyFat: consumedInfo.dailyFat,
          mealsNumber: Number(state.mealNumbers),
        },
        "PATCH"
      );
      const consumed = {
        dailyCarbohydrates: consumedInfo.dailyCarbohydrates,
        dailyProteins: consumedInfo.dailyProteins,
        dailyCalories: consumedInfo.dailyCalories,
        dailyFat: consumedInfo.dailyFat,
      };
      dispatch(setConsumedInfo(consumed));
    } catch (error) {
      console.error("Error adding to daily", error);
    }
  };

  const itemCounts = countItems(dailyItems);

  const uniqueDailyItems = dailyItems.filter(
    (item, index, self) =>
      index ===
      self.findIndex((t) => t.id === item.id && t.title === item.title)
  );

  return (
    <>
      <View style={styles.container}>
        <SearchBar
          search={search}
          setSearch={setSearch}
          setModalVisible={setModalVisible}
          placeholder={placeholder}
          ell={ell}
        />
        {info?.dish !== undefined && (
          <DailyRecommendationView
            dailyRecomendation={dailyInfo}
            uniqueDailyItems={uniqueDailyItems}
            itemCounts={itemCounts}
            dailyItems={dailyItems}
            addToDaily={addToDaily}
            removeFromDaily={removeFromDaily}
          />
        )}
        <FoodList
          originalData={originalData}
          data={data}
          menuOptions={menuOptions}
          info={info}
          ell={ell}
          handleRemoveItem={handleRemoveItem}
          addToDaily={addToDaily}
          loading={loading}
        />
      </View>
      <ItemsSelectionModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setSelectedItems={setSelectedItems}
        categories={categories}
      />
    </>
  );
};

export default SearchableList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: wp(1.5),
    gap: wp(1),
  },
});
