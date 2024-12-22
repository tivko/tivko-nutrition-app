import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { colors, fontsSize, hp } from "../../styles/base";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

const Header = ({ user }) => {
  const [isError, setIsError] = useState(false);
  const navigation = useNavigation();

  return (
    <View
      style={{
        paddingTop: hp(1),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: fontsSize.lg }}>
          Вітаємо,{" "}
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: fontsSize.lg }}>
          {user?.firstName}
        </Text>
      </View>

      <View style={styles.headerProfile}>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
          <Image
            source={
              isError || !user?.profile
                ? require("../../../assets/user.jpg")
                : { uri: user.profile }
            }
            style={styles.headerProfile}
            onError={() => setIsError(true)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Header;
const styles = StyleSheet.create({
  headerProfile: {
    width: hp(5),
    height: hp(5),
    backgroundColor: colors.default,
    borderRadius: hp(100),
  },
});
