import { Formik } from "formik"
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ToastAndroid,
  Pressable,
} from "react-native"
import * as Yup from "yup"
import { useContext, useState } from "react"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import * as LocalAuthentication from "expo-local-authentication"

import AppTextInput from "../components/AppTextInput"
import AppSafeAreaView from "../components/AppSafeAreaView"
import AppButton from "../components/AppButton"
// import colors from "../config/colors"
import { PrefContext } from "../Contexts/PrefContext"
import { useTheme } from "../Contexts/ThemeContext"
import api from "../config/api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AuthContext } from "../Contexts/AuthContext"

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
})

export default function LoginScreen({ navigation }) {
  const { colors, isDark, toggleTheme } = useTheme()
  const [visible, setVisible] = useState(false)
  const { allowFP } = useContext(PrefContext)
  const { setPatientToken, setDoctorToken, user, setUser } =
    useContext(AuthContext)
  // const [user, setUser] = useState("patient")

  const handleShowPassword = () => {
    setVisible((prevState) => !prevState)
  }

  const verifyBiometrics = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate with Fingerprint",
      fallbackLabel: "Use Password",
    })

    if (result.success) {
      ToastAndroid.show("Authentication Succefull", ToastAndroid.SHORT)
    } else {
      ToastAndroid.show("Authentication Failed", ToastAndroid.SHORT)
    }
  }
  return (
    <AppSafeAreaView style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            if (user == "patient") {
              const { data } = await api.post("/user/api/user-login", values)
              if (data.success) {
                const token = data.token
                await AsyncStorage.setItem("Ptoken", token)
                await AsyncStorage.setItem("user", "patient")
                setPatientToken(true)
                console.log("logged in successfully")
                ToastAndroid.show(data.message, ToastAndroid.SHORT)
              }
            } else if (user === "doctor") {
              const { data } = await api.post("/doctor/api/login", values)
              if (data.success) {
                const token = data.dtoken
                await AsyncStorage.setItem("dtoken", token)
                await AsyncStorage.setItem("user", "doctor")
                setDoctorToken(true)
                ToastAndroid.show(data.message, ToastAndroid.SHORT)
              }
            }
          } catch (error) {
            if (error.response && error.response.data) {
              ToastAndroid.show(
                error.response.data.message || "Login failed",
                ToastAndroid.SHORT
              )
            } else {
              ToastAndroid.show(
                "An unexpected error occurred",
                ToastAndroid.SHORT
              )
            }
            console.log("Login error:", error)
          }
        }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          errors,
          touched,
        }) => (
          <>
            <View style={[styles.options]}>
              <View
                style={[
                  styles.optionsInnerContainer,
                  { backgroundColor: colors.white, borderColor: colors.blue },
                ]}
              >
                <Pressable onPress={() => setUser("patient")}>
                  <Text
                    style={[
                      styles.optionText,
                      {
                        backgroundColor:
                          user === "patient" ? colors.blue : colors.white,
                        color: user === "patient" ? colors.white : colors.black,
                      },
                    ]}
                  >
                    Patient
                  </Text>
                </Pressable>
                <Pressable onPress={() => setUser("doctor")}>
                  <Text
                    style={[
                      styles.optionText,
                      {
                        backgroundColor:
                          user === "doctor" ? colors.blue : colors.white,
                        color: user === "doctor" ? colors.white : colors.black,
                      },
                    ]}
                  >
                    Doctor
                  </Text>
                </Pressable>
              </View>
              <Ionicons
                name={isDark ? "sunny" : "moon-sharp"}
                size={30}
                color={colors.blue}
                style={styles.theme}
                onPress={toggleTheme}
              />
            </View>
            <Text style={[styles.header, { color: colors.blue }]}>Login</Text>
            <AppTextInput
              style={[styles.fields, { backgroundColor: colors.white }]}
              icon="email"
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              values={values.email}
              placeholderTextColor={colors.text}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <AppTextInput
              style={[styles.fields, { backgroundColor: colors.white }]}
              icon="lock"
              placeholder="Password"
              onChangeText={handleChange("password")}
              secureTextEntry={visible ? false : true}
              onPress={handleShowPassword}
              viewIcon={visible ? "eye-off-outline" : "eye-outline"}
              onBlur={handleBlur("password")}
              values={values.password}
              placeholderTextColor={colors.text}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <View style={styles.buttonsContainer}>
              <View style={styles.btnContainer}>
                <AppButton
                  title="login"
                  onPress={handleSubmit}
                  style={{ backgroundColor: colors.blue, marginVertical: 30 }}
                />
              </View>
              {allowFP ? (
                <TouchableOpacity
                  style={[styles.fingerprint, { backgroundColor: colors.blue }]}
                  onPress={() => verifyBiometrics()}
                >
                  <MaterialCommunityIcons
                    name="fingerprint"
                    size={45}
                    color={colors.white}
                  />
                </TouchableOpacity>
              ) : (
                ""
              )}
            </View>
          </>
        )}
      </Formik>
      <View style={styles.linkWrapper}>
        <Text style={{ color: colors.text }}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={{ color: colors.blue }}> Register</Text>
        </TouchableOpacity>
      </View>
    </AppSafeAreaView>
  )
}

const styles = StyleSheet.create({
  btnContainer: {
    flexGrow: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  container: {
    paddingTop: 250,
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

    elevation: 10,
  },
  fingerprint: {
    borderRadius: 30,
    height: 60,
    width: 55,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    position: "absolute",
    top: 150,
    fontSize: 30,
    fontWeight: "900",
  },
  linkWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  // registerButton: {
  //   backgroundColor: colors.gray,
  //   marginTop: 20,
  // },
  options: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 30,
    right: 30,
    gap: 10,
  },
  optionsInnerContainer: {
    flexDirection: "row",
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 26,
    overflow: "hidden",
  },
  optionText: {
    padding: 5,
    width: 76,
    textAlign: "center",
    borderRadius: 25,
  },
})
