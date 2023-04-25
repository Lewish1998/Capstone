import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';


const ContactPage = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={require("../images/Oot'N'Aboot-logos_black.png")} style={{position:'absolute', width: 120, height: 80, left:110, bottom:20}}/>
      </View>
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
    backgroundColor:'#ffffff'
  }
})

export default ContactPage;
