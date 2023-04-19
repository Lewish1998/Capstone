import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Routes, Route, json} from "react-router-native";
import Home from './components/Home';
import AboutPage from './components/AboutPage';
import NavBar from './NavBar';
import ContactPage from './components/ContactPage';
import AccountSettings from './components/AccountSettings';
import MyEventsPage from './components/MyEventsPage';
import ParametersPage from './components/ParametersPage';
import { useState, useEffect } from 'react';




export default function App() {  
  
  const [events, setEvents] = useState([]);
  const [users,setUsers]=useState([]);
  const [javaEvents,setJavaEvents]=useState([]);
  const [user,setUser]=useState([]);
  const [refreshed, setRefreshed] = useState(false);



  useEffect(() => {    
    getEvents()
    getJavaEvents()
    getUsers()
    getUser()
   
  }, [])

  useEffect(() => {    

    getJavaEvents()

   
  }, [refreshed])

  const clickRefresh =() => {
    setRefreshed(!refreshed);
  }



const getUser=()=>{
  return fetch('http://127.0.0.1:8080/api/users/1')
  .then(res=>res.json())
  .then(data=>setUser(data)
  )
  .catch(error => {
    console.error(error);
  });
}

  const getUsers=()=>{
    return fetch('http://127.0.0.1:8080/api/users')
    .then(res=>res.json())
    .then(json=>setUsers(json))

    .catch(error => {
      console.error(error);
    });
  }
  const getJavaEvents=()=>{
    return fetch('http://127.0.0.1:8080/api/events')
    .then(res=>res.json())
    .then(json=>setJavaEvents(json)
    )
    .catch(error => {
      console.error(error);
    });
  }


  const getEvents = () => {
    return fetch('https://app.ticketmaster.com/discovery/v2/events.json?city=Edinburgh&apikey=S0uqfssCa1qWxQqMpnc9rKK8PGRwt4IZ')
    .then(res => res.json())
    .then(json => setEvents(json._embedded.events)
)
    .catch(error => {
      console.error(error);
    });
  };



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
      <View style={styles.container}>
        <NavBar/>
      <Routes>
        <Route path="/" element={<Home events={events}  user={user} eventPost={eventPost} patch={patch} javaEvents={javaEvents} fetch={clickRefresh}/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
        <Route path="/events" element={<MyEventsPage/>}/>
        <Route path="/paramaters" element={<ParametersPage/>}/>
        <Route path="/account" element={<AccountSettings/>}/>
      </Routes>
      </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
