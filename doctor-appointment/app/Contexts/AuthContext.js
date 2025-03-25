import { createContext, useState } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [doctorToken, setDoctorToken] = useState(true)
  const [patientToken, setPatientToken] = useState(false)

  return (
    <AuthContext.Provider
      value={{ doctorToken, setDoctorToken, patientToken, setPatientToken }}
    >
      {children}
    </AuthContext.Provider>
  )
}
