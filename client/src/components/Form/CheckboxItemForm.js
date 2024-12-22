import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { colors, fontsSize, hp, wp } from "../../styles/base";
const CheckboxItemForm = ({ setSelectedItem, originalData, selectedItem }) => {
  return (
    <View style={{ paddingBottom: 8 }}>
      {originalData.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => {
            setSelectedItem(item);
          }}
        >
          <View
            style={[
              styles.itemsContainer,
              {
                backgroundColor:
                  item?.id === selectedItem?.id
                    ? colors.primary
                    : colors.default,
              },
            ]}
          >
            <Text
              style={{
                fontSize: fontsSize.sm,
                color:
                  item?.id === selectedItem?.id ? colors.default : colors.text,
              }}
            >
              {item.name}
            </Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default CheckboxItemForm;

const styles = StyleSheet.create({
  itemsContainer: {
    padding: hp(2.5),
    borderWidth: 1,
    borderColor: colors.text,
    marginTop: 10,
    borderRadius: 10,
  },
});
