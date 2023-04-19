import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import EventsList from './EventsList'
import EventItem from './EventItem'

const Home = ({events, javaEvents, user, eventPost, patch}) => {

  // console.log(user)
  // console.log(javaEvents)



  return (
    <View style={styles.container}>
        {/* <Text>Home Screen</Text> */}
        <EventsList events={events} javaEvents={javaEvents} user={user} eventPost={eventPost} patch={patch}/>
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
