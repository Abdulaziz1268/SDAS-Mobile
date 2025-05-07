import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import colors from "../../config/colors"
import DoctorCard from "../../components/DoctorCard"
import { useTheme } from "../../Contexts/ThemeContext"

const data = [
  {
    id: Math.random(),
    name: "abdulazi",
    availability: true,
    speciality: "surgery",
  },
  {
    id: Math.random(),
    name: "khedir",
    availability: true,
    speciality: "optics",
  },
  {
    id: Math.random(),
    name: "muse",
    availability: false,
    speciality: "pediatrics",
  },
  {
    id: Math.random(),
    name: "doctor one",
    availability: true,
    speciality: "orthodontic",
  },
  {
    id: Math.random(),
    name: "doctor two",
    availability: false,
    speciality: "dentist",
  },
  {
    id: Math.random(),
    name: "doctor three",
    availability: false,
    speciality: "dentist",
  },
  {
    id: Math.random(),
    name: "doctor four",
    availability: false,
    speciality: "dentist",
  },
  {
    id: Math.random(),
    name: "doctor five",
    availability: false,
    speciality: "dentist",
  },
]

const spec = [
  "sergeon",
  "pediatrics",
  "optics",
  "orthodontic",
  "dentist",
  "Urology",
  "Anesthesiology",
  "Radiology",
  "Oncology",
  "Neurology",
  "Psychiatry",
]

const Doctors = () => {
  const { colors } = useTheme()
  const [showFilter, setShowFilter] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState([])

  const addToFilter = (item) => {
    setSelectedFilter((prevFilter) =>
      prevFilter.includes(item)
        ? prevFilter.filter((filterItem) => filterItem !== item)
        : [...prevFilter, item]
    )
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
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DoctorCard
            name={item.name}
            availability={item.availability}
            speciality={item.speciality}
            description="the description will go here"
            fee={100}
            id="id"
          />
        )}
        style={styles.list}
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
