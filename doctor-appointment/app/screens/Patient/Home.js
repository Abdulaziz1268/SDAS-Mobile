import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { useTheme } from "../../Contexts/ThemeContext"
// import colors from "../../config/colors"

const Home = () => {
  const { colors } = useTheme()
  return (
    <View style={[styles.container, { backgroundColor: colors.lightblue }]}>
      <Text>Home screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default Home
