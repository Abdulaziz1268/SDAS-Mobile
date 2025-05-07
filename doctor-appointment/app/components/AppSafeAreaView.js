import { SafeAreaView, StyleSheet, Platform, StatusBar } from "react-native"
import { useTheme } from "../Contexts/ThemeContext"
// import colors from "../config/colors"

export default function AppSafeAreaView({ children, style }) {
  const { colors } = useTheme()
  return (
    <SafeAreaView
      style={[styles.container, style, { backgroundColor: colors.lightblue }]}
    >
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
  },
})
