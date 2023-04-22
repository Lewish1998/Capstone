import { Text, View, Button, StyleSheet } from "react-native";
import EventItem from "./EventItem";
import { useState } from "react";

const EventsList = ({events, user, eventPost, patch, javaEvents, clickRefresh}) => {

    const [open, setOpen] = useState(true);

    let eventNodes = events.map((event) => {
        return <EventItem event={event} increaseCounter={increaseCounter} user={user} eventPost={eventPost} patch={patch} javaEvents={javaEvents} clickRefresh={clickRefresh} open={open} handleOpen={handleOpen}/>
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

    function handleOnPress(){
        increaseCounter();
        setOpen(true);
     
    }

    function handleOpen(){
        setOpen(!open);
    }

    




    return(
        <View>
            {eventNodes[index]}
            <Button onPress={handleOnPress} title="Press me"/>
            
        </View>
    )
}



export default EventsList;