import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StyleSheet } from "react-native";

export const colors = {
  primary: "#64EB28",
  default: "#ffff",
  text: "#808080",
  chartColor1: "#EAE700",
  chartColor2: "#64EB28",
  chartColor3: "#EB0901",
};

export const fontsSize = {
  sm: hp(1.8),
  md: hp(2),
  lg: hp(3),
  xl: hp(4),
};

export { wp, hp };

const baseFormsStyles = {
  imgContainer: {
    flex: 1,
    backgroundColor: colors.default,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 20,
    paddingLeft: 20,
    gap: 10,
  },
  container: {
    backgroundColor: colors.default,
    paddingRight: 20,
    paddingLeft: 20,
    paddingVertical: 20,
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  bottomContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    width: wp("80%"),
  },
  mainText: {
    fontWeight: "500",
    fontSize: fontsSize.xl,
    color: colors.text,
  },
  text: {
    fontSize: fontsSize.sm,
  },
  plus: { position: "absolute", bottom: 0, right: hp(0.2) },
  profilePhoto: {
    width: hp(10),
    height: hp(10),
    borderRadius: hp(10),
  },
  profileContainer: {
    alignItems: "center",
    width: hp(10),
    height: hp(10),
    borderRadius: hp(10),
    backgroundColor: colors.primary,
    position: "relative",
  },
};

export default function createStyles(overrides = {}) {
  return StyleSheet.create({ ...baseFormsStyles, ...overrides });
}
