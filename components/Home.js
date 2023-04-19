import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import EventsList from './EventsList'
import EventItem from './EventItem'

const Home = ({events, javaEvents, user, eventPost, patch, fetch}) => {

  // console.log(user)
  // console.log(javaEvents)



  return (
    <View style={styles.container}>
        {/* <Text>Home Screen</Text> */}
        <EventsList events={events} user={user} eventPost={eventPost} patch={patch} javaEvents={javaEvents} fetch={fetch}/>
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
