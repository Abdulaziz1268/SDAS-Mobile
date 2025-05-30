import { Formik } from "formik"
import {
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  ToastAndroid,
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Yup from "yup"
import { useContext, useState } from "react"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import AppTextInput from "../components/AppTextInput"
import AppSafeAreaView from "../components/AppSafeAreaView"
import AppButton from "../components/AppButton"
import { useTheme } from "../Contexts/ThemeContext"
import { apiWithPatientAuth, apiWithDoctorAuth } from "../config/api"
import { AuthContext } from "../Contexts/AuthContext"

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
  const { user } = useContext(AuthContext)
  const [responseData, setResponseData] = useState()

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
        onSubmit={async (values) => {
          try {
            if (user == "patient") {
              const token = await AsyncStorage.getItem("Ptoken")

              if (!token) throw new Error("no authentication token found!")
              const api = await apiWithPatientAuth()
              const { data } = await api.post(
                "user/api/change-password",
                values
              )

              if (data.success) {
                ToastAndroid.show(
                  "Password Changed Successfully",
                  ToastAndroid.SHORT
                )
                navigation.goBack()
              }
            } else if (user == "doctor") {
              const token = await AsyncStorage.getItem("dtoken")

              if (!token) throw new Error("no authentication token found!")
              const api = await apiWithDoctorAuth()
              const { data } = await api.post(
                "doctor/api/change-password",
                values
              )

              if (data.success) {
                ToastAndroid.show(
                  "Password Changed Successfully",
                  ToastAndroid.SHORT
                )
                navigation.goBack()
              }
            }
          } catch (error) {
            if (error.response?.data?.message) {
              console.log(error.response.data.message)
              ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT)
            } else {
              console.log(error.message)
            }
          }
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
              style={{ marginVertical: 30, backgroundColor: colors.blue }}
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
