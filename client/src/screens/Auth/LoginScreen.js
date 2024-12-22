import { Text, View, Alert } from "react-native";
import SubmitFormButton from "../../components/Form/SubmitFormButton";
import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import useAxios from "../../hooks/useAxios";
import { getAuth, app } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  useAppContext,
  setToken,
  setUserId,
  setUser,
  setRegData,
} from "../../context/mealContext";
import { useFocusEffect } from "@react-navigation/native";
import LoginFields from "../../components/Form/LoginFields";
import BottomText from "../../components/Form/BottomText";
import styles from "../../styles/login/loginStyles";
import RememberMe from "../../components/Form/RememberMe";
import BackgroundImage from "../../components/Layout/BackgroundImage";
import { storeData } from "../../storage";
import myFirebaseError from "../../help/firebaseErrors";
import { fontsSize } from "../../styles/base";

const LoginScreen = ({ navigation }) => {
  const [userId, setUserID] = useState("");
  const [isChecked, setChecked] = useState(false);
  const { dispatch, state } = useAppContext();
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const auth = getAuth(app);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const {
    data: result,
    loading: axiosLoading,
    error: requestError,
    sendRequest,
  } = useAxios();

  useFocusEffect(
    useCallback(() => {
      setErrorMessage("");
      setError("");
    }, [userId])
  );

  useEffect(() => {
    if (userId) {
      handleAuthenticate();
    }
  }, [userId]);

  const handleAuthenticate = async () => {
    await sendRequest(`user/health/${userId}`);
  };

  useEffect(() => {
    if (result?.result) {
      const res = result?.result;
      dispatch(setUserId(userId));
      dispatch(setUser(res));
      dispatch(setRegData({ healthInfo: res.healthInfo }));
      dispatch(setToken(res?.token));
      if (isChecked) {
        storeData("LOGGEDIN", { id: userId, token: res?.token });
      }
    }
  }, [result, isChecked]);

  useEffect(() => {
    if (requestError || error) {
      setErrorMessage(myFirebaseError[error.code]);
    }
  }, [requestError, error]);

  const onSignUpPress = async () => {
    navigation.navigate("SignUpScreenProfile");
  };

  const onSignInPressed = async (data) => {
    try {
      const auth = getAuth();
      const res = await signInWithEmailAndPassword(
        auth,
        data?.email,
        data?.password
      );
      setUserID(res?.user?.uid);

      if (res?.user?.stsTokenManager?.accessToken) {
        dispatch(setToken(res?.user?.stsTokenManager?.accessToken));
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <View>
          <Text style={styles.mainText}>Вхід</Text>
        </View>
        {error && (
          <View>
            <Text style={{ fontSize: fontsSize.sm, color: "red" }}>
              {errorMessage}
            </Text>
          </View>
        )}

        <LoginFields control={control} />
        <RememberMe isChecked={isChecked} setChecked={setChecked} />
        <SubmitFormButton
          text={axiosLoading ? "Завантаження..." : "Увійти"}
          onPress={handleSubmit(onSignInPressed)}
          disabled={axiosLoading}
        />
        <View style={styles.bottomContainer}>
          <BottomText
            firstText={"Забули пароль?"}
            secondText={"Вперше тут?"}
            thirdText={"Зареєструватися"}
            pushButton={onSignUpPress}
            screenName={"ForgotPassword"}
          />
        </View>
      </View>
    </BackgroundImage>
  );
};

export default LoginScreen;
