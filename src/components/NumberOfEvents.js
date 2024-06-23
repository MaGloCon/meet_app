import { useState } from 'react';

const NumberOfEvents = ( { setCurrentNumberOfEvents, setErrorAlert } ) => {
  const [number, setNumber] = useState('32');

  const handleInputChanged = (event) => {
    const value = event.target.value.trim();
    if (value === '') {
      setErrorAlert("Please enter a number");
      setNumber('')
    } else if (isNaN(value)) {
      setErrorAlert('Please enter a valid number.');
    } else if (value <= 0) {
      setErrorAlert('Please enter a number greater than 0.');
    } else if (value > 100) {
      setErrorAlert('Number of events cannot exceed 100.');
    } else {
      setErrorAlert(''); 
      setNumber(value); 
      setCurrentNumberOfEvents(parseInt(value)); 
    }
  }

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-input">Number of Events: </label>
      <input 
      type="text"
      id="number-of-events-input"
      className="number-of-events-input"
      value={number}
      onChange={handleInputChanged}
      />
    </div>
  );
}

export default NumberOfEvents;