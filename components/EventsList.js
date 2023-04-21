import { Text, View, Button, StyleSheet, ImageBackground, Image} from "react-native";
import EventItem from "./EventItem";
import { useState, useRef, useMemo } from "react";
import TinderCard from 'react-tinder-card';
import React from "react";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const EventsList = ({events, user, eventPost, patch, javaEvents, clickRefresh}) => {


    let eventNodes = events.map((event) => {
        return <EventItem event={event} increaseCounter={increaseCounter} user={user} eventPost={eventPost} patch={patch} javaEvents={javaEvents} clickRefresh={clickRefresh}/>
    });


    let [index, setIndex] = useState(0)


    function increaseCounter(){
        let newIndex = index += 1;
        if (newIndex >= events.length){
            newIndex = 0
            return setIndex(newIndex);
        }
        return setIndex(newIndex)
    }

    
    //return(
    //  <View>
    //    {eventNodes[index]}
    //  <Button onPress={increaseCounter} title="Press me"/>
            

    // let test = events.map((event, index) => {
    //     console.log(event.name)
    //     return [event.name]
    // });
    let test = events;


    const [currentIndex, setCurrentIndex] = useState(test.length-1);
    const [lastDirection, setLastDirection] = useState()
    // out of frame closure???????
    const currentIndexRef = useRef(currentIndex)

    // ?????
    const childRefs = useMemo(() => Array(test.length)
        .fill(0)
        .map((i) => React.createRef()),
        []
    )

    const updateCurrentIndex = (val) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const canGoBack = currentIndex < test.length - 1

    const canSwipe = currentIndex >= 0

    //  set last direction and decrease current index
    const swiped = (direction, nameToDelete, index) => {
        setLastDirection(direction)
        updateCurrentIndex(index - 1)
    }

    const outOfFrame = (name, idx) => {
        console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    }

    const swipe = async (dir) => {
        if (canSwipe && currentIndex < test.length) {
        await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
        }
    }

  // increase current index and show card
    const goBack = async () => {
        if (!canGoBack) return
        const newIndex = currentIndex + 1
        updateCurrentIndex(newIndex)
        await childRefs[newIndex].current.restoreCard()
    }

    function handleOnPress(){
        increaseCounter();
    }

    function handleClick(){
        console.log('image clicked')
    }

    let name = "Edinburgh";


    return(
        
        <View style={styles.container}>
            <View style={styles.cardContainer}>
            <Text style={styles.location}><AntDesign name="enviromento" size={24} color="black"/>{name}</Text>
            {test.map((event) => 
                <TinderCard key={event.id} onSwipe={(dir) => swiped(dir, event.name)} onCardLeftScreen={() => outOfFrame(event.name)}>
                    <View style={styles.card}>
                        <ImageBackground style={styles.cardImage} source={event.images[1]} >
                            <Ionicons onPress={handleClick} style={styles.infoIcon} name="information-circle-outline" size={30} color="white" />
                        </ImageBackground>
                        <Text style={[styles.cardTitle, styles.cardHeading]} >{event.name}</Text>
                        <Text style={styles.cardTitle}>{event.dates.start.localDate}</Text>
                        <Text style={styles.cardTitle}>{event.dates.start.localTime}</Text>
                        <Text style={styles.cardTitle}>{event._embedded.venues[0].name}</Text>
                    </View>
                    <EventItem style={{zIndex: 10000}}event={event} user={user} eventPost={eventPost} patch={patch} javaEvents={javaEvents} clickRefresh={clickRefresh}/>
                </TinderCard>
                
            )}
            
            </View>
            
            {/* {lastDirection ? <Text style={styles.infoText}>You swiped {lastDirection}</Text> : <Text style={styles.infoText} />} */}

        </View>
            )
        }



const styles = {
    container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    },
    header: {
    color: '#000',
    fontSize: 30,
    marginBottom: 30,
    },
    cardContainer: {
    width: '90%',
    maxWidth: 380,
    height: 700,
    //   borderWidth: 5,
    //   borderColor: 'black',
    //   backgroundColor: 'white',
    },
    card: {
        position: 'absolute',
        backgroundColor: '#666666',
        width: '100%',
        maxWidth: 380,
        height: 600,
        shadowOffset:{width:10, height:15},
        shadowColor: 'black',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        borderRadius: 20,
        resizeMode: 'cover',
        top:50,
    },    
    cardImage: {
        width: null,
        height: 400,
        overflow: 'hidden',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    cardTitle: {
        position: 'relative',
        display: 'flex',
        textAlign: 'center',
        bottom: 0,
        margin: 5,
        color: '#fff',
        fontSize:16,
    },
    cardHeading: {
        fontSize: 24,
        color: '#fff'
    },
    infoText: {
            top:10,
        height: 28,
        justifyContent: 'center',
        display: 'flex',
        zIndex: -100,
    },
    infoIcon:{
        position: 'absolute',
        right: 20,
        bottom: 20,
        opacity: 0.5,
    },
    location: {
        top: 10
    },
}

export default EventsList;