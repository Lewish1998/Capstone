import { Text, View, Button } from "react-native";
import EventItem from "./EventItem";
import { useState } from "react";

const EventsList = ({events, user, eventPost, patch, javaEvents, clickRefresh}) => {

    let eventNodes = events.map((event) => {
        return <EventItem event={event} user={user} eventPost={eventPost} patch={patch} javaEvents={javaEvents} clickRefresh={clickRefresh}/>
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
    
    return(
        <View>
            {eventNodes[index]}
            <Button onPress={increaseCounter} title="Press me"/>
            
        </View>
    )
}

export default EventsList;