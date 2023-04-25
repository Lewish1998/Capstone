import { StyleSheet, Text, View, Image } from 'react-native';
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
import Params from './Params';

const date = new Date();
const withoutMs = date.toISOString().split('.')[0] + 'Z';

export default function App() {  

  // stops all console logs
  // console.log = function() {}

  const [events, setEvents] = useState([]);
  const [javaEvents,setJavaEvents]=useState([]);
  const [user,setUser]=useState([]);
  const [refreshed, setRefreshed] = useState(false);
  const [searchInput, setSearchInput] = useState('')
  const [userLocation,setUserLocation]=useState("Glasgow")



  useEffect(() => {
    Promise.all([ getUser(), getJavaEvents()])
    .then(([userData, javaEventsData])=>{
      setUser(userData);
      setJavaEvents(javaEventsData);
    })
    .catch(error => {
      console.error(error);
    });
  }, [])

  useEffect(() => {
    Promise.all([getJavaEvents(), getUser(), getUpdatedEvents(userLocation,withoutMs)])
    .then(([javaEventsData,userData, updatedEventData])=>{
    setJavaEvents(javaEventsData)
    setUser(userData)
    setEvents(updatedEventData._embedded.events)
    })    .catch(error => {
      console.error(error);
    });
  }, [refreshed])

  useEffect(() => {
    setSearchInput(user.location)
  }, [])

  const clickRefresh =() => {
    setRefreshed(!refreshed);
  }

const getUser=async ()=>{
  try {
    const res = await fetch('http://127.0.0.1:8080/api/users/1');
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

  const eventPost = (payload) => {
    return fetch('http://127.0.0.1:8080/api/events',{
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    }) 
  }

  const patch = (payload, id) =>{
    return fetch('http://127.0.0.1:8080/api/events/'+ id, {
      method: "PATCH",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    })
  }

  // updates user
  const patchUser=(payload,id)=>{
    return fetch('http://127.0.0.1:8080/api/users/'+ id, {
      method: "PATCH",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    })
  }

  const getUpdatedEvents = async (location,withoutMs) => {
    if(location){
    try {
      const res = await fetch('https://app.ticketmaster.com/discovery/v2/events.json?startdateTime='+withoutMs+'&sort=date,asc&size=70&city='+location+'&apikey=S0uqfssCa1qWxQqMpnc9rKK8PGRwt4IZ')
      return await res.json();
    } 
    catch (error) {
      console.error(error);
    }
  }    else{    try {
    const res = await fetch('https://app.ticketmaster.com/discovery/v2/events.json?sort=date,asc&size=70&city=Edinburgh&apikey=S0uqfssCa1qWxQqMpnc9rKK8PGRwt4IZ')
    return await res.json();
  } 
  catch (error) {
    console.error(error);
  }}};

  
  
  
  return (
    <NativeRouter>
      <LinearGradient colors={['#56DCFC', '#4C9DE0', '#608BF7', '#4C4FE0', '#7F56FC']} style={styles.linearGradient}>
      <View style={styles.container}>
      <Image source={require("./images/Oot'N'Aboot-logos_black.png")} style={{position:'absolute', width: 100, height: 80, top: 30}}/>
        <NavBar onclick={clickRefresh}/>
        <Params/>
      <Routes>
        <Route path="/" element={<Home events={events}  user={user} eventPost={eventPost} patch={patch} javaEvents={javaEvents} clickRefresh={clickRefresh}/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
        <Route path="/events" element={<MyEventsPage clickRefresh={clickRefresh}  user={user} patchUser={patchUser}  />}/>
        <Route path="/paramaters" element={<ParametersPage  clickRefresh={clickRefresh} user={user} patchUser={patchUser} setUserLocation={setUserLocation}/>}/>
        <Route path="/account" element={<AccountSettings/>}/>
      </Routes>
      </View>
    </LinearGradient>
    </NativeRouter>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
});