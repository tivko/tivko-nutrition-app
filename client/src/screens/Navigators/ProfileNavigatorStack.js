import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import {
  EditProfileScreen,
  ViewAllProgramsScreen,
  ProfileScreen,
  ViewPlanInfoScreen,
  ViewPlanInfo,
} from "../index";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { MealProgramsProvider } from "../../context/mealProgramsContext";
const Stack = createNativeStackNavigator();

const ProfileNavigatorStack = () => {
  const navigation = useNavigation();
  useFocusEffect(
    React.useCallback(() => {
      return () =>
        navigation.reset({
          index: 0,
          routes: [{ name: "ProfileScreen" }],
        });
    }, [])
  );
  return (
    <MealProgramsProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewAllProgramsScreen"
          component={ViewAllProgramsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewPlanInfoScreen"
          component={ViewPlanInfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewPlanInfo"
          component={ViewPlanInfo}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </MealProgramsProvider>
  );
};

export default ProfileNavigatorStack;
