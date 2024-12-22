import { StyleSheet, Platform, SafeAreaView, StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigation from "./src/screens/Navigators/Navigation";
import { AppProvider } from "./src/context/mealContext";
import { DailyFoodProvider } from "./src/context/dailyFoodContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <AppProvider>
        <DailyFoodProvider>
          <Navigation />
          <StatusBar style="dark" />
        </DailyFoodProvider>
      </AppProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
