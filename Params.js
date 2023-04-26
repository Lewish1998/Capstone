import React, { useState } from 'react'
import { Link } from "react-router-native";
import { Text, View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeartBroken, faSliders } from '@fortawesome/free-solid-svg-icons';

const Params = () => {

  

  return (

  <View style={styles.container}>

    <TouchableOpacity style={styles.paramsIcon}>
      <View>
        <Link to="/paramaters" underlayColor={"transparent"}>
          <FontAwesomeIcon icon={faSliders} size={30}/>
        </Link>
      </View>
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
  paramsIcon: {
    position: 'absolute',
    top: 67,
    left: 100,
    width: 40,
    height: 30,
  },
  paramsIconLine: {
    width: 36,
    height: 25,
    marginBottom: 7,
  },
});

export default Params
