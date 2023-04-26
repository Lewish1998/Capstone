
import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import { Link } from "react-router-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLocationPin } from '@fortawesome/free-solid-svg-icons';
import Params from '../Params';
import NavBar from '../NavBar';

const ParametersPage = ({ passHandlePress, clickRefresh,user,patchUser,setUser }) => {


  const [inputValue, setInputValue] = useState('');

  const handleOnChange = (text) => {
    setInputValue(text)
  }

  const handleOnPress = () => {
    const updatedUser={...user}
    updatedUser.location=inputValue

    setUser(updatedUser)
    patchUser(updatedUser, user.id); 
    clickRefresh()
  }

  return (

      <View style={styles.container}>
          <Text style={styles.text}>Change Current Location...</Text>


        <TextInput
          style={styles.input}
          placeholder="Enter city"
          value={inputValue}
          onChangeText={handleOnChange}
        />


    
    <View>
      <Text style={styles.location}>
        <View>
          <FontAwesomeIcon icon={faLocationPin} size={22} color={'#6026F0'}/>
        </View>
      {user.location}
    </Text>
    <TouchableOpacity style={styles.icon}>
      <Params/>
      <NavBar/>
    </TouchableOpacity>

    <View style={styles.container}>
        
        <View>
          <Image source={require("../images/Oot'N'Aboot-logos_black.png")} style={{position:'absolute', width: 120, height: 80, left:120, bottom: 10}}/>
        </View>
        
        
        <Text style={styles.text}>Change Current Location...</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter city"
            value={inputValue}
            onChangeText={handleOnChange}
          />


        <TouchableOpacity title='submit'>
          <Link  to="/" onPress={handleOnPress}><Text style={{position:'absolute', fontSize:20, left:270, borderRadius:3}}>Submit</Text></Link>
        </TouchableOpacity>
        {/* </Animated.View> */}
      </View>
    </View>
    </View>

  )
}


const styles = StyleSheet.create({
    container:{
      borderWidth:2,
      borderRadius:20,
      width: 360,
    height: 100,
    top: 120,
      backgroundColor:'#ffffff'
      },
    input: {
      zIndex:100,
      fontSize: 18,
      paddingLeft: 10,
      backgroundColor: '#fff',
      top: 20,
      width: 100
    },
  text:{
    fontSize:20,
    color:'#111111',
    textAlign:'center',
    textDecorationLine:'underline',
  },
  location: {
    position: 'absolute',
    top: 80,
    left: 10,
    fontSize: 22,
    color: "white",
    fontWeight:'bold',
    paddingLeft:5
  },
  icon: {
    position: 'absolute',
    left: 180,
    zIndex: 15000,
  },
})

export default ParametersPage;
