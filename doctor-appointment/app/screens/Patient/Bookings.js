import React from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"

// import colors from "../../config/colors"
import BookingCard from "../../components/BookingCard"
import { useTheme } from "../../Contexts/ThemeContext"

const data = [
  {
    name: "abdulaziz",
    speciality: "surgeon",
    slotDate: "04/03/2025",
    slotTime: "8:30 AM",
    payment: false,
  },
  {
    name: "Musa",
    speciality: "pediatrics",
    slotDate: "04/05/2025",
    slotTime: "9:30 AM",
    payment: true,
  },
  {
    name: "Hussen",
    speciality: "pediatrics",
    slotDate: "04/05/2025",
    slotTime: "9:30 AM",
    payment: false,
  },
  {
    name: "korme",
    speciality: "Dentist",
    slotDate: "04/05/2025",
    slotTime: "9:30 AM",
    payment: false,
  },
  {
    name: "Bati",
    speciality: "neurologist",
    slotDate: "04/05/2025",
    slotTime: "9:30 AM",
    payment: true,
  },
]

const Bookings = () => {
  const { colors } = useTheme()
  return (
    <View style={[styles.container, { backgroundColor: colors.lightblue }]}>
      <Text style={[styles.headerText, { color: colors.blue }]}>
        My Bookings
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <BookingCard
            name={item.name}
            slotDate={item.slotDate}
            slotTime={item.slotTime}
            speciality={item.speciality}
            payment={item.payment}
          />
        )}
      />
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
})

export default Bookings
