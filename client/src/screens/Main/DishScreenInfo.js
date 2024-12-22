import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import DishInfoHeader from "../../components/FoodSearch/DishInfoHeader";
import useAxios from "../../hooks/useAxios";
import { colors, fontsSize, hp, wp } from "../../styles/base";
import IngredientItem from "../../components/FoodSearch/IngredientItem";
import NutrientInfoBox from "../../components/FoodSearch/NutrientInfoBox";
import YoutubeIframe from "react-native-youtube-iframe";
const DishScreenInfo = ({ navigation }) => {
  const {
    data: result,
    loading,
    error: errorRequest,
    sendRequest,
  } = useAxios();
  const route = useRoute();
  const { itemId } = route.params;
  const [dish, setDish] = useState();

  useEffect(() => {
    sendRequest(`dishes/dishwithingredient/${itemId}`);
  }, [itemId]);

  useEffect(() => {
    if (result) {
      setDish(result?.result);
    }
  }, [result]);

  useEffect(() => {
    if (errorRequest) {
      Alert.alert("Помилка", errorRequest?.message);
    }
  }, [errorRequest]);

  const getYoutubeVideoId = (url) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  if (loading || !dish) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContent}
    >
      <DishInfoHeader image={dish.dish_photo} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.sectionTitle}>{dish.title}</Text>
          <Text style={styles.sectionTitlePortion}>КБЖВ на 100 грам: </Text>
        </View>
        <View style={styles.nutrientContainer}>
          <NutrientInfoBox name="Ккал." value={dish.calories} icon="fire" />
          <NutrientInfoBox name="Білки" value={dish.protein} icon="fish" />
          <NutrientInfoBox name="Жири" value={dish.fat} icon="nutrition" />
          <NutrientInfoBox
            name="Вугл."
            value={dish.carbohydrates}
            icon="bread-slice"
          />
        </View>

        {dish.dishingredients.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Інгредієнти</Text>
            </View>

            <View style={styles.ingredientsContainer}>
              {dish.dishingredients.map((ingredientData, index) => (
                <IngredientItem
                  key={index}
                  index={index}
                  count={ingredientData.count}
                  unit={ingredientData.unit_of_measurement}
                  title={ingredientData.ingredient.title}
                />
              ))}
            </View>
          </>
        )}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Опис</Text>
        </View>
        <View style={styles.descriptionContainer}>
          {dish?.portion && (
            <Text style={styles.sectionTitlePortion}>
              Порцій: {dish?.portion}
            </Text>
          )}
          <Text style={styles.description}>{dish.description}</Text>
        </View>
        {dish.dish_video && (
          <View
            style={{
              aspectRatio: 16 / 9,
            }}
          >
            <YoutubeIframe videoId={dish.dish_video} height={hp(90)} />
          </View>
        )}
      </View>
    </ScrollView>
  );
};
export default DishScreenInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  content: {
    paddingHorizontal: hp(1),
  },
  header: {
    alignItems: "center",
  },
  nutrientContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: hp(1),
  },
  sectionHeader: {
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: fontsSize.lg,
    fontWeight: "500",
    marginBottom: 10,
  },
  sectionTitlePortion: {
    fontSize: fontsSize.md,
    fontWeight: "400",
    marginBottom: 10,
    alignItems: "flex-start",
  },
  ingredientsContainer: {
    flexDirection: "column",
    gap: 10,
    marginBottom: 10,
  },
  descriptionContainer: {
    paddingHorizontal: hp(1),
    paddingBottom: hp(1),
  },
  description: {
    fontSize: fontsSize.md,
  },
  videoContainer: {
    aspectRatio: 16 / 9,
  },
});
