import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SubmitFormButton from "../Form/SubmitFormButton";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import useAxios from "../../hooks/useAxios";
import { colors, fontsSize } from "../../styles/base";
const FoodListItem = ({
  item,
  info,
  MenuOptions,
  onRemoveItem,
  ell,
  addToDaily,
}) => {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const navigation = useNavigation();

  const {
    data: result,
    loading: axiosLoading,
    error: requestError,
    sendRequest,
  } = useAxios();

  const handleMenuSelect = async (value, id) => {
    if (value === "favourite") {
      await sendRequest(`user/favdish/`, {
        dishId: id,
      });
      item.isFavorite = true;
    } else if (value === "removefavdish") {
      await sendRequest(
        `user/favdish/`,
        {
          dishId: id,
        },
        (method = "DELETE")
      );
      onRemoveItem(id);
    } else if (value === "allergy") {
      await sendRequest("user/allergies", {
        ingredientsId: id,
      });
      onRemoveItem(id);
    } else if (value === "removallergy") {
      await sendRequest(
        "user/allergies",
        {
          ingredientsId: id,
        },
        (method = "DELETE")
      );
      onRemoveItem(id);
    }
    setOptionsVisible(false);
  };
  return (
    <>
      <TouchableOpacity
        style={{ position: "relative", zIndex: 1 }}
        onPress={() =>
          navigation.navigate("DishScreenInfo", { itemId: item.id })
        }
        disabled={ell === "dish" ? false : true}
      >
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
                justifyContent: "centers",
              }}
            >
              <Text style={styles.label}>{item.title}</Text>
              <Text style={styles.labelSecond}>100г.</Text>
            </View>

            <Text style={styles.brans}>
              {item?.calories.toFixed(2)} ккал.,{" "}
              {item?.carbohydrates.toFixed(2)} вугл., {item?.protein.toFixed(2)}{" "}
              біл., {item?.fat.toFixed(2)} жир.
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            {info?.dish !== undefined && (
              <TouchableOpacity onPress={() => addToDaily(item)}>
                <AntDesign name="pluscircleo" size={24} color="royalblue" />
              </TouchableOpacity>
            )}
            {item?.isFavorite && item?.isFavorite === true ? (
              <AntDesign name="heart" size={hp(3)} color={colors.primary} />
            ) : (
              <TouchableOpacity onPress={() => setOptionsVisible(true)}>
                <Ionicons name="ellipsis-vertical" size={hp(4)} color="black" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={optionsVisible}
        onRequestClose={() => setOptionsVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {MenuOptions.map((option) => (
              <SubmitFormButton
                text={option.text}
                width={wp("39%")}
                onPress={() => handleMenuSelect(option.id, item.id)}
                key={option.id}
              />
            ))}
            <TouchableOpacity onPress={() => setOptionsVisible(false)}>
              <Text style={{ color: colors.primary, fontSize: fontsSize.md }}>
                Закрити
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default FoodListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f6f6f8",
    padding: 10,
    height: hp(8),
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    gap: 5,
  },
  label: {
    fontWeight: "bold",
    fontSize: fontsSize.md,
  },
  labelSecond: {
    fontSize: fontsSize.sm,
  },
  brans: {
    color: "dimgray",
    fontSize: fontsSize.sm,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    gap: 15,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
