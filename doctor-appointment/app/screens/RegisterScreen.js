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
import AppTextInput from "../components/AppTextInput"
import AppSafeAreaView from "../components/AppSafeAreaView"
import AppButton from "../components/AppButton"
import { useState } from "react"
import colors from "../config/colors"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const validationSchema = Yup.object().shape({
  fName: Yup.string().required().min(3).label("First Name"),
  lName: Yup.string().required().min(3).label("Last Name"),
  age: Yup.number().min(18).max(120).required().label("Age"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required(),
})

export default function RegisterScreen({ navigation }) {
  const [visible, setVisible] = useState(false)

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
          fName: "",
          lName: "",
          age: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => {
          const { confirmPassword, ...finalValue } = values // filter out confirm password before submiting
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
            <Text style={styles.header}>Register</Text>
            <KeyboardAvoidingView
              behavior="position"
              style={styles.inputsContainer}
            >
              <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <AppTextInput
                  style={styles.fields}
                  placeholder="First Name"
                  onChangeText={handleChange("fName")}
                  onBlur={handleBlur("fName")}
                  values={values.fName}
                />
                {touched.fName && errors.fName && (
                  <Text style={styles.errorText}>{errors.fName}</Text>
                )}
                <AppTextInput
                  style={styles.fields}
                  placeholder="Last Name"
                  onChangeText={handleChange("lName")}
                  onBlur={handleBlur("lName")}
                  values={values.lName}
                />
                {touched.lName && errors.lName && (
                  <Text style={styles.errorText}>{errors.lName}</Text>
                )}
                <AppTextInput
                  style={styles.fields}
                  placeholder="Age"
                  onChangeText={handleChange("age")}
                  onBlur={handleBlur("age")}
                  values={values.age}
                />
                {touched.age && errors.age && (
                  <Text style={styles.errorText}>{errors.age}</Text>
                )}
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
                  viewIcon={visible ? "eye-off-outline" : "eye-outline"}
                  onPress={handleShowPassword}
                  onBlur={handleBlur("password")}
                  values={values.password}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
                <AppTextInput
                  icon="lock"
                  style={styles.fields}
                  placeholder="Confirm Password"
                  onChangeText={handleChange("confirmPassword")}
                  secureTextEntry={visible ? false : true}
                  viewIcon={visible ? "eye-off-outline" : "eye-outline"}
                  onPress={handleShowPassword}
                  onBlur={handleBlur("confirmPassword")}
                  values={values.confirmPassword}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </ScrollView>
            </KeyboardAvoidingView>
            <AppButton
              title="register"
              onPress={handleSubmit}
              style={styles.button}
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
  button: {
    backgroundColor: colors.blue,
    marginVertical: 30,
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
    backgroundColor: colors.white,
  },
  header: {
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 20,
    color: colors.blue,
    zIndex: 1,
    backgroundColor: colors.lightblue,
    width: "100%",
    textAlign: "center",
  },
  icon: {
    width: 50,
  },
})
