import React, { useState } from 'react'
import { Text, View, StyleSheet, Pressable, TextInput, Button, TouchableOpacity } from 'react-native'

const ParametersPage = () => {

  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (text) => {
    setInputValue(text)
    onInputChange(text)
  }

  return (
    // <View style={styles.container}>
    //     <Text style={{fontSize:36, textAlign:'center', paddingBottom:20}}>Paramaters</Text>
      
    // </View>

    <TouchableOpacity>
      {/* <View style={styles.inputContainer}> */}
      <TextInput style={styles.input} placeholder="Enter city" value={inputValue} onChangeText={(text) => setInputValue(text)}/>
      {/* <Pressable><Text>Submit</Text></Pressable> */}
      {/* </View> */}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  // container:{
  //   borderWidth:2,
  //   borderRadius:20,
  //   top:120,
  //   height:700,
  //   width:400,
  //   padding:10,
  //   backgroundColor:'#ffffff'
  //   },
    inputContainer: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: 5,
      margin: 10,
      padding: 5,
      top: 50,
      width: '100%',
    },
    input: {
      // flex: 1,
      zIndex:100,
      fontSize: 18,
      paddingLeft: 10,
      backgroundColor: '#fff',
      top: 50,
    },
})

export default ParametersPage;
