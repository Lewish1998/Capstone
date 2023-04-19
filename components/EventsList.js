import { Text, View, Button } from "react-native";
import EventItem from "./EventItem";
import { useState } from "react";
import TinderCard from 'react-tinder-card'

const EventsList = ({events}) => {

    let eventNodes = events.map((event) => {
        return <EventItem event={event} increaseCounter={increaseCounter}/>
    });

    let [index, setIndex] = useState(0)

    function increaseCounter(){
        let newIndex = index += 1;
        if (newIndex >= events.length){
            newIndex = 0
            console.log(index)
            return setIndex(newIndex);
        }
        return setIndex(newIndex)
    }

    function handleOnPress(){
        increaseCounter();
    }

    function handleBackButton(){
        return
    }

    return(
        <View>
            {eventNodes[index]}
            <Button onPress={handleOnPress} title="Press me"/>
            <Button onPress={handleBackButton} title="Back Button"/>
        </View>
    )
}

export default EventsList;