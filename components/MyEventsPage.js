import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';

const MyEventsPage = ({ clickRefresh, refreshed, setUserInterestedEvents, user, userInterestedEvents, updateUserInterested, patchUser }) => {
  useEffect(() => {
    updateUserInterested();
  }, [refreshed]);

  async function handleDelete(id) {
    try {
      user.user_interested = userInterestedEvents.filter(interested => interested.id !== id);
      
      await patchUser(user, user.id);
      updateUserInterested();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  }

  const displayUserInterested = userInterestedEvents.map(interested => {
    return (
      <View key={interested.id}>
        <Text style={styles.textbox}>{interested.event_name}</Text>
        <Text style={styles.textbox}>{interested.event_date}</Text>
        <Text style={styles.textbox}>{interested.event_time}</Text>
        <Button onPress={() => handleDelete(interested.id).then(clickRefresh())} title="Remove" />
        <Button title="Info" />
        <Button title="Contact" />
      </View>
    );
  });

  return (
    <View style={styles.container}>
      {displayUserInterested}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 20,
    top: 120,
    height: 700,
    width: 400,
    padding: 10,
    backgroundColor: '#ffffff'
  },
  textbox: {
    margin: 5,
    fontSize: 16
  }
});

export default MyEventsPage;
