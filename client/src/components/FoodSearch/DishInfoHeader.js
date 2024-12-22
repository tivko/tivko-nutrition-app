import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { colors, hp, wp } from "../../styles/base";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const DishInfoHeader = ({ image }) => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const defaultImage = "../../../assets/default.jpg";

  return (
    <View style={styles.container}>
      {/* Image */}
      <View style={styles.imageWrapper}>
        {loading && (
          <ActivityIndicator
            style={styles.loadingIndicator}
            size="large"
            color={colors.default}
          />
        )}
        <Image
          source={image !== null ? { uri: image } : require(defaultImage)}
          style={image !== null ? styles.image : styles.defaultImage}
          onLoadEnd={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Back"
        >
          <AntDesign name="leftcircle" size={hp(3.8)} color={colors.default} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DishInfoHeader;

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  imageWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  image: {
    width: wp(100),
    height: hp(50),
    resizeMode: "cover",
  },
  defaultImage: {
    width: wp(100),
    height: hp(50),
    resizeMode: "cover",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: hp(2),
    paddingHorizontal: wp(2),
  },
  button: {
    padding: 15,
    borderRadius: 100,
  },
  loadingIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -0.5 * wp(5) }, { translateY: -0.5 * hp(5) }],
  },
});
