import React from "react";
import { useState, useEffect } from "react";
import { Linking, Pressable } from "react-native";
import { Text, View, Image, Button, StyleSheet } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faArrowRotateBack, faBackspace, faBackward, faBackwardStep, faEnvelope, faEnvelopeOpen, faEnvelopeSquare, faHeart, faHeartBroken, faInfoCircle, faLocationPin, faSliders } from '@fortawesome/free-solid-svg-icons';
import { TouchableOpacity } from "react-native";


const EventItem = ({
  event,
  user,
  eventPost,
  patch,
  javaEvents,
  clickRefresh,
  open,
  handleOpen,
  toggle,
  toggleContact,
  toggleContactChange,
}) => {
  const name = event.name;
  const date = event.dates.start.localDate;
  const time = event.dates.start.localTime;
  const venue = event._embedded.venues[0].name;
  const status = event.dates.status.code;
  const image = event.images[1];
  const city = event._embedded.venues[0].city.name;


  const [interest, setInterest] = useState(false);
  const [contact, setContact] = useState(false);
  const [contactNo, setContactNo] = useState(0);
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    interestAndContact();
  }, [toggle]);

  useEffect(() => {
    interestAndContact();
  }, [handleInterested]);

  useEffect(() => {
    willingContactNo();
  }, [handleContact]);

  useEffect(() => {
    willingUsers();
  }, [open]);

  function handleToggleContact() {
    willingUsers();
    toggleContactChange();
  }

  function handleGoBack() {
    toggleContactChange();
  }

  function willingUsers() {
    const javaEvent = javaEvents.find(
      (javaEvent) => javaEvent.event_id === event.id
    );
    if (javaEvent) {
      setContactList(javaEvent.event_contact);
    } else {
      setContactList([]);
    }
  }

  function willingContactNo() {
    const javaEvent = javaEvents.find(
      (javaEvent) => javaEvent.event_id === event.id
    );
    if (javaEvent) {
      const number = javaEvent.event_contact.length;
      setContactNo(number);
    } else {
      setContactNo(0);
    }
  }

  function interestAndContact() {
    const javaEvent = javaEvents.find(
      (javaEvent) => javaEvent.event_id === event.id
    );
    if (javaEvent) {
      const isInterested = javaEvent.event_interested.some(
        (userI) => userI.id === user.id
      );
      const isContact = javaEvent.event_contact.some(
        (userI) => userI.id === user.id
      );
      const isGoing = javaEvent.event_going.some(
        (userI) => userI.id === user.id
      );
      setContact(isContact);
      if(isInterested || isGoing){
      setInterest(true);
    }else{
      setInterest(false)
      }
    } else {
      setContact(false);
      setInterest(false);
    }
  }

  // const genre = if(event.classifications[0].genre.name !== null){return event.classifications[0].genre.name}

  // some titles have date and title in the name!

  //for loop through event_id in database and if it exists set that as the state and then update that object
  //if it doesnt exist create a new entry with blank event object like above
  //
  function handleInterested() {
    const javaEvent = javaEvents.find(
      (javaEvent) => javaEvent.event_id === event.id
    );
    if (javaEvent) {
      const goingUserExists = javaEvent.event_going.some(
        (userI) => userI.id === user.id
      );
      const interestedUserExists = javaEvent.event_interested.some(
        (userI) => userI.id === user.id
      );

      if(!goingUserExists){
      if (!interestedUserExists) {
        javaEvent.event_interested.push(user);
        patch(javaEvent, javaEvent.id);
        interestAndContact();
      } else {
        const results = javaEvent.event_interested.filter(
          (checkUser) => checkUser.id != user.id
        );
        javaEvent.event_interested = results;
        patch(javaEvent, javaEvent.id);
        interestAndContact();
      }
    } else {
      return
    }
    } else {
      const eventExists = javaEvents.some(
        (javaEvent) => javaEvent.event_id === event.id
      );
      if (!eventExists) {
        const payload = {
          event_id: event.id,
          event_contact: [],
          event_going: [],
          event_interested: [user],
          event_name: event.name,
          event_date: event.dates.start.localDate,
          event_time: event.dates.start.localTime,
        };

        eventPost(payload);
        clickRefresh();
        interestAndContact();
      }
    }
  }

  function handleContact() {
    const javaEvent = javaEvents.find(
      (javaEvent) => javaEvent.event_id === event.id
    );
    if (javaEvent) {
      const interestedUserExists = javaEvent.event_interested.some(
        (userI) => userI.id === user.id
      );
      const contactUserExists = javaEvent.event_contact.some(
        (userI) => userI.id === user.id
      );

      if (!interestedUserExists && !contactUserExists) {
        javaEvent.event_contact.push(user);
        javaEvent.event_interested.push(user);
        patch(javaEvent, javaEvent.id);
        interestAndContact();
      } else if (!contactUserExists) {
        javaEvent.event_contact.push(user);
        patch(javaEvent, javaEvent.id);
        interestAndContact();
      } else if (contactUserExists) {
        const results = javaEvent.event_contact.filter(
          (checkUser) => checkUser.id != user.id
        );
        javaEvent.event_contact = results;
        patch(javaEvent, javaEvent.id);
        interestAndContact();
      }
    } else {
      const eventExists = javaEvents.some(
        (javaEvent) => javaEvent.event_id === event.id
      );
      if (!eventExists) {
        const payload = {
          event_id: event.id,
          event_contact: [user],
          event_going: [],
          event_interested: [user],
          event_name: event.name,
          event_date: event.dates.start.localDate,
          event_time: event.dates.start.localTime,
        };

        eventPost(payload);
        clickRefresh();
        interestAndContact();
      }
    }
  }

  loadInBrowser = () => {
    Linking.openURL(event.url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

  return (
    <View>
    <Text style={styles.location}>
      <View>
        <FontAwesomeIcon icon={faLocationPin} size={18}/>
      </View>
      {city}
    </Text>

      {open ? (
        <View style={styles.cardContainer}>
          <Image style={styles.image} source={image}></Image>
          <Text style={styles.heading}>{name}</Text>
          <Text style={styles.text}>Date: {date}</Text>
          <Text style={styles.text}>Time: {time}</Text>
          <Text style={styles.text}>Venue: {venue}</Text>
          <View style={styles.buttons}>


          <View>
             <TouchableOpacity onPress={handleOpen}>
              <View>
                <FontAwesomeIcon icon={faInfoCircle} size={50}/>
              </View>
            </TouchableOpacity>
            </View>

            <View style={styles.contact}>
             <TouchableOpacity onPress={handleContact}>
              <View>
                <FontAwesomeIcon icon={contact?faEnvelope:faEnvelopeOpen} size={50}  color={contact?"orchid":"palegreen"}/>
              </View>
            </TouchableOpacity>
            </View>

            <View>
             <TouchableOpacity onPress={handleInterested}>
              <View>
                <FontAwesomeIcon icon={faHeart} size={50} color={interest ? "red" : "black"}/>
              </View>
            </TouchableOpacity>
            </View>
          </View>
        </View>

      ) : toggleContact ? (
        <View style={styles.cardContainer}>
          <Image style={styles.image} source={image}></Image>
          <Text style={styles.heading}>{name}</Text>
          <Text style={styles.text}>{date}</Text>
          <Text style={styles.text}>{time}</Text>
          <Text style={styles.text}>{venue}</Text>
          <Text style={styles.text}>Status: {status}</Text>

          <Button
            style={styles.text}
            onPress={handleToggleContact}
            title={`Who's going?: ${contactNo}`}
          />

          <Button onPress={loadInBrowser} title="BUY TICKETS" />
          <View style={styles.buttons}>
          <View>
             <TouchableOpacity onPress={handleOpen}>
              <View>
                <FontAwesomeIcon icon={faArrowRotateBack} size={50}/>
              </View>
            </TouchableOpacity>
          </View>

            <View style={styles.contact}>
             <TouchableOpacity onPress={handleContact}>
              <View>
                <FontAwesomeIcon icon={contact?faEnvelope:faEnvelopeOpen} size={50} color={contact?"orchid":"palegreen"}/>
              </View>
            </TouchableOpacity>
            </View>

              <View>
             <TouchableOpacity onPress={handleInterested}>
              <View>
                <FontAwesomeIcon icon={faHeart} size={50} color={interest ? "red" : "darkgrey"}/>
              </View>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.cardContainer}>
          <Text>test</Text>

          <View>
            {contactList.length > 0 ? (
              contactList.map((contact) => (
                <View key={contact.id}>
                  <Text>Name: {contact.name}</Text>
                  <Text>Email: {contact.email}</Text>
                </View>
              ))
            ) : (
              <Text>No contacts found.</Text>
            )}
          </View>

          <View>
             <TouchableOpacity onPress={handleGoBack}>
              <View>
                <FontAwesomeIcon icon={faArrowRotateBack} size={50}/>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    width: 360,
    height: 600,
    top: 120,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#999999",
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 15,
    borderRadius: 20,
  },
  image: {
    width: 360,
    height: 260,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  text: {
    top: 10,
    height: 28,
    textAlign: "center",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    fontSize:20,
    gap: 30
  },
  buttons: {
    position: "absolute",
    bottom: 20,
    flexDirection: 'row',
    left: 40,
    gap: 65
  
  },
  interest: {
    color: "firebrick",
  },
  contact: {
  color: "yellow"
  },
  location: {
    position: 'absolute',
    top: 80,
    left: 10,
    fontSize: 20,
    color: "black",
    textDecorationLine: 'underline'
  },
  heading: {
    fontSize: 34,
    fontWeight: "bold",
    color: "black",
    textAlign:'center'
  },
});

export default EventItem;
