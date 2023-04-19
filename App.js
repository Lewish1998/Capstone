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
import { LinearGradient } from 'expo-linear-gradient';





export default function App() {  
  
  const [events, setEvents] = useState([]);
  const [users,setUsers]=useState([]);
  const [javaEvents,setJavaEvents]=useState([]);
  const [user,setUser]=useState([]);



  useEffect(() => {    
    getEvents()
    getJavaEvents()
    getUsers()
    getUser()
    console.log(user);
  }, [])

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
  
  
  return (
    <NativeRouter>
      <View style={styles.container}>
        <NavBar/>
        <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}>
      <Routes>
        <Route path="/" element={<Home events={events}/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
        <Route path="/events" element={<MyEventsPage/>}/>
        <Route path="/paramaters" element={<ParametersPage/>}/>
        <Route path="/account" element={<AccountSettings/>}/>
      </Routes>
      </LinearGradient>

      </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    height:'100%',
    width:'100%',
    // top:85,
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
