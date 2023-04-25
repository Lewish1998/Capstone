import React, { useEffect,useState } from 'react';
import { Text, View, Button, StyleSheet, ScrollView} from 'react-native';

const MyEventsPage = ({ clickRefresh, user, patchUser }) => {
  useEffect(() => {
    clickRefresh();
  }, []);
 
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


    <View key={interested.id}>
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
  ));

  const displayUserGoing = user.user_going.map((going) => (
    <View key={going.id}>
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
  ));

  return <View style={styles.container}>

 
    <ScrollView>
    <Text style={{fontSize:30, textDecorationLine:'underline'}}>Going</Text>
    {displayUserGoing}
    <Text style={{fontSize:30, textDecorationLine:'underline'}}>Interested</Text>
  {displayUserInterested}
    </ScrollView>
    </View>;
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: 360,
    height: 600,
    top: 120,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#ffffff",
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 15,
    borderRadius: 20,
    padding:20
  },
  title:{
    fontSize:24,
    textAlign:'center',
    textDecorationLine:'underline'
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
  }
});

export default MyEventsPage;
