import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { Image } from "react-native"

import DashboardScreen from "../screens/Doctor/DashboardScreen"
import AppointmentScreen from "../screens/Doctor/AppointmentScreen"
import { dashboard, appointment, people } from "../../assets/index"
import ProfileScreen from "../screens/ProfileScreen"
// import colors from "../config/colors"
import EditProfile from "../screens/Doctor/EditProfile"
import ChangePassword from "../screens/Doctor/ChangePassword"
import About from "../screens/About"
import { useTheme } from "../Contexts/ThemeContext"

const DoctorTab = createBottomTabNavigator()
const DoctorStack = createStackNavigator()

const DoctorTabNavigator = () => {
  const { colors } = useTheme()
  return (
    <DoctorTab.Navigator
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
      <DoctorTab.Screen
        name="DashBoard"
        component={DashboardScreen}
        options={{
          tabBarIcon: () => (
            <Image source={dashboard} style={{ width: 25, height: 25 }} />
          ),
        }}
      />
      <DoctorTab.Screen
        name="Appointments"
        component={AppointmentScreen}
        options={{
          tabBarIcon: () => (
            <Image source={appointment} style={{ width: 25, height: 25 }} />
          ),
        }}
      />
      <DoctorTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
            <Image source={people} style={{ width: 25, height: 25 }} />
          ),
        }}
      />
    </DoctorTab.Navigator>
  )
}

export const DoctorStackNavigator = () => {
  return (
    <DoctorStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <DoctorStack.Screen name="Tab" component={DoctorTabNavigator} />
      <DoctorStack.Screen name="EditProfile" component={EditProfile} />
      <DoctorStack.Screen name="ChangePassword" component={ChangePassword} />
      <DoctorStack.Screen name="About" component={About} />
    </DoctorStack.Navigator>
  )
}
