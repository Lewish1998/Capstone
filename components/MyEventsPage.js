import React from 'react'
import { Text, View, Image, Button, StyleSheet } from "react-native";
import { useState, useEffect } from 'react';

const MyEventsPage = ({user,userInterestEvent,setTheInterestedEvent}) => {

  // console.log(user.user_interested[0].event_name);
const displayUserInterested=user.user_interested.map((interested)=>{
    return<View key={interested.id} >
{/* {console.log(interested.name)} */}
      <Text style={styles.textbox}>{interested.event_name}</Text>
      <Text style={styles.textbox}>{interested.event_date}</Text>
      <Text style={styles.textbox}>{interested.event_time}</Text>
      <Button title='Delete'/>     
      <Button title='Going'/>
      <Button title='Contact'/>

    </View>
  })

  return (
    <View style={styles.container}>
      <Text>{displayUserInterested}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

    flexWrap:"wrap",
    minWidth: "90%",
    maxWidth: "90%",
    maxHeight: "90%",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 5,
    backgroundColor: "gray",
    bottom:200
  },

  image: {
    width: "80%",
    height: "80%",
  },
  textbox:{
    flex:20,
    flexDirection:"column",
    width:"100%",
    borderColor: "black",
    borderWidth: 5,
    backgroundColor: "gray",
    justifyContent: "space-around",
    alignContent:"stretch"
  
  },
});
export default MyEventsPage;
