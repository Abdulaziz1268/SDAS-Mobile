import { StyleSheet, Text, useWindowDimensions, View } from "react-native"
import { Modalize } from "react-native-modalize"

import AppCalendar from "./AppCalendar"
import { useTheme } from "../Contexts/ThemeContext"

const AppModal = ({ modalRef, timestamp, handleConfirm, Id }) => {
  const { colors } = useTheme()
  const { height } = useWindowDimensions()
  const modalHeight = (height * 80) / 100

  return (
    <Modalize
      ref={modalRef}
      handlePosition="outside"
      withHandle={true}
      panGestureEnabled={true}
      modalHeight={modalHeight}
      openAnimationConfig={{ timing: { duration: 500 } }}
      closeAnimationConfig={{ timing: { duration: 500 } }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          gap: 20,
          justifyContent: "center",
          backgroundColor: colors.lightblue,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <Text style={[styles.modalHeader, { color: colors.blue }]}>
          Select Date
        </Text>
      </View>
      <AppCalendar
        timestamp={timestamp}
        modalRef={modalRef}
        handleConfirm={handleConfirm}
        Id={Id}
      />
    </Modalize>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    marginTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "95%",

    elevation: 20,
  },
  modalHeader: {
    textAlign: "center",
    paddingTop: 20,
    fontSize: 20,

    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
})

export default AppModal
