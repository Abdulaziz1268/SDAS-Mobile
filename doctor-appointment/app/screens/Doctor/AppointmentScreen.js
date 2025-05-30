import { useEffect, useState } from "react"
import {
  FlatList,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  TouchableOpacity,
} from "react-native"
import LottieView from "lottie-react-native"

import AppointmentCard from "../../components/AppointmentCard"
import { useTheme } from "../../Contexts/ThemeContext"
import { apiWithDoctorAuth } from "../../config/api"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const filterCriteria = ["Cancelled", "Completed", "Pending"]

const AppointmentScreen = () => {
  const { colors } = useTheme()

  const [loading, setLoading] = useState(true)
  const [firstTime, setFirstTime] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [appointments, setAppointments] = useState([])
  const [filteredAppointments, setFilteredAppointments] = useState([])
  const [selectedFilter, setSelectedFilter] = useState([])
  const [showFilter, setShowFilter] = useState(false)

  const addToFilter = (item) => {
    setSelectedFilter((prevFilter) =>
      prevFilter.includes(item)
        ? prevFilter.filter((filterItem) => filterItem !== item)
        : [...prevFilter, item]
    )
  }

  useEffect(() => {
    if (!appointments) return

    if (selectedFilter.length === 0) {
      setFilteredAppointments(appointments)
    } else {
      const filtered = appointments.filter(
        (appointment) =>
          (selectedFilter.includes("Cancelled") && appointment.cancelled) ||
          (selectedFilter.includes("Completed") && appointment.isCompletted) ||
          (selectedFilter.includes("Pending") &&
            !appointment.isCompletted &&
            !appointment.cancelled)
      )

      setFilteredAppointments(filtered)
    }
  }, [selectedFilter, appointments])

  useEffect(() => {
    getAppointments()
  }, [])

  const getAppointments = async () => {
    try {
      if (!firstTime) setRefreshing(true)

      setFirstTime(false)
      const api = await apiWithDoctorAuth()
      const { data } = await api.get("doctor/api/get-appointment")
      console.log(data)
      if (data.success) {
        // const today = new Date().toISOString().split("T")[0]
        // const recent = data.appointments.filter(
        //   (appintment) => today === formater(appintment.slotDate)
        // )
        // console.log(recent)
        setAppointments(data.appointments)
        console.log(appointments)
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

  return (
    <View
      style={[
        styles.appointmentContainer,
        { backgroundColor: colors.lightblue },
      ]}
    >
      <View style={[styles.latestHeader, { backgroundColor: colors.white }]}>
        <Text style={{ color: colors.gray }}>Patient</Text>
        <Text style={{ marginLeft: 120, color: colors.gray }}>Date</Text>
        {/* <Text style={{ color: colors.gray }}>Status</Text> */}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          width: "100%",
          paddingHorizontal: 20,
          paddingVertical: 5,
        }}
      >
        {selectedFilter.length !== 0 && (
          <TouchableOpacity
            style={[styles.clearFilter, { backgroundColor: colors.blue }]}
            onPress={() => setSelectedFilter([])}
          >
            <Text style={{ color: colors.white }}>Clear Filter</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => setShowFilter((prev) => !prev)}>
          <MaterialCommunityIcons
            name="filter-outline"
            size={30}
            color={colors.blue}
          />
        </TouchableOpacity>
      </View>
      {showFilter && (
        <View
          style={[styles.filterContainer, { backgroundColor: colors.white }]}
        >
          {filterCriteria.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterItem,
                {
                  backgroundColor: selectedFilter.includes(item)
                    ? colors.blue
                    : colors.white,
                  borderColor: colors.blue,
                },
              ]}
              onPress={() => {
                addToFilter(item)
              }}
            >
              <Text
                style={{
                  color: selectedFilter.includes(item)
                    ? colors.white
                    : colors.black,
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {loading ? (
        <LottieView
          source={require("../../../assets/Animations/barSpinner.json")}
          autoPlay
          loop
          style={styles.spinner}
        />
      ) : (
        <FlatList
          data={filteredAppointments}
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
              style={{ textAlign: "center", marginTop: 70, color: colors.text }}
            >
              No Appointments yet
            </Text>
          }
          refreshing={refreshing}
          onRefresh={getAppointments}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  appointmentContainer: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    padding: 10,
  },
  // innerContainer: {
  //   width: "90%",
  //   backgroundColor: colors.white,
  //   borderTopLeftRadius: 20,
  //   borderTopRightRadius: 20,
  //   padding: 20,
  //   elevation: 10,
  //   flex: 1,
  // },
  latestHeader: {
    flexDirection: "row",
    paddingRight: 80,
    paddingLeft: 30,
    justifyContent: "space-around",
    marginBottom: 10,
    width: "100%",

    paddingVertical: 20,
    borderRadius: 15,
  },
  spinner: {
    marginTop: "60%",
    width: 200,
    height: 200,
  },
  clearFilter: {
    padding: 5,
    borderRadius: 20,
    marginRight: 10,
  },
  filterContainer: {
    width: "95%",
    padding: 10,
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    borderRadius: 20,
  },
  filterItem: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,

    borderRadius: 10,
    position: "relative",
  },
})

export default AppointmentScreen
