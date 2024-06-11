import mockData from './mock-data';

// @param {*} events: array of events to extract locations
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

//fetch list of all events
export const getEvents = async () => {
  return mockData;
};