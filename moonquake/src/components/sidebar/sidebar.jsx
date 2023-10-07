// Sidebar.js
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './sidebar.css';

function Sidebar({ isOpen, toggleSidebar }) {
  const [isButOpen, setIsButOpen] = useState(false);
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''} fadeIn`}>
      <button className="menu-button" onClick={toggleSidebar}>
        {isOpen ?
          <FaTimes className={`icon ${isButOpen ? 'rotate' : ''}`} onClick={() => setIsButOpen(false)} size={30} /> :
          <FaBars className={`icon ${isButOpen ? 'rotate' : ''}`} onClick={() => setIsButOpen(true)} size={30} />}
      </button>
      {isOpen && (
        <ul className="menu-list">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          
        </ul>
      )}
    </div>
  );
}


export default Sidebar;
