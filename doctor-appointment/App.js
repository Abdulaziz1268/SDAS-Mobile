import { StyleSheet } from "react-native"
import AppSafeAreaView from "./app/components/AppSafeAreaView"
import AppButton from "./app/components/AppButton"
import AppTextInput from "./app/components/AppTextInput"
import LoginScreen from "./app/screens/LoginScreen"
import RegisterScreen from "./app/screens/RegisterScreen"
import DashboardScreen from "./app/screens/Doctor/DashboardScreen"
import { NavigationContainer } from "@react-navigation/native"
import { DoctorTabNavigator } from "./app/routes/DoctorRoutes"
import { useContext } from "react"
import { AuthContext, AuthProvider } from "./app/Contexts/AuthContext"
import AuthStackNavigator from "./app/routes/AuthRoutes"
import { PrefProvider } from "./app/Contexts/PrefContext"

export default function App() {
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
