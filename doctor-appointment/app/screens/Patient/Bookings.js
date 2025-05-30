import { useCallback, useEffect, useRef, useState } from "react"
import {
  FlatList,
  Linking,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import BookingCard from "../../components/BookingCard"
import { useTheme } from "../../Contexts/ThemeContext"
import { apiWithPatientAuth } from "../../config/api"
import AppModal from "../../components/AppModal"
import LottieView from "lottie-react-native"
import { useFocusEffect } from "@react-navigation/native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const time = []

for (let i = 8; i < 12; i++) {
  time.push({ time: `${i}:00 AM` })
  time.push({ time: `${i}:30 AM` })
}

for (let i = 1; i < 6; i++) {
  time.push({ time: `${i}:00 PM` })
  time.push({ time: `${i}:30 PM` })
}

const filterCriteria = ["Cancelled", "Rescheduled", "Pending"]

const Bookings = () => {
  const { colors } = useTheme()
  const [appointments, setAppointments] = useState()
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedAppoId, setSelectedAppoId] = useState(null)
  const [filteredAppointments, setFilteredAppointments] = useState([])
  const [selectedFilter, setSelectedFilter] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const modalRef = useRef()

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
          (selectedFilter.includes("Rescheduled") &&
            appointment.rescheduled &&
            !appointment.cancelled) ||
          (selectedFilter.includes("Pending") &&
            !appointment.isCompletted &&
            !appointment.cancelled)
      )

      setFilteredAppointments(filtered)
    }
  }, [selectedFilter, appointments])

  useFocusEffect(
    useCallback(() => {
      getAppointments()
    }, [])
  )

  const getAppointments = async () => {
    try {
      setLoading(true)
      setRefreshing(true)
      const token = await AsyncStorage.getItem("Ptoken")
      if (!token) throw new Error("no authorization token found!")

      const api = await apiWithPatientAuth()
      const { data } = await api.get("user/api/get-appointments")

      if (data.success) {
        setAppointments(data.appointments.reverse())
        setRefreshing(false)
        setLoading(false)
      }
    } catch (error) {
      setRefreshing(false)
      setLoading(false)
      if (error.response?.data.message) {
        console.log(error.response.data.message)
      } else {
        console.log(error.massage)
      }
    }
  }

  useEffect(() => {
    getAppointments()
  }, [])

  const handleCancel = async (appointmentId) => {
    try {
      const api = await apiWithPatientAuth()
      const { data } = await api.post("user/api/cancel-appointement", {
        appointmentId,
      })

      if (data.success) {
        ToastAndroid.show("Appointment Cancelled", ToastAndroid.SHORT)
        getAppointments()
      }
    } catch (error) {
      if (error.response?.data?.message) {
        ToastAndroid.show(
          error.response.data.message ||
            "something went wrong. Please try again!",
          ToastAndroid.SHORT
        )
        console.log(error.message)
      } else {
        ToastAndroid.show(
          error.message || "something went wrong. Please try again!",
          ToastAndroid.SHORT
        )
        console.log(error.message)
      }
    }
  }

  const handleConfirm = async (
    selectedDay,
    selectedMonth,
    selectedYear,
    pressed,
    Id
  ) => {
    const hour = new Date().getHours()
    const minute = new Date().getMinutes()
    const second = new Date().getSeconds()
    const slotDate = new Date(
      selectedYear,
      selectedMonth,
      selectedDay,
      hour,
      minute,
      second
    ).toString()
    // ToastAndroid.show(slotDate + pressed, ToastAndroid.SHORT)
    // console.log({ docId: Id, slotDate: slotDate, slotTime: pressed })
    try {
      const api = await apiWithPatientAuth()
      const { data } = await api.post("user/api/reschedule-appointement", {
        appointmentId: Id,
        slotDate: slotDate,
        slotTime: pressed,
      })

      if (data.success) {
        ToastAndroid.show("Rescheduled successfully", ToastAndroid.SHORT)
        getAppointments()
      }
    } catch (error) {
      if (error.response?.data?.message) {
        ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT)
        console.log(error.response.data.message)
      } else {
        console.log(error.message)
        ToastAndroid.show(error.message, ToastAndroid.SHORT)
      }
    }
  }

  const openModal = (Id) => {
    setSelectedAppoId(Id)
    modalRef.current?.open()
  }

  const onPaymentPress = async (appointmentId) => {
    ToastAndroid.show(appointmentId, ToastAndroid.SHORT)
    try {
      const api = await apiWithPatientAuth()
      const { data } = await api.post("user/api/checkout", {
        appointmentId,
        platform: "mobile",
      })

      console.log("working...")

      if (data.status === "success") {
        console.log("Redirected to Payment Session")
        // Redirect to the Stripe checkout session URL
        Linking.openURL(data.data.checkout_url) // This will redirect the user to the Stripe session URL
      }
    } catch (error) {
      let message = "Payment failed. Please try again later."

      if (error.response) {
        const resData = error.response.data
        if (resData?.message) message = resData.message
        else if (resData?.error) message = resData.error
        else if (typeof resData === "string") message = resData
      } else if (error.message) {
        message = error.message
      }

      console.error("Payment error:", error)
      ToastAndroid.show(message, ToastAndroid.LONG)
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.lightblue }]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          paddingHorizontal: 20,
          paddingVertical: 5,
        }}
      >
        <Text style={[styles.headerText, { color: colors.blue }]}>
          My Bookings
        </Text>
        <View style={{ flexDirection: "row" }}>
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
        />
      ) : (
        <>
          <FlatList
            data={filteredAppointments}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <BookingCard
                name={item.docData.name}
                slotDate={item.slotDate}
                slotTime={item.slotTime}
                speciality={item.docData.speciality}
                payment={item.payment}
                image={item.docData.image}
                cancelled={item.cancelled}
                completed={item.isCompletted}
                rescheduled={item.rescheduled}
                handleCancel={() => handleCancel(item._id)}
                onReschedulePress={() => openModal(item._id)}
                onPaymentPress={() => onPaymentPress(item._id)}
              />
            )}
            ListEmptyComponent={
              <Text
                style={{
                  color: colors.text,
                  textAlign: "center",
                  marginTop: 50,
                }}
              >
                No appointments yet.
              </Text>
            }
            refreshing={refreshing}
            onRefresh={getAppointments}
          />
          <AppModal
            modalRef={modalRef}
            handleConfirm={handleConfirm}
            timestamp={time}
            Id={selectedAppoId}
          />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 30,

    margin: 20,
  },
  // spinner: {
  //   marginTop: "60%",
  //   width: 200,
  //   height: 200,
  //   alignSelf: "center",
  // },
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

export default Bookings
