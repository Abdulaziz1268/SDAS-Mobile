import { createContext, useEffect, useState } from "react"
import api from "../config/api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AppState } from "react-native"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState()

  const getUserData = async () => {
    try {
      const token = await AsyncStorage.getItem("token")
      if (token) {
        const { data } = await api.get("/user/api/get-user", {
          headers: { token },
        })
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
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  )
}
