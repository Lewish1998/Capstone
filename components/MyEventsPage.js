import React, { useEffect,useState } from 'react';
import { Text, View, Button, StyleSheet, ScrollView} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLocationPin } from '@fortawesome/free-solid-svg-icons';

const MyEventsPage = ({ clickRefresh, user, patchUser }) => {
  useEffect(() => {
    clickRefresh();
    console.log(user.location)
  }, []);

  console.log(user.location)
 
  const handleDelete = async (id) => {
    try {
      const updatedUser = { ...user };
      updatedUser.user_interested = updatedUser.user_interested.filter(
        (interested) => interested.id !== id
      );
      updatedUser.user_going=updatedUser.user_going.filter(
        (going)=>going.id!==id)
        updatedUser.user_contact=updatedUser.user_contact.filter(
          (contact)=>contact.id!==id)
      await patchUser(updatedUser, user.id);
      clickRefresh();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleGoing = async (id) => {
    try {
      const updatedUser = { ...user };
      const eventSwapped = updatedUser.user_interested.find(event => event.id === id);
      updatedUser.user_interested = updatedUser.user_interested.filter(
        (interested) => interested.id !== id
      );
      updatedUser.user_going = [...updatedUser.user_going, eventSwapped];
      await patchUser(updatedUser, user.id);
      clickRefresh();
    } catch (error) {
      console.error('Error moving event to "Going":', error);
    }
  };
  
  const handleNotGoing = async (id) => {
    try {
      const updatedUser = { ...user };
      const eventSwapped = updatedUser.user_going.find(event => event.id === id);
      updatedUser.user_going = updatedUser.user_going.filter(going => going.id !== id);
      updatedUser.user_interested = [...updatedUser.user_interested, eventSwapped];
      await patchUser(updatedUser, user.id);
      clickRefresh();
    } catch (error) {
      console.error('Error moving event to "Interested":', error);
    }
  };

  const handleContact = async (id) => {
    try {
      const updatedUser = { ...user };
      console.log(updatedUser.user_going.some(event => event.id === id))
      if (updatedUser.user_contact.some(event => event.id === id)) {
        updatedUser.user_contact = updatedUser.user_contact.filter(contact => contact.id !== id);
        await patchUser(updatedUser, user.id);
        clickRefresh();
      } else {
        if (updatedUser.user_going.some(event => event.id === id)) {
          const eventSwapped = updatedUser.user_going.find(event => event.id === id);
          updatedUser.user_contact = [...updatedUser.user_contact, eventSwapped];
          await patchUser(updatedUser, user.id);
          clickRefresh();
        } else {
          const eventSwapped = updatedUser.user_interested.find(event => event.id === id);
          updatedUser.user_contact = [...updatedUser.user_contact, eventSwapped];
          await patchUser(updatedUser, user.id);
          clickRefresh();
        }
        
      }
    } catch (error) {
      console.error('Error moving event to "Interested":', error);
    }
  }
  

  [open,setOpen]=useState(true)

  onClickMoreInfo=async()=>{
    console.log(open)
  setOpen(!open)
  console.log(open);
  }

  const displayUserInterested = user.user_interested.map((interested) => (

    <View style={{paddingBottom:20, shadowColor:'black', shadowRadius:10, shadowOffset:{width:0, height:0}, shadowOpacity:0.8}}>
    <View style={{borderWidth:1, borderRadius:15,backgroundColor:'white' }} key={interested.id}>
      <Text style={styles.title} >{interested.event_name}</Text>
      <Text style={styles.text} >{interested.event_date}</Text>
      <Text style={styles.text}>{interested.event_time}</Text>
      <View style={styles.buttons}>
      <Button onPress={() => handleDelete(interested.id)} title="Remove" />
      <Button title="Going" onPress={() => handleGoing(interested.id)}  />
      <Button title="Contact" onPress={() => handleContact(interested.id)}/>
      <Button title='Info' onPress={()=>{onClickMoreInfo}} />
      </View>
    </View>
    </View>
  ));

  // GOING
  const displayUserGoing = user.user_going.map((going) => (
    <View style={{paddingBottom:20, shadowColor:'black', shadowRadius:10, shadowOffset:{width:0, height:0}, shadowOpacity:0.8}}>
    <View style={{borderWidth:1, borderRadius:15,backgroundColor:'white' }} key={going.id}>
      <Text style={styles.title}>{going.event_name}</Text>
      <Text style={styles.text}>{going.event_date}</Text>
      <Text style={styles.text}>{going.event_time}</Text>
      <View style={styles.buttons}>
      <Button onPress={() => handleDelete(going.id)} title="Remove" />
      <Button title="Not Going" onPress={() => handleNotGoing(going.id)} />
      <Button title="Contact" onPress={() => handleContact(going.id)} />
      <Button title='Info' onPress={()=>{onClickMoreInfo}}/>
      </View>
    </View>
    </View>
  ));

  return (
    // Location information
  <View >
    <Text style={styles.location}>
      <View>
        <FontAwesomeIcon icon={faLocationPin} size={18}/>
      </View>
      {user.location}
    </Text>
  
  <View style={[styles.container, ]}>
    <ScrollView>
    <View style={{backgroundColor:'#2894FA', borderRadius:25, marginBottom:10,}}>
      <Text style={{color:'white', fontSize:30, fontWeight:'bold', paddingBottom:10, textAlign:'center', top:3}}>Going</Text>
    </View>
    {displayUserGoing}
    <View style={{backgroundColor:'#2894FA', borderRadius:25, marginBottom:10,}}>
    <Text  style={{color:'white', fontSize:30, fontWeight:'bold', paddingBottom:10, textAlign:'center', top:3}}>Interested</Text>
    </View>
  {displayUserInterested}

    </ScrollView>
    </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: 360,
    height: 670,
    top: 120,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#ffffff",
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 15,
    borderRadius: 20,
    padding:20,
  },
  title:{
    fontSize:24,
    textAlign:'center',
    textDecorationLine:'underline',
  },
  text:{
    fontSize:20,
    textAlign:'center',
    padding:3
  },
  buttons:{
    flex:4,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  }, 
  location: {
    position: 'absolute',
    top: 80,
    left: 10,
    fontSize: 20,
    color: "black",
    textDecorationLine: 'underline'
  },
});

export default MyEventsPage;
