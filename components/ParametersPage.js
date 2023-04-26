import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Pressable, TextInput, Button, TouchableOpacity, Animated } from 'react-native'
import { Link } from "react-router-native";
import { useRef } from 'react';



const ParametersPage = ({ passHandlePress, clickRefresh,user,patchUser,setUserLocation }) => {
  
  // Unnecessary animation 
  // const fadeAnim = useRef(new Animated.Value(0)).current;
  // const fadeIn = () => {
  //   Animated.timing(fadeAnim, {
  //     toValue: 1,
  //     duration: 2000,
  //     useNativeDriver: true,
  //   }).start();
  // };

  // useEffect(() => {
  //   fadeIn();
  // }, []);


  const [inputValue, setInputValue] = useState('');

  const handleOnChange = (text) => {
    setInputValue(text)
  }

  const handleOnPress = () => {
    const updatedUser={...user}
    updatedUser.location=inputValue
    setUserLocation(updatedUser.location)
    patchUser(updatedUser, user.id); 
    clickRefresh()
  }

  return (
      <View style={styles.container}>
        {/* <Animated.View style={[styles.fadingContainer, {opacity:fadeAnim}]}> */}
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
  }
})

export default ParametersPage;
