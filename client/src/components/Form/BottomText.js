import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import createStyles from "../../styles/base";
const styles = createStyles();
const BottomText = ({
  firstText,
  secondText,
  thirdText,
  pushButton,
  screenName,
}) => {
  return (
    <>
      {firstText && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(screenName);
          }}
        >
          <Text style={[styles.text, { color: "red" }]}>{firstText}</Text>
        </TouchableOpacity>
      )}
      {secondText && (
        <View style={[styles.text, { flexDirection: "row", gap: 3 }]}>
          <Text style={styles.text}>{secondText}</Text>
          <TouchableOpacity onPress={pushButton}>
            <Text style={[styles.text, { textDecorationLine: "underline" }]}>
              {thirdText}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default BottomText;
