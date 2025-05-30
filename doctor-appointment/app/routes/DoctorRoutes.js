import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { Image } from "react-native"

import DashboardScreen from "../screens/Doctor/DashboardScreen"
import AppointmentScreen from "../screens/Doctor/AppointmentScreen"
import { dashboard, appointment, people } from "../../assets/index"
import ProfileScreen from "../screens/ProfileScreen"
// import colors from "../config/colors"
import EditProfile from "../screens/Doctor/EditProfile"
import ChangePassword from "../screens/ChangePassword"
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
          height: 60,
          paddingBottom: 0,
          borderTopWidth: 2,
          borderColor: colors.white,
          elevation: 10,
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
