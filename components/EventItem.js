import React from "react";
import { Text, View, Image, Button, StyleSheet } from "react-native";


const EventItem = ({ event, user, eventPost, patch, javaEvents, clickRefresh }) => {
  // const [eventState, setEventState] = useState([]);

  const name = event.name;
  const date = event.dates.start.localDate;
  const time = event.dates.start.localTime;
  const venue = event._embedded.venues[0].name;
  const image = event.images[1];

  // some titles have date and title in the name!

  //for loop through event_id in database and if it exists update the db
  //if it doesnt exist create a new entry with blank event object + user and update the db
  //
  // function handleInterested() {
  //   for (const javaEvent of javaEvents) {
  //     if (javaEvent.event_id === event.id) {
  //       if (javaEvent.event_interested.length === 0) {
  //         javaEvent.event_interested.push(user);
  //         patch(javaEvent, javaEvent.id);
  //       } else {
  //         for (const checkUser of javaEvent.event_interested) {

  //           if (checkUser.id !== user.id) {
  //             javaEvent.event_interested.push(user);

  //             // do we want to make this a toggle so you can click once to add then once to remove?
  //             // 
  //             patch(javaEvent, javaEvent.id);

  //           }
  //         }
  //       }
  //     }
  //   }
  //   const eventExists = javaEvents.some(
  //     (javaEvent) => javaEvent.event_id === event.id
  //   );
  //   if (!eventExists) {
  //     const payload = {
  //       event_id: event.id,
  //       event_contact: [],
  //       event_going: [],
  //       event_interested: [user],
  //     };

  //     eventPost(payload);
  //     clickRefresh();
  //   }
  // }

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



  return (

        <View style={styles.card}>
        
          <Image style={styles.cardImage} source={event.images[1]}/>
           

          <Text style={[styles.cardTitle, styles.cardHeading]}>
            {event.name}
          </Text>
          <Text style={styles.cardTitle}>{event.dates.start.localDate}</Text>
          <Text style={styles.cardTitle}>{event.dates.start.localTime}</Text>
          <Text style={styles.cardTitle}>{event._embedded.venues[0].name}</Text>

      <Button onPress={handleInterested} title="test create event object" />
      <Button onPress={handleContact} title="test contactable" />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    display: 'flex',
  },
  card: {
    position: "absolute",
    backgroundColor: "#666666",
    width: "100%",
    maxWidth: 380,
    height: 600,
    shadowOffset: { width: 10, height: 15 },
    shadowColor: "black",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    borderRadius: 20,
    resizeMode: "cover",
    top: 50,
  },
});

export default EventItem;
