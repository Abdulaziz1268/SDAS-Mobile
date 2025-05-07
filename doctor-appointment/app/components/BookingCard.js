// import React from "react"
// import { StyleSheet, View, Text } from "react-native"
// import colors from "../config/colors"

// const BookingCard = ({ name, date, time }) => {
//   return (
//     <View style={styles.container}>
//       <Text>{name}</Text>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     width: "95%",
//     height: 50,
//     backgroundColor: colors.white,
//     marginVertical: 10,
//     borderRadius: 15,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: colors.lightgray,
//     alignSelf: "center",
//   },
// })

// export default BookingCard
import React, { useState } from "react"
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native"

import Photo from "../../assets/noUser.jpg"
import docImage from "../../assets/docImage.jpg"
// import colors from "../config/colors"
import AppButton from "./AppButton"
import AppCalendar from "./AppCalendar"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useTheme } from "../Contexts/ThemeContext"

const time = []

for (let i = 8; i < 12; i++) {
  time.push({ time: `${i} : 00 AM` })
  time.push({ time: `${i} : 30 AM` })
}

for (let i = 1; i < 6; i++) {
  time.push({ time: `${i} : 00 PM` })
  time.push({ time: `${i} : 30 PM` })
}

const BookingCard = ({ name, speciality, slotDate, slotTime, payment }) => {
  const { colors } = useTheme()
  const [modal, setModal] = useState(false)

  const handleModal = () => {
    setModal((prev) => !prev)
  }

  const handleConfirm = (timeSlot, Day, Month, Year, Hour, Minute, Second) => {
    const x = new Date(Year, Month, Day, Hour, Minute, Second).toString()
    ToastAndroid.show(x + timeSlot, ToastAndroid.SHORT)
  }

  const window = Dimensions.get("window").height
  console.log(payment)
  return (
    <TouchableWithoutFeedback>
      <View
        style={[
          styles.cardContainer,
          { borderColor: colors.lightgray, backgroundColor: colors.white },
        ]}
      >
        <View style={styles.topContainer}>
          <Image source={docImage} style={styles.cardImage} />
          <View style={styles.detailsContainer}>
            <Text style={[styles.name, { color: colors.blue }]}>{name}</Text>
            <View
              style={[
                styles.speciality,
                { backgroundColor: colors.lightblue, borderColor: colors.blue },
              ]}
            >
              <Text style={{ color: colors.text }}>{speciality}</Text>
            </View>
            <Text style={[styles.time, { color: colors.text }]}>
              {slotDate} | {slotTime}
            </Text>
          </View>
        </View>
        <View style={styles.btnContainer}>
          {payment ? (
            <View style={[styles.btn, { borderColor: colors.gray }]}>
              <Text style={[styles.btnText, { color: colors.gray }]}>Paid</Text>
            </View>
          ) : (
            <Pressable
              style={({ pressed }) => [
                styles.btn,
                {
                  backgroundColor: pressed ? colors.lightblue : colors.white,
                  borderColor: colors.blue,
                },
              ]}
            >
              <Text style={[styles.btnText, { color: colors.text }]}>
                Pay Online
              </Text>
            </Pressable>
          )}
          <Pressable
            style={({ pressed }) => [
              styles.btn,
              {
                backgroundColor: pressed ? colors.lightblue : colors.white,
                borderColor: colors.blue,
              },
            ]}
            onPress={() => setModal((prev) => !prev)}
          >
            <Text style={[styles.btnText, { color: colors.text }]}>
              Reschedule
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.btn,
              {
                backgroundColor: pressed ? colors.lightblue : colors.white,
                borderColor: colors.blue,
              },
            ]}
          >
            <Text style={[styles.btnText, { color: colors.text }]}>Cancel</Text>
          </Pressable>
        </View>
        <Modal visible={modal} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View
              style={[styles.modalContent, { backgroundColor: colors.white }]}
            >
              <Text style={[styles.modalHeader, { color: colors.blue }]}>
                Select Date
                <MaterialCommunityIcons // later replace this with swipe gesture
                  name="close"
                  size={25}
                  onPress={handleModal}
                />
              </Text>
              <AppCalendar
                timestamp={time}
                handleModal={handleModal}
                handleConfirm={handleConfirm}
              />
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  // bottomContainer: {
  //   padding: 20,
  //   borderWidth: 2,
  //   borderColor: colors.lightblue,
  //   borderRadius: 20,
  //   margin: 10,
  // },
  btn: {
    borderWidth: 1,

    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: 5,
    flexGrow: 1,
  },
  btnContainer: {
    flexDirection: "row",
    gap: 10,
    padding: 10,
  },
  // btnText: {
  //   fontSize: 18,
  // },
  // button: {
  //   backgroundColor: colors.blue,
  //   marginVertical: 10,
  // },
  cardContainer: {
    width: "100%",
    marginVertical: 10,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
  },
  cardImage: {
    width: 150,
    height: 125,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 18,
  },
  closeBtn: {
    padding: 20,
    alignSelf: "flex-end",
  },
  detailsContainer: {
    padding: 10,
    paddingLeft: 20,
  },
  modalContent: {
    marginTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "95%",

    elevation: 20,
  },
  modalHeader: {
    textAlign: "center",
    paddingTop: 20,
    fontSize: 20,

    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  name: {
    fontSize: 18,
    marginBottom: 10,
  },
  speciality: {
    borderWidth: 1,

    borderRadius: 5,
    paddingHorizontal: 5,
    marginBottom: 10,
    alignSelf: "flex-start",
    minWidth: 80,
  },
  topContainer: {
    flexDirection: "row",
  },
})

export default BookingCard
