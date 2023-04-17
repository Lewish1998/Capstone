import React from 'react'
import { Text, View, Image, Button } from 'react-native'

const EventItem = ({event, increaseCounter}) => {

    const name = event.name
    const date = event.dates.start.localDate
    const time = event.dates.start.localTime
    const venue = event._embedded.venues[0].name
    const image = event.images[4]

    function handleOnPress(){
        increaseCounter();
    }


// some titles have date and title in the name!

  return (
    <View>
        <Image source={image}></Image>
        <Text>{name}</Text>
        <Text>{date}</Text>
        <Text>{time}</Text>
        <Text>{venue}</Text>
        <Button onPress={handleOnPress} title="Press me"/>
    </View>
  )
}

export default EventItem;
