import { Text, View, Button, StyleSheet, Pressable, SafeAreaView, TouchableOpacity, Animated } from "react-native";
import EventItem from "./EventItem";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";


const EventsList = ({events, user, eventPost, patch, javaEvents, clickRefresh}) => {

    const [open, setOpen] = useState(true);
    let [index, setIndex] = useState(0);
    const[toggle, setToggle] = useState(true);
    const [toggleContact, setToggleContact] = useState(true);

 

    let eventNodes = events.map((event) => {
        return <EventItem
         event={event} 
        increaseCounter={increaseCounter} 
        user={user} 
        eventPost={eventPost} 
        patch={patch} javaEvents={javaEvents} 
        clickRefresh={clickRefresh} 
        open={open} 
        handleOpen={handleOpen}
        toggle={toggle}
        toggleContact={toggleContact}
        toggleContactChange={toggleContactChange}
        />
    });

    function toggleContactChange(){
        setToggleContact(!toggleContact)
    }

    function increaseCounter(){
        let newIndex = index += 1;
        if (newIndex >= events.length){
            newIndex = 0
            return setIndex(newIndex);
        }
        return setIndex(newIndex)
    }

    function handleOnPress(){
        increaseCounter();
        setOpen(true);
        setToggle(!toggle);

     
    }

    function handleOpen(){
        setOpen(!open);
        setToggleContact(true);

    }

    function handleOnPressBack(){
        setToggleContact(true);
        setToggle(!toggle);
        setOpen(true);
        let newIndex = index -= 1;
        if (newIndex === -1){
            newIndex = events.length-1
    
            return setIndex(newIndex);
        }

        return setIndex(newIndex)
    }
  
        //Animations testing


        const [positionF, setPositionF] = useState(new Animated.Value(0));
        const [positionB, setPositionB] = useState(new Animated.Value(0));


        const springB = () => {
            Animated.spring(positionB, {
                toValue:2,
                friction: 2000,
                tension: 10000,
                useNativeDriver: true
            }).start(() => {
              Animated.spring(positionB, {
                toValue:0,
                friction: 2000,
                tension: 0,
                useNativeDriver: true
              }).start()
            })
        }

        const springF = () => {
            Animated.spring(positionF, {
                toValue:2,
                friction: 2000,
                tension: 10000,
                useNativeDriver: true
            }).start(() => {
              Animated.spring(positionF, {
                toValue:0,
                friction: 2000,
                tension: 10000,
                useNativeDriver: true
              }).start()
            })
        }

        const pressHandlerBack = () => {
            springB();
            handleOnPressBack();
        }
        const pressHandlerForward = () => {
            springF();
            handleOnPress();
        }



    return(
        <View>
            {eventNodes[index]}
            <View style={styles.buttonContainer}>
            <Animated.View style={{transform: [{translateY: positionB}]}}>
                <TouchableOpacity style={styles.button} onPress={pressHandlerBack} title="Back">
                    <View><FontAwesomeIcon icon={faBackward} color={'#2894FA'}/></View>
                </TouchableOpacity>
            </Animated.View>


                <View>
                 <Animated.View style={{transform: [{translateY: positionF}]}}>
                <TouchableOpacity style={styles.button} onPress={pressHandlerForward} title="Next">
                    <View><FontAwesomeIcon icon={faForward} color={'#2894FA'} /></View>
                </TouchableOpacity>
                </Animated.View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
    buttonContainer:{
        top:150,
        flexDirection:'row',
        justifyContent: 'center',
        gap:70
    },

    button:{
        borderWidth:2,
        borderColor:'#2B28FA',
        width: 70,
        height:50,
        display:'flex',
        alignItems: 'center',
        borderRadius:20,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    

});

export default EventsList;