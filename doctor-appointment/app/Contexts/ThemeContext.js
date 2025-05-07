import { createContext, useContext, useEffect, useState } from "react"

import { DarkTheme, LightTheme } from "../config/colors"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const loadTheme = async () => {
      const prevTheme = await AsyncStorage.getItem("theme")
      if (prevTheme) setIsDark(JSON.parse(prevTheme))
    }

    loadTheme()
  }, [])

  const toggleTheme = async () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    await AsyncStorage.setItem("theme", JSON.stringify(newTheme))
  }

  const colors = isDark ? DarkTheme : LightTheme

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
