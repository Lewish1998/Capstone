
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default ContactPage
