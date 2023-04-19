import { Text, View, Button, StyleSheet} from "react-native";
import EventItem from "./EventItem";
import { useState, useRef, useMemo } from "react";
import TinderCard from 'react-tinder-card'
import React from "react";

const EventsList = ({events}) => {

    // let [index, setIndex] = useState(0)

    function increaseCounter(){
        let newIndex = index += 1;
        if (newIndex >= events.length){
            newIndex = 0
            return setIndex(newIndex);
        }
        return setIndex(newIndex)
    }




    let eventNodes = events.map((event, index) => {
        return <EventItem event={event} key={index} index={index}/>
    });



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
    const childRefs = useMemo(
        () =>
          Array(test.length)
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

    return(
         
        <View style={styles.container}>
            <View style={styles.cardContainer}>
            {test.map((event) => 
                <TinderCard key={event.name} onSwipe={(dir) => swiped(dir, event.name)} onCardLeftScreen={() => outOfFrame(event.name)}>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>{event.name}</Text>
                    </View>
                </TinderCard>
            )}
            </View>
            {lastDirection ? <Text style={styles.infoText}>You swiped {lastDirection}</Text> : <Text style={styles.infoText} />}
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
      backgroundColor: 'red',
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
      height: 700,
      shadowColor: 'black',
      shadowOpacity: 0.2,
      shadowRadius: 10,
      borderRadius: 20,
      resizeMode: 'cover',
    },
    cardImage: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      borderRadius: 20,
    },
    cardTitle: {
      position: 'absolute',
      bottom: 0,
      margin: 10,
      color: '#fff',
    },
    infoText: {
      height: 28,
      justifyContent: 'center',
      display: 'flex',
      zIndex: -100,
    }
  }

export default EventsList;