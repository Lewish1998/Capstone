import React from 'react'
import { Link } from "react-router-native";
import { Text, View } from 'react-native';

const NavBar = () => {
  return (
    <View>
    <Link to="/"><Text>Home</Text></Link>
        <Link to="/about"><Text>About</Text></Link>
    
    </View>
  )
}

export default NavBar
