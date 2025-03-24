import { Formik } from "formik"
import { Text, StyleSheet, TouchableOpacity, View } from "react-native"
import * as Yup from "yup"
import AppTextInput from "../components/AppTextInput"
import AppSafeAreaView from "../components/AppSafeAreaView"
import AppButton from "../components/AppButton"
import { useContext, useState } from "react"
import colors from "../config/colors"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { PrefContext } from "../Contexts/PrefContext"

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
})

export default function LoginScreen({ navigation }) {
  const [visible, setVisible] = useState(false)
  const { allowFP } = useContext(PrefContext)

  const handleShowPassword = () => {
    setVisible((prevState) => !prevState)
  }
  return (
    <AppSafeAreaView style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
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
            <Text style={styles.header}>Login</Text>
            <AppTextInput
              style={styles.fields}
              icon="email"
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              values={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <AppTextInput
              style={styles.fields}
              icon="lock"
              placeholder="Password"
              onChangeText={handleChange("password")}
              secureTextEntry={visible ? false : true}
              onPress={handleShowPassword}
              viewIcon={visible ? "eye-off-outline" : "eye-outline"}
              onBlur={handleBlur("password")}
              values={values.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <View style={styles.buttonsContainer}>
              <View style={styles.btnContainer}>
                <AppButton
                  title="login"
                  onPress={handleSubmit}
                  style={styles.button}
                />
              </View>
              {allowFP ? (
                <TouchableOpacity style={styles.fingerprint}>
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
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerLink}> Register</Text>
        </TouchableOpacity>
      </View>
    </AppSafeAreaView>
  )
}

const styles = StyleSheet.create({
  btnContainer: {
    flexGrow: 1,
  },
  button: {
    backgroundColor: colors.blue,
    marginVertical: 30,
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
  },
  fields: {
    marginVertical: 10,
    backgroundColor: colors.white,
    elevation: 10,
  },
  fingerprint: {
    backgroundColor: colors.blue,
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
    color: colors.blue,
  },
  linkWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  registerButton: {
    backgroundColor: colors.gray,
    marginTop: 20,
  },
  registerLink: {
    color: colors.blue,
  },
})
