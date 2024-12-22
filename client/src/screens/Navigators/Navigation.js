import React, { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  LoginScreen,
  SignUpScreenHealthInfo,
  SignUpScreenProfile,
  SignupGoalScreen,
  ForgotPassword,
  SignUpActivityLevel,
  SignUpMealProgram,
  SignUpMacroSplit,
  DishScreenInfo,
} from "../index";
import useAxios from "../../hooks/useAxios";
import {
  setToken,
  setUserId,
  useAppContext,
  setRegData,
  setTempId,
  setMealProgram,
  setUser,
} from "../../context/mealContext";
import Tabs from "./NavigatorTabs";
import { getData } from "../../storage";
import LoadingComponent from "../../components/Layout/LoadingComponent";
import { colors, hp } from "../../styles/base";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { state, dispatch } = useAppContext();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(undefined);
  const {
    data: result,
    error: requestErrorUserInfo,
    sendRequest: sendRequestUserInfo,
  } = useAxios();

  useEffect(() => {
    const getStorageData = async () => {
      const data = await getData("LOGGEDIN");
      if (data?.id && data?.token) {
        await sendRequestUserInfo(`user/health/${data.id}`);
        dispatch(setToken(data.token));
        dispatch(setUserId(data.id));
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    };
    dispatch(setToken(null));
    dispatch(setUserId(null));
    getStorageData();
  }, []);

  useEffect(() => {
    if (result?.result) {
      const { healthInfo, ...user } = result?.result;
      dispatch(setRegData({ healthInfo: healthInfo }));
      dispatch(setUser(user));
    }
  }, [result]);

  if (isUserLoggedIn === undefined) {
    // Show a loading screen while retrieving data
    return <LoadingComponent />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {state?.id === undefined || !state?.id || state?.id === null ? (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUpScreenProfile"
              component={SignUpScreenProfile}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Tabs"
              component={Tabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DishScreenInfo"
              component={DishScreenInfo}
              options={{ headerShown: false }}
            />
          </>
        )}
        {state?.sub && (
          <>
            <Stack.Screen
              name="SignUpScreenHealthInfo"
              component={SignUpScreenHealthInfo}
              options={{
                headerShown: false,
                title: "Особиста інформація",
                headerTintColor: "#f6f6f8",
                headerStyle: {
                  backgroundColor: colors.primary,
                },
                headerTitleStyle: {
                  fontWeight: "bold",
                  color: "white",
                  fontSize: hp(2.3),
                },
              }}
            />
            <Stack.Screen
              name="SignupGoalScreen"
              component={SignupGoalScreen}
              options={{
                headerShown: true,
                title: "Фізичні показники",
                headerTintColor: "#f6f6f8",
                headerStyle: {
                  backgroundColor: colors.primary,
                },
                headerTitleStyle: {
                  fontWeight: "bold",
                  color: "white",
                  fontSize: hp(2.3),
                },
              }}
            />
            <Stack.Screen
              name="SignUpActivityLevel"
              component={SignUpActivityLevel}
              options={{
                headerShown: true,
                title: "Ціль",
                headerTintColor: "#f6f6f8",
                headerStyle: {
                  backgroundColor: colors.primary,
                },
                headerTitleStyle: {
                  fontWeight: "bold",
                  color: "white",
                  fontSize: hp(2.3),
                },
              }}
            />
            <Stack.Screen
              name="SignUpMacroSplit"
              component={SignUpMacroSplit}
              options={{
                headerShown: true,
                title: "Фізична активність",
                headerTintColor: "#f6f6f8",
                headerStyle: {
                  backgroundColor: colors.primary,
                },
                headerTitleStyle: {
                  fontWeight: "bold",
                  color: "white",
                  fontSize: hp(2.3),
                },
              }}
            />
            <Stack.Screen
              name="SignUpMealProgram"
              component={SignUpMealProgram}
              options={{
                headerShown: true,
                title: "Налаштування плану",
                headerTintColor: "#f6f6f8",
                headerStyle: {
                  backgroundColor: colors.primary,
                },
                headerTitleStyle: {
                  fontWeight: "bold",
                  color: "white",
                  fontSize: hp(2.3),
                },
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
