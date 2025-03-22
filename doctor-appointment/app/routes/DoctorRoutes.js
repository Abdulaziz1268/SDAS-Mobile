import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import DashboardScreen from "../screens/Doctor/DashboardScreen"
import AppointmentScreen from "../screens/Doctor/AppointmentScreen"
import ProfileScreen from "../screens/Doctor/ProfileScreen"
import { Image } from "react-native"
import { dashboard, appointment, people } from "../../assets/index"
import colors from "../config/colors"

const DoctorTab = createBottomTabNavigator()
export const DoctorTabNavigator = () => {
  return (
    <DoctorTab.Navigator
      screenOptions={{
        animation: "fade",
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 60,
        },
      }}
    >
      <DoctorTab.Screen
        name="DashBoard"
        component={DashboardScreen}
        options={{
          tabBarActiveBackgroundColor: colors.lightblue,
          tabBarIcon: () => (
            <Image source={dashboard} style={{ width: 25, height: 25 }} />
          ),
        }}
      />
      <DoctorTab.Screen
        name="Appointments"
        component={AppointmentScreen}
        options={{
          tabBarActiveBackgroundColor: colors.lightblue,
          tabBarIcon: () => (
            <Image source={appointment} style={{ width: 25, height: 25 }} />
          ),
        }}
      />
      <DoctorTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarActiveBackgroundColor: colors.lightblue,
          tabBarIcon: () => (
            <Image source={people} style={{ width: 25, height: 25 }} />
          ),
        }}
      />
    </DoctorTab.Navigator>
  )
}
