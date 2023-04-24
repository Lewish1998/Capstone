import React, { useState } from 'react'
import { Text, View, StyleSheet, Pressable, TextInput, Button, TouchableOpacity } from 'react-native'
import { Link } from "react-router-native";
const ParametersPage = ({ passHandlePress, clickRefresh,user,patchUser,setUserLocation }) => {

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
    <TouchableOpacity>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter city"
          value={inputValue}
          onChangeText={handleOnChange}
        />
      </View>
      <Link to='/'color="" title='submit' onPress={handleOnPress}><Text>Submit</Text></Link>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
    container:{
      borderWidth:2,
      borderRadius:20,
      top:120,
      height:100,
      width:400,
      backgroundColor:'#ffffff'
      },
    input: {
      // flex: 1,
      zIndex:100,
      fontSize: 18,
      paddingLeft: 10,
      backgroundColor: '#fff',
      top: 50,
    },
    button: {
      
    },
})

export default ParametersPage;
