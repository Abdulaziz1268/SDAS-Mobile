import axios from "axios"
import { useRoute } from "@react-navigation/native"
import { useEffect } from "react"
import { View, Text } from "react-native"
import { apiWithPatientAuth } from "../../config/api"
import { useState } from "react"

export default function PaymentSuccess() {
  const [status, setStatus] = useState("pending")
  const route = useRoute()
  const { tx_ref } = route.params || {}

  useEffect(() => {
    const verifyPayment = async () => {
      if (!tx_ref) return

      try {
        const api = await apiWithPatientAuth()
        const response = await api.get(`user/api/verify/${tx_ref}`)
        console.log("Payment Verification Response:", response.data)

        if (response.data?.data?.status === "success") {
          setStatus("success")
        } else {
          setStatus("failed")
        }
      } catch (error) {
        console.error("Verification failed:", error)
        setStatus("failed")
      }
    }

    verifyPayment()
  }, [tx_ref])

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {status === "pending" ? (
        <Text>⏳ Verifying payment...</Text>
      ) : status === "success" ? (
        <Text>✅ Payment successful</Text>
      ) : (
        <Text>❌ Payment failed</Text>
      )}
    </View>
  )
}
