import { View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import SubmitFormButton from "../../components/Form/SubmitFormButton";
import myFirebaseError from "../../help/firebaseErrors";
import useAxios from "../../hooks/useAxios";
import {
  useAppContext,
  setToken,
  setTempId,
  setUser,
} from "../../context/mealContext";
import { getAuth, app } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import useImagePicker from "../../hooks/useImagePicker";
import ProfileFields from "../../components/Form/ProfileFields";
import BackgroundImage from "../../components/Layout/BackgroundImage";
import BottomText from "../../components/Form/BottomText";
import styles from "../../styles/login/loginStyles";
import TitleText from "../../components/Form/TitleText";
import UserImg from "../../components/Form/UserImg";
import AlertComponent from "../../components/Layout/AlertComponent";

const SignUpScreenProfile = ({ navigation }) => {
  const [formData, setFormData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserID] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, pickImage] = useImagePicker();
  const [firebaseError, setFireBaseError] = useState("");
  const auth = getAuth(app);
  const { state, dispatch } = useAppContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    data: result,
    loading: axiosLoading,
    error: requestError,
    sendRequest,
  } = useAxios();

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (userId && formData) {
      handleCreateUser();
    }
  }, [userId, formData]);

  useEffect(() => {
    if (requestError) {
      setErrorMessage(requestError.message);
      setModalVisible(true);
    }
  }, [requestError]);

  useEffect(() => {
    if (result?.success) {
      dispatch(setTempId(result?.result.id));
      dispatch(setToken(result?.result?.token));
      if (state.sub !== null) {
        navigation.replace("SignUpScreenHealthInfo");
        setLoading(false);
      }
    }
  }, [result]);

  useEffect(() => {
    if (state.sub !== null) {
      navigation.replace("SignUpScreenHealthInfo");
      setLoading(false);
    }
  }, [state.sub]);

  const onSignUpPressed = async (inf) => {
    setLoading(true);
    if (
      inf?.email !== undefined &&
      inf?.firstName !== undefined &&
      inf?.lastName !== undefined &&
      inf?.password !== undefined
    ) {
      inf.email = inf.email.toLowerCase();

      setFormData(inf);
      try {
        const res = await createUserWithEmailAndPassword(
          auth,
          inf.email,
          inf.password
        );
        setUserID(res.user.uid);
      } catch (error) {
        setFireBaseError(error);
        setLoading(false);
        setErrorMessage(myFirebaseError[error?.code] || error?.message);
        setModalVisible(true);
      }
    }
  };

  const handleCreateUser = async () => {
    await sendRequest("user/create", {
      ...formData,
      id: userId,
      profile: image,
    });
  };

  const onSignInPress = async () => {
    navigation.navigate("Login");
  };

  return (
    <>
      <BackgroundImage>
        <View style={styles.container}>
          <UserImg
            control={control}
            pickImage={pickImage}
            image={image}
            initialImage={"../../assets/user.jpg"}
          />
          <TitleText main={"Реєстрація"} />
          <ProfileFields control={control} />
          <SubmitFormButton
            text={loading ? "Завантаження..." : "Продовжити"}
            onPress={handleSubmit(onSignUpPressed)}
            disabled={loading}
          />
          <View style={styles.bottomContainer}>
            <BottomText
              secondText={"Вже маєте акаунт?"}
              thirdText={"Увійти"}
              pushButton={onSignInPress}
              screenName={"Login"}
            />
          </View>
        </View>
      </BackgroundImage>
      <AlertComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        info={errorMessage}
        title={"Помилка"}
      />
    </>
  );
};

export default SignUpScreenProfile;
