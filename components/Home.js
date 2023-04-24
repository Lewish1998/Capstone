import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Button, Pressable} from 'react-native'
import EventsList from './EventsList'


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
      <EventsList events={events} user={user} eventPost={eventPost} patch={patch} javaEvents={javaEvents} clickRefresh={clickRefresh}/>
  </View>
)
}

const styles = StyleSheet.create({
location: {
  // position: 'absolute',
  // top: 68,
  // left: 10,
  // fontSize: 26,
},
});

export default Home;