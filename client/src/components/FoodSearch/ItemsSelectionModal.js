import React from "react";
import {
  View,
  Text,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import Checkbox from "expo-checkbox";
import { colors, fontsSize, hp, wp } from "../../styles/base";

const ItemsSelectionModal = ({
  modalVisible,
  categories,
  setModalVisible,
  setSelectedItems,
}) => {
  const { control, handleSubmit } = useForm();

  const onSignInPressed = async (data) => {
    const selected = [];
    Object.keys(data).forEach((key) => {
      const itemId = parseInt(key);
      const currentItem = categories.find((item) => item.id === itemId);
      if (data[key]) {
        selected.push(currentItem.id);
      }
    });
    setSelectedItems(selected);
    setModalVisible(false);
  };

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Показати лише</Text>
          </View>
          <View style={styles.listContainer}>
            {categories && categories.length !== 0 ? (
              <FlatList
                data={categories}
                renderItem={({ item }) => (
                  <View key={item.id} style={styles.itemContainer}>
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Pressable
                          onPress={() => onChange(!value)}
                          style={styles.checkboxContainer}
                        >
                          <Checkbox
                            style={styles.checkbox}
                            value={value}
                            onValueChange={(newValue) => onChange(newValue)}
                            color={value ? colors.primary : undefined}
                          />
                          <Text style={styles.itemText}>{item.name}</Text>
                        </Pressable>
                      )}
                      name={`${item.id}`}
                      defaultValue={false}
                    />
                  </View>
                )}
                contentContainerStyle={{ gap: hp(1) }}
              />
            ) : (
              <Text>Немає доступних параметрів</Text>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.modalButton}
              onPress={handleSubmit(onSignInPressed)}
            >
              <Text style={styles.buttonText}>Зберегти</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ItemsSelectionModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    justifyContent: "space-between",
    width: wp(80),
    minHeight: hp(20),
    maxHeight: hp(70),
    backgroundColor: "white",
    padding: wp(5),
    borderRadius: wp(3),
  },
  titleContainer: {
    alignItems: "center",
    gap: 10,
  },
  titleText: {
    fontWeight: "500",
    fontSize: fontsSize.md,
  },
  listContainer: {
    alignItems: "center",
    paddingTop: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(2),
    paddingHorizontal: wp(2), // Add horizontal padding to space items
  },
  checkbox: {
    width: fontsSize.md,
    height: fontsSize.md,
  },
  itemText: {
    fontSize: fontsSize.md,
  },
  modalButton: {
    backgroundColor: colors.primary,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(5),
    borderRadius: wp(2),
  },
  buttonText: {
    fontSize: fontsSize.md,
    color: colors.default,
  },
  itemContainer: {
    marginVertical: hp(0.5),
  },
  buttonContainer: {
    paddingTop: 15,
    alignItems: "center",
  },
});
