import React from 'react';
import { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './API';

import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [currentNumberOfEvents, setCurrentNumberOfEvents] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const allEvents = await getEvents();
        const filteredEvents = currentCity === "See all cities" ?
          allEvents :
          allEvents.filter(event => event.location === currentCity)
        setEvents(filteredEvents.slice(0, currentNumberOfEvents));
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    }
    fetchEvents();
  }, [currentCity, currentNumberOfEvents]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const allEvents = await getEvents();
        setAllLocations(extractLocations(allEvents));
      } catch (error) {
        console.error("Error fetching locations: ", error);
      }
    }
    fetchLocations();
  }, []);
  
  return (
    <div className="App">
      <div className="App-header">
        <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
        <NumberOfEvents setCurrentNumberOfEvents={setCurrentNumberOfEvents} />
      </div>
      <EventList events={events}/>
    </div>
  );
}

export default App;
