import React, { useEffect, useState } from "react"
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native"
// import image from "../../../assets/asset"
import { patient, appointment, money } from "../../../assets/index"
// import colors from "../../config/colors"
import AppointmentCard from "../../components/AppointmentCard"
import LottieView from "lottie-react-native"
import { useTheme } from "../../Contexts/ThemeContext"
import { apiWithDoctorAuth } from "../../config/api"

const DashboardScreen = () => {
  const [loading, setLoading] = useState(true)
  const [firstTime, setFirstTime] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [appointments, setAppointments] = useState([])
  const [count, setCount] = useState({
    totalPatient: 0,
    totalAppointment: 0,
    totalEarnings: 0,
  })
  const { colors } = useTheme()

  const formater = (date) => {
    const [month, day, year] = date.split("/")
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
  }

  const getAppointments = async () => {
    try {
      if (!firstTime) setRefreshing(true)

      setFirstTime(false)
      const api = await apiWithDoctorAuth()
      const { data } = await api.get("doctor/api/get-appointment")
      console.log(data)
      if (data.success) {
        const today = new Date().toISOString().split("T")[0]
        const recent = data.appointments.filter(
          (appintment) => today === formater(appintment.slotDate)
        )
        console.log(recent)
        setAppointments(recent || [])
        setLoading(false)
        setRefreshing(false)
      }
    } catch (error) {
      setLoading(false)
      setRefreshing(false)
      if (error.response?.data?.message) {
        console.log(error.response?.data?.message)
      } else {
        console.log(error.message)
      }
    }
  }

  useEffect(() => {
    getAppointments()
    patientCount()
    appointmentCount()
    earningCount()
  }, [])

  const handleCancel = async (appointmentId) => {
    try {
      const api = await apiWithDoctorAuth()
      const { data } = await api.post("doctor/api/cancel-appointment", {
        appointmentId,
      })
      if (data.success) {
        ToastAndroid.show("cancelled", ToastAndroid.SHORT)
        setAppointments((prev) =>
          prev.map((appt) =>
            appt._id === appointmentId ? { ...appt, cancelled: true } : appt
          )
        )
      } else {
        ToastAndroid.show(data.message, ToastAndroid.SHORT)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleComplete = async (appointmentId) => {
    try {
      const api = await apiWithDoctorAuth()
      const { data } = await api.post("doctor/api/complete-appointment", {
        appointmentId,
      })
      if (data.success) {
        ToastAndroid.show("Completed", ToastAndroid.SHORT)
        setAppointments((prev) =>
          prev.map((appt) =>
            appt._id === appointmentId ? { ...appt, isCompletted: true } : appt
          )
        )
      } else {
        ToastAndroid.show(data.message, ToastAndroid.SHORT)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const patientCount = async () => {
    try {
      const api = await apiWithDoctorAuth()
      const { data } = await api.get("doctor/api/count-pateint")

      if (data.success) {
        const patCount = data.count.length > 0 ? data.count[0].totalUsers : 0
        setCount((prevState) => ({
          ...prevState,
          totalPatient: patCount,
        }))
      }
    } catch (error) {
      if (error.response?.data?.message) {
        console.log(error.response?.data?.message)
        ToastAndroid.show(error.response?.data?.message, ToastAndroid.SHORT)
      } else {
        console.log(error.message)
        ToastAndroid.show(error.message, ToastAndroid.SHORT)
      }
    }
  }
  const appointmentCount = async () => {
    try {
      const api = await apiWithDoctorAuth()
      const { data } = await api.get("doctor/api/count-appointment")

      if (data.success) {
        const appCount =
          data.count.length > 0 ? data.count[0].totalAppointment : 0
        setCount((prevState) => ({
          ...prevState,
          totalAppointment: appCount,
        }))
        console.log(data)
      }
    } catch (error) {
      if (error.response?.data?.message) {
        console.log(error.response?.data?.message)
        ToastAndroid.show(error.response?.data?.message, ToastAndroid.SHORT)
      } else {
        console.log(error.message)
        ToastAndroid.show(error.message, ToastAndroid.SHORT)
      }
    }
  }
  const earningCount = async () => {
    try {
      const api = await apiWithDoctorAuth()
      const { data } = await api.get("doctor/api/count-amount")

      if (data.success) {
        const earCount = data.count.length > 0 ? data.count[0].totalEarning : 0
        setCount((prevState) => ({
          ...prevState,
          totalEarnings: earCount,
        }))
      }
    } catch (error) {
      if (error.response?.data?.message) {
        console.log(error.response?.data?.message)
        ToastAndroid.show(error.response?.data?.message, ToastAndroid.SHORT)
      } else {
        console.log(error.message)
        ToastAndroid.show(error.message, ToastAndroid.SHORT)
      }
    }
  }

  return (
    <View
      style={[styles.dashboardContainer, { backgroundColor: colors.lightblue }]}
    >
      {/* <Text style={styles.header}>Doctor Dashboard</Text> */}
      <View style={styles.boxContainer}>
        <View style={[styles.boxItem, { backgroundColor: colors.white }]}>
          <Image source={patient} style={styles.boxImage} />
          <View>
            <Text style={[styles.boxTitle, { color: colors.gray }]}>
              Total Patient
            </Text>
            <Text style={[styles.boxSubTitle, { color: colors.text }]}>
              {count.totalPatient}
            </Text>
          </View>
        </View>
        <View style={[styles.boxItem, { backgroundColor: colors.white }]}>
          <Image source={appointment} style={styles.boxImage} />
          <View>
            <Text style={[styles.boxTitle, { color: colors.gray }]}>
              Total Appointment
            </Text>
            <Text style={[styles.boxSubTitle, { color: colors.text }]}>
              {count.totalAppointment}
            </Text>
          </View>
        </View>
        <View style={[styles.boxItem, { backgroundColor: colors.white }]}>
          <Image source={money} style={styles.boxImage} />
          <View>
            <Text style={[styles.boxTitle, { color: colors.gray }]}>
              Total Earnings
            </Text>
            <Text style={[styles.boxSubTitle, { color: colors.text }]}>
              {count.totalEarnings}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.latestContainer}>
        <Text style={[styles.latestText, { color: colors.text }]}>
          Latest Appointments
        </Text>
        <View
          style={[styles.innerContainer, { backgroundColor: colors.white }]}
        >
          <View style={styles.latestHeader}>
            <Text style={{ color: colors.gray }}>Patient</Text>
            <Text style={{ marginLeft: 80, color: colors.gray }}>Date</Text>
            {/* <Text style={{ color: colors.gray }}>Status</Text> */}
          </View>
          {loading ? (
            <LottieView
              source={require("../../../assets/Animations/barSpinner.json")}
              autoPlay
              loop
              style={styles.spinner}
            />
          ) : (
            <FlatList
              data={appointments}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <AppointmentCard
                  name={item.userData.name}
                  date={item.slotDate}
                  time={item.slotTime}
                  image={item.userData.image}
                  handleCancel={() => handleCancel(item._id)}
                  handleComplete={() => handleComplete(item._id)}
                  cancelled={item.cancelled}
                  isComplet={item.isCompletted}
                />
              )}
              ListEmptyComponent={
                <Text
                  style={{
                    color: colors.text,
                    textAlign: "center",
                    marginTop: "40%",
                  }}
                >
                  No appointments yet
                </Text>
              }
              refreshing={refreshing}
              onRefresh={getAppointments}
            />
          )}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  boxContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  boxImage: {
    marginRight: 20,
    width: 40,
    height: 50,
  },
  boxItem: {
    width: "90%",
    height: 90,

    borderRadius: 20,
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 30,
    elevation: 10,
  },
  boxSubTitle: {
    fontSize: 20,
    marginLeft: 50,
  },
  boxTitle: {
    fontSize: 16,
    // marginBottom: 3,
  },
  dashboardContainer: {
    width: "100%",
    height: "100%",
  },
  // header: {
  //   fontSize: 28,
  //   marginLeft: "10%",
  //   marginTop: "3%",
  //   marginBottom: 15,
  //   fontWeight: "bold",
  //   color: colors.blue,
  // },
  innerContainer: {
    width: "90%",

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 10,
    flex: 1,
  },
  latestContainer: {
    width: "100%",
    alignItems: "center",
    flex: 1,
  },
  latestHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 40,
    paddingRight: 80,
  },
  latestText: {
    width: "90%",
    marginVertical: 10,
  },
  spinner: {
    alignSelf: "center",
    width: 150,
    height: 150,
  },
})

export default DashboardScreen
