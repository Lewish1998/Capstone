import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const ParametersPage = () => {
  return (
    <View style={styles.container}>
        <Text style={{fontSize:36, textAlign:'center', paddingBottom:20}}>Paramaters</Text>
      
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

export default ParametersPage;
