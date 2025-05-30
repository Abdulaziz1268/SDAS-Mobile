import { createContext, useEffect, useState } from "react"
import { apiWithPatientAuth } from "../config/api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AppState } from "react-native"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState()

  const getUserData = async () => {
    try {
      const ptoken = await AsyncStorage.getItem("Ptoken")

      if (ptoken) {
        const api = await apiWithPatientAuth()
        const { data } = await api.get("/user/api/get-user")

        if (data.success) setUserData(data.user)
      } else {
        setUserData(null)
      }
    } catch (error) {
      console.log(error.response?.data?.message || "error fetching user data")
    }
  }

  useEffect(() => {
    getUserData()

    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") getUserData()
    })

    return () => subscription.remove()
  }, [])
  return (
    <UserContext.Provider value={{ userData, setUserData, getUserData }}>
      {children}
    </UserContext.Provider>
  )
}
