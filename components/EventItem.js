import React from 'react'
import { Text, View } from 'react-native'

const EventItem = ({event}) => {
    
    const name = event.name
    const location = event._embedded.venues[0].name


  return (
    <View>
        <Text>{name}</Text>
        <Text>{location}</Text>
    </View>
  )
}

export default EventItem;
