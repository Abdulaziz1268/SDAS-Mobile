import { Alert, StyleSheet, Text, View } from "react-native"
import AppSafeAreaView from "./app/components/AppSafeAreaView"
import AppButton from "./app/components/AppButton"
import AppTextInput from "./app/components/AppTextInput"
import LoginScreen from "./app/screens/LoginScreen"
import RegisterScreen from "./app/screens/RegisterScreen"
import DashboardScreen from "./app/screens/Doctor/DashboardScreen"
import { NavigationContainer } from "@react-navigation/native"
import { DoctorTabNavigator } from "./app/routes/DoctorRoutes"
import { useContext, useEffect } from "react"
import { AuthContext, AuthProvider } from "./app/Contexts/AuthContext"
import AuthStackNavigator from "./app/routes/AuthRoutes"
import { PrefProvider } from "./app/Contexts/PrefContext"
import * as updates from "expo-updates"

export default function App() {
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
              } catch (error) {
                Alert.alert("Update failed!", "please try again later.")
                console.log(error)
              }
            },
          },
        ])
      }
    } catch (error) {
      console.log("Error checking for updates", error)
    }
  }

  useEffect(() => {
    checkForUpdates()
  }, [])

  return (
    <AppSafeAreaView>
      <PrefProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </PrefProvider>
    </AppSafeAreaView>
  )
}

const AppRoutes = () => {
  const { doctorToken, patientToken } = useContext(AuthContext)
  return (
    <NavigationContainer>
      {doctorToken ? (
        <DoctorTabNavigator />
      ) : patientToken ? (
        <PatientTabNavigator />
      ) : (
        <AuthStackNavigator />
      )}
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "blue",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "red",
  },
})
