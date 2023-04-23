import React, { useEffect } from 'react';
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


  const displayUserInterested = user.user_interested.map((interested) => (
    <View key={interested.id}>
      <Text style={styles.textbox}>{interested.event_name}</Text>
      <Text style={styles.textbox}>{interested.event_date}</Text>
      <Text style={styles.textbox}>{interested.event_time}</Text>
      <Button onPress={() => handleDelete(interested.id)} title="Remove" />
      <Button title="Going" onPress={() => handleGoing(interested.id)}  />
      <Button title="Contact" />
    </View>
  ));

  const displayUserGoing = user.user_going.map((going) => (
    <View key={going.id}>
      <Text style={styles.textbox}>{going.event_name}</Text>
      <Text style={styles.textbox}>{going.event_date}</Text>
      <Text style={styles.textbox}>{going.event_time}</Text>
      <Button onPress={() => handleDelete(going.id)} title="Remove" />
      <Button title="Not Going" onPress={() => handleNotGoing(going.id)} />
      <Button title="Contact" />
    </View>
  ));

  return <View style={styles.container}>
 
    <ScrollView style={styles.scrollView}>
    <Text>Going</Text>
    <View>{displayUserGoing}</View>
    <Text></Text>
    <Text>Interested</Text>
    <View>{displayUserInterested}</View>
    </ScrollView>
    </View>;
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 20,
    top: 120,
    height: 700,
    width: 400,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  textbox: {
    margin: 5,
    fontSize: 16,
  },
});

export default MyEventsPage;
