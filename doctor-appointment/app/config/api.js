import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"

const api = axios.create({
  baseURL: "http://192.168.36.160:4300/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token")
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

export default api
