import { Alert, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { getAuth, app } from "../../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useForm } from "react-hook-form";
import InputBoxForm from "../../components/Form/InputBoxForm";
import SubmitFormButton from "../../components/Form/SubmitFormButton";

const ForgotPassword = () => {
  const {
    control,
    handleSubmit,
    loading,
    formState: { errors },
  } = useForm();

  const auth = getAuth(app);

  const handleForgotPassowrd = async (data) => {
    try {
      const res = await sendPasswordResetEmail(auth, data?.email);
      Alert.alert(
        "Сповіщення",
        "Будь ласка, перевірте свою поштову скриньку, щоб змінити пароль"
      );
      setValue("email", "");
    } catch (error) {
      return { error: error };
    }
  };
  return (
    <ImageBackground
      source={require("../../../assets/img6.jpg")}
      resizeMode="cover"
      style={styles.container}
      blurRadius={0}
    >
      <View
        style={{
          backgroundColor: "rgba(255,255,255,0.9)",
          alignItems: "center",
          justifyContent: "center",
          paddingRight: 20,
          paddingLeft: 20,
          paddingVertical: 20,
          gap: 10,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            paddingBottom: 10,
          }}
        >
          <Text style={styles.mainText}>Відновлення паролю</Text>
        </View>
        <InputBoxForm
          name="email"
          placeholder="Email"
          control={control}
          rules={{
            required: "Email є обов'язковим",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Введіть валідний email",
            },
          }}
        />

        <SubmitFormButton
          text={loading ? "Завантаження..." : "Відправити"}
          onPress={handleSubmit(handleForgotPassowrd)}
        />
      </View>
    </ImageBackground>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: wp("80%"),
  },
  mainText: {
    fontWeight: "500",
    fontSize: hp(4),
    color: "#000000",
  },
});
