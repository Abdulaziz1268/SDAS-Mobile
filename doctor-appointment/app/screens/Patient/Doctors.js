import React, { useEffect, useRef, useState } from "react"
import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  ToastAndroid,
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import colors from "../../config/colors"
import DoctorCard from "../../components/DoctorCard"
import { useTheme } from "../../Contexts/ThemeContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { apiWithPatientAuth } from "../../config/api"
import AppModal from "../../components/AppModal"

const spec = [
  "Cardiologist",
  "Dentist",
  "General Doctor",
  "Neurology",
  "Orthopedic",
  "Otology",
  "Pediatrics",
  "Surgery",
]

const time = []

for (let i = 8; i < 12; i++) {
  time.push({ time: `${i}:00 AM` })
  time.push({ time: `${i}:30 AM` })
}

for (let i = 1; i < 6; i++) {
  time.push({ time: `${i}:00 PM` })
  time.push({ time: `${i}:30 PM` })
}

const Doctors = () => {
  const { colors } = useTheme()
  const [selectedDocId, setSelectedDocId] = useState()
  const [showFilter, setShowFilter] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState([])
  const [doctors, setDoctors] = useState()
  const [filteredDoctors, setFilteredDoctors] = useState([])
  const modalRef = useRef(null)

  const addToFilter = (item) => {
    setSelectedFilter((prevFilter) =>
      prevFilter.includes(item)
        ? prevFilter.filter((filterItem) => filterItem !== item)
        : [...prevFilter, item]
    )
  }

  useEffect(() => {
    if (!doctors) return

    if (selectedFilter.length === 0) {
      setFilteredDoctors(doctors)
    } else {
      const filtered = doctors.filter((doctor) =>
        selectedFilter.includes(doctor.speciality)
      )
      setFilteredDoctors(filtered)
    }
  }, [selectedFilter, doctors])

  const getDoctors = async () => {
    try {
      setRefreshing(true)
      const token = await AsyncStorage.getItem("Ptoken")
      if (!token) throw new Error("no authorization token found!")

      const api = await apiWithPatientAuth()
      const { data } = await api.get("user/api/get-doctors", {
        headers: { token },
      })
      if (data.success) {
        console.log(data)
        setDoctors(data.doctors)
        setRefreshing(false)
      }
    } catch (error) {
      setRefreshing(false)
      if (error.response?.data?.message) {
        console.log(error.response?.data?.message)
        ToastAndroid.show(error.response?.data?.message, ToastAndroid.SHORT)
      } else {
        console.log(error.message)
      }
    }
  }

  useEffect(() => {
    getDoctors()
  }, [])

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
      const { data } = await api.post("user/api/book-appointement", {
        docId: Id,
        slotDate: slotDate,
        slotTime: pressed,
      })

      if (data.success) {
        ToastAndroid.show("Booked successfully", ToastAndroid.SHORT)
      }
    } catch (error) {
      if (error.response?.data?.message) {
        ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT)
        console.log(error.response.data)
      } else {
        console.log(error.message)
        ToastAndroid.show(error.message, ToastAndroid.SHORT)
      }
    }
  }

  const openModal = (Id) => {
    setSelectedDocId(Id)
    modalRef.current?.open()
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.lightblue }]}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: colors.blue }]}>Doctors</Text>
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
          {spec.map((item, index) => (
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
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <DoctorCard
            name={item.name}
            availability={item.available}
            speciality={item.speciality}
            description={item.about}
            fee={item.fees}
            onBookPress={() => openModal(item._id)}
            image={item.image}
          />
        )}
        style={styles.list}
        ListEmptyComponent={
          <Text
            style={{ color: colors.text, marginTop: 50, textAlign: "center" }}
          >
            No Doctors Found
          </Text>
        }
        refreshing={refreshing}
        onRefresh={getDoctors}
      />
      <AppModal
        modalRef={modalRef}
        handleConfirm={handleConfirm}
        timestamp={time}
        Id={selectedDocId}
      />
    </View>
  )
}

const styles = StyleSheet.create({
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
  // cancelFilter: {
  //   backgroundColor: "red",
  //   width: 15,
  //   height: 15,
  //   position: "absolute",
  //   top: -7,
  //   right: -7,
  //   borderRadius: 8,
  //   borderWidth: 1,
  //   borderColor: colors.lightgray,
  //   alignSelf: "center",
  // },
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    width: "95%",
    alignItems: "center",
    padding: 20,
  },
  headerText: {
    fontSize: 30,
    marginRight: "auto",
  },
  list: {
    width: "95%",
  },
})

const optionsStyle = {
  optionsContainer: {
    marginTop: 40,
  },
}

export default Doctors
