import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { useTheme } from "../../Contexts/ThemeContext"

const Booking = () => {
  const { colors } = useTheme()
  return (
    <View style={[styles.container, { backgroundColor: colors.lightblue }]}>
      <Text>Booking List</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default Booking
