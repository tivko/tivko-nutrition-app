import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import SubmitFormButton from "../../../components/Form/SubmitFormButton";
import { setUser, useAppContext } from "../../../context/mealContext";
import useAxios from "../../../hooks/useAxios";
import ProfileFields from "../../../components/Form/ProfileFields";
import BackgroundImage from "../../../components/Layout/BackgroundImage";
import styles from "../../../styles/login/loginStyles";
import UserImg from "../../../components/Form/UserImg";
import useImagePicker from "../../../hooks/useImagePicker";
import { colors, fontsSize, hp, wp } from "../../../styles/base";
import { AntDesign } from "@expo/vector-icons";

const EditProfileScreen = ({ navigation }) => {
  const { state, dispatch } = useAppContext();
  const userData = state?.user;
  const [image, pickImage] = useImagePicker(userData.profile);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      email: userData?.email || "",
      profile: userData?.profile || "",
    },
  });

  const {
    data: result,
    loading: axiosLoading,
    error: requestError,
    sendRequest,
  } = useAxios();

  const onEditUserDetails = async (data) => {
    await sendRequest(
      "user/update",
      {
        firstName: data?.firstName,
        lastName: data?.lastName,
        profile: image,
      },
      (method = "PATCH")
    );
    dispatch(
      setUser({
        ...state.user,
        firstName: data?.firstName,
        lastName: data?.lastName,
        profile: image,
      })
    );
  };

  useEffect(() => {
    if (result) {
      navigation.goBack();
    }
  }, [result]);

  useEffect(() => {
    if (userData) {
      setValue("firstName", userData.firstName);
      setValue("lastName", userData.lastName);
      setValue("profile", userData.profile);
    }
  }, [userData, setValue]);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: colors.primary,
          paddingVertical: hp(1.8),
          paddingHorizontal: wp(5),
          alignItems: "center",
          gap: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <AntDesign
              name="arrowleft"
              size={fontsSize.lg}
              color={colors.default}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.mainTextContainer}>
          <Text style={{ fontSize: fontsSize.lg, color: colors.default }}>
            Редагування профілю
          </Text>
        </View>
      </View>
      <BackgroundImage>
        <View style={styles.container}>
          <View style={styles.avatarContainer}>
            <UserImg
              control={control}
              pickImage={pickImage}
              image={image}
              initialImage={userData.profile}
            />
          </View>
          <ProfileFields control={control} withPassword={false} />
          <SubmitFormButton
            text={isSubmitting ? "Завантаження..." : "Зберегти зміни"}
            onPress={handleSubmit(onEditUserDetails)}
          />
        </View>
      </BackgroundImage>
    </>
  );
};

export default EditProfileScreen;
