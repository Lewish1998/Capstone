import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import EventsList from './EventsList'

import EventItem from './EventItem'

const Home = ({events, javaEvents, user, eventPost, patch, clickRefresh}) => {

  // console.log(user)
  // console.log(javaEvents)


const Home = ({events, javaEvents, user, eventPost, patch, clickRefresh}) => {

  return (
    <View style={styles.container}>

        <EventsList events={events} user={user} eventPost={eventPost} patch={patch} javaEvents={javaEvents} clickRefresh={clickRefresh}/>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#666666',
    // alignItems: 'center',
    // justifyContent: 'center',

  },
});

export default Home;
