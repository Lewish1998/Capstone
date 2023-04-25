import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native'
import EventsList from './EventsList'
import Params from '../Params'


const Home = ({events, javaEvents, user, eventPost, patch, clickRefresh}) => {


return (
  <View>
    <Image source={require("../images/Oot'N'Aboot-logos_black.png")} style={{position:'absolute', width: 120, height: 80, top: 30, left:120}}/>
    <TouchableOpacity style={styles.icon}>
      <Params/>
    </TouchableOpacity>
      <EventsList events={events} user={user} eventPost={eventPost} patch={patch} javaEvents={javaEvents} clickRefresh={clickRefresh}/>
  </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    left: 180,
    zIndex: 15000,
  },
});

export default Home;