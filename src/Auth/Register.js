import React from "react";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import { Container, CheckBox, Button, Item, Input, Icon } from "native-base";
import { BlurView } from "expo-blur";
import img from "../../assets/images/background.jpg";
import logo from "../../assets/images/netflix.png";
import { useFormik } from "formik";
import * as yup from "yup";
import { Toast } from "../utils/Toast";
import { auth, db } from "../config/fire";

const Register = ({ navigation }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email().required("email must be required"),
      password: yup.string().min(8).required("password must be required"),
      confirmpassword: yup
        .string()
        .required("password must be required")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: (data, actions) => {
      auth
        .createUserWithEmailAndPassword(data.email, data.password)
        .then((user) => {
          console.log(user);
          db.collection("users").add({
            users: data.email,
          });
          navigation.replace("Home");
        })
        .catch((error) => {
          Toast(error.message);
        });
      actions.resetForm({
        email: "",
        password: "",
        confirmpassword: "",
      });
    },
  });

  return (
    <View style={styles.container}>
      <ImageBackground source={img} style={styles.image} blurRadius={0.1}>
        <View style={styles.content}>
          <BlurView intensity={130} style={styles.content} tint="dark">
            <Image style={styles.tinyLogo} source={logo} />

            <Item regular style={styles.input_item}>
              <Input
                placeholder="Email"
                onBlur={formik.handleBlur("email")}
                value={formik.values.email}
                onChangeText={formik.handleChange("email")}
              />
              {formik.errors.email && formik.touched.email ? (
                <Icon name="information-circle" style={{ color: "red" }} />
              ) : null}
            </Item>
            {formik.errors.email && formik.touched.email ? (
              <Text style={styles.error}>{formik.errors.email}</Text>
            ) : null}

            <Item regular style={styles.input_item}>
              <Input
                placeholder="Password"
                secureTextEntry
                value={formik.values.password}
                onChangeText={formik.handleChange("password")}
              />
              {formik.errors.password && formik.touched.password ? (
                <Icon name="information-circle" style={{ color: "red" }} />
              ) : null}
            </Item>

            {formik.errors.password && formik.touched.password ? (
              <Text style={styles.error}>{formik.errors.password}</Text>
            ) : null}

            <Item style={styles.input_item}>
              <Input
                placeholder="Confirm Password"
                secureTextEntry
                value={formik.values.confirmpassword}
                onChangeText={formik.handleChange("confirmpassword")}
              />
              {formik.errors.confirmpassword &&
              formik.touched.confirmpassword ? (
                <Icon name="information-circle" style={{ color: "red" }} />
              ) : null}
            </Item>
            {formik.errors.confirmpassword && formik.touched.confirmpassword ? (
              <Text style={styles.error}>{formik.errors.confirmpassword}</Text>
            ) : null}

            <Button block style={styles.button} onPress={formik.handleSubmit}>
              <Text style={styles.button_text}> Sign up </Text>
            </Button>
            {/* <View style={styles.footer}>
              <CheckBox checked={true} color="red" />
              <Text style={styles.remember}>Remember my login</Text>
            </View> */}

            <View style={styles.footer}>
              <Text style={styles.remember}>Already on Netflix? </Text>
              <Text
                style={styles.link}
                onPress={() => navigation.navigate("Login")}
              >
                Sign In
              </Text>
            </View>
          </BlurView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    backgroundColor: "#000",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    height: 700,
    borderRadius: 14,
  },
  tinyLogo: {
    width: 55,
    elevation: 10,
    height: 100,
    marginTop: 50,
  },
  input_item: {
    marginTop: 25,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "#fff",
    borderRadius: 6,
    height: 60,
  },
  button: {
    backgroundColor: "red",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 40,
    borderRadius: 6,
    height: 60,
    elevation: 10,
  },
  button_text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Roboto-Thin",
  },
  error: {
    color: "red",
    marginLeft: 150,
    marginTop: 5,
  },
  footer: {
    flexDirection: "row",
    marginTop: 30,
  },
  remember: {
    color: "#fff",
    fontSize: 17,
    marginLeft: 20,
    marginTop: -4,
  },
  link: {
    fontWeight: "bold",
    color: "red",
    fontSize: 18,
    marginTop: -3,
  },
});
