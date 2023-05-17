import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import React, { useState, useEffect, useContext, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import themeContext from "../config2/themeconteks";
import { firebase } from "../config";
import { Feather, Octicons } from "@expo/vector-icons";
import { EventRegister } from "react-native-event-listeners";

const Profile = ({ navigation }) => {
  const theme = useContext(themeContext);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState({});
  // const navigation = useNavigation();

  const [mode, setMode] = useState(
    theme.background === "#62ccb7" ? false : true
  );
  const statusTheme = useRef(mode);

  const getData = async () => {
    await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
        } else {
          console.log("user does not exist");
        }
      });

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <Image
          source={require("../assets/profile.jpg")}
          style={{
            width: 200,
            height: 200,
            alignSelf: "center",
            marginTop: 50,
            borderRadius: 100,
            borderColor: theme.color,
            borderWidth: 5,
          }}
        />
        <Text
          onPress={() => {
            console.log(navigation.getState());
          }}
          style={{
            fontSize: 30,
            alignSelf: "center",
            marginTop: 20,
            color: theme.color,
            fontWeight: "bold",
          }}
        >
          Profile
        </Text>
        <Text
          style={{
            fontSize: 20,
            alignSelf: "center",
            marginTop: 20,
            color: theme.color,
            fontWeight: "bold",
          }}
        >
          {loading
            ? "Loading..."
            : name?.firstName[0]?.toUpperCase() +
              name?.firstName?.slice(1) +
              " " +
              name?.lastName[0]?.toUpperCase() +
              name?.lastName?.slice(1)}
        </Text>
        <Text
          style={{
            fontSize: 15,
            alignSelf: "center",
            color: theme.color,
          }}
        >
          {loading ? "Loading..." : name?.email}
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: theme.background === "#62ccb7" ? "black" : "white",
            width: "80%",
            height: 40,
            borderRadius: 5,
            alignSelf: "center",
            marginTop: 20,
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "row",
          }}
          ref={statusTheme}
          onPress={() => {
            setMode(!mode);
            EventRegister.emit("changeTheme", !mode);
          }}
        >
          <Text
            style={{
              fontSize: 15,
              alignSelf: "center",
              color: theme.background,
            }}
          >
            Change Theme
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Feather
              size={theme.background === "#62ccb7" ? 20 : 10}
              name="sun"
              color={theme.background === "#62ccb7" ? "white" : "black"}
            />
            <Switch
              value={mode}
              onValueChange={(value) => {
                setMode(value);
                EventRegister.emit("changeTheme", value);
              }}
              style={{
                marginHorizontal: 10,
              }}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              ref={statusTheme}
            />
            <Octicons
              size={theme.background === "#62ccb7" ? 10 : 20}
              name="moon"
              color={theme.background === "#62ccb7" ? "white" : "black"}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#f56262",
            width: "80%",
            height: 40,
            borderRadius: 5,
            alignSelf: "center",
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => firebase.auth().signOut()}
        >
          <Text
            style={{
              fontSize: 15,
              color: "#540505",
              fontWeight: "700",
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 10,
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <Feather
            name="home"
            size={24}
            color={navigation.getState().index === 0 ? "#62ccb7" : "#b8b9ba"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Feather
            name="user"
            size={24}
            color={navigation.getState().index === 1 ? "#62ccb7" : "#b8b9ba"}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
