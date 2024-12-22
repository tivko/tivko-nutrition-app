import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import NavigatorStack from "./NavigatorStack";
import ProfileNavigatorStack from "./ProfileNavigatorStack";
import { SimpleLineIcons } from "@expo/vector-icons";
import TopNavigationDishes from "./TopNavigationDishes";
import TopNavigationIngredient from "./TopNavigationIngredient";
import { colors } from "../../styles/base";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: hp(6),
        },
      }}
    >
      <Tab.Screen
        component={NavigatorStack}
        name="Stack"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  width: wp(25),
                }}
              >
                <SimpleLineIcons
                  name="home"
                  size={hp("3%")}
                  color={focused ? colors.primary : "gray"}
                />
                <Text
                  style={{
                    color: focused ? colors.primary : "gray",
                    fontSize: hp(1.5),
                  }}
                >
                  Головна
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        component={TopNavigationDishes}
        name="Dishes"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                width: wp(25),
              }}
            >
              <SimpleLineIcons
                name="note"
                size={hp("3%")}
                color={focused ? colors.primary : "gray"}
              />
              <Text
                style={{
                  color: focused ? colors.primary : "gray",
                  fontSize: hp(1.5),
                }}
              >
                Страви
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        component={TopNavigationIngredient}
        name="Ingredient"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                width: wp(25),
              }}
            >
              <SimpleLineIcons
                name="note"
                size={hp("3%")}
                color={focused ? colors.primary : "gray"}
              />
              <Text
                style={{
                  color: focused ? colors.primary : "gray",
                  fontSize: hp(1.5),
                }}
              >
                Алергії
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        component={ProfileNavigatorStack}
        name="ProfileNavigatorStack"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                width: wp(25),
              }}
            >
              <SimpleLineIcons
                name="user"
                size={hp("3%")}
                color={focused ? colors.primary : "gray"}
              />
              <Text
                style={{
                  color: focused ? colors.primary : "gray",
                  fontSize: hp(1.5),
                }}
              >
                Профіль
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
