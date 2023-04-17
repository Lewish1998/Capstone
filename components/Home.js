import React from 'react'
import { Text, View } from 'react-native'
import EventsList from './EventsList'
import EventItem from './EventItem'

const Home = ({events}) => {
  return (
    <View>
        <Text>Home Screen</Text>
        <EventsList events={events}/>
    </View>
  )
}

export default Home;
