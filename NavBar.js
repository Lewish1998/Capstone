import React, { useState } from 'react'
import { Link } from "react-router-native";
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import SideMenu from 'react-native-side-menu';


const NavBar = () => {

  const [isMenuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen)
  }

  return (

    <View style={styles.container}>

    {/* <Text style={styles.content}>NavBar</Text> */}
    {isMenuOpen && (
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          {/* <Text style={styles.menuItemText}>Hello</Text> */}
        <Link to="/"><Text>Home</Text></Link>
        <Link to="/about"><Text>About</Text></Link>
        <Link to="/contact"><Text>Contact</Text></Link>
        <Link to="/events"><Text>My Events</Text></Link>
        <Link to="/paramaters"><Text>Paramaters</Text></Link>
        <Link to="/account"><Text>Account</Text></Link>
        </TouchableOpacity>
      </View>
    )}

    <TouchableOpacity style={styles.burgerIcon} onPress={toggleMenu}>
      <View style={styles.burgerIconLine}></View>
      <View style={styles.burgerIconLine}></View>
      <View style={styles.burgerIconLine}></View>
    </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    fontSize: 24,
    marginBottom: 20,
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItem: {
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  menuItemText: {
    fontSize: 18,
  },
  burgerIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  burgerIconLine: {
    width: 30,
    height: 3,
    backgroundColor: 'black',
    marginBottom: 5,
  },
});

export default NavBar
