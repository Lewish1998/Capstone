import React from 'react';
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigate } from "react-router-native";

const AccountSettings = ({user, patchUser, clickRefresh}) => {
  const navigate = useNavigate();
  const [updateEmail, setUpdateEmail] = useState(user.email);
  const [updatePassword, setUpdatePassword] = useState(user.password);
  const [updateLocation, setUpdateLocation] = useState(user.location);
  const[updateName, setUpdateName] = useState(user.name);

  const locationUp = (data) => {
    let newLocation =`${data.charAt(0).toUpperCase()}${data.slice(1)}`
    setUpdateLocation(newLocation);
   
  }
  const nameUp = (data) => {
    let newName =`${data.charAt(0).toUpperCase()}${data.slice(1)}`
    setUpdateName(newName);
   
  }
  
  const handleAccountUpdate= () => {
    if(updateEmail.length === 0 || updatePassword.length === 0 || updateLocation.length === 0 || updateName.length === 0 ){
        alert("Please Complete All Fields")
    } else{
       user.name = updateName
       user.email = updateEmail
       user.location = updateLocation
       user.password = updatePassword 

      patchUser(user,user.id)
      clickRefresh(); 
      navigate("/");

    }
}


  return (
    
    <View style={styles.container}>
      <View>
        <Image source={require("../images/Oot'N'Aboot-logos_black.png")} style={{position:'absolute', width: 120, height: 80, left:110, bottom:20}}/>
      </View>
      <Text style={{fontSize:36, textAlign:'center', paddingBottom:20}}>Update Details</Text>
      <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder={user.name}
              placeholderTextColor="#003f5c"
              onChangeText={(data) => nameUp(data.toLowerCase())}
            />
          </View>
          
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder={user.email}
              placeholderTextColor="#003f5c"
              onChangeText={(data) => setUpdateEmail(data.toLowerCase())}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder={user.location}
              placeholderTextColor="#003f5c"
              onChangeText={(data) => locationUp(data.toLowerCase())}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(data) => setUpdatePassword(data)}
            />
          </View>


          <TouchableOpacity style={styles.loginBtn} onPress={handleAccountUpdate} >
            <Text style={styles.loginText}> Update</Text>
          </TouchableOpacity>




    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    borderWidth:2,
    borderRadius:20,
    width: 360,
    height: 600,
    top: 120,
    padding:10,
    backgroundColor:'#ffffff',

  },
  inputView: {
    borderWidth:2,
    borderRadius:20,
    width: 300,
  height: 50,
    backgroundColor:'#ffffff',
    margin:5,
    justifyContent:"center"
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    width: "100%",
    borderColor:"black",
    borderRadius:1
  },loginBtn: {
    width: 120,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    backgroundColor: "#FF1493",},
    loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    // marginRight:5,
    
  },
})

export default AccountSettings;
