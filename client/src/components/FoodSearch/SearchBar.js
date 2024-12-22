import React from "react";
import { View, TextInput, Text, Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "../../styles/icons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { fontsSize, wp } from "../../styles/base";

const SearchBar = ({
  search,
  setSearch,
  setModalVisible,
  placeholder,
  ell,
}) => (
  <>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder={placeholder}
        style={styles.input}
      />
      <Pressable
        style={styles.inputSortIcon}
        onPress={() => setModalVisible(true)}
      >
        <MaterialCommunityIcons
          name="sort-reverse-variant"
          size={hp(3.5)}
          color="black"
        />
      </Pressable>
    </View>
    {ell !== "dish" && (
      <Text style={{ fontSize: fontsSize.md }}>
        Розрахунок на 100г. продукту
      </Text>
    )}
  </>
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#f2f2f2",
    padding: wp(2),
    borderRadius: hp(2),
    height: hp(6),
    fontSize: hp(2),
    flexGrow: 1,
  },
  inputSortIcon: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: wp(2),
  },
});

export default SearchBar;
