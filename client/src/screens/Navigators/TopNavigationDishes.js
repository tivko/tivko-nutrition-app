import React, { useState } from "react";
import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FavDishesScreen, DishesSearchScreen } from "../index";
import { colors, hp, wp } from "../../styles/base";
import { useFocusEffect } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();
const TopNavigationDishes = ({ route }) => {
  const { info } = route.params || {};
  const [resetFrom, setResetFrom] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      setResetFrom(true);
      return () => {
        setResetFrom(false);
      };
    }, [])
  );
  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.text,
        tabBarLabelStyle: {
          fontSize: hp(1.5),
        },
        tabBarStyle: {
          height: hp(6),
          justifyContent: "center",
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.primary,
        },
      }}
    >
      <Tab.Screen
        name="Страви"
        initialParams={{ info: resetFrom ? null : info }}
        component={DishesSearchScreen}
      />
      <Tab.Screen
        name="Улюблені страви"
        initialParams={{ info: resetFrom ? null : info }}
        component={FavDishesScreen}
      />
    </Tab.Navigator>
  );
};

export default TopNavigationDishes;
