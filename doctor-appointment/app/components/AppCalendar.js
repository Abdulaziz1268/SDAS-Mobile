import { MaterialCommunityIcons } from "@expo/vector-icons"
import React, { useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
  ScrollView,
  Pressable,
  ToastAndroid,
} from "react-native"
import AppButton from "./AppButton"
import { FlatList } from "react-native-gesture-handler"
import { useTheme } from "../Contexts/ThemeContext"

const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate()

const AppCalendar = ({ handleConfirm, handleModal, timestamp }) => {
  const { colors } = useTheme()
  const [pressed, setPressed] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())

  const [selectedDay, setSelectedDay] = useState(selectedDate.getDate())
  const [selectedMonth, setSelectedMonth] = useState(selectedDate.getMonth())
  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear())
  const [selectedHour, setSelectedHour] = useState(selectedDate.getHours())
  const [selectedMinute, setSelectedMinute] = useState(
    selectedDate.getMinutes()
  )

  const generateCalendarMatrix = (month, year) => {
    const firstDayOfMonth = new Date(year, month, 1).getDay() // 0 (Sun) to 6 (Sat)
    const totalDays = new Date(year, month + 1, 0).getDate()

    const calendar = []
    let dayCounter = 1
    for (let row = 0; row < 6; row++) {
      const week = []
      for (let col = 0; col < 7; col++) {
        if ((row === 0 && col < firstDayOfMonth) || dayCounter > totalDays) {
          week.push(null) // empty cell
        } else {
          week.push(dayCounter++)
        }
      }
      calendar.push(week)
    }
    return calendar
  }

  const renderDay = (day) => (
    <TouchableOpacity
      key={day}
      style={[styles.dayButton, selectedDay === day && styles.selectedDay]}
      onPress={() => setSelectedDay(day)}
    >
      <Text>{day}</Text>
    </TouchableOpacity>
  )

  const renderHour = (hour) => (
    <TouchableOpacity
      key={hour}
      style={[styles.timeButton, selectedHour === hour && styles.selectedTime]}
      onPress={() => setSelectedHour(hour)}
    >
      <Text>{hour.toString().padStart(2, "0")}</Text>
    </TouchableOpacity>
  )

  const renderMinute = (minute) => (
    <TouchableOpacity
      key={minute}
      style={[
        styles.timeButton,
        selectedMinute === minute && styles.selectedTime,
      ]}
      onPress={() => setSelectedMinute(minute)}
    >
      <Text>{minute.toString().padStart(2, "0")}</Text>
    </TouchableOpacity>
  )

  const totalDays = daysInMonth(selectedMonth, selectedYear)
  const days = Array.from({ length: totalDays }, (_, i) => i + 1)
  const hours = Array.from({ length: 24 }, (_, i) => i)
  const minutes = Array.from({ length: 60 }, (_, i) => i)

  return (
    <ScrollView style={styles.container}>
      <View
        style={[styles.dateContainer, { backgroundColor: colors.lightgray }]}
      >
        {/* Month/Year Header */}
        <View style={styles.monthHeader}>
          <TouchableOpacity
            onPress={() => {
              if (selectedMonth === 0) {
                setSelectedMonth(11)
                setSelectedYear((prev) => prev - 1)
              } else {
                setSelectedMonth((prev) => prev - 1)
              }
            }}
          >
            <Text style={styles.navArrow}>◀</Text>
          </TouchableOpacity>

          <Text style={styles.monthLabel}>
            {new Date(selectedYear, selectedMonth).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </Text>

          <TouchableOpacity
            onPress={() => {
              if (selectedMonth === 11) {
                setSelectedMonth(0)
                setSelectedYear((prev) => prev + 1)
              } else {
                setSelectedMonth((prev) => prev + 1)
              }
            }}
          >
            <Text style={styles.navArrow}>▶</Text>
          </TouchableOpacity>
        </View>

        {/* Weekday Headers */}
        <View style={styles.weekRow}>
          {["Sunday", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <Text key={day} style={styles.weekDay}>
              {day}
            </Text>
          ))}
        </View>

        {/* Calendar Matrix */}
        {generateCalendarMatrix(selectedMonth, selectedYear).map(
          (week, index) => (
            <View key={index} style={styles.weekRow}>
              {week.map((day, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    [styles.dayButton, { backgroundColor: colors.white }],
                    day === selectedDay &&
                      selectedMonth >= new Date().getMonth() && {
                        backgroundColor: colors.blue,
                      },
                    day === new Date().getDate() &&
                      selectedMonth === new Date().getMonth() &&
                      selectedYear === new Date().getFullYear() && [
                        styles.todayHighlight,
                        { borderColor: colors.blue },
                      ],
                    // day >= new Date().getDate() &&
                    // selectedMonth >= new Date().getMonth() && {
                    //   backgroundColor: colors.white,
                    //   borderWidth: 1,
                    //   bordercolor: colors.white,
                    // },
                  ]}
                  onPress={() => day && setSelectedDay(day)}
                  disabled={
                    !day ||
                    (day < new Date().getDate() &&
                      selectedMonth < new Date().getMonth() + 1)
                  }
                >
                  <Text
                    style={[
                      {
                        color:
                          day < new Date().getDate() &&
                          selectedMonth < new Date().getMonth() + 1
                            ? colors.gray
                            : day === selectedDay
                            ? colors.white
                            : colors.black,
                      },
                    ]}
                  >
                    {day || ""}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )
        )}
      </View>
      <Text style={[styles.divider, { color: colors.blue }]}>Select Time</Text>
      <View
        style={[
          styles.tst,
          styles.dateContainer,
          { backgroundColor: colors.lightgray },
        ]}
      >
        {timestamp ? (
          <FlatList
            data={timestamp}
            keyExtractor={(item) => item.time}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => setPressed(item.time)}
                style={[
                  styles.time,
                  {
                    backgroundColor:
                      item.time === pressed ? colors.blue : colors.lightblue,
                    borderColor: colors.blue,
                  },
                ]}
              >
                <Text
                  style={{
                    color: item.time === pressed ? colors.white : colors.black,
                  }}
                >
                  {item.time}
                </Text>
              </Pressable>
            )}
            horizontal
          />
        ) : (
          <Text style={styles.noTime}>Please select a different date</Text>
        )}
      </View>
      <AppButton
        title="confirm"
        style={{
          backgroundColor: colors.blue,
          color: colors.white,
          marginVertical: 10,
        }}
        onPress={() => {
          if (!pressed)
            return ToastAndroid.show(
              "please select date and time",
              ToastAndroid.SHORT
            )
          Alert.alert("confirm", "confirm selected date", [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Ok",
              onPress: () => {
                handleConfirm(
                  pressed,
                  selectedDay,
                  selectedMonth,
                  selectedYear,
                  new Date().getHours(),
                  new Date().getMinutes(),
                  new Date().getSeconds()
                )
                handleModal()
              },
            },
          ])
        }}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  tst: {},
  time: {
    padding: 20,
    borderRadius: 20,
    color: "white",
    width: "auto",
    marginHorizontal: 5,

    borderWidth: 1,
  },
  noTime: {
    padding: 20,
    width: "auto",
    textAlign: "center",
  },
  container: {
    padding: 10,
  },
  dateContainer: {
    borderRadius: 20,
    padding: 10,
  },
  divider: {
    textAlign: "center",
    paddingVertical: 20,
    fontSize: 20,

    fontWeight: "700",
  },
  pickButton: {
    backgroundColor: "#1e90ff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  pickText: {
    color: "white",
    fontWeight: "bold",
    marginBottom: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "90%",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 10,
  },
  dayGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  dayButton: {
    width: 40,
    height: 40,
    margin: 5,

    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  timeButton: {
    backgroundColor: "#ddd",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  selectedTime: {
    backgroundColor: "#1e90ff",
  },
  confirmButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  confirmText: {
    color: "white",
    fontWeight: "bold",
  },
  monthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  monthLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  navArrow: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 5,
  },
  weekDay: {
    flex: 1,
    textAlign: "center",
    fontWeight: "600",
  },
  todayHighlight: {
    borderWidth: 2,
    borderRadius: 5,
  },
})

export default AppCalendar
