import React, { useEffect, useState } from "react"
import { FlatList, Image, StyleSheet, Text, View } from "react-native"
// import image from "../../../assets/asset"
import { patient, appointment, money } from "../../../assets/index"
// import colors from "../../config/colors"
import AppointmentCard from "../../components/AppointmentCard"
import LottieView from "lottie-react-native"
import { useTheme } from "../../Contexts/ThemeContext"

const info = [
  { name: "abdu", date: "2/3/2025", time: "8:00 AM" },
  { name: "kedir", date: "2/3/2025", time: "8:30 AM" },
  { name: "muse", date: "2/3/2025", time: "9:00 AM" },
  { name: "abdul", date: "2/3/2025", time: "9:30 AM" },
  { name: "abdulas", date: "2/3/2025", time: "9:30 AM" },
  { name: "abduldfasdfsffsfs", date: "2/3/2025", time: "9:30 AM" },
  { name: "abdulsd", date: "2/3/2025", time: "9:30 AM" },
  { name: "abdulff", date: "2/3/2025", time: "9:30 AM" },
  { name: "abdulvv", date: "2/3/2025", time: "9:30 AM" },
]

const DashboardScreen = () => {
  const [loading, setLoading] = useState(true)
  const { colors } = useTheme()
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])
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
            <Text style={styles.boxSubTitle}>0</Text>
          </View>
        </View>
        <View style={[styles.boxItem, { backgroundColor: colors.white }]}>
          <Image source={appointment} style={styles.boxImage} />
          <View>
            <Text style={[styles.boxTitle, { color: colors.gray }]}>
              Total Appointment
            </Text>
            <Text style={styles.boxSubTitle}>0</Text>
          </View>
        </View>
        <View style={[styles.boxItem, { backgroundColor: colors.white }]}>
          <Image source={money} style={styles.boxImage} />
          <View>
            <Text style={[styles.boxTitle, { color: colors.gray }]}>
              Total Earnings
            </Text>
            <Text style={styles.boxSubTitle}>0</Text>
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
    paddingHorizontal: 10,
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
