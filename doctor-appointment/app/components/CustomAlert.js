import React from "react"
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useTheme } from "../Contexts/ThemeContext"

export default function CustomAlert({ visible, onClose, onSave, message }) {
  const { colors } = useTheme()

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { backgroundColor: colors.lightblue }]}>
          <Text style={[styles.modalText, { color: colors.text }]}>
            {message}
          </Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.button, { backgroundColor: colors.blue }]}
            >
              <Text style={{ color: colors.white, textAlign: "center" }}>
                No
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSave}
              style={[styles.button, { backgroundColor: colors.blue }]}
            >
              <Text style={{ color: colors.white, textAlign: "center" }}>
                Yes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalView: {
    width: "80%",
    padding: 25,
    borderRadius: 15,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    paddingVertical: 10,
    // paddingHorizontal: 20,
    width: 80,
    borderRadius: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
})
