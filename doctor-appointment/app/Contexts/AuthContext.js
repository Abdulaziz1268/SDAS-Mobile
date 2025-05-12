import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useEffect, useState } from "react"
import { AppState } from "react-native"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [doctorToken, setDoctorToken] = useState(false)
  const [patientToken, setPatientToken] = useState(false)

  useEffect(() => {
    const checkToken = async () => {
      const dtoken = await AsyncStorage.getItem("Dtoken")
      const ptoken = await AsyncStorage.getItem("Ptoken")
      if (ptoken) {
        setPatientToken(true)
        setDoctorToken(false)
      } else if (dtoken) {
        setDoctorToken(true)
        setPatientToken(false)
      } else {
        setPatientToken(false)
        setDoctorToken(false)
      }
    }

    checkToken()

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        checkToken()
      }
    })

    return () => subscription.remove()
  }, [])

  return (
    <AuthContext.Provider
      value={{ doctorToken, setDoctorToken, patientToken, setPatientToken }}
    >
      {children}
    </AuthContext.Provider>
  )
}
