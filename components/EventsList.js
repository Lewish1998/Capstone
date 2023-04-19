import { Text, View, Button } from "react-native";
import EventItem from "./EventItem";
import { useState } from "react";
import TinderCard from 'react-tinder-card'

const EventsList = ({events}) => {


    let [index, setIndex] = useState(0)

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

    function handleOnPress(){
        increaseCounter();
    }

    return(
        <View>
            {eventNodes}
            <Button onPress={handleOnPress} title="Press me"/>
        </View>
    )
}

export default EventsList;