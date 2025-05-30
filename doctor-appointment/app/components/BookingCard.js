import { useState } from "react"
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native"

import { useTheme } from "../Contexts/ThemeContext"

const BookingCard = ({
  image,
  name,
  speciality,
  slotDate,
  slotTime,
  payment,
  rescheduled,
  completed,
  cancelled,
  handleCancel,
  onReschedulePress,
  onPaymentPress,
}) => {
  const { colors } = useTheme()
  const [modal, setModal] = useState(false)

  const handleModal = () => {
    setModal((prev) => !prev)
  }

  return (
    <TouchableWithoutFeedback>
      <View
        style={[
          styles.cardContainer,
          { borderColor: colors.lightgray, backgroundColor: colors.white },
        ]}
      >
        <View style={styles.topContainer}>
          <Image source={{ uri: image }} style={styles.cardImage} />
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
          {cancelled ? (
            <View style={[styles.btn, { borderColor: colors.darkred }]}>
              <Text
                style={[
                  styles.btnText,
                  { color: colors.darkred, fontWeight: "700" },
                ]}
              >
                Cancelled
              </Text>
            </View>
          ) : completed ? (
            <View style={[styles.btn, { borderColor: colors.green }]}>
              <Text
                style={[
                  styles.btnText,
                  { color: colors.green, fontWeight: "700" },
                ]}
              >
                Completed
              </Text>
            </View>
          ) : (
            <>
              {payment ? (
                <View style={[styles.btn, { borderColor: colors.gray }]}>
                  <Text style={[styles.btnText, { color: colors.gray }]}>
                    Paid
                  </Text>
                </View>
              ) : (
                <Pressable
                  style={({ pressed }) => [
                    styles.btn,
                    {
                      backgroundColor: pressed
                        ? colors.lightblue
                        : colors.white,
                      borderColor: colors.blue,
                    },
                  ]}
                  onPress={onPaymentPress}
                >
                  <Text style={[styles.btnText, { color: colors.text }]}>
                    Pay Online
                  </Text>
                </Pressable>
              )}
              {rescheduled ? (
                <View
                  style={[
                    styles.btn,
                    {
                      borderColor: colors.darkred,
                      backgroundColor: colors.lightred,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.btnText,
                      { color: colors.darkred, fontWeight: "700" },
                    ]}
                  >
                    Rescheduled
                  </Text>
                </View>
              ) : (
                <Pressable
                  style={({ pressed }) => [
                    styles.btn,
                    {
                      backgroundColor: pressed
                        ? colors.lightblue
                        : colors.white,
                      borderColor: colors.blue,
                    },
                  ]}
                  onPress={onReschedulePress}
                >
                  <Text style={[styles.btnText, { color: colors.text }]}>
                    Reschedule
                  </Text>
                </Pressable>
              )}
              <Pressable
                onPress={handleCancel}
                style={({ pressed }) => [
                  styles.btn,
                  {
                    backgroundColor: pressed ? colors.lightblue : colors.white,
                    borderColor: colors.blue,
                  },
                ]}
              >
                <Text style={[styles.btnText, { color: colors.text }]}>
                  Cancel
                </Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
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
    borderRadius: 20,
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
    padding: 10,
  },
})

export default BookingCard
