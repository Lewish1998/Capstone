import React from 'react'
import { Text, View, Image, Button, StyleSheet } from 'react-native'

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
    <View style={styles.container}>
        <Image style={styles.image} source={image}></Image>
        <Text>{name}</Text>
        <Text>{date}</Text>
        <Text>{time}</Text>
        <Text>{venue}</Text>
        <Button onPress={handleOnPress} title="Press me"/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: '90%',
    maxHeight: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 5,
    backgroundColor: 'gray',
    // bottom: 50,
    // top: 50,
  },

  image: {
    width: 100,
    height: 100,
  },
});


export default EventItem;
