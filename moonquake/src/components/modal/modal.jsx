// Modal.js
import React from 'react';
import './modal.css';

function Modal({ isOpen, quake, onClose }) {
    if (!isOpen) return null;

    const handleOutsideClick = (e) => {
        if (e.target.className === 'modal-overlay') {
            onClose();
        }
    }

    return (

        <div className="modal-content">
            <button onClick={() =>
                onClose
            }>Cerrar</button>
            <h2>Moonquake Details</h2>
            <p><strong>Date:</strong> {quake.date.toString()}</p>
            <p><strong>Magnitude:</strong> {quake.magnitude}</p>
            <p><strong>Location:</strong> {quake.latitude}</p>
            <p><strong>Time:</strong> {quake.time}</p>
        </div>

    );
}

export default Modal;
