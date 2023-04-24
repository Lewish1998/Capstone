import React, { useState } from 'react'
import { Link } from "react-router-native";
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const Params = () => {

  

  return (

  <View style={styles.container}>

    <TouchableOpacity style={styles.burgerIcon}>
      <Link  to="/paramaters"><Text style={styles.burgerIconLine}>Paramaters</Text></Link>
    </TouchableOpacity>

    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  content: {
    fontSize: 24,
    marginBottom: 20,
  },

  // Edit here for Nav styling
  
  menuItem: {
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  menuItemText: {
    fontSize: 24,
    padding:5
  },
  burgerIcon: {
    position: 'absolute',
    top: 70,
    left: 100,
    width: 40,
    height: 40,
  },
  burgerIconLine: {
    width: 36,
    height: 25,
    backgroundColor: 'black',
    marginBottom: 7,
  },
});

export default Params
