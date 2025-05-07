import { Formik } from "formik"
import {
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native"
import * as Yup from "yup"
import AppTextInput from "../../components/AppTextInput"
import AppSafeAreaView from "../../components/AppSafeAreaView"
import AppButton from "../../components/AppButton"
import { useState } from "react"
// import colors from "../../config/colors"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useTheme } from "../../Contexts/ThemeContext"

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required().label("Current Password"),
  newPassword: Yup.string().required().min(4).label("Password"),
  ConfirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required(),
})

export default function ChangePassword({ navigation }) {
  const [visible, setVisible] = useState(false)
  const { colors } = useTheme()

  const handleShowPassword = () => {
    setVisible((prevState) => !prevState)
  }
  return (
    <AppSafeAreaView style={styles.container}>
      {/* <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> */}
      <View style={styles.cheveron}>
        <MaterialCommunityIcons
          name="chevron-left"
          color={colors.blue}
          size={35}
          onPress={() => navigation.goBack()}
          style={styles.icon}
        />
      </View>

      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          ConfirmPassword: "",
        }}
        onSubmit={(values) => {
          console.log(finalValue)
        }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          touched,
          errors,
          values,
        }) => (
          <>
            <Text
              style={[
                styles.header,
                { backgroundColor: colors.lightblue, color: colors.blue },
              ]}
            >
              Change Password
            </Text>
            <KeyboardAvoidingView
              behavior="position"
              style={styles.inputsContainer}
            >
              <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <AppTextInput
                  style={[styles.fields, { backgroundColor: colors.white }]}
                  placeholder="Current Password"
                  onChangeText={handleChange("oldPassword")}
                  onBlur={handleBlur("oldPassword")}
                  values={values.oldPassword}
                  secureTextEntry={visible ? false : true}
                  viewIcon={visible ? "eye-off-outline" : "eye-outline"}
                  onPress={handleShowPassword}
                  placeholderTextColor={colors.text}
                />
                {touched.oldPassword && errors.oldPassword && (
                  <Text style={styles.errorText}>{errors.oldPassword}</Text>
                )}
                <AppTextInput
                  style={[styles.fields, { backgroundColor: colors.white }]}
                  placeholder="newPassword"
                  onChangeText={handleChange("newPassword")}
                  onBlur={handleBlur("newPassword")}
                  values={values.newPassword}
                  secureTextEntry={visible ? false : true}
                  viewIcon={visible ? "eye-off-outline" : "eye-outline"}
                  onPress={handleShowPassword}
                  placeholderTextColor={colors.text}
                />
                {touched.newPassword && errors.newPassword && (
                  <Text style={styles.errorText}>{errors.newPassword}</Text>
                )}

                <AppTextInput
                  style={[styles.fields, { backgroundColor: colors.white }]}
                  placeholder="Confirm Password"
                  onChangeText={handleChange("ConfirmPassword")}
                  values={values.ConfirmPassword}
                  onBlur={handleBlur("ConfirmPassword")}
                  secureTextEntry
                  placeholderTextColor={colors.text}
                />
                {touched.ConfirmPassword && errors.ConfirmPassword && (
                  <Text style={styles.errorText}>{errors.ConfirmPassword}</Text>
                )}
              </ScrollView>
            </KeyboardAvoidingView>
            <AppButton
              title="Change"
              onPress={handleSubmit}
              style={{ backgroundColor: colors.blue, marginVertical: 30 }}
            />
          </>
        )}
      </Formik>

      {/* </TouchableWithoutFeedback> */}
    </AppSafeAreaView>
  )
}

const styles = StyleSheet.create({
  inputsContainer: {
    width: "100%",
  },
  scrollViewContent: {
    alignItems: "center",
    borderRadius: 30,
    overflow: "scroll",
  },
  cheveron: {
    width: "100%",
  },
  container: {
    padding: 20,
    alignItems: "center",
  },
  errorText: {
    color: "red",
    width: "100%",
    paddingLeft: 20,
  },
  fields: {
    marginVertical: 10,
    elevation: 5,
  },
  header: {
    fontSize: 30,
    fontWeight: "900",
    marginVertical: 20,
    zIndex: 1,

    width: "100%",
    textAlign: "center",
  },
  icon: {
    width: 50,
  },
})
