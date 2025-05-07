import React, { useState } from "react"
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableWithoutFeedback,
  View,
} from "react-native"

import Photo from "../../assets/noUser.jpg"
import docImage from "../../assets/docImage.jpg"
// import colors from "../config/colors"
import AppButton from "./AppButton"
import AppCalendar from "./AppCalendar"
import { useTheme } from "../Contexts/ThemeContext"

//this will be pulled later from the parent component and also update booking card
const time = []

for (let i = 8; i < 12; i++) {
  time.push({ time: `${i} : 00 AM` })
  time.push({ time: `${i} : 30 AM` })
}

for (let i = 1; i < 6; i++) {
  time.push({ time: `${i} : 00 PM` })
  time.push({ time: `${i} : 30 PM` })
}

const DoctorCard = ({
  name,
  speciality,
  availability,
  description,
  fee = 0,
  id,
}) => {
  const { colors } = useTheme()
  const [showDetails, setShowDetails] = useState(false)
  const [modal, setModal] = useState(false)

  const handleModal = () => {
    setModal((prev) => !prev)
  }

  const handleConfirm = (timeSlot, Day, Month, Year, Hour, Minute, Second) => {
    const x = new Date(Year, Month, Day, Hour, Minute, Second).toString()
    ToastAndroid.show(x + timeSlot, ToastAndroid.SHORT)
  }

  const window = Dimensions.get("window").height
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setShowDetails((prevState) => !prevState)
        if (!availability)
          return ToastAndroid.show(
            "The doctor is not available. Please select another doctor",
            ToastAndroid.SHORT
          )
      }}
    >
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
            <Text
              style={[
                styles.speciality,
                {
                  borderColor: colors.blue,
                  color: colors.text,
                  backgroundColor: colors.lightblue,
                },
              ]}
            >
              {speciality}
            </Text>
            <Text style={{ color: availability ? "green" : "orange" }}>
              {availability ? "Available" : "Not Available"}
            </Text>
          </View>
        </View>
        {showDetails && availability && (
          <View
            style={[styles.bottomContainer, { borderColor: colors.lightblue }]}
          >
            <Text
              style={[
                styles.detailsText,
                { textAlign: "center", fontSize: 18, color: colors.blue },
              ]}
            >
              About
            </Text>
            <Text style={{ color: colors.gray }}>{description}</Text>
            <View style={styles.fee}>
              <Text style={[styles.detailsText, { color: colors.text }]}>
                Appointment fee:
              </Text>
              <Text style={{ color: colors.blue, fontWeight: "600" }}>
                ${fee}
              </Text>
            </View>
            <AppButton
              title="Book Appointment"
              onPress={() => setModal(true)}
              style={{ backgroundColor: colors.blue, marginVertical: 10 }}
            />
            <Modal visible={modal} animationType="slide" transparent={true}>
              <View style={styles.modalOverlay}>
                <View
                  style={[
                    styles.modalContent,
                    { backgroundColor: colors.white },
                  ]}
                >
                  <Text style={[styles.modalHeader, { color: colors.blue }]}>
                    Select Date
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
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  bottomContainer: {
    padding: 20,
    borderWidth: 2,

    borderRadius: 20,
    margin: 10,
  },
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
  detailsText: {
    fontWeight: "900",
    marginVertical: 10,
  },
  fee: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
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
  },
  topContainer: {
    flexDirection: "row",
  },
})

export default DoctorCard
