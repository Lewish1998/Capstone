import React from 'react'
import { Text, View, Image } from 'react-native'

const EventItem = ({event}) => {

    const name = event.name
    const date = event.dates.start.localDate
    const time = event.dates.start.localTime
    const venue = event._embedded.venues[0].name
    const image = event.images[1]



  return (
    <View>
        <Image source={image}></Image>
        <Text>{name}</Text>
        <Text>{date}</Text>
        <Text>{time}</Text>
        <Text>{venue}</Text>
    </View>
  )
}

export default EventItem;
