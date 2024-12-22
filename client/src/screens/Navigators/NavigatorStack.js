import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  DishesSearchScreen,
  HomeScreen,
  EditPhysicalDataScreen,
  DishScreenInfo,
} from "../index";
import TopNavigationDishes from "./TopNavigationDishes";

const Stack = createNativeStackNavigator();

const NavigatorStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DishesSearchScreen"
        component={DishesSearchScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EditPhysicalDataScreen"
        component={EditPhysicalDataScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DailyDishes"
        component={TopNavigationDishes}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default NavigatorStack;

const styles = StyleSheet.create({});
