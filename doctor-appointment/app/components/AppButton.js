import { Text, TouchableOpacity, StyleSheet } from "react-native"

export default function AppButton({ style, title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Text style={styles.buttonText}>{title.toUpperCase()}</Text>
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
})
