import React from 'react';
import './Auth.css';
import RoleSelect from './RoleSelect';

const AuthModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        // Si el usuario hace clic aquí, se cierra el modal.
        <div className="modal-overlay" onClick={onClose}>
            
            {/* stopPropagation evita que un clic dentro de la caja blanca cierre el modal accidentalmente */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                
                <button className="modal-close-btn" onClick={onClose}>
                    &times;
                </button>
                
                <RoleSelect/>
                

            </div>
        </div>
    );
};

export default AuthModal;