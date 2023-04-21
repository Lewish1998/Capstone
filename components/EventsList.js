import {
  Text,
  View,
  Button,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
} from "react-native";
import EventItem from "./EventItem";

import TinderCard from "react-tinder-card";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const EventsList = ({
  events,
  user,
  eventPost,
  patch,
  javaEvents,
  clickRefresh,
}) => {
  console.log(javaEvents)

    const swipeIndexRefresh =(eventT) => {
     handleInterested(eventT);
    }
  function handleInterested (event,javaEvents) {
    console.log(event.name);
    console.log(javaEvents);
    for (const javaEvent of javaEvents) {
      if (javaEvent.event_id === event.id) {
        if (javaEvent.event_interested.length === 0) {
          javaEvent.event_interested.push(user);
          patch(javaEvent, javaEvent.id);
        } else {
          for (const checkUser of javaEvent.event_interested) {
            if (checkUser.id !== user.id) {
              javaEvent.event_interested.push(user);

              // do we want to make this a toggle so you can click once to add then once to remove?
              //
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
  };

  let test = events.reverse();

  const tinderNodes = test.map((event) => {
    return (
      <TinderCard
        key={event.id}
        onCardLeftScreen={() => handleInterested(event,javaEvents)}
      >
        <View style={styles.card}>
          <ImageBackground style={styles.cardImage} source={event.images[1]}>
            <Ionicons
              style={styles.infoIcon}
              name="information-circle-outline"
              size={30}
              color="white"
            />
          </ImageBackground>
          <Text style={[styles.cardTitle, styles.cardHeading]}>
            {event.name}
          </Text>
          <Text style={styles.cardTitle}>{event.dates.start.localDate}</Text>
          <Text style={styles.cardTitle}>{event.dates.start.localTime}</Text>
          <Text style={styles.cardTitle}>{event._embedded.venues[0].name}</Text>
        </View>
      </TinderCard>
    );
  });

  // const canGoBack = currentIndex < test.length - 1

  // const canSwipe = currentIndex >= 0

  //  set last direction and decrease current index

  // const updateCurrentIndex = (val) => {
  //     setCurrentIndex(val)
  //     currentIndexRef.current = val
  // }

  //   const outOfFrame = (name, idx) => {
  //     console.log(`${name} (${idx}) left the screen!`, currentIndex);
  //     // currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
  //   };

  let name = "Edinburgh";

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={styles.location}>
          <AntDesign name="enviromento" size={24} color="black" />
          {name}
        </Text>

        {tinderNodes}
        <View style={styles.buttons}></View>

        {/* <EventItem
            event={event}
            user={user}
            eventPost={eventPost}
            patch={patch}
            javaEvents={javaEvents}
            clickRefresh={clickRefresh}
          /> */}
      </View>

      {/* {lastDirection ? <Text style={styles.infoText}>You swiped {lastDirection}</Text> : <Text style={styles.infoText} />} */}
    </View>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  header: {
    color: "#000",
    fontSize: 30,
    marginBottom: 30,
  },
  cardContainer: {
    width: "90%",
    maxWidth: 380,
    height: 700,
    //   borderWidth: 5,
    //   borderColor: 'black',
    //   backgroundColor: 'white',
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
  cardImage: {
    width: null,
    height: 400,
    overflow: "hidden",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardTitle: {
    position: "relative",
    display: "flex",
    textAlign: "center",
    bottom: 0,
    margin: 5,
    color: "#fff",
    fontSize: 16,
  },
  cardHeading: {
    fontSize: 24,
    color: "#fff",
  },
  infoText: {
    top: 10,
    height: 28,
    justifyContent: "center",
    display: "flex",
    zIndex: -100,
  },
  infoIcon: {
    position: "absolute",
    right: 20,
    bottom: 20,
    opacity: 0.5,
  },
  location: {
    top: 10,
  },
};

export default EventsList;
