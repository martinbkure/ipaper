import React, { useState, useEffect } from 'react';
import './App.css';
import ReactSlider from 'react-slider';
import FontRenderer from './FontRendere';

function calculateFlipBooksPrice(flipBooks: number): number {
  let calculatedPrice: number = 0;
  let i: number;
  for (i = 1; i <= flipBooks; i++) {
    if(i < 6) {
      calculatedPrice += 5;
    } else if (i > 5 && i < 11) {
      calculatedPrice += 2;
    } else {
      calculatedPrice += 1;
    }
  }
  return calculatedPrice;
}

function calculateIncludedSessions(flipBooks: number): number {
  let sessions: number = 0;
  let i: number;
  for (i = 1; i <= flipBooks; i++) {
    if(i < 6) {
      sessions += 2000;
    } else if (i > 5 && i < 11) {
      sessions += 1000;
    } else {
      sessions += 250;
    }
  }
  return sessions;
}

function calculateExtraSessionsPrice(sessions: number): number {
  let calculatedPrice: number = 0;
  let i: number;

  // include sessions that doesn't add up to 1000
  const sessionNotEqualToThousand: number = sessions % 1000; 
  const counter: number = sessionNotEqualToThousand > 0 ? sessions + (1000 - sessionNotEqualToThousand) : sessions;

  for (i = 1000; i <= counter; i+=1000) {
    if(i < 11000) {
      calculatedPrice += 1.5;
    } else if (i > 10000 && i < 51000) {
      calculatedPrice += 1;
    } else {
      calculatedPrice += 0.75;
    }
  }
  return calculatedPrice;
}

function App() {

  const [flipBooks, setFlipBooks] = useState<number>(1);
  const [sessions, setSessions] = useState<number>(1000);
  const [price, setPrice] = useState<number>(5);

  useEffect(() => {
    
    let sessionsPrice = 0;
    const flipBooksPrice: number = calculateFlipBooksPrice(flipBooks);
    const includedSessions: number = calculateIncludedSessions(flipBooks);
    if(includedSessions < sessions){
      sessionsPrice = calculateExtraSessionsPrice(sessions - includedSessions);
    }

    setPrice(flipBooksPrice + sessionsPrice);
  }, [sessions, flipBooks]);

  return (
    <div className="App">
      <div>
        <label>iPapers needed:</label>
        <ReactSlider
          step={ 1 }
          min={ 1 }
          className="horizontal-slider"
          defaultValue={ flipBooks }
          thumbClassName="example-thumb"
          trackClassName="example-track"
          onChange={val => setFlipBooks(val as number)}
          renderThumb={(props, _) => <div {...props}>{flipBooks}</div>}
        />
      </div>
      <div>
        <label>Expected visitors pr month:</label>
        <ReactSlider
            className="horizontal-slider"
            step={ 1000 }
            min={ 1000 }
            max={ 100000 }
            defaultValue={ sessions }
            thumbClassName="example-thumb"
            trackClassName="example-track"
            onChange={val => setSessions(val as number)}
            renderThumb={(props, _) => <div {...props}>{sessions}</div>}
        />
      </div>

      <p>Your price: € <span style={{ fontWeight: 'bold' }}>{ price}/month</span></p>


      <FontRenderer></FontRenderer>
    </div>
  );
}

export default App;
