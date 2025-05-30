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

const AppointmentCard = ({
  name,
  date,
  time,
  image,
  handleCancel,
  handleComplete,
  cancelled = false,
  isComplet = false,
}) => {
  const { colors } = useTheme()
  return (
    <View
      style={[
        styles.cardContainer,
        { borderColor: colors.lightgray, backgroundColor: colors.white },
      ]}
    >
      <View style={[styles.topContainer]}>
        <View style={styles.nameContainer}>
          <Image
            source={image ? { uri: image } : placeHolder}
            style={styles.profileImage}
          />
          <Text style={[styles.nameText, { color: colors.text }]}>{name}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.dateContainer}>
            <Text style={{ color: colors.text }}>{date}</Text>
            <Text style={{ color: colors.text }}>{time}</Text>
          </View>
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
            {!cancelled && !isComplet && (
              <MaterialCommunityIcons
                name="dots-vertical"
                size={25}
                color={colors.text}
              />
            )}
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
            <MenuOption onSelect={handleComplete} text="✅ Completed" />
            <MenuOption onSelect={handleCancel} text="❌ Cancel" />
          </MenuOptions>
        </Menu>
      </View>
      {cancelled ? (
        <View
          style={[
            styles.status,
            {
              backgroundColor: colors.lightred,
              borderColor: colors.darkred,
              marginTop: 10,
            },
          ]}
        >
          <Text style={{ textAlign: "center", color: colors.darkred }}>
            Cancelled
          </Text>
        </View>
      ) : isComplet ? (
        <View
          style={[
            styles.status,
            {
              backgroundColor: colors.lightgreen,
              borderColor: colors.darkgreen,
              marginTop: 10,
            },
          ]}
        >
          <Text style={{ textAlign: "center", color: colors.darkgreen }}>
            Completed
          </Text>
        </View>
      ) : (
        ""
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  status: {
    width: "auto",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
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
    height: "auto",
    borderWidth: 2,
    marginVertical: 5,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  topContainer: {
    overflow: "hidden",
    paddingRight: 20,
    alignItems: "center",
    flexDirection: "row",
    width: "auto",
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
    borderRadius: 10,
    // borderTopRightRadius: 10,
    // borderBottomRightRadius: 10,
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
