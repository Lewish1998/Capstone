import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

const AccountSettings = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize:36, textAlign:'center', paddingBottom:20}}>Settings Page</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    borderWidth:2,
    borderRadius:20,
    top:120,
    height:700,
    width:400,
    padding:10,
    backgroundColor:'#ffffff'
  }
})

export default AccountSettings;
