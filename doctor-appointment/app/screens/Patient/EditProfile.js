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
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import LottieView from "lottie-react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import AppTextInput from "../../components/AppTextInput"
import AppButton from "../../components/AppButton"
import picture from "../../../assets/noUser.jpg"
import { useTheme } from "../../Contexts/ThemeContext"
import { UserContext } from "../../Contexts/UserContext"
import { apiWithPatientAuth } from "../../config/api"

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

export default function EditProfile({ navigation }) {
  const { colors } = useTheme()
  const [image, setImage] = useState(null)
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions()
  const [dateTouched, setDateTouched] = useState(false)
  const [showPicker, setShowPicker] = useState(false)
  const { userData, getUserData } = useContext(UserContext)
  const [loading, setLoading] = useState(false)

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

  const getImageInfo = (uri) => {
    const extension = uri.split(".").pop()
    const mimeType =
      extension === "png"
        ? "image/png"
        : extension === "jpg" || extension === "jpeg"
        ? "image/jpeg"
        : "application/octet-stream"

    return {
      uri,
      type: mimeType,
      name: `profile.${extension}`,
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
      {userData ? (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <Formik
            initialValues={{
              name: userData.name,
              gender: userData.gender,
              dob: userData.dob,
              address: userData.address,
              phone: userData.phone,
            }}
            onSubmit={async (values) => {
              setLoading(true)
              const formData = new FormData()
              formData.append("name", values.name)
              formData.append("gender", values.gender)
              formData.append("address", values.address)
              formData.append("dob", values.dob)
              formData.append("phone", values.phone)
              if (image) {
                formData.append("image", getImageInfo(image))
              }

              try {
                const token = await AsyncStorage.getItem("Ptoken")

                if (!token) throw new Error("Authentication token not found!")

                const api = await apiWithPatientAuth()
                const { data } = await api.post(
                  "/user/api//profile-update",
                  formData,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  }
                )

                if (data.success) {
                  ToastAndroid.show("updated succefully!", ToastAndroid.SHORT)
                  await getUserData()
                  setLoading(false)
                  navigation.goBack()
                }
              } catch (error) {
                setLoading(false)
                if (error.response?.data?.message) {
                  console.log("Server error:", error.response.data.message)
                  ToastAndroid.show(
                    error.response.data.message,
                    ToastAndroid.SHORT
                  )
                } else if (error.message) {
                  console.log("Client error:", error.message)
                  ToastAndroid.show(error.message, ToastAndroid.SHORT)
                } else {
                  console.log("Unknown error:", error)
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
              setFieldValue,
            }) => (
              <>
                <KeyboardAvoidingView
                  behavior="position"
                  style={styles.inputsContainer}
                >
                  <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={
                          image ? { uri: image } : { uri: userData.image }
                        }
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
                      inputName="Name: "
                      style={[styles.fields]}
                      // placeholder={userData.name}
                      placeholderTextColor={colors.text}
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      value={values.name}
                    />
                    {touched.name && errors.name && (
                      <Text style={styles.errorText}>{errors.name}</Text>
                    )}
                    <AppTextInput // make this a dropdown to select from
                      inputName="Gender: "
                      style={[styles.fields, { backgroundColor: colors.white }]}
                      // placeholder={userData.gender}
                      onChangeText={handleChange("gender")}
                      onBlur={handleBlur("gender")}
                      value={values.gender}
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
                      <Text
                        style={{
                          color: colors.blue,
                          marginLeft: 10,
                          fontSize: 18,
                          width: 70,
                        }}
                      >
                        D.O.B
                      </Text>
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
                        value={
                          values.dob instanceof Date && !isNaN(values.dob)
                            ? new Date(values.dob)
                            : new Date()
                        }
                        mode="date"
                        display={
                          Platform.OS === "android" ? "spinner" : "default"
                        }
                        onChange={(event, selectedDate) => {
                          setShowPicker(false)
                          if (selectedDate) {
                            setDateTouched(true)
                            // handleChange("dob")(selectedDate.toISOString())
                            setFieldValue("dob", selectedDate.toISOString())
                          }
                        }}
                      />
                    )}

                    {touched.dob && errors.dob && (
                      <Text style={styles.errorText}>{errors.dob}</Text>
                    )}
                    <AppTextInput
                      inputName="Address: "
                      style={[styles.fields, { backgroundColor: colors.white }]}
                      // placeholder={userData.address}
                      onChangeText={handleChange("address")}
                      onBlur={handleBlur("address")}
                      value={values.address}
                      placeholderTextColor={colors.text}
                    />
                    {touched.address && errors.address && (
                      <Text style={styles.errorText}>{errors.address}</Text>
                    )}
                    <AppTextInput
                      inputName="Phone: "
                      style={[styles.fields, { backgroundColor: colors.white }]}
                      // placeholder={userData.phone}
                      onChangeText={handleChange("phone")}
                      onBlur={handleBlur("phone")}
                      value={values.phone}
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
                  loading={loading}
                  style={{ marginVertical: 30, backgroundColor: colors.blue }}
                />
              </>
            )}
          </Formik>
        </TouchableWithoutFeedback>
      ) : (
        <LottieView
          style={styles.spinner}
          source={require("../../../assets/Animations/barSpinner.json")}
          loop
          autoPlay
        />
      )}
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
  cheveron: {
    width: "100%",
  },
  container: {
    padding: 20,
    alignItems: "center",
    flex: 1,
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
  spinner: {
    marginTop: "60%",
    width: 200,
    height: 200,
  },
})
