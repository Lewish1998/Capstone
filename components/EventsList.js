import { Text, View } from "react-native";
import EventItem from "./EventItem";
import { useState } from "react";

const EventsList = ({events}) => {

    let eventNodes = events.map((event) => {
        return <EventItem event={event} increaseCounter={increaseCounter}/>
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
        <View >
            {eventNodes[index]}
        </View>
    )
}

export default EventsList;