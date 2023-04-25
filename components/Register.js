
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native'
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-native";

const Register = ({userPost, getUsers, clickRefresh}) => {
    const navigate = useNavigate();
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [location, setLocation] = useState("");
    const[name, setName] = useState("");

   
  const locationUppercase = (data) => {
    let newLocation =`${data.charAt(0).toUpperCase()}${data.slice(1)}`
    setLocation(newLocation);
   
  }
// console.log(user[4])

   

    const handleRegister = () => {
     
        if(regEmail.length === 0 || regPassword.length === 0 || location.length === 0 || name.length === 0 ){
            alert("Please Complete All Fields")
        } else{
            const payload = {
                name: name,
                password: regPassword,
                email: regEmail,
                location: location,
                user_interested: [],
                user_going: [],
                user_contact: []
                };

            userPost(payload);
            clickRefresh();
            getUsers()

            navigate("/login");
            
        }
    }

    return (
        <View style={styles.container}>
        <Image source={require("../images/Oot'N'Aboot-logos.jpeg")} 
      style={{position:'absolute', width: 150, height: 150, left: 48, bottom: 230, borderRadius: 15}}/>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Name"
              placeholderTextColor="#003f5c"
              onChangeText={(data) => setName(data.toLowerCase())}
              
            />
          </View>
          
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email"
              placeholderTextColor="#003f5c"
              onChangeText={(data) => setRegEmail(data.toLowerCase())}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Location"
              placeholderTextColor="#003f5c"
              onChangeText={(data) => locationUppercase(data.toLowerCase())}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(data) => setRegPassword(data)}
            />
          </View>


          <TouchableOpacity style={styles.loginBtn} onPress={handleRegister}>
            <Text style={styles.loginText}> Register</Text>
          </TouchableOpacity>
            
          <Link to="/login" style={styles.loginBtn} >
        <Text style={styles.loginText}>Back</Text>
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
        width: 240,
        height: 45,
        marginBottom: 20,
      },
      TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        width: "100%",
      },
      forgot_button: {
        height: 30,
        marginBottom: 30,
      },
      loginBtn: {
        width: 120,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        backgroundColor: "#FF1493",
      },
      loginText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 20,
      },
    });

export default Register;