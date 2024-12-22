import React from "react";
import { View, FlatList } from "react-native";
import SelectedDailyDishes from "./SelectedDailyDishes";
import DailyFoodListItem from "./DailyFoodListItem";

const DailyRecommendationView = ({
  dailyRecomendation,
  uniqueDailyItems,
  itemCounts,
  dailyItems,
  addToDaily,
  removeFromDaily,
}) => (
  <View>
    <SelectedDailyDishes
      dailyRecomendation={dailyRecomendation}
      uniqueDailyItems={uniqueDailyItems}
      itemCounts={itemCounts}
      dailyItems={dailyItems}
      addToDaily={addToDaily}
      removeFromDaily={removeFromDaily}
    />
    <FlatList
      data={uniqueDailyItems}
      renderItem={({ item }) => (
        <DailyFoodListItem
          item={item}
          count={itemCounts[item.id]}
          addToDaily={addToDaily}
          removeFromDaily={removeFromDaily}
          dish={dailyRecomendation?.dish}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  </View>
);

export default DailyRecommendationView;
