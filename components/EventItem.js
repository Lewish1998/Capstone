import React from "react";
// import { useState, useEffect } from "react";
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
    console.log(javaEvents)
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
    <View style={styles.container}>
      <Button onPress={handleInterested} title="test create event object" />
      <Button onPress={handleContact} title="test contactable" />
      <Image style={styles.image} source={image}></Image>
      <Text>{name}</Text>
      <Text>{date}</Text>
      <Text>{time}</Text>
      <Text>{venue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: "90%",
    maxWidth: "90%",
    maxHeight: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 5,
    backgroundColor: "gray",
    top: 50,
    left: 18,
  },

  image: {
    width: "80%",
    height: "80%",
  },
});

export default EventItem;
