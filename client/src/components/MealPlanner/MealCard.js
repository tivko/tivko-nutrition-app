import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
const { width, height } = Dimensions.get("window");

const MealCard = ({ dish, nutrients, textSize }) => {
  return (
    <View style={styles.containerCard}>
      <View>
        <Image
          source={require("../../../assets/pexels1.jpg")}
          style={styles.img}
        ></Image>
      </View>
      <View>
        <Text style={{ fontSize: textSize }}>Назва: {dish}</Text>
        <Text style={{ fontSize: textSize - 6 }}>
          Калорій: {nutrients.calories}
        </Text>
        <View style={styles.containerNutritionInfo}>
          <Text style={{ fontSize: textSize - 6 }}>
            Білки: {nutrients.protein}
          </Text>
          <Text style={{ fontSize: textSize - 6 }}>Жири: {nutrients.fat}</Text>
          <Text style={{ fontSize: textSize - 6 }}>
            Вуглеводи: {nutrients.carbohydrates}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MealCard;

const styles = StyleSheet.create({
  containerCard: {
    flexDirection: "row",
    gap: 10,
  },
  img: {
    width: width * 0.9,
    height: height * 0.11,
    aspectRatio: 1, // Maintain the aspect ratio of the image
    resizeMode: "cover",
  },
  containerNutritionInfo: { flexDirection: "row", gap: 10 },
});
