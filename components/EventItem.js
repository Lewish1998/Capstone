import React from "react";
import { useState, useEffect } from "react";
import { Text, View, Image, Button, StyleSheet } from "react-native";

const EventItem = ({ event, user, eventPost, patch, javaEvents, clickRefresh }) => {
  // const [eventState, setEventState] = useState([]);

  const name = event.name;
  const date = event.dates.start.localDate;
  const time = event.dates.start.localTime;
  const venue = event._embedded.venues[0].name;
  const image = event.images[1];

  // some titles have date and title in the name!

  //for loop through event_id in database and if it exists set that as the state and then update that object
  //if it doesnt exist create a new entry with blank event object like above
  //
  function handleInterested() {
    for (const javaEvent of javaEvents) {
      if (javaEvent.event_id === event.id) {
        if (javaEvent.event_interested.length === 0) {
          javaEvent.event_interested.push(user);
          patch(javaEvent, javaEvent.id);
        } else {
          for (const checkUser of javaEvent.event_interested) {

            if (checkUser.id !== user.id) {
              javaEvent.event_interested.push(user);
              patch(javaEvent, javaEvent.id);
            }
          }
        }
      }
    }

    const eventExists = javaEvents.some(
      (javaEvent) => javaEvent.event_id === event.id
    );
    if (!eventExists) {
      const payload = {
        event_id: event.id,
        event_contact: [],
        event_going: [],
        event_interested: [user],
      };

      eventPost(payload);
      clickRefresh();
    }
  }

  function handleContact() {
    for (const javaEvent of javaEvents) {
      if (javaEvent.event_id === event.id) {
        if (javaEvent.event_contact.length === 0) {
          javaEvent.event_contact.push(user);
          patch(javaEvent, javaEvent.id);
        } else {
          for (const checkUser of javaEvent.event_contact) {

            if (checkUser.id !== user.id) {
              javaEvent.event_interested.push(user);
              patch(javaEvent, javaEvent.id);
            }
          }
        }
      }
    }

    const eventExists = javaEvents.some(
      (javaEvent) => javaEvent.event_id === event.id
    );
    if (!eventExists) {
      const payload = {
        event_id: event.id,
        event_contact: [user],
        event_going: [],
        event_interested: [],
      };

      eventPost(payload);
      clickRefresh();
    }
  }

  // console.log(javaEvents);

  return (
    <View style={styles.cardContainer}>
      <Image style={styles.image} source={image}></Image>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>{date}</Text>
      <Text style={styles.text}>{time}</Text>
      <Text style={styles.text}>{venue}</Text>
      <Button onPress={handleInterested} title="test create event object" />
      <Button onPress={handleContact} title="test contactable" />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    width: '100%',
    maxWidth: 400,
    height: 700,
    // borderWidth: 5,
    bottom: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#666666',
    shadowOffset:{width:10, height:15},
    shadowColor: 'black',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    borderRadius: 20,
  },
  image: {
    width: 380,
    height: 400,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  text: {
    top:10,
    height: 28,
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center'
  },
});

// const styles = StyleSheet.create({
//   container: {
      // display: 'flex',
      // alignItems: 'center',
      // justifyContent: 'center',
      // height: '100%',
      // width: '100%',
      // },
//       header: {
//       color: '#000',
//       fontSize: 30,
//       marginBottom: 30,
//       },
//       cardContainer: {
//       width: '90%',
//       maxWidth: 380,
//       height: 700,
//       //   borderWidth: 5,
//       //   borderColor: 'black',
//       //   backgroundColor: 'white',
//       },
//       card: {
//           position: 'absolute',
//           backgroundColor: '#666666',
//           width: '100%',
//           maxWidth: 380,
//           height: 600,
//           shadowOffset:{width:10, height:15},
//           shadowColor: 'black',
//           shadowOpacity: 0.05,
//           shadowRadius: 8,
//           borderRadius: 20,
//           resizeMode: 'cover',
//           top:50,
//       },    
//       cardImage: {
//           width: null,
//           height: 400,
//           overflow: 'hidden',
//           borderTopLeftRadius: 20,
//           borderTopRightRadius: 20,
//       },
//       cardTitle: {
//           position: 'relative',
//           display: 'flex',
//           textAlign: 'center',
//           bottom: 0,
//           margin: 5,
//           color: '#fff',
//           fontSize:16,
//       },
//       cardHeading: {
//           fontSize: 24,
//           color: '#fff'
//       },
//       infoText: {
//               top:10,
//           height: 28,
//           justifyContent: 'center',
//           display: 'flex',
//           zIndex: -100,
//       },
//       infoIcon:{
//           position: 'absolute',
//           right: 20,
//           bottom: 20,
//           opacity: 0.5,
//       },
//       location: {
//           top: 10
//       },
// })

export default EventItem;
