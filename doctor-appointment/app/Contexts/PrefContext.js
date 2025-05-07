import { createContext, useState } from "react"

export const PrefContext = createContext()

export const PrefProvider = ({ children }) => {
  const [allowFP, setAllowFP] = useState(false)
  const [darkTheme, setDarkTheme] = useState(false)
  return (
    <PrefContext.Provider
      value={{ allowFP, setAllowFP, darkTheme, setDarkTheme }}
    >
      {children}
    </PrefContext.Provider>
  )
}
