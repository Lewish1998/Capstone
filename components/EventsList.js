import { Text, View, Button, StyleSheet, Pressable, SafeAreaView, TouchableOpacity } from "react-native";
import EventItem from "./EventItem";
import { useState, useEffect } from "react";


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

    




    return(
        <View>
            {eventNodes[index]}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleOnPressBack} title="Back">
                    <Text style={{fontSize:20}}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleOnPress} title="Next">
                    <Text style={{fontSize:20}}>Next</Text>
                </TouchableOpacity>
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
        borderWidth:0,
        width: 70,
        height:50,
        display:'flex',
        alignItems: 'center',
        borderRadius:20,
        justifyContent: 'center',
        backgroundColor: '#666666',
    }

});

export default EventsList;