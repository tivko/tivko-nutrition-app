import { Text, View } from "react-native";
import React from "react";
import { colors, fontsSize } from "../../styles/base";
const TitleText = ({ main, second }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      {main && (
        <View>
          <Text style={{ fontSize: fontsSize.lg, color: colors.text }}>
            {main}
          </Text>
        </View>
      )}
      {second && (
        <View>
          <Text
            style={{
              fontSize: fontsSize.md,
              color: colors.text,
            }}
          >
            {second}
          </Text>
        </View>
      )}
    </View>
  );
};

export default TitleText;
