import { Text, View, Button } from "react-native";
import EventItem from "./EventItem";
import { useState, useRef, useMemo } from "react";
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
    // let test = events;


    return(

        <Text>Test</Text>
    )
}

export default EventsList;