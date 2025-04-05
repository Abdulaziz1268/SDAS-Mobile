import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from "react-native"
import colors from "../../config/colors"
import * as Updates from "expo-updates"

const ProfileScreen = () => {
  const checkForUpdates = async () => {
    try {
      const update = await Updates.checkForUpdateAsync()
      if (update.isAvailable) {
        Alert.alert("Update Available!", "Do you want to update now?", [
          {
            text: "Later",
            onPress: () =>
              ToastAndroid.show("update postponed", ToastAndroid.SHORT),
          },
          {
            text: "Update",
            onPress: async () => {
              ToastAndroid.show("update started", ToastAndroid.SHORT)
              try {
                await Updates.fetchUpdateAsync()
                await Updates.reloadAsync()
                ToastAndroid.show("successfully updated", ToastAndroid.SHORT)
              } catch (error) {
                Alert.alert("Update failed!", "please try again later.")
                console.log(error)
                ToastAndroid.show("update failed", ToastAndroid.SHORT)
              }
            },
          },
        ])
      }
      if (!update.isAvailable)
        ToastAndroid.show("your app is up to date", ToastAndroid.SHORT)
    } catch (error) {
      console.log("Error checking for updates", error)
      ToastAndroid.show(
        `error checking for updates ${error.message}`,
        ToastAndroid.SHORT
      )
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
