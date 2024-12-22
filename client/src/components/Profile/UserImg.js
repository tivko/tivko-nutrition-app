import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const UserImg = ({ profieldata }) => {
  console.log(profieldata?.profile);
  return (
    <>
      <View style={styles.profileContainer}>
        {!profieldata?.profile ? (
          <View style={styles.profilePhoto}>
            <Image
              source={require("../../../assets/user.jpg")}
              style={styles.profilePhoto}
            />
          </View>
        ) : (
          <Image
            source={{ uri: profieldata?.profile }}
            style={styles.profilePhoto}
          />
        )}
      </View>
      <Text style={styles.nameText}>
        {profieldata?.firstName + " " + profieldata?.lastName}
      </Text>
    </>
  );
};

export default UserImg;

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: "center",
    marginTop: -hp(25),
  },
  profilePhoto: {
    width: hp(16),
    height: hp(16),
    borderRadius: 100,
    backgroundColor: "lightgray",
  },
  nameText: {
    fontSize: hp(3),
    fontWeight: "bold",
    marginTop: hp(1.2),
    color: "#ffff",
    paddingBottom: hp(1.5),
  },
});
