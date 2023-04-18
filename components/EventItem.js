import React from 'react';
import { Text, View, Image, Button, StyleSheet } from 'react-native';

const EventItem = ({event}) => {

    const name = event.name;
    const date = event.dates.start.localDate;
    const time = event.dates.start.localTime;
    const venue = event._embedded.venues[0].name;
    const image = event.images[1];

// some titles have date and title in the name!

  return (
    <View style={styles.container}>
        <Image style={styles.image} source={image}></Image>
        <Text>{name}</Text>
        <Text>{date}</Text>
        <Text>{time}</Text>
        <Text>{venue}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: '90%',
    maxWidth: '90%',
    maxHeight: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 5,
    backgroundColor: 'gray',
    top: 50,
    left:18,
  },

  image: {
    width: '80%',
    height: '80%',
  },
});


export default EventItem;
