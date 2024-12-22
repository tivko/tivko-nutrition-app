import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import useAxios from "../../hooks/useAxios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SearchableList from "../../components/FoodSearch/SearchableList";

const FoodAllergiesScreen = () => {
  const [categories, setCategories] = useState();
  const { data: result, loading, error, sendRequest } = useAxios();

  useEffect(() => {
    sendRequest("ingredient-category");
  }, []);

  useEffect(() => {
    if (result) {
      setCategories(result);
    }
  }, [result]);

  const MenuOptions = [
    {
      id: "removallergy",
      text: "Видалити алергію",
    },
  ];

  return (
    <SearchableList
      endpoint="user/allergies"
      placeholder="Пошук інгредієнтів..."
      menuOptions={MenuOptions}
      categories={categories}
    />
  );
};

export default FoodAllergiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    gap: 10,
    paddingBottom: 100,
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 20,

    height: hp(6),
    fontSize: hp(2),
  },
});
