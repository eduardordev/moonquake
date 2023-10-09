// Sidebar.js
import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './sidebar.css';
import Modal from '../modal/modal';

function Sidebar({ isOpen, toggleSidebar }) {
  const [isButOpen, setIsButOpen] = useState(false);
  const getDateFromDayOfYear = (year, dayOfYear) => {
    let date = new Date(year, 0); // 0 es enero
    date.setDate(dayOfYear); // Establece la fecha al día del año especificado
    return date;
  }

  const resultDate = getDateFromDayOfYear(1972, 192);
  console.log(resultDate);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuake, setSelectedQuake] = useState(null);

  const handleQuakeClick = (quake) => {
    setSelectedQuake(quake);
    setIsModalOpen(true);

    
  };

  


  const [quakes, setQuakes] = useState([]);
  const getAllQuakes = () => {
    axios.get('http://3.19.185.171:5000/api/v1/quakes')
      .then((response) => {
        console.log("Response", response.data);
        setQuakes(response.data.map(index => {
          return {
            id: index._id,
            date: getDateFromDayOfYear(index.year, index.day),
            magnitude: index.magnitude,
            latitude: index.latitude+'.'+index.longitude,
            time: index.hour + ':' + index.minute + ':' + index.seconds
          }
        }))
        console.log(quakes)

      }).catch((err) => {
        console.error(err)
      })
  };

  useEffect(() => {
    getAllQuakes()
  }, []);

  useEffect(() => {
    if (quakes.length) {
      console.log(quakes);
    }
  }, [quakes]);

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''} fadeIn`}>
      {isOpen && (
        <ul className="menu-list">
          {quakes.map(quake => (
            <li key={quake.id} onClick={() => handleQuakeClick(quake)}>
              Date: {quake.date.toLocaleDateString()} - Magnitude: {quake.magnitude} - Time: {quake.time}  {/* A modo de ejemplo, aquí mostraré solo la fecha */}
            </li>
          ))}
        </ul>
      )}

      <Modal isOpen={isModalOpen} quake={selectedQuake} onClose={() => setIsModalOpen(false)} />
      <button className="menu-button" onClick={toggleSidebar}>
        {isOpen ?
          <FaTimes className={`icon ${isButOpen ? 'rotate' : ''}`} onClick={() => setIsButOpen(false)} size={30} /> :
          <FaBars className={`icon ${isButOpen ? 'rotate' : ''}`} onClick={() => setIsButOpen(true)} size={30} />}
      </button>
      
    </div>
  );
}


export default Sidebar;
