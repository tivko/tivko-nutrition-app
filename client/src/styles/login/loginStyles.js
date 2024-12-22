import { colors, fontsSize, hp, wp } from "../base.js";
import createStyles from "../base.js";

const loginStyles = createStyles({
  checkbox: {
    height: hp(2.2),
    width: hp(2.2),
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    paddingVertical: 5,
  },
  checkbox: {
    height: hp(2.2),
    width: hp(2.2),
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: wp(80),
    backgroundColor: colors.default,
    borderColor: colors.text,
    borderWidth: 1,
    borderRadius: 5,
    color: colors.text,
    height: hp(6),
    zIndex: 5,
  },
  label: {
    color: colors.text,
  },
  pickerItem: {
    fontSize: fontsSize.sm,
    color: colors.text,
  },
  picker: {
    width: wp(80),
    borderRadius: 7,
    padding: 10,
    fontSize: fontsSize.md,
    color: colors.text,
  },
  scrollView: {
    flex: 1,
    height: hp(2),
  },
  labelContainer: {
    width: wp(80),
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  labelText: {
    fontSize: fontsSize.md,
    color: colors.text,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  alertText: {
    fontSize: fontsSize.lg, // Задаємо розмір кнопок
  },
});

export default loginStyles;
