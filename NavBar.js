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
    {isMenuOpen && (
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Link to="/" onPress={toggleMenu} ><Text style={styles.menuItemText}>Home</Text></Link>        
          <Link to="/events" onPress={toggleMenu}><Text style={styles.menuItemText}>My Events</Text></Link>
          <Link to="/paramaters" onPress={toggleMenu}><Text style={styles.menuItemText}>Paramaters</Text></Link>
          <Link to="/about" onPress={toggleMenu}><Text style={styles.menuItemText}>About</Text></Link>
          <Link to="/contact" onPress={toggleMenu}><Text style={styles.menuItemText}>Contact</Text></Link>
          <Link to="/account" onPress={toggleMenu}><Text style={styles.menuItemText}>Account</Text></Link>
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
    top: 130,
    width: 220,
    height: 300,
    left: -70,
    backgroundColor: 'gray',
    justifyContent: 'top',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius:20,
  },
  menuItem: {
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  menuItemText: {
    fontSize: 24,
    padding:5,
    color: 'white',
    opacity:1
  },
  burgerIcon: {
    position: 'absolute',
    top: 70,
    left: 150,
    width: 40,
    height: 40,
  },
  burgerIconLine: {
    width: 36,
    height: 3,
    backgroundColor: 'black',
    marginBottom: 7,
  },
});

export default NavBar
