import { Image, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import createStyles, { hp } from "../../styles/base";
import { AntDesign } from "@expo/vector-icons";
const UserImg = ({ pickImage, control, image, initialImage }) => {
  const [isError, setIsError] = useState(false);
  return (
    <View style={styles.profileContainer}>
      <Image
        style={styles.profilePhoto}
        control={control}
        source={
          isError || !image
            ? require("../../../assets/user.jpg")
            : { uri: image }
        }
        onError={() => setIsError(true)}
      />
      <TouchableOpacity style={styles.plus} onPress={pickImage}>
        <AntDesign name="plus" size={hp(2.2)} color="#808080" />
      </TouchableOpacity>
    </View>
  );
};

const styles = createStyles();

export default UserImg;
