import React, { useEffect,useState } from 'react';
import { Text, View, Button, StyleSheet, ScrollView, Image, Linking} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLocationPin } from '@fortawesome/free-solid-svg-icons';

const MyEventsPage = ({ clickRefresh, user, patchUser, javaEvents }) => {

  const [myEventData, setMyEventData] = useState([]);
  const [contactable, setContactable] = useState(1);
  const [myEventContacts, setMyEventContacts] = useState([]);
  const [myEventContactLength, setMyEventContactLength] = useState(0);
  const [i, setI] = useState("")

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

  const handleInfo= (id) => {
    setI(id)
    setContactable(1)
    if(id === myEventData.id){
      setMyEventData([]);
    }else{
    fetch('https://app.ticketmaster.com/discovery/v2/events.json?id='+id+'&apikey=S0uqfssCa1qWxQqMpnc9rKK8PGRwt4IZ')
    .then(response => response.json())
    .then(json => setMyEventData(json._embedded.events[0]))
    .catch(error => console.error('Error fetching data:', error));
    
    const myEvent = javaEvents.find((javaEvent) => javaEvent.event_id === id);
    const contactList = myEvent.event_contact
    setMyEventContacts(contactList)
    refreshContacts()
    clickRefresh()
  }
}


  const goToContacts = () => {
    refreshContacts()
    setContactable(2)
  }

  const backToInfo = () => {
    setContactable(1)
  }

  const refreshContacts = () => {
    const myEvent = javaEvents.find((javaEvent) => javaEvent.event_id === i);
    const contactList = myEvent.event_contact
    setMyEventContacts(contactList)
    setMyEventContactLength(contactList.length)
  }


console.log(contactable)

  loadInBrowser = () => {
    Linking.openURL(myEventData.url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

  const displayUserInterested = user.user_interested.map((interested) => (
    <View key={interested.id} style={{paddingBottom:20, shadowColor:'black', shadowRadius:10, shadowOffset:{width:0, height:0}, shadowOpacity:0.8}}>
     { myEventData.id != interested.event_id ? (
    <View  >
    

    <View style={{borderWidth:1, borderRadius:15,backgroundColor:'white' }} >
   
      <Text style={styles.title} >{interested.event_name}</Text>
      <Text style={styles.text} >{interested.event_date}</Text>
      <Text style={styles.text}>{interested.event_time}</Text>
      <View style={styles.buttons}>
      <Button onPress={() => handleDelete(interested.id)} title="Remove" />
      <Button title="Going" onPress={() => handleGoing(interested.id)}  />
      <Button title="Contact" onPress={() => handleContact(interested.id)}/>
      <Button title='Info' onPress={()=> handleInfo(interested.event_id)} />
      </View>
    
    </View> 
  
    </View>
 ): contactable === 1 ?(<View>

       
        <Text style={styles.title} >{interested.event_name}</Text>
        <Image style={{height: 90, width: 160, top: 10, bottom: 50,}} source={myEventData.images[1]}></Image>
      <Text style={styles.text} >Date: {interested.event_date}</Text>
      <Text style={styles.text}>Time: {interested.event_time}</Text>
      <Text style={styles.text}>Venue: {myEventData._embedded.venues[0].name}</Text>
      <Text style={styles.text}>Status: {myEventData.dates.status.code}</Text> 
      <Button onPress={goToContacts} title={`Who's going?: ${myEventContacts.length}`}/>
      <Button onPress={loadInBrowser} title="BUY TICKETS" />
      <View style={styles.buttons}>
      <Button onPress={() => handleDelete(interested.id)} title="Remove" />
      <Button title="Going" onPress={() => handleGoing(interested.id)}  />
      <Button title="Contact" onPress={() => handleContact(interested.id)}/>
      <Button title='Info' onPress={()=> handleInfo(interested.event_id)} />
      </View>

    </View>):(
      <View>
      <View>
            {myEventContacts.length > 0 ? (
              myEventContacts.map((contact) => (
                <View key={contact.id}>
                  <Text>Name: {contact.name}</Text>
                  <Text>Email: {contact.email}</Text>
                </View>
              ))
            ) : (
              <Text>No contacts found.</Text>
            )}
          </View>
      <Button onPress={backToInfo} title="Back to info" />
      </View>
    )}
    </View>
   
  ));

  // GOING
  const displayUserGoing = user.user_going.map((going) => (
    <View key={going.id} style={{paddingBottom:20, shadowColor:'black', shadowRadius:10, shadowOffset:{width:0, height:0}, shadowOpacity:0.8}}>
     { myEventData.id != going.event_id ? (
    <View style={{borderWidth:1, borderRadius:15,backgroundColor:'white' }} >
      <Text style={styles.title}>{going.event_name}</Text>
      <Text style={styles.text}>{going.event_date}</Text>
      <Text style={styles.text}>{going.event_time}</Text>
      <View style={styles.buttons}>
      <Button onPress={() => handleDelete(going.id)} title="Remove" />
      <Button title="Not Going" onPress={() => handleNotGoing(going.id)} />
      <Button title="Contact" onPress={() => handleContact(going.id)} />
      <Button title='Info' onPress={()=>handleInfo(going.event_id)}/>
      </View>
    </View>
    ): contactable === 1 ? (<View >
      <Text style={styles.title} >{going.event_name}</Text>
        <Image style={{height: 90, width: 160, top: 10, bottom: 50,}} source={myEventData.images[1]}></Image>
      <Text style={styles.text} >Date: {going.event_date}</Text>
      <Text style={styles.text}>Time: {going.event_time}</Text>
      <Text style={styles.text}>Venue: {myEventData._embedded.venues[0].name}</Text>
      <Text style={styles.text}>Status: {myEventData.dates.status.code}</Text> 
      <Button onPress={goToContacts} title={`Who's going?: ${myEventContacts.length}`}/>
      <Button onPress={loadInBrowser} title="BUY TICKETS" />
      <View style={styles.buttons}>
      <Button onPress={() => handleDelete(going.id)} title="Remove" />
      <Button title="Going" onPress={() => handleGoing(going.id)}  />
      <Button title="Contact" onPress={() => handleContact(going.id)}/>
      <Button title='Info' onPress={()=> handleInfo(going.event_id)} />
      </View>
    
    
     </View>):(
      <View>
      <View>
            {myEventContacts.length > 0 ? (
              myEventContacts.map((contact) => (
                <View key={contact.id}>
                  <Text>Name: {contact.name}</Text>
                  <Text>Email: {contact.email}</Text>
                </View>
              ))
            ) : (
              <Text>No contacts found.</Text>
            )}
          </View>
      <Button onPress={backToInfo} title="Back to info" />
      </View>
    )}
    </View>
    
    
  ));

  
  return (
    // Location information
  <View >

  <Text style={styles.location}>
      <View>
        <FontAwesomeIcon icon={faLocationPin} size={22} color={'#6026F0'}/>
      </View>
    {user.location}
  </Text>
  
  <View style={[styles.container]}>
    <View>
      <Image source={require("../images/Oot'N'Aboot-logos_black.png")} style={{position:'absolute', width: 120, height: 80, left:110, bottom:20}}/>
    </View>
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
    fontSize: 22,
    color: "white",
    fontWeight:'bold',
    paddingLeft:5
  },
  
});

export default MyEventsPage;
