import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Routes, Route} from "react-router-native";
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

  useEffect(() => {    getEvents()
    console.log(events)
  }, [])

  const getEvents = () => {
    return fetch('https://app.ticketmaster.com/discovery/v2/events.json?apikey=S0uqfssCa1qWxQqMpnc9rKK8PGRwt4IZ')
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
      <Routes>
        <Route path="/" element={<Home events={events}/>}/>
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
