import { Text, View, Button } from "react-native";
import EventItem from "./EventItem";
import { useState } from "react";

const EventsList = ({events, javaEvents, user, eventPost}) => {

    let eventNodes = events.map((event) => {
        return <EventItem event={event} increaseCounter={increaseCounter} javaEvents={javaEvents} user={user} eventPost={eventPost}/>
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
    }




    return(
        <View>
            {eventNodes[index]}
            <Button onPress={handleOnPress} title="Press me"/>
            
        </View>
    )
}

export default EventsList;