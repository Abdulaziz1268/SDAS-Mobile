import { createContext, useState } from "react"

export const PrefContext = createContext()

export const PrefProvider = ({ children }) => {
  const [allowFP, setAllowFP] = useState(true)
  return (
    <PrefContext.Provider value={{ allowFP, setAllowFP }}>
      {children}
    </PrefContext.Provider>
  )
}
