import { Text, View } from "react-native";
import EventItem from "./EventItem";

const EventsList = ({events}) => {

    const eventNodes = events.map((event) => {
      return <EventItem event={event}/>
    })

    return(
        <View>
                {eventNodes}
        </View>
    )
}

export default EventsList;