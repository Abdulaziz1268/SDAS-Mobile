import { StyleSheet, Appearance } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { useContext } from "react"
import { MenuProvider } from "react-native-popup-menu"
import * as Linking from "expo-linking"

import AppSafeAreaView from "./app/components/AppSafeAreaView"
import { DoctorStackNavigator } from "./app/routes/DoctorRoutes"
import { PatientStackNavigator } from "./app/routes/PatientRoutes"
import { AuthContext, AuthProvider } from "./app/Contexts/AuthContext"
import AuthStackNavigator from "./app/routes/AuthRoutes"
import { PrefProvider } from "./app/Contexts/PrefContext"
import { ThemeProvider } from "./app/Contexts/ThemeContext"
import { UserProvider } from "./app/Contexts/UserContext"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { DoctorProvider } from "./app/Contexts/DoctorContext"
import { GestureHandlerRootView } from "react-native-gesture-handler"

export default function App() {
  return (
    <GestureHandlerRootView>
      <ThemeProvider>
        <SafeAreaProvider>
          <AppSafeAreaView>
            <MenuProvider>
              <UserProvider>
                <DoctorProvider>
                  <PrefProvider>
                    <AuthProvider>
                      <AppRoutes />
                    </AuthProvider>
                  </PrefProvider>
                </DoctorProvider>
              </UserProvider>
            </MenuProvider>
          </AppSafeAreaView>
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}

const AppRoutes = () => {
  const { doctorToken, patientToken } = useContext(AuthContext)

  const linking = {
    prefixes: [Linking.createURL("/"), "myapp://"], // "myapp" is your custom scheme
    config: {
      screens: {
        PaymentSuccess: "payment-success",
        // Add other deep-linked screens if needed
      },
    },
  }

  return (
    <NavigationContainer linking={linking} style={styles.container}>
      {patientToken ? (
        <PatientStackNavigator />
      ) : doctorToken ? (
        <DoctorStackNavigator />
      ) : (
        <AuthStackNavigator />
      )}
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.lightblue,
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  button: {
    backgroundColor: "red",
  },
})
