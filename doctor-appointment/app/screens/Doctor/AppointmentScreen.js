import React, { useEffect, useState } from "react"
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native"
import LottieView from "lottie-react-native"

import colors from "../../config/colors"
import AppointmentCard from "../../components/AppointmentCard"
import { useTheme } from "../../Contexts/ThemeContext"

const info = [
  { name: "abdu", date: "2/3/2025", time: "8:00 AM" },
  { name: "kedir", date: "2/3/2025", time: "8:30 AM" },
  { name: "muse", date: "2/3/2025", time: "9:00 AM" },
  { name: "abdul", date: "2/3/2025", time: "9:30 AM" },
  { name: "abdulas", date: "2/3/2025", time: "9:30 AM" },
  { name: "abduldfasdfffsfsfdss", date: "2/3/2025", time: "9:30 AM" },
  { name: "abdulsd", date: "2/3/2025", time: "9:30 AM" },
  { name: "abdulff", date: "2/3/2025", time: "9:30 AM" },
  { name: "abdulvv", date: "2/3/2025", time: "9:30 AM" },
  { name: "abddfulvv", date: "2/3/2025", time: "9:30 AM" },
  { name: "abdfdulvv", date: "2/3/2025", time: "9:30 AM" },
  { name: "abdulsdvv", date: "2/3/2025", time: "9:30 AM" },
  { name: "abdsdfulvv", date: "2/3/2025", time: "9:30 AM" },
  { name: "abdulvvsdf", date: "2/3/2025", time: "9:30 AM" },
  { name: "afsbdulvv", date: "2/3/2025", time: "9:30 AM" },
  { name: "fdabdulvv", date: "2/3/2025", time: "9:30 AM" },
]

const AppointmentScreen = () => {
  const [loading, setLoading] = useState(true)
  const { colors } = useTheme()
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])
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
        <Text style={{ color: colors.gray }}>Status</Text>
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
          data={info}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <AppointmentCard
              name={item.name}
              date={item.date}
              time={item.time}
            />
          )}
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
})

export default AppointmentScreen
