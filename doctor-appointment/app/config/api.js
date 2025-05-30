import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

const baseURL = "http://192.168.244.113:4300"

const api = axios.create({
  baseURL,
  timeout: 10000,
})

// Use this function for authenticated requests
export const apiWithPatientAuth = async () => {
  const token = await AsyncStorage.getItem("Ptoken")
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      // Authorization: token ? `Bearer ${token}` : "",
      token,
    },
  })
  return instance
}

export const apiWithDoctorAuth = async () => {
  const dtoken = await AsyncStorage.getItem("dtoken")
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      // Authorization: token ? `Bearer ${token}` : "",
      dtoken,
    },
  })
  return instance
}

export default api
