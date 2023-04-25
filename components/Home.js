import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Button, Pressable} from 'react-native'
import EventsList from './EventsList'
import Params from '../Params'


const Home = ({events, javaEvents, user, eventPost, patch, clickRefresh}) => {



//   return (
//     <View styles={styles.container}>
//         <EventsList events={events} user={user} eventPost={eventPost} patch={patch} javaEvents={javaEvents} clickRefresh={clickRefresh}/>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     // backgroundColor: 'red',
//   },
// });

return (
  <View>
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