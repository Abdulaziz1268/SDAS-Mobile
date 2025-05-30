import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from "react-native"

import { useTheme } from "../../Contexts/ThemeContext"
import AppButton from "../../components/AppButton"
import Swiper from "react-native-swiper"
import {
  cardiologist,
  dentist,
  generalDoctor,
  neurology,
  pediatric,
  surgery,
  arrow,
  corect,
  phone,
  message,
  calendar,
  blueMessage,
  use,
  man,
  man1,
  woman,
  doc1,
  doc18,
  profile,
} from "../../../assets/index"
import { useEffect, useState } from "react"
import { apiWithPatientAuth } from "../../config/api"

const servicesData = [
  {
    image: surgery,
    title: "Surgery",
    subtitle:
      "Focused on digestive system health.Providing expert care for your needs",
    arrow,
  },
  {
    image: neurology,
    title: "Neurology",
    subtitle:
      "Focused on digestive system health.Providing expert care for your needs",
    arrow,
  },
  {
    image: pediatric,
    title: "Pediatric",
    subtitle:
      "Focused on digestive system health.Providing expert care for your needs",
    arrow,
  },
  {
    image: dentist,
    title: "Dentist",
    subtitle:
      "Focused on digestive system health.Providing expert care for your needs",
    arrow,
  },
  {
    image: generalDoctor,
    title: "General Doctor",
    subtitle:
      "Focused on digestive system health.Providing expert care for your needs",
    arrow,
  },
  {
    image: cardiologist,
    title: "Cardiology",
    subtitle:
      "Focused on digestive system health.Providing expert care for your needs",
    arrow,
  },
]

const choice = [
  {
    image: corect,
    title: "Trusted by Patients",
    subtitle: "booking@smartdoctor.com",
  },
  {
    image: corect,
    title: "Specialist Doctors",
    subtitle: "specialist@smartdoctorcom",
  },
  {
    image: corect,
    title: "24/7 Availability",
    subtitle: "support@smartdoctor.com",
  },
  {
    image: corect,
    title: "Instant Booking",
    subtitle: "booking@smartdoctor.com",
  },
]

const Userscomment = [
  {
    name: "Khadar",
    image: man,
    comment:
      "Booking an appointment was so easy and fast. Really impressed with the service!",
  },
  {
    name: "Bashka",
    image: man1,
    comment:
      "I got connected with a doctor in just minutes. Very efficient and reliable system.",
  },
  {
    name: "Maryan",
    image: doc18,
    comment:
      "Excellent experience! I love how smooth and simple everything was.i will say keep going.",
  },
  {
    name: "Casho",
    image: woman,
    comment:
      "The reminders and updates kept me on track with my health. Great job! for all of you.",
  },
  {
    name: "Raxmo",
    image: doc1,
    comment:
      "I didn’t have to wait long at all. Everything was well-organized and user-friendly.",
  },
  {
    name: "Maxamud",
    image: man,
    comment:
      "A game-changer for busy people. I can manage my appointments anytime, anywhere.",
  },
  {
    name: "C/Lahi",
    image: man1,
    comment:
      "Very professional doctors and smooth booking process. Highly recommended!",
  },
  {
    name: "Zaki",
    image: profile,
    comment:
      "Simple, fast, and trustworthy. It’s the future of healthcare access of all our country!",
  },
]

const Home = () => {
  const { colors } = useTheme()
  const [doctors, setDoctors] = useState([])

  const getDoctors = async () => {
    try {
      // const token = await AsyncStorage.getItem("Ptoken")
      // if (!token) throw new Error("no authorization token found!")

      const api = await apiWithPatientAuth()
      const { data } = await api.get("user/api/get-doctors")

      if (data.success) {
        console.log(data)
        setDoctors(data.doctors)
      }
    } catch (error) {
      if (error.response?.data?.message) {
        console.log(error.response?.data?.message)
        ToastAndroid.show(error.response?.data?.message, ToastAndroid.SHORT)
      } else {
        console.log(error.message)
      }
    }
  }

  useEffect(() => {
    getDoctors()
  }, [])

  return (
    <View style={[styles.container, { backgroundColor: colors.lightblue }]}>
      <ScrollView>
        <Text style={[styles.header, { color: colors.blue }]}>
          Doctor Appointment
        </Text>
        <View
          style={[
            styles.Hero,
            { backgroundColor: colors.white, borderRadius: 10, padding: 20 },
          ]}
        >
          <Text
            style={[
              styles.heroHeader,
              {
                color: colors.blue,
                marginVertical: 20,
              },
            ]}
          >
            Book Your Doctor Appointment Online
          </Text>
          <Text
            style={[
              styles.heroText,
              {
                marginBottom: 20,
              },
            ]}
          >
            A healthcare Tomorrow Starts Today Schedule Your Appointment. Your
            wellness, Our Expertise. Set Up Your Appointment Today.
          </Text>
          <AppButton
            style={[
              styles.heroButton,
              {
                backgroundColor: colors.lightblue,

                borderColor: colors.blue,
              },
            ]}
            title="Explore"
            textStyle={{ color: colors.blue }}
          />
        </View>
        <View style={{ marginVertical: 30 }}>
          <Text style={styles.header1}>Why Patients Choose Us</Text>
          <Text style={[styles.header2, { color: colors.blue }]}>
            Our Services
          </Text>
          <Text style={[styles.header3]}>
            From breathtaking destinations to seamless travel planning, discover
            how we make every journey unforgettable.
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 30,
              marginVertical: 30,
              justifyContent: "space-evenly",
            }}
          >
            {servicesData.map((item, index) => (
              <Pressable
                key={index}
                style={[
                  styles.serviceList,
                  { borderColor: colors.blue, backgroundColor: colors.white },
                ]}
              >
                <Image
                  source={item.image}
                  style={{ width: 50, height: 50, marginVertical: 10 }}
                />
                <Text style={{ fontWeight: "600", marginBottom: 10 }}>
                  {item.title}
                </Text>
                <Text style={{ textAlign: "center", color: colors.gray }}>
                  {item.subtitle}
                </Text>
                <Image
                  source={item.arrow}
                  style={{ width: 70, height: 25, marginTop: 20 }}
                />
              </Pressable>
            ))}
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.header1}>Meet Our Leading Medical Experts</Text>
          <Text style={[styles.header2, { color: colors.blue }]}>
            Top Doctors
          </Text>
          <Text style={[styles.header3]}>
            Explore our roster of highly qualified, experienced doctors
            dedicated to delivering exceptional healthcare.
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 10,
              justifyContent: "space-evenly",
              marginVertical: 30,
            }}
          >
            {doctors.map((item, index) => (
              <Pressable
                key={index}
                style={[
                  styles.topDoctorContainer,
                  { backgroundColor: colors.white, height: 300 },
                ]}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: "90%",
                    height: "60%",
                    marginTop: 10,
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    gap: 5,
                    alignItems: "flex-start",
                    width: "95%",
                  }}
                >
                  <Text
                    style={{ color: item.available ? colors.green : "yellow" }}
                  >
                    {item.available ? "Available" : "Not Available"}
                  </Text>
                  <Text>{item.name}</Text>
                  <Text
                    style={{
                      borderWidth: 1,
                      borderColor: colors.blue,
                      paddingHorizontal: 5,
                      borderRadius: 5,
                      color: colors.blue,
                    }}
                  >
                    {item.speciality}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
          <TouchableOpacity
            style={{
              width: 150,
              height: 50,
              borderWidth: 2,
              borderColor: colors.blue,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              marginBottom: 30,
              backgroundColor: colors.white,
            }}
          >
            <Text style={{ fontSize: 20, color: colors.blue }}>Learn More</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contact}>
          <Text style={{ textAlign: "center" }}>
            Contact Us For Any Help or Service. Let's get Started.
          </Text>
          <View
            style={{
              backgroundColor: colors.green,
              padding: 20,
              marginTop: 30,
            }}
          >
            <Text style={{ marginBottom: 20, fontSize: 25 }}>
              Why Choose Us?
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 20,
                justifyContent: "space-evenly",
              }}
            >
              {choice.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "95%",
                    backgroundColor: colors.darkgreen,
                    borderRadius: 10,
                    height: 100,
                  }}
                >
                  <Image
                    source={item.image}
                    style={{ width: 50, height: 50, marginHorizontal: 10 }}
                  />
                  <View>
                    <Text style={{ color: colors.white, fontWeight: "700" }}>
                      {item.title}
                    </Text>
                    <Text style={{ color: colors.white }}>{item.subtitle}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
          <View style={{ backgroundColor: colors.blue, padding: 20 }}>
            <Text style={{ color: colors.white, fontSize: 25 }}>
              Emergency?
            </Text>
            <Text style={{ color: colors.white, fontSize: 25 }}>
              Contact Us.
            </Text>
            <Text style={{ color: colors.white, marginTop: 20 }}>
              Have questions or need assistance? We're here to help! Feel freeto
              reach out to us anytime, and we'll get back to you as soon as
              possible.
            </Text>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Image
                source={phone}
                style={{ width: 50, height: 50, marginRight: 10 }}
              />
              <View>
                <Text style={{ color: colors.white }}>Phone Number</Text>
                <Text style={{ color: colors.white }}>subtitle</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Image
                source={message}
                style={{ width: 50, height: 50, marginRight: 10 }}
              />
              <View>
                <Text style={{ color: colors.white }}>Email</Text>
                <Text style={{ color: colors.white }}>subtitle</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            flexDirection: "column",
            marginVertical: 30,
          }}
        >
          <Text
            style={{ textAlign: "center", fontSize: 25, fontWeight: "700" }}
          >
            An easy-to-use appointment scheduling app for doctors
          </Text>
          {[
            {
              image: calendar,
              title: "Create your practice’s Booking Page",
              subtitle: `Display your medical services online. Customize your Booking Page with your logo, contact details, reviews, and more.
Share specialists’ availability and let patients confirm their appointments in minutes.`,
            },
            {
              image: use,
              title: "Book appointments from your website",
              subtitle: `Add a ‘Book Now’ button to your practice’s website. Enable new and existing patients to self-book right away, without needing to contact your office.
Connect Setmore with Squarespace, WordPress, and more.`,
            },
            {
              image: blueMessage,
              title: "Set up automatic appointment confirmations",
              subtitle: `Attend to more patients while Setmore automates booking confirmations via email.
Personalize alerts with important pre-appointment information so visitors come prepared.`,
            },
          ].map((item, index) => (
            <Pressable
              key={index}
              style={{
                alignItems: "center",
                elevation: 3,
                backgroundColor: colors.white,
                marginVertical: 20,
                borderWidth: 1,
                borderColor: colors.gray,
                borderRadius: 20,
                padding: 10,
              }}
            >
              <Image
                source={item.image}
                style={{ width: 50, height: 50, marginVertical: 20 }}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "700",
                  marginBottom: 10,
                }}
              >
                {item.title}
              </Text>
              <Text style={{ textAlign: "center" }}>{item.subtitle}</Text>
            </Pressable>
          ))}
        </View>
        <View style={{ backgroundColor: colors.blue, padding: 40 }}>
          <Text
            style={{ color: colors.white, fontSize: 25, fontWeight: "900" }}
          >
            Book An Appointment With 100+ Trusted Doctors
          </Text>
          <TouchableOpacity
            style={{
              width: 120,
              height: 40,
              backgroundColor: colors.white,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              marginTop: 20,
            }}
          >
            <Text
              style={{ fontSize: 20, color: colors.blue, fontWeight: "700" }}
            >
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 30 }}>
          <Text style={styles.header1}>
            What Our Patients Say About Our Top Doctors
          </Text>
          <Text style={[styles.header2, { color: colors.blue }]}>
            Trusted by Thousands
          </Text>
          <Text style={styles.header3}>
            Discover how our leading doctors provide expert, compassionate care
            tailored to every patient.
          </Text>
          <View
            style={{
              // justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <Swiper
              autoplay={true}
              autoplayTimeout={3}
              showsPagination={true}
              style={{ height: 350 }}
              containerStyle={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {Userscomment.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.slide,
                    {
                      backgroundColor: colors.white,
                      borderColor: colors.gray,
                      width: "100%",
                    },
                  ]}
                >
                  <Image
                    source={item.image}
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: 45,
                      marginBottom: 20,
                    }}
                  />
                  <Text style={styles.commentText}>"{item.comment}"</Text>
                  <Text
                    style={{
                      color: colors.blue,
                      fontWeight: "700",
                      fontSize: 18,
                      marginTop: 20,
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              ))}
            </Swiper>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "900",
    margin: 10,
  },
  Hero: {
    elevation: 10,
    padding: 10,
  },
  heroButton: {
    width: 125,
    height: 45,
    borderWidth: 2,
    borderRadius: 10,
  },
  heroHeader: {
    fontSize: 30,
    fontWeight: "700",
  },
  header1: {
    textAlign: "center",
  },
  header2: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "900",
    marginVertical: 10,
  },
  header3: {
    textAlign: "center",
  },
  serviceList: {
    borderWidth: 1,
    width: "45%",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 20,
  },
  topDoctorContainer: {
    width: "45%",
    elevation: 5,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    gap: 10,
  },
  contact: {
    alignItems: "center",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 40,
  },
})

export default Home
