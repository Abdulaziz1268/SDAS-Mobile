import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import colors from "../../config/colors"
import * as updates from "expo-updates"
import Toast from "react-native-toast-message"

const ProfileScreen = () => {
  const checkForUpdates = async () => {
    try {
      const update = await updates.checkForUpdateAsync()
      if (update.isAvailable) {
        Alert.alert("Update Available!", "Do you want to update now?", [
          { text: "Later", style: "cancel" },
          {
            text: "Update",
            onPress: async () => {
              try {
                await updates.fetchUpdateAsync()
                await updates.reloadAsync()
                Toast.show({ type: "success", text1: "successfully updated" })
              } catch (error) {
                Alert.alert("Update failed!", "please try again later.")
                console.log(error)
                Toast.show({ type: "error", text1: "update failed" })
              }
            },
          },
        ])
      }
    } catch (error) {
      console.log("Error checking for updates", error)
      Toast.show({ type: "error", text1: "error checking for updates" })
    }
  }
  return (
    <View style={styles.profileContainer}>
      <Text style={styles.header}>Profile</Text>
      <TouchableOpacity onPress={checkForUpdates} style={styles.updates}>
        <Text>Check for update</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    marginLeft: "10%",
    marginTop: "5%",
    marginBottom: 15,
    fontWeight: "bold",
    color: colors.blue,
  },
  profileContainer: {
    backgroundColor: colors.lightblue,
    height: "100%",
    width: "100%",
  },
  updates: {
    backgroundColor: colors.white,
    height: 50,
    justifyContent: "center",
    paddingLeft: 20,
  },
})

export default ProfileScreen
