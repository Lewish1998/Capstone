import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const AboutPage = () => {
  return (
   <View style={styles.container}>
      <Text style={{fontSize:36, textAlign:'center', paddingBottom:20}}>About Page</Text>
      <Text style={{fontSize:24}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
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

  // const styles = StyleSheet.create({
  //   cardContainer: {
  //     display: 'flex',
  //     width: 400,
  //     height: 700,
  //     top:120,
  //     borderTopLeftRadius: 20,
  //     borderTopRightRadius: 20,
  //     backgroundColor: '#666666',
  //     shadowOffset:{width:10, height:15},
  //     shadowColor: 'black',
  //     shadowOpacity: 0.05,
  //     shadowRadius: 8,
  //     borderRadius: 20,
  //   },
})

export default AboutPage
