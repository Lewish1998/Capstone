import { Text, View } from "react-native";
import EventItem from "./EventItem";

const EventsList = ({events}) => {

    const eventNodes = events.map((event) => {
      return <EventItem event={event}/>
    })


    


    const index = 0

    return(
        <View >
                {eventNodes[index]}
        </View>
    )
}

export default EventsList;