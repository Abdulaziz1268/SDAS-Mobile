import { createContext, useState } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [doctorToken, setDoctorToken] = useState()
  const [patientToken, setPatientToken] = useState()

  return (
    <AuthContext.Provider
      value={{ doctorToken, setDoctorToken, patientToken, setPatientToken }}
    >
      {children}
    </AuthContext.Provider>
  )
}
