import React from "react"
import { StyleSheet, Text, View } from "react-native"
import colors from "../../config/colors"

const AppointmentScreen = () => {
  return (
    <View style={styles.appointmentContainer}>
      <Text>Appointments</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  appointmentContainer: {
    backgroundColor: colors.lightblue,
    height: "100%",
    width: "100%",
  },
})

export default AppointmentScreen
