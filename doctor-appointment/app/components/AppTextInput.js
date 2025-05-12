import { View, TextInput, StyleSheet, Text } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useTheme } from "../Contexts/ThemeContext"
// import colors from "../config/colors"

export default function AppTextInput({
  icon,
  placeholder,
  style,
  viewIcon,
  onPress,
  inputName,
  ...otherProps
}) {
  const { colors } = useTheme()
  return (
    <View
      style={[styles.inputContainer, style, { backgroundColor: colors.white }]}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={25}
          color={colors.gray}
          style={styles.icon}
        />
      )}
      {inputName && (
        <Text
          style={{
            color: colors.blue,
            fontSize: 18,
            marginLeft: 10,
            width: 80,
          }}
        >
          {inputName}
        </Text>
      )}
      <TextInput
        placeholder={placeholder}
        style={[styles.input, { color: colors.text }]}
        cursorColor={colors.blue}
        autoCapitalize="none"
        placeholderTextColor={colors.text}
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

    width: "100%",
    borderRadius: 30,
  },
  viewIcon: {
    paddingRight: 10,
  },
})
