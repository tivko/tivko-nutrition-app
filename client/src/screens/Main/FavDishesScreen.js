import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import SearchableList from "../../components/FoodSearch/SearchableList";
import useAxios from "../../hooks/useAxios";
import { useRoute } from "@react-navigation/native";
import { hp } from "../../styles/base";

const FavDishesScreen = () => {
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

  const MenuOptions = [
    {
      id: "removefavdish",
      text: "Видалити з улюблених",
    },
  ];
  return (
    <SearchableList
      endpoint="user/favdish"
      placeholder="Пошук страв..."
      info={info}
      ell="dish"
      menuOptions={MenuOptions}
      categories={categories}
    />
  );
};

export default FavDishesScreen;

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
