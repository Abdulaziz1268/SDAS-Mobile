import { createContext, useEffect, useState } from "react"
import { apiWithDoctorAuth } from "../config/api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AppState } from "react-native"

export const DoctorContext = createContext()

export const DoctorProvider = ({ children }) => {
  const [doctorData, setDoctorData] = useState()

  const getDoctorData = async () => {
    try {
      const dtoken = await AsyncStorage.getItem("dtoken")

      if (dtoken) {
        const api = await apiWithDoctorAuth()
        const { data } = await api.get("/doctor/api/get-doctor", {
          headers: { dtoken },
        })

        if (data.success) setDoctorData(data.doctor)
      } else {
        setDoctorData(null)
      }
    } catch (error) {
      if (error.response?.data?.message) {
        console.log(
          error.response?.data?.message || "error fetching doctor data"
        )
      } else {
        console.log(error.message)
      }
    }
  }

  useEffect(() => {
    getDoctorData()

    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") getDoctorData()
    })

    return () => subscription.remove()
  }, [])
  return (
    <DoctorContext.Provider
      value={{ doctorData, setDoctorData, getDoctorData }}
    >
      {children}
    </DoctorContext.Provider>
  )
}
