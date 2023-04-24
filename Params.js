import React, { useState } from 'react'
import { Link } from "react-router-native";
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';

const Params = () => {

  

  return (

  <View style={styles.container}>
    <TouchableOpacity>
      <View>
        
        {/* Button is clicking but not changinng to the link...
        Will try to make a function I can call when the button clicked to change pages? */}

      <FontAwesomeIcon style={styles.burgerIcon} icon={faSliders} size={30}>
        <Link to="/paramaters"/>
      </FontAwesomeIcon>
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
  burgerIcon: {
    position: 'absolute',
    top: 67,
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
