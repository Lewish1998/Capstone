import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Routes, Route } from "react-router-native";
import Home from './components/Home';
import AboutPage from './components/AboutPage';
import NavBar from './NavBar';
import ContactPage from './components/ContactPage';
import AccountSettings from './components/AccountSettings';
import MyEventsPage from './components/MyEventsPage';
import ParametersPage from './components/ParametersPage';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';


export default function App() {  
  
  const [events, setEvents] = useState([]);
  const [users,setUsers]=useState([]);
  const [javaEvents,setJavaEvents]=useState([]);
  const [user,setUser]=useState([]);
  const [refreshed, setRefreshed] = useState(false);
  const [userInterestEvent,setUserInterestedEvent]=useState([])

  useEffect(() => {
    Promise.all([getEvents(), getJavaEvents(), getUsers(), getUser()])
    .then(([eventsData, javaEventsData, usersData, userData])=>{
      setEvents(eventsData._embedded.events);
      setJavaEvents(javaEventsData);
      setUsers(usersData);
      setUser(userData);
    })
    .catch(error => {
      console.error(error);
    });
  }, [])


  useEffect(() => {
    updateJavaEvents()
  }, [refreshed])

  const clickRefresh =() => {
    setRefreshed(!refreshed);
  }
const setTheInterestedEvent=(event)=>{
  getUserInterested(event)
}
const getUser=async ()=>{
  try {
    const res = await fetch('http://127.0.0.1:8080/api/users/1');
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}
  const getUsers=async ()=>{
    try {
      const res = await fetch('http://127.0.0.1:8080/api/users');
      return await res.json();
    } catch (error) {
      console.error(error);
    }
  }
  const getJavaEvents=async ()=>{
    try {
      const res = await fetch('http://127.0.0.1:8080/api/events');
      return await res.json();
    } catch (error) {
      console.error(error);
    }
  }

  const updateJavaEvents=async ()=>{
    try {
      const res = await fetch('http://127.0.0.1:8080/api/events');
      return await res.json()
      .then((data) => setJavaEvents(data))
    } catch (error) {
      console.error(error);
    }
  }

  const getEvents = async () => {
    try {
      const res = await fetch('https://app.ticketmaster.com/discovery/v2/events.json?city=Edinburgh&apikey=S0uqfssCa1qWxQqMpnc9rKK8PGRwt4IZ');
      return await res.json();
    } catch (error) {
      console.error(error);
    }
  };

  const getUserInterested = async({id})=>{
    try {
      const res = await fetch('https://app.ticketmaster.com//discovery/v2/events/'+{id}+'.json?apikey=S0uqfssCa1qWxQqMpnc9rKK8PGRwt4IZ');
      return await res.json()
      .then((data)=>{setUserInterestedEvent(data)})
    } catch (error) {
      console.error(error);
    }
  }


  // routes

  // delete(url) {
  //   return fetch(url, {
  //     method: "DELETE",
  //     headers: {'Content-Type': 'application/json'}
  //   })
  // }


  const eventPost = (payload) => {
    return fetch('http://127.0.0.1:8080/api/events',{
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    }) 
  }

  const patch= ( payload,id) =>{
    return fetch('http://127.0.0.1:8080/api/events/'+ id, {
      method: "PATCH",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    })
  }

  // const EventPost= ('http://127.0.0.1:8080/api/events', payload) => {
  //   return fetch(url, {
  //     method: "POST",
  //     headers: {'Content-Type': 'application/json'},
  //     body: JSON.stringify(payload)
  //   })
  // }
  
  
  
  
  return (
    <NativeRouter>
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
      <View style={styles.container}>
        <NavBar/>
      <Routes>
        <Route path="/" element={<Home events={events}  user={user} eventPost={eventPost} patch={patch} javaEvents={javaEvents} clickRefresh={clickRefresh}/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
        <Route path="/events" element={<MyEventsPage user={user} setTheInterestedEvent={setTheInterestedEvent} userInterestEvent={userInterestEvent} />}/>
        <Route path="/paramaters" element={<ParametersPage/>}/>
        <Route path="/account" element={<AccountSettings/>}/>
      </Routes>
      </View>
    </LinearGradient>
    </NativeRouter>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height:'100%',
    width:'100%',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
});