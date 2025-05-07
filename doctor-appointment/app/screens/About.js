import React from "react"
import { StyleSheet, Text, View } from "react-native"
// import colors from "../config/colors"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useTheme } from "../Contexts/ThemeContext"

const About = ({ navigation }) => {
  const { colors } = useTheme()
  return (
    <View style={[styles.container, { backgroundColor: colors.lightblue }]}>
      <MaterialCommunityIcons
        name="chevron-left"
        size={35}
        color={colors.blue}
        onPress={() => navigation.goBack()}
      />
      <Text>About screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 20,
  },
})

export default About
