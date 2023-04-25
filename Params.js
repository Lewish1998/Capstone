import React, { useState } from 'react'
import { Link } from "react-router-native";
import { Text, View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeartBroken, faSliders } from '@fortawesome/free-solid-svg-icons';

const Params = () => {

  

  return (

  <View style={styles.container}>
   
    <TouchableOpacity>
      <View>
      <Link to="/paramaters">
      <FontAwesomeIcon style={styles.icon} icon={faSliders} size={30} color={'black'}/>
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

  icon: {
    position: 'absolute',
    top: 67,
    left: 100,
    width: 40,
    height: 40,
  },
});

export default Params
