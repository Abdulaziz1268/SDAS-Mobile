import LottieView from "lottie-react-native"
import { Text, TouchableOpacity, StyleSheet } from "react-native"

export default function AppButton({
  style,
  title,
  onPress,
  loading,
  textStyle = {},
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style, { opacity: loading ? 0.8 : 1 }]}
    >
      {loading ? (
        <LottieView
          loop
          autoPlay
          source={require("../../assets/Animations/barSpinner.json")}
          style={styles.spinner}
        />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>
          {title.toUpperCase()}
        </Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },
  spinner: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
})
