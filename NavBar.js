import React, { useState } from 'react'
import { Link } from "react-router-native";
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

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
        <Link to="/"><Text style={styles.menuItemText}>Home</Text></Link>
        <Link to="/about"><Text style={styles.menuItemText}>About</Text></Link>
        <Link to="/contact"><Text style={styles.menuItemText}>Contact</Text></Link>
        <Link to="/events"><Text style={styles.menuItemText}>My Events</Text></Link>
        <Link to="/paramaters"><Text style={styles.menuItemText}>Paramaters</Text></Link>
        <Link to="/account"><Text style={styles.menuItemText}>Account</Text></Link>
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
    zIndex: 1,
  },
  content: {
    fontSize: 24,
    marginBottom: 20,
  },

  // Edit here for Nav styling
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 300,
    height: 300,
    backgroundColor: 'gray',
    justifyContent: 'top',
    alignItems: 'center',
    top: 150,
    borderColor: 'black',
    borderWidth: 5,
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
    top: 80,
    right: -200,
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
