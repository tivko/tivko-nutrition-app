import React from "react";
import { Modal, Pressable, StyleSheet, Text, View, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const ModalComponent = ({ modalVisible, setModalVisible, item }) => {
  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <View style={{ alignItems: "center", gap: 10 }}>
            <Text style={{ fontWeight: "500", fontSize: 15 }}>
              {item.title}
            </Text>
            <Image
              source={require("../../../assets/pexels1.jpg")}
              style={{ width: 300, height: 200, resizeMode: "cover" }}
            />
          </View>
          <View style={{ alignItems: "stretch", paddingTop: 10 }}>
            <Text>{item.description}</Text>
          </View>
          <View style={{ alignItems: "flex-end", justifyContent: "flex-end" }}>
            <Pressable
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text>Закрити</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    justifyContent: "space-between",
    width: 300,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalButton: {},
});
