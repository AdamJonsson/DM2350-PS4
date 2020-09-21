import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as SurveyService from './services/SurveyService';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {
          SurveyService.getDoorDataInRandomOrder().map(door => 
            <a href={door.youtubeURL}>
              {door.youtubeURL}
            </a>
          )
        }
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Door survey
        </a>
      </header>
    </div>
  );
}

export default App;
