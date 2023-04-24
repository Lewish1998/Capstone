import React, { useState } from 'react'
import { Link } from "react-router-native";
import { Text, View, StyleSheet, Pressable, TextInput, Button, TouchableOpacity } from 'react-native'

const ParametersPage = ({ passHandlePress }) => {

  const [inputValue, setInputValue] = useState('');

  const handleOnChange = (text) => {
    setInputValue(text)
  }

  const handleOnPress = () => {
    passHandlePress(inputValue)
    console.log(inputValue)
  }

  return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter city"
          value={inputValue}
          onChangeText={handleOnChange}
        />

        <TouchableOpacity title='submit' onPress={handleOnPress}>
          <Link  to="/"><Text>Submit</Text></Link>
        </TouchableOpacity>
      </View>

      
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
