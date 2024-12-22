import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SelectItemRadio = ({ data, selectedItemId, setSelectedItemId }) => {
  return (
    <View>
      <Text style={{ marginBottom: 5, fontWeight: "400", fontSize: hp(2.8) }}>
        Options
      </Text>
      {data.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => {
            setSelectedItemId(item?.id);
          }}
        >
          <View
            style={[
              styles.itemsContainer,
              {
                backgroundColor:
                  item?.id === selectedItemId ? "orange" : "#f2f2f2",
              },
            ]}
          >
            <Text>{item.name}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default SelectItemRadio;

const styles = StyleSheet.create({
  itemsContainer: {
    padding: 20,
    width: "100%",
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
  },
});
