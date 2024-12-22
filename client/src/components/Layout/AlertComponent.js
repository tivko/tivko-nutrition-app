import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { colors, fontsSize, hp, wp } from "../../styles/base";
import { AntDesign } from "@expo/vector-icons";

const AlertComponent = ({
  info,
  title = null,
  modalVisible,
  showClose = true,
  setModalVisible,
  showContinue = false,
  onContinue = () => {},
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            {title && <Text style={styles.title}>{title}</Text>}

            {showClose && (
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <AntDesign
                  name="close"
                  size={fontsSize.lg}
                  color="black"
                  style={styles.icon}
                />
              </TouchableOpacity>
            )}
          </View>
          <ScrollView contentContainerStyle={styles.infoContainer}>
            <Text style={styles.infoText}>{info}</Text>
          </ScrollView>
          {showContinue && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={onContinue}>
                <Text style={styles.buttonText}>Продовжити</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default AlertComponent;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: wp(80),
    minHeight: hp(5),
    maxHeight: hp(70),
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: fontsSize.md,
    fontWeight: "bold",
    flex: 1,
    textAlign: "left",
  },
  icon: {
    marginLeft: 10,
  },
  infoContainer: {
    paddingTop: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 15,
  },
  infoText: {
    fontSize: fontsSize.sm,
    textAlign: "justify",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  button: {
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: fontsSize.sm,
    fontWeight: "bold",
  },
});
