import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import EventsList from './EventsList'


const Home = ({events, javaEvents, user, eventPost, patch, clickRefresh}) => {

 


  return (
    <View style={styles.container}>
        {/* <Text>Home Screen</Text> */}
        <EventsList events={events} user={user} eventPost={eventPost} patch={patch} javaEvents={javaEvents} clickRefresh={clickRefresh}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default Home;