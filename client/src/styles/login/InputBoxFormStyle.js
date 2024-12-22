import { hp, wp, fontsSize, colors } from "../base.js";
import { StyleSheet } from "react-native";
export default InputBoxFormStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.default,
    width: wp(80),
    height: hp(6),
    flexDirection: "row",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  showPasswordContainer: {
    position: "absolute",
    right: hp(1),
    top: hp(1.7),
    alignItems: "center",
  },
  input: {
    fontSize: fontsSize.sm,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  error: {
    color: "red",
    fontSize: fontsSize.sm,
  },

  errorContainer: {
    alignItems: "flex-end",
    width: wp("80%"),
  },

  labelContainer: {
    paddingTop: 8,
    paddingBottom: 5,
  },

  labelText: {
    fontSize: fontsSize.md,
    color: colors.text,
  },
});
