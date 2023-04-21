import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

const ContactPage = () => {
  return (
    <View style={styles.container}>
      <Text>Contact Page</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    borderWidth:2,
    borderRadius:20,
    top:150,
    height:600,
    padding:10,
    backgroundColor:'#ffffff'
  }
})

export default ContactPage;
