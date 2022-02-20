import React from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';

const Popup = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
            Go to <a href="https://poe.ninja/challenge/essences">poe.ninja/challenge/essences</a> or <a href="https://poe.ninja/challenge/fossils">poe.ninja/challenge/fossils</a>
        </p>
      </header>
    </div>
  );
};

export default Popup;
