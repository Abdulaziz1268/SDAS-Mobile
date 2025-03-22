import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"
// import image from "../../../assets/asset"
import { patient, appointment, money } from "../../../assets/index"
import colors from "../../config/colors"

const DashboardScreen = () => {
  return (
    <View style={styles.dashboardContainer}>
      <Text style={styles.header}>Doctor Dashboard</Text>
      <View style={styles.boxContainer}>
        <View style={styles.boxItem}>
          <Image source={patient} style={styles.boxImage} />
          <View>
            <Text style={styles.boxTitle}>Total Patient</Text>
            <Text style={styles.boxSubTitle}>0</Text>
          </View>
        </View>
        <View style={styles.boxItem}>
          <Image source={appointment} style={styles.boxImage} />
          <View>
            <Text style={styles.boxTitle}>Total Appointment</Text>
            <Text style={styles.boxSubTitle}>0</Text>
          </View>
        </View>
        <View style={styles.boxItem}>
          <Image source={money} style={styles.boxImage} />
          <View>
            <Text style={styles.boxTitle}>Total Earnings</Text>
            <Text style={styles.boxSubTitle}>0</Text>
          </View>
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
    backgroundColor: colors.white,
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
    color: colors.gray,
    fontSize: 16,
    // marginBottom: 3,
  },
  dashboardContainer: {
    backgroundColor: colors.lightblue,
    width: "100%",
    height: "100%",
  },
  header: {
    fontSize: 28,
    marginLeft: "10%",
    marginTop: "5%",
    marginBottom: 15,
    fontWeight: "bold",
    color: colors.blue,
  },
})

export default DashboardScreen
