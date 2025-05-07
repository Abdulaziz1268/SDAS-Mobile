import { createContext, useEffect, useState } from "react"
import api from "../config/api"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState()
  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("token")
        if (token) {
          const { data } = await api.get("/user/api/get-user")
          if (data.success) setUserData(data.user)
        }
      } catch (error) {
        console.log(error.response?.data?.message || "error fetching user data")
      }
    }
    getUserData()
  }, [])
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  )
}
