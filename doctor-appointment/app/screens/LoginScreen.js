import { Formik } from "formik"
import { Text, StyleSheet } from "react-native"
import * as Yup from "yup"
import AppTextInput from "../components/AppTextInput"
import AppSafeAreaView from "../components/AppSafeAreaView"
import AppButton from "../components/AppButton"
import { useState } from "react"
import colors from "../config/colors"

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
})

export default function LoginScreen() {
  const [visible, setVisible] = useState(false)

  const handleShowPassword = () => {
    setVisible((prevState) => !prevState)
  }
  return (
    <AppSafeAreaView style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        // validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit }) => (
          <>
            <Text style={styles.header}>Login!</Text>
            <AppTextInput
              style={styles.fields}
              icon="email"
              placeholder="Email"
              onChangeText={handleChange("email")}
            />
            <AppTextInput
              style={styles.fields}
              icon="lock"
              placeholder="Password"
              onChangeText={handleChange("password")}
              secureTextEntry={visible ? false : true}
              onPress={handleShowPassword}
              viewIcon={visible ? "eye-off-outline" : "eye-outline"}
            />
            <AppButton
              title="login"
              onPress={handleSubmit}
              style={styles.button}
            />
          </>
        )}
      </Formik>
    </AppSafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.blue,
    marginVertical: 30,
  },
  container: {
    paddingTop: 300,
    padding: 20,
    alignItems: "center",
  },
  fields: {
    marginVertical: 10,
  },
  header: {
    position: "absolute",
    top: 200,
    fontSize: 30,
    fontWeight: "900",
  },
})
