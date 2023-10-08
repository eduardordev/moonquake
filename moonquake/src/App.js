// App.js
import React, { useState, useEffect } from 'react';
import Sidebar from './components/sidebar/sidebar';
import './App.css';
import ModelViewer from './components/moon_model/moon';
import axios from 'axios';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isStarted, setIsStarted] = useState(false);


  const getAllQuakes = () => {
    axios.get('http://localhost:5000/api/v1/quakes')
      .then((response) => {
        console.log("Response", response.data);
      }).catch((err) => {
        console.error(err)
      })
  };



  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleTitlePosition = () => {
    const title = document.getElementById('moonquakeTitle');
    const button = document.querySelector('.startButton');

    title.classList.toggle('moveUp');
    button.classList.add('fadeOut');

    button.addEventListener('transitionend', () => {
      setShowButton(false);
      setShowSidebar(true);
      setIsStarted(true);


      button.classList.add('hidden');
    }, { once: true });
  };

  useEffect(() => {
    console.log(isStarted); // Imprimir el valor actualizado del estado
  }, [isStarted]);

  return (
    <div className="App">
      <div className="center-container">
        <div className={`title ${showButton ? '' : 'moveUp'}`} id="moonquakeTitle">MOONQUAKE VISOR MAP</div>
        {showButton && (
          <button
            onClick={() => {
              getAllQuakes()
              toggleTitlePosition()
            }}
            className="startButton">
            START ➔
          </button>
        )}
      </div>
      <div className={`model ${isStarted ? 'fade-in' : ''}`}>
        <ModelViewer />
        {!isStarted && <div className="overlay fade-out"></div>}
      </div>
      {showSidebar && (
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} className="fadeIn" />
      )}

    </div>
  );
}

export default App;
