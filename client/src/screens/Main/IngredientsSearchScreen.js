import { useRoute } from "@react-navigation/native";
import SearchableList from "../../components/FoodSearch/SearchableList";
import useAxios from "../../hooks/useAxios";
import React, { useState, useEffect } from "react";
const IngredientsSearchScreen = () => {
  const ScreenData = useRoute();
  const from = ScreenData?.params?.from;
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

  const MenuOptions = [{ id: "allergy", text: "Додати алергію" }];

  return (
    <SearchableList
      endpoint="ingredient/safeIngredients"
      placeholder="Пошук інгредієнтів..."
      menuOptions={MenuOptions}
      categories={categories}
      from
    />
  );
};

export default IngredientsSearchScreen;
