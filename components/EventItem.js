import React from 'react';
import { Text, View, Image, Button, StyleSheet } from 'react-native';
import TinderCard from 'react-tinder-card';

const EventItem = ({event, increaseCounter}) => {

    const name = event.name;
    const date = event.dates.start.localDate;
    const time = event.dates.start.localTime;
    const venue = event._embedded.venues[0].name;
    const image = event.images[1];
  
    // const onSwipe = () => {
    //   console.log(eventList);
    // }

    function onCardLeftScreen() {
      increaseCounter();
      // console.log('Card left the screen');
    }



    // onCardLeftScreen={()=> onCardLeftScreen('fooBar')}
    // onCardLeftScreen={onCardLeftScreen} 

  return (
    <TinderCard style={styles.container} onCardLeftScreen={onCardLeftScreen}preventSwipe={['up', 'down']}>
      <View>
          {/* <Image style={styles.image} source={image}></Image> */}
          <Text>{name}</Text>
          <Text>{date}</Text>
          <Text>{time}</Text>
          <Text>{venue}</Text>
      </View>
    </TinderCard>
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
    borderRadius: 20,
    top: 50,
    left:18,
  },

  image: {
    width: '80%',
    height: '80%',
  },
});


export default EventItem;
