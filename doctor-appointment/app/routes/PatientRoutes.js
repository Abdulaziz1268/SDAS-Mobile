import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { Image } from "react-native"
import { Fontisto } from "@expo/vector-icons"

import Home from "../screens/Patient/Home"
import Booking from "../screens/Patient/Booking"
import { dashboard, appointment, people } from "../../assets/index"
import ProfileScreen from "../screens/ProfileScreen"
import colors from "../config/colors"
import EditProfile from "../screens/Patient/EditProfile"
import ChangePassword from "../screens/Patient/ChangePassword"
import Doctors from "../screens/Patient/Doctors"
import About from "../screens/About"
import Bookings from "../screens/Patient/Bookings"
import { useTheme } from "../Contexts/ThemeContext"

const PatientTab = createBottomTabNavigator()
const PatientStack = createStackNavigator()

const PatientTabNavigator = () => {
  const { colors } = useTheme()
  return (
    <PatientTab.Navigator
      screenOptions={{
        animation: "fade",
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarInactiveBackgroundColor: colors.white,
        tabBarActiveBackgroundColor: colors.lightblue,
        tabBarStyle: {
          borderRadius: 40,
          height: 60,
          position: "absolute",
          bottom: 10,
          right: 10,
          left: 10,
          width: "90%",
          borderTopWidth: 0,
          alignSelf: "center",
        },
      }}
    >
      <PatientTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => (
            <Image source={dashboard} style={{ width: 25, height: 25 }} />
          ),
        }}
      />
      <PatientTab.Screen
        name="Doctors"
        component={Doctors}
        options={{
          // tabBarActiveBackgroundColor: colors.lightblue,
          tabBarIcon: () => (
            // <Image source={doctor} style={{ width: 25, height: 25 }} />
            <Fontisto name="doctor" color={"#3c97d6"} size={25} />
          ),
        }}
      />
      <PatientTab.Screen
        name="Bookings"
        component={Bookings}
        options={{
          // tabBarActiveBackgroundColor: colors.lightblue,
          tabBarIcon: () => (
            <Image source={appointment} style={{ width: 25, height: 25 }} />
          ),
        }}
      />
      <PatientTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          // tabBarActiveBackgroundColor: colors.lightblue,
          tabBarIcon: () => (
            <Image source={people} style={{ width: 25, height: 25 }} />
          ),
        }}
      />
    </PatientTab.Navigator>
  )
}

export const PatientStackNavigator = () => {
  return (
    <PatientStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <PatientStack.Screen name="Tab" component={PatientTabNavigator} />
      <PatientStack.Screen name="EditProfile" component={EditProfile} />
      <PatientStack.Screen name="ChangePassword" component={ChangePassword} />
      <PatientStack.Screen name="Booking" component={Booking} />
      <PatientStack.Screen name="About" component={About} />
    </PatientStack.Navigator>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: colors.lightblue,
//   },
// })
