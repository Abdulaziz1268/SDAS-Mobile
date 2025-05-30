import { Formik } from "formik"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import {
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Alert,
  ToastAndroid,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import * as Yup from "yup"
import { useContext, useEffect, useState } from "react"
import LottieView from "lottie-react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import AppTextInput from "../../components/AppTextInput"
import AppButton from "../../components/AppButton"
import { useTheme } from "../../Contexts/ThemeContext"
import { apiWithDoctorAuth } from "../../config/api"
import { DoctorContext } from "../../Contexts/DoctorContext"

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(3).label("Name"),
  gender: Yup.string().required().min(3).label("Gender"),
  address: Yup.string().required().label("Address"),
  age: Yup.number().required().label("Age"),
  email: Yup.string().required().label("Email"),
  about: Yup.string().required().label("About"),
  speciality: Yup.string().required().label("Speciality"),
  availablity: Yup.string().required().label("Availablity"),
})

export default function EditProfile({ navigation }) {
  const { colors } = useTheme()
  const [image, setImage] = useState(null)
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions()
  const { doctorData, getDoctorData } = useContext(DoctorContext)
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

  console.log(doctorData)

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
      {doctorData ? (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <Formik
            initialValues={{
              name: doctorData.name,
              email: doctorData.email,
              gender: doctorData.gender,
              speciality: doctorData.speciality,
              address: doctorData.address,
              age: doctorData.age,
              availiblity: doctorData.availablity,
              about: doctorData.about,
            }}
            onSubmit={async (values) => {
              setLoading(true)
              const formData = new FormData()
              formData.append("name", values.name)
              formData.append("gender", values.gender)
              formData.append("address", values.address)
              formData.append("availablity", values.availablity)
              formData.append("speciality", values.speciality)
              formData.append("about", values.about)
              if (image) {
                formData.append("image", getImageInfo(image))
              }

              try {
                const token = await AsyncStorage.getItem("Dtoken")

                if (!token) throw new Error("Authentication token not found!")

                const api = await apiWithDoctorAuth()
                const { data } = await api.post(
                  "doctor/api/update-doctor",
                  formData,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  }
                )

                if (data.success) {
                  ToastAndroid.show("updated succefully!", ToastAndroid.SHORT)
                  await getDoctorData()
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
                          image ? { uri: image } : { uri: doctorData.image }
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
                    <AppTextInput
                      inputName="Email: "
                      style={[styles.fields]}
                      // placeholder={userData.name}
                      placeholderTextColor={colors.text}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
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
                      inputName="Availablity: "
                      style={[styles.fields, { backgroundColor: colors.white }]}
                      // placeholder={userData.address}
                      onChangeText={handleChange("availablity")}
                      onBlur={handleBlur("availablity")}
                      value={values.availablity}
                      placeholderTextColor={colors.text}
                    />
                    {touched.address && errors.availablity && (
                      <Text style={styles.errorText}>{errors.availablity}</Text>
                    )}
                    <AppTextInput
                      inputName="Age: "
                      style={[styles.fields, { backgroundColor: colors.white }]}
                      // placeholder={userData.address}
                      onChangeText={handleChange("age")}
                      onBlur={handleBlur("age")}
                      value={values.age}
                      placeholderTextColor={colors.text}
                    />
                    {touched.age && errors.age && (
                      <Text style={styles.errorText}>{errors.age}</Text>
                    )}
                    <AppTextInput
                      inputName="About: "
                      style={[styles.fields, { backgroundColor: colors.white }]}
                      // placeholder={userData.address}
                      onChangeText={handleChange("about")}
                      onBlur={handleBlur("about")}
                      value={values.about}
                      placeholderTextColor={colors.text}
                    />
                    {touched.about && errors.about && (
                      <Text style={styles.errorText}>{errors.about}</Text>
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
