import { View, TextInput, StyleSheet } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import colors from "../config/colors"

export default function AppTextInput({
  icon,
  placeholder,
  style,
  viewIcon,
  onPress,
  ...otherProps
}) {
  return (
    <View style={[styles.inputContainer, style]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={25}
          color={colors.gray}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        cursorColor={colors.blue}
        autoCapitalize="none"
        {...otherProps}
      />
      {viewIcon && (
        <MaterialCommunityIcons
          name={viewIcon}
          size={25}
          color={colors.gray}
          style={styles.viewIcon}
          onPress={onPress}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    paddingLeft: 5,
  },
  input: {
    flex: 1,
    paddingLeft: 15,
    fontSize: 18,
  },
  inputContainer: {
    padding: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "lightgray",
    width: "100%",
    borderRadius: 30,
  },
  viewIcon: {
    paddingRight: 10,
  },
})
