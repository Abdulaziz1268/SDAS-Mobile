import React from "react"
import {
  Image,
  StyleSheet,
  View,
  Text,
  ToastAndroid,
  TouchableOpacity,
} from "react-native"
import placeHolder from "../../assets/noUser.jpg"
import docImage from "../../assets/docImage.jpg"
// import colors from "../config/colors"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu"
import { useTheme } from "../Contexts/ThemeContext"

const AppointmentCard = ({ name, date, time, image = placeHolder }) => {
  const { colors } = useTheme()
  return (
    <View
      style={[
        styles.cardContainer,
        { borderColor: colors.lightgray, backgroundColor: colors.white },
      ]}
    >
      <View style={styles.nameContainer}>
        <Image source={docImage} style={styles.profileImage} />
        <Text style={[styles.nameText, { color: colors.text }]}>{name}</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.dateContainer}>
          <Text style={{ color: colors.text }}>{date}</Text>
          <Text style={{ color: colors.text }}>{time}</Text>
        </View>
        {/* <View style={styles.approvalContainer}>
          <TouchableOpacity>
            <MaterialCommunityIcons name="check-bold" size={25} color="green" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={25}
              color="black"
            />
          </TouchableOpacity>
        </View> */}
        <Menu>
          <MenuTrigger
            customStyles={{
              TriggerTouchableComponent: TouchableOpacity,
            }}
          >
            <MaterialCommunityIcons
              name="dots-vertical"
              size={25}
              color={colors.text}
            />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                width: 140,
                marginTop: 40,
                borderRadius: 10,
                overflow: "hidden",
                backgroundColor: colors.white,
                borderWidth: 4,
                borderColor: colors.lightblue,
                // elevation: 10,
              },
              optionWrapper: {
                padding: 10,
              },
              optionText: {
                paddingLeft: 10,
                color: colors.text,
              },
            }}
          >
            <MenuOption
              onSelect={() =>
                ToastAndroid.show("Completed", ToastAndroid.SHORT)
              }
              text="✅ Completed"
            />
            <MenuOption
              onSelect={() => ToastAndroid.show("Canceled", ToastAndroid.SHORT)}
              text="❌ Cancel"
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  approvalContainer: {
    gap: 20,
    width: 30,
    alignItems: "center",
  },
  bottomContainer: {
    flexDirection: "row",
    width: "40%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  cardContainer: {
    flexDirection: "row",
    width: "100%",
    height: 100,
    // justifyContent: "space-between",
    overflow: "hidden",
    alignItems: "center",

    borderWidth: 2,
    marginVertical: 3,
    borderRadius: 15,
    paddingRight: 20,
  },
  dateContainer: {
    // paddingRight: 70,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "60%",
    // backgroundColor: "red",
  },
  nameText: {
    width: 90,
  },
  profileImage: {
    width: 70,
    height: 70,
    marginRight: 10,
    // borderRadius: 25,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
})

const optionsStyles = {
  optionsContainer: {
    width: 130,
    marginTop: 40,
    borderRadius: 10,
    overflow: "hidden",
  },
  optionWrapper: {
    padding: 10,
  },
  optionText: {
    paddingLeft: 10,
  },
}

export default AppointmentCard
