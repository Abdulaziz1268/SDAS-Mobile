import { Formik } from "formik"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import {
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Alert,
  ToastAndroid,
  TouchableOpacity,
} from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import * as ImagePicker from "expo-image-picker"
import * as Yup from "yup"

import AppTextInput from "../../components/AppTextInput"
import AppSafeAreaView from "../../components/AppSafeAreaView"
import AppButton from "../../components/AppButton"
import { useEffect, useState } from "react"
// import colors from "../../config/colors"
import picture from "../../../assets/noUser.jpg"
import { useTheme } from "../../Contexts/ThemeContext"

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(3).label("Name"),
  gender: Yup.string().required().min(3).label("Gender"),
  dob: Yup.date().required().label("Date of Birth"),
  address: Yup.string().required().label("Address"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^(\+251|0)?9\d{8}$/, "Invalid phone number format")
    .label("Phone number"),
})

const dummyInfo = {
  name: "abdu",
  gender: "male",
  dob: Date.now(),
  address: "Addis Ababa",
  phone: "0929247282",
}

export default function EditProfile({ navigation }) {
  const { colors, isDark } = useTheme()
  const [image, setImage] = useState(null)
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions()
  const [dateTouched, setDateTouched] = useState(false)
  const [showPicker, setShowPicker] = useState(false)

  useEffect(() => {
    if (!status?.granted) requestPermission()
  }, [])

  const pickImage = async () => {
    if (!status?.granted) {
      const res = await requestPermission()
      if (!res.granted)
        return Alert.alert("Permission required to pick an image")
    }
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 1,
        allowsEditing: true,
      })

      if (!result.canceled) {
        setImage(result.assets[0].uri)
      }
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT)
    }
  }
  return (
    <View style={[styles.container, { backgroundColor: colors.lightblue }]}>
      <View style={styles.cheveron}>
        <MaterialCommunityIcons
          name="chevron-left"
          color={colors.blue}
          size={35}
          onPress={() => navigation.goBack()}
          style={styles.icon}
        />
      </View>

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Formik
          initialValues={{
            name: dummyInfo.name,
            gender: dummyInfo.gender,
            dob: dummyInfo.dob,
            address: dummyInfo.address,
            phone: dummyInfo.phone,
          }}
          onSubmit={(values) => {
            const formData = new FormData()
            formData.append("name", values.name)
            formData.append("gender", values.gender)
            formData.append("address", values.address)
            formData.append("dob", values.dob)
            formData.append("image", image)
            console.log(formData)
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
              <KeyboardAvoidingView
                behavior="position"
                style={styles.inputsContainer}
              >
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={image ? { uri: image } : picture}
                      style={styles.image}
                    />
                    <MaterialCommunityIcons
                      name="image-edit-outline"
                      size={25}
                      color={colors.blue}
                      style={styles.editIcon}
                      onPress={() => pickImage()}
                    />
                  </View>
                  <AppTextInput
                    style={[styles.fields, { backgroundColor: colors.white }]}
                    placeholder="Name"
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    values={values.name}
                    placeholderTextColor={colors.text}
                  />
                  {touched.name && errors.name && (
                    <Text style={styles.errorText}>{errors.name}</Text>
                  )}
                  <AppTextInput
                    style={[styles.fields, { backgroundColor: colors.white }]}
                    placeholder="Gender"
                    onChangeText={handleChange("gender")}
                    onBlur={handleBlur("gender")}
                    values={values.gender}
                    placeholderTextColor={colors.text}
                  />
                  {touched.gender && errors.gender && (
                    <Text style={styles.errorText}>{errors.gender}</Text>
                  )}
                  <TouchableOpacity
                    onPress={() => setShowPicker(true)}
                    style={[
                      styles.datePickerContainer,
                      styles.fields,
                      { backgroundColor: colors.white },
                    ]}
                  >
                    <Text style={[styles.datePicker, { color: colors.text }]}>
                      {dateTouched
                        ? new Date(values.dob).toDateString()
                        : values.dob
                        ? new Date(values.dob).toDateString()
                        : "Select Date of Birth"}
                    </Text>
                  </TouchableOpacity>
                  {showPicker && (
                    <DateTimePicker
                      value={values.dob ? new Date(values.dob) : new Date()}
                      mode="date"
                      display={
                        Platform.OS === "android" ? "spinner" : "default"
                      }
                      onChange={(event, selectedDate) => {
                        setShowPicker(false)
                        if (selectedDate) {
                          setDateTouched(true)
                          handleChange("dob")(selectedDate.toISOString())
                        }
                      }}
                      onBlur={handleBlur("dob")}
                      values={values.dob}
                      themeVariant={isDark ? "dark" : "light"}
                    />
                  )}

                  {touched.dob && errors.dob && (
                    <Text style={styles.errorText}>{errors.dob}</Text>
                  )}
                  <AppTextInput
                    style={[styles.fields, { backgroundColor: colors.white }]}
                    placeholder="Address"
                    onChangeText={handleChange("address")}
                    onBlur={handleBlur("address")}
                    values={values.address}
                    placeholderTextColor={colors.text}
                  />
                  {touched.address && errors.address && (
                    <Text style={styles.errorText}>{errors.address}</Text>
                  )}
                  <AppTextInput
                    style={[styles.fields, { backgroundColor: colors.white }]}
                    placeholder="Phone"
                    onChangeText={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    values={values.phone}
                    keyboardType="phone-pad"
                    placeholderTextColor={colors.text}
                  />
                  {touched.phone && errors.phone && (
                    <Text style={styles.errorText}>{errors.phone}</Text>
                  )}
                </ScrollView>
              </KeyboardAvoidingView>
              <AppButton
                title="save"
                onPress={handleSubmit}
                style={[styles.button, { backgroundColor: colors.blue }]}
              />
            </>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  datePicker: {
    flex: 1,
    paddingLeft: 15,
    fontSize: 18,
    marginVertical: 10,
  },
  datePickerContainer: {
    padding: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderRadius: 30,
  },
  editIcon: {
    position: "absolute",
    bottom: 20,
    right: 0,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 20,
    marginTop: 0,
    resizeMode: "cover",
  },
  imageContainer: {
    position: "relative",
  },
  inputsContainer: {
    width: "100%",
  },
  scrollViewContent: {
    alignItems: "center",
    borderRadius: 30,
    overflow: "scroll",
  },
  button: {
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
  },
  // header: {
  //   fontSize: 30,
  //   fontWeight: "900",
  //   marginBottom: 20,
  //   color: colors.blue,
  //   zIndex: 1,
  //   backgroundColor: colors.lightblue,
  //   width: "100%",
  //   textAlign: "center",
  // },
  icon: {
    width: 50,
  },
})
