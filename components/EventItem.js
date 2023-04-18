import React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, Image, Button, StyleSheet } from 'react-native';

const EventItem = ({event, javaEvents, user}) => {

    const[testy,setTesty] = useState({
                                      "event_id": null,
                                      "event_contact": [],
                                      "event_going": [],
                                      "event_interested": [],
                                    });

    const name = event.name;
    const date = event.dates.start.localDate;
    const time = event.dates.start.localTime;
    const venue = event._embedded.venues[0].name;
    const image = event.images[1];

// some titles have date and title in the name!
function handleEventId(){
  //for loop through event_id in database and if it exists set that as the state and then update that object
  //if it doesnt exist create a new entry with blank event object like above
  //
  console.log(event.id)
  console.log(testy)
  let newthing = testy
  newthing.event_id=event.id
  setTesty(newthing);
  console.log(testy)

}


// handleChange(event){
//   let propertyName = event.target.name;
//   let pirate = this.state.pirate
//   pirate[propertyName] = event.target.value;
//   this.setState({pirate: pirate})
// }



let test;
for (banana of javaEvents){
    if( banana.event_id === event.id){
      test = banana;
      console.log(test.event_id);
    }
}






  return (
    <View style={styles.container}>
    <Button onPress={handleEventId} title="test create event object"/>
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
