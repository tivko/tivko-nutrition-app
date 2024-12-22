import { useState, useEffect, Platform } from "react";
import * as ImagePicker from "expo-image-picker";

const useImagePicker = (initialImage = null) => {
  const [image, setImage] = useState(initialImage);

  useEffect(() => {
    (async () => {
      if (Platform?.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Вибачте, нам потрібен дозвіл до камери, щоб це спрацювало!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return [image, pickImage];
};

export default useImagePicker;
