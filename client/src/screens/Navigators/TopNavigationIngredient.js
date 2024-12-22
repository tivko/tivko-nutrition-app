import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { IngredientsSearchScreen, FoodAllergiesScreen } from "../index";
import { colors, hp } from "../../styles/base";
const Tab = createMaterialTopTabNavigator();
const TopNavigationIngredient = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.text,
        tabBarLabelStyle: {
          fontSize: hp(1.5), // Change this value to set your desired font size
        },
        tabBarStyle: {
          height: hp(6),
          justifyContent: "center",
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.primary, // The color of the indicator (underline) of the active tab
        },
      }}
    >
      <Tab.Screen name="Інгредієнти" component={IngredientsSearchScreen} />
      {/* <Tab.Screen name="Allergies" component={FoodAlergiesScreen} /> */}
      <Tab.Screen name="Алергії" component={FoodAllergiesScreen} />
    </Tab.Navigator>
  );
};

export default TopNavigationIngredient;
