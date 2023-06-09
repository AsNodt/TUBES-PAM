import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState } from "react";
import { firebase } from "../config";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  registerUser = async (email, password, firstName, lastName) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: "https://tubes-pam-2a386.firebaseapp.com",
          })
          .then(() => {
            alert("Success!");
          })
          .catch((error) => {
            alert(error.message);
          })
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({
                firstName,
                lastName,
                email,
              });
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <View style={[{ flex: 1, backgroundColor: "#5755CF" }]}>
      <Image
        source={{
          uri: "https://i.postimg.cc/90Q4p7Qk/20230508-192631.png",
        }}
        style={styles.imageLogin}
      />
      <View style={styles.container}>
        <Text style={styles.textTitle}>DAFTAR</Text>
        <View style={{ marginTop: 20 }}>
          <TextInput
            style={styles.textInput}
            placeholder="  First Name"
            onChangeText={(firstName) => setFirstName(firstName)}
            autoCorrect={false}
          />
          <TextInput
            style={styles.textInput}
            placeholder="  Last Name"
            onChangeText={(lastName) => setLastName(lastName)}
            autoCorrect={false}
          />
          <TextInput
            style={styles.textInput}
            placeholder="  Email"
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.textInput}
            placeholder="  Password"
            onChangeText={(password) => setPassword(password)}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          onPress={() => registerUser(email, password, firstName, lastName)}
          style={styles.button}
        >
          <Text style={{ fontWeight: "bold", fontSize: 22 }}>DAFTAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  imageLogin: {
    marginTop: 70,
    alignSelf: "center",
    width: 150,
    height: 150,
  },
  textTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000000",
  },
  textInput: {
    width: 250,
    height: 50,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    alignSelf: "center",
    fontWeight: "bold",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 20,
    height: 50,
    width: 250,
    backgroundColor: "#026efd",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
