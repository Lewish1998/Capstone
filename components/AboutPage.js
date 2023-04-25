import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'



const AboutPage = () => {
  return (
  <View style={styles.container}>
      <View>
      <Image source={require("../images/Oot'N'Aboot-logos_black.png")} style={{position:'absolute', width: 120, height: 80, left:110, bottom:20}}/>
      </View>
      <Text style={{fontSize:36, textAlign:'center', paddingBottom:20}}>About Page</Text>
      <Text style={{fontSize:24}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
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

export default AboutPage
