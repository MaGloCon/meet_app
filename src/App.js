import React from 'react';
import { useState, useEffect, useCallback } from 'react';

import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';

import { extractLocations, getEvents } from './API';

import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [currentNumberOfEvents, setCurrentNumberOfEvents] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  const fetchEvents = useCallback(async () => {
    try {
      const allEvents = await getEvents();
      const filteredEvents = currentCity === "See all cities" 
        ? allEvents 
        : allEvents.filter(event => event.location === currentCity);
      setEvents(filteredEvents.slice(0, currentNumberOfEvents));
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  }, [currentCity, currentNumberOfEvents]); 

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert("");
    } else {
      setWarningAlert("You are offline. The displayed list may not be up to date.");
    }
    fetchEvents();
  }, [fetchEvents]);
  
  
const fetchLocations = async () => {
      try {
        const allEvents = await getEvents();
        setAllLocations(extractLocations(allEvents));
      } catch (error) {
        console.error("Error fetching locations: ", error);
      }
    }

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div className="App">
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert}/> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert}/> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert}/> : null}
      </div>
      <div className="App-header">
        <CitySearch 
          allLocations={allLocations} 
          setCurrentCity={setCurrentCity}
          setInfoAlert={setInfoAlert}
        />
        <NumberOfEvents 
          setCurrentNumberOfEvents={setCurrentNumberOfEvents}
          setErrorAlert={setErrorAlert}
        />
      </div>
      <EventList events={events}/>
    </div>
  );
}

export default App;
