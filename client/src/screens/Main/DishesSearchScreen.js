import { useRoute } from "@react-navigation/native";
import SearchableList from "../../components/FoodSearch/SearchableList";
import useAxios from "../../hooks/useAxios";
import React, { useEffect, useState } from "react";
const FoodSearchScreen = () => {
  const route = useRoute();
  const info = route.params.info || {};
  const [categories, setCategories] = useState();
  const { data: result, loading, error, sendRequest } = useAxios();

  useEffect(() => {
    sendRequest("dish-category");
  }, []);

  useEffect(() => {
    if (result) {
      setCategories(result);
    }
  }, [result]);

  const MenuOptions = [{ id: "favourite", text: "Додати в улюблене" }];
  return (
    <SearchableList
      endpoint="dishes/safedishes"
      placeholder="Пошук страв..."
      menuOptions={MenuOptions}
      info={info}
      ell="dish"
      categories={categories}
    />
  );
};

export default FoodSearchScreen;
