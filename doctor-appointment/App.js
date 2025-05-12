import { StyleSheet, Appearance } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { useContext } from "react"
import { MenuProvider } from "react-native-popup-menu"

import AppSafeAreaView from "./app/components/AppSafeAreaView"
import { DoctorStackNavigator } from "./app/routes/DoctorRoutes"
import { PatientStackNavigator } from "./app/routes/PatientRoutes"
import { AuthContext, AuthProvider } from "./app/Contexts/AuthContext"
import AuthStackNavigator from "./app/routes/AuthRoutes"
import { PrefProvider } from "./app/Contexts/PrefContext"
import { ThemeProvider } from "./app/Contexts/ThemeContext"
import { UserProvider } from "./app/Contexts/UserContext"

export default function App() {
  return (
    <ThemeProvider>
      <AppSafeAreaView>
        <MenuProvider>
          <UserProvider>
            <PrefProvider>
              <AuthProvider>
                <AppRoutes />
              </AuthProvider>
            </PrefProvider>
          </UserProvider>
        </MenuProvider>
      </AppSafeAreaView>
    </ThemeProvider>
  )
}

const AppRoutes = () => {
  const { doctorToken, patientToken } = useContext(AuthContext)

  return (
    <NavigationContainer style={styles.container}>
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
