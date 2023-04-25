import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { Link } from "react-router-native";


const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    fetch("http://127.0.0.1:8080/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  const handlePress = () => {
    const userToLogin = users.filter((user) => user.email === email.toLowerCase());
    if (userToLogin.length > 0) {
      if (userToLogin[0].password === password.toLowerCase()) {
        setUser(userToLogin[0]);
      } else {
        alert("Password is Incorrect");
      }
    } else {
      alert("Email is wrong, have you registered?");
    }
  };

  return (
    <View style={styles.container}>
      {/* <Image style={styles.image} source={require("./assets/log2.png")} /> */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email.toLowerCase())}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password.toLowerCase())}
        />
      </View>
      <TouchableOpacity onPress={() => console.log("Forgot Password")}>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      <Link to="/" style={styles.loginBtn} onPress={handlePress}>
        <Text style={styles.loginText}>LOGIN</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    top: 500,
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#ffffff",
    borderRadius: 30,
    width: 200,
    height: 45,
    marginBottom: 20,

  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: 100,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
export default LoginPage;