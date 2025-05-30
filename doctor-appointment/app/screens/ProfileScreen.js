import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  Image,
  Switch,
} from "react-native"
import { useCallback, useContext, useEffect, useState } from "react"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import * as Updates from "expo-updates"
import * as LocalAuthentication from "expo-local-authentication"
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { useTheme } from "../Contexts/ThemeContext"
import Photo from "../../assets/noUser.jpg"
import { PrefContext } from "../Contexts/PrefContext"
import { AuthContext } from "../Contexts/AuthContext"
import AppAlert from "../components/AppAlert"
import { UserContext } from "../Contexts/UserContext"
import { DoctorContext } from "../Contexts/DoctorContext"
import { useFocusEffect } from "@react-navigation/native"

const initialData = {
  name: "no-user",
  image: Photo,
}

const ProfileScreen = ({ navigation }) => {
  const { allowFP, setAllowFP } = useContext(PrefContext)
  const { setPatientToken, setDoctorToken, user } = useContext(AuthContext)
  const { userData, getUserData } = useContext(UserContext)
  const { doctorData, getDoctorData } = useContext(DoctorContext)
  const { colors, toggleTheme, isDark } = useTheme()
  const [showAlert, setShowAlert] = useState(false)
  const [data, setData] = useState(initialData)

  useFocusEffect(
    useCallback(() => {
      if (user === "patient" && userData) {
        getUserData
        setData(userData)
      } else if (user === "doctor" && doctorData) {
        getDoctorData
        setData(doctorData)
      }
    }, [userData, doctorData])
  )

  // useFocusEffect(() => {
  // }, [userData, doctorData])

  const toggleFingerprint = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync()
    const isEnrolled = await LocalAuthentication.isEnrolledAsync()

    if (!hasHardware || !isEnrolled) {
      return ToastAndroid.show(
        "Biometrics not available or not enrolled",
        ToastAndroid.SHORT
      )
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate with Fingerprint",
      fallbackLabel: "Use Password",
    })

    if (result.success) {
      setAllowFP((prevState) => !prevState)
    } else {
      ToastAndroid.show("Authentication Failed", ToastAndroid.SHORT)
    }
  }

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

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("Ptoken")
      await AsyncStorage.removeItem("Dtoken")
      setDoctorToken(false)
      setPatientToken(false)
      ToastAndroid.show("logged out", ToastAndroid.SHORT)
    } catch (error) {
      console.log(error)
      ToastAndroid.show(
        "something went wrong! Please try again.",
        ToastAndroid.SHORT
      )
    }
  }

  console.log(data)

  return (
    <View
      style={[styles.profileContainer, { backgroundColor: colors.lightblue }]}
    >
      <View style={styles.hero}>
        <Image
          source={
            typeof data.image === "string" && data.image
              ? { uri: data.image }
              : Photo
          }
          style={styles.heroImage}
        />
        <View style={styles.leftContainer}>
          <View style={styles.threeDots}>
            <TouchableOpacity
              onPress={user === "patient" ? getUserData : getDoctorData}
            >
              <MaterialCommunityIcons
                name="account-sync"
                size={25}
                color={colors.text}
                style={{ marginRight: 5 }}
              />
            </TouchableOpacity>
            {user === "patient" && (
              <MaterialCommunityIcons
                name="square-edit-outline"
                size={25}
                onPress={() => navigation.navigate("EditProfile")}
                color={colors.text}
              />
            )}
            <Menu>
              <MenuTrigger
                customStyles={{
                  TriggerTouchableComponent: TouchableOpacity,
                }}
              >
                {user === "patient" && (
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={25}
                    color={colors.text}
                  />
                )}
              </MenuTrigger>
              <MenuOptions
                customStyles={{
                  optionsContainer: {
                    width: 125,
                    marginTop: 40,
                    borderRadius: 10,
                    overflow: "hidden",
                    backgroundColor: colors.white,
                  },
                  optionWrapper: {
                    padding: 10,
                  },
                  optionText: {
                    paddingLeft: 10,
                    color: colors.text,
                  },
                }}
              >
                <MenuOption
                  onSelect={() => navigation.navigate("About")}
                  text="About"
                />
              </MenuOptions>
            </Menu>
          </View>
          <Text style={[styles.heroText, { color: colors.text }]}>
            {data.name}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.listItem, { backgroundColor: colors.white }]}
        onPress={() => navigation.navigate("ChangePassword")}
      >
        <MaterialCommunityIcons
          name="lock"
          color={colors.blue}
          size={25}
          style={styles.icon}
        />
        <Text style={{ color: colors.text }}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.listItem, { backgroundColor: colors.white }]}
      >
        <MaterialCommunityIcons
          name="fingerprint"
          color={colors.blue}
          size={25}
          style={styles.icon}
        />
        <Text style={{ color: colors.text }}>Biometrics </Text>
        <Switch
          trackColor={{ false: colors.gray, true: colors.blue }}
          thumbColor={colors.lightblue}
          onValueChange={toggleFingerprint}
          value={allowFP}
          style={styles.switch}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.listItem, { backgroundColor: colors.white }]}
      >
        <Ionicons
          name="moon-sharp"
          color={colors.blue}
          size={25}
          style={styles.icon}
        />
        <Text style={{ color: colors.text }}>Night Mode </Text>
        <Switch
          trackColor={{ false: colors.gray, true: colors.blue }}
          thumbColor={colors.lightblue}
          onValueChange={toggleTheme}
          value={isDark}
          style={styles.switch}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={checkForUpdates}
        style={[styles.listItem, { backgroundColor: colors.white }]}
      >
        <MaterialCommunityIcons
          name="update"
          color={colors.blue}
          size={25}
          style={styles.icon}
        />
        <Text style={{ color: colors.text }}>Check for update</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setShowAlert(true)}
        style={[styles.listItem, { backgroundColor: colors.white }]}
      >
        <MaterialCommunityIcons
          name="logout"
          color={colors.blue}
          size={25}
          style={styles.icon}
        />
        <Text style={{ color: colors.text }}>Log Out</Text>
      </TouchableOpacity>
      {showAlert && (
        <AppAlert
          visible={showAlert}
          message="Are you sure to logout!"
          onSave={() => {
            setShowAlert(false)
            logout()
          }}
          onClose={() => setShowAlert(false)}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  // header: {
  //   fontSize: 28,
  //   marginLeft: "10%",
  //   marginTop: "5%",
  //   marginBottom: 15,
  //   fontWeight: "bold",
  //   color: colors.blue,
  // }
  container: {
    flex: 1,
  },
  hero: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "95%",
    // position: "relative",
  },
  heroImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginVertical: 30,
    marginHorizontal: 20,
  },
  heroText: {
    fontSize: 20,
    fontWeight: "900",
  },
  icon: {
    paddingRight: 10,
  },
  leftContainer: {
    height: 150,
    flex: 1,
  },
  // menu: {
  //   backgroundColor: colors.white,
  //   zIndex: 100,
  // },
  // menuItem: {
  //   backgroundColor: colors.white,
  //   margin: 0,
  // },
  profileContainer: {
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  switch: {
    marginLeft: "auto",
    marginRight: 10,
  },
  listItem: {
    flexDirection: "row",

    height: 70,
    alignItems: "center",
    paddingLeft: 20,
    marginVertical: 5,
    borderRadius: 15,
    width: "95%",
  },
  threeDots: {
    height: "40%",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
})

const optionsStyles = {
  optionsContainer: {
    width: 125,
    marginTop: 40,
    borderRadius: 10,
    overflow: "hidden",
  },
  optionWrapper: {
    padding: 10,
  },
  optionText: {
    paddingLeft: 10,
  },
}

export default ProfileScreen
