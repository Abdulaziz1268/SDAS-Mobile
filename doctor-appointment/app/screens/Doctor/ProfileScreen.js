import React from "react"
import { StyleSheet, View, Text } from "react-native"
import colors from "../../config/colors"

const ProfileScreen = () => {
  return (
    <View style={styles.profileContainer}>
      <Text>Profile</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  profileContainer: {
    backgroundColor: colors.lightblue,
    height: "100%",
    width: "100%",
  },
})

export default ProfileScreen
