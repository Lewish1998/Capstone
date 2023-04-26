import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Params from '../Params';
import NavBar from '../NavBar';

const ContactPage = () => {
  return (
    <View>
      <TouchableOpacity style={styles.icon}>
        <Params/>
        <NavBar/>
      </TouchableOpacity>

    <View style={styles.container}>
      <View>
        <Image source={require("../images/Oot'N'Aboot-logos_black.png")} style={{position:'absolute', width: 120, height: 80, left:110, bottom:20}}/>
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
    height: 600,
    top: 120,
    padding:10,
    backgroundColor:'#ffffff'
  },
  icon: {
    position: 'absolute',
    left: 180,
    zIndex: 15000,
  },
})

export default ContactPage;
