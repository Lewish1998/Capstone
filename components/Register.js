
import { Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-native";

const Register = ({userPost, getUsers}) => {
    const navigate = useNavigate();
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [location, setLocation] = useState("");
    const[name, setName] = useState("");


    
    
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
            getUsers();
            navigate("/login");
            
        }
    }

    return (
        <View style={styles.container}>
          {/* <Image style={styles.image} source={require("./assets/log2.png")} /> */}
          
          
          
          
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
     
              onChangeText={(data) => setLocation(data.toLowerCase())}
            />
          </View>
       
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(data) => setRegPassword(data.toLowerCase())}
            />
          </View>


           <TouchableOpacity style={styles.loginBtn} onPress={handleRegister} >
            <Text> Register</Text>
           </TouchableOpacity>
            
          <Link to="/login" style={styles.loginBtn} >
        <Text style={styles.loginText}>Back to Login</Text>
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
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
      },
      TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
       
      },
      forgot_button: {
        height: 30,
        marginBottom: 30,
      },
      loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF1493",
      },
    });

export default Register;