import React from 'react'
import { Link } from "react-router-native";
import { Text, View } from 'react-native';

const NavBar = () => {
  return (
    <View>
        <Link to="/"><Text>Home</Text></Link>
        <Link to="/about"><Text>About</Text></Link>
        <Link to="/contact"><Text>Contact</Text></Link>
        <Link to="/events"><Text>My Events</Text></Link>
        <Link to="/paramaters"><Text>Paramaters</Text></Link>
        <Link to="/account"><Text>Account</Text></Link>
    </View>
  )
}

export default NavBar
