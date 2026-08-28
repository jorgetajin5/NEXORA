import React from 'react';
import './Auth.css';

const AuthModal = ({ isOpen, onClose }) => {
    // Si el estado no es "isOpen", retornamos null para que el modal no exista en el DOM
    if (!isOpen) return null;

    return (
        // El overlay cubre toda la pantalla. Si el usuario hace clic aquí, se cierra el modal.
        <div className="modal-overlay" onClick={onClose}>
            
            {/* El stopPropagation evita que un clic dentro de la caja blanca cierre el modal accidentalmente */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                
                <button className="modal-close-btn" onClick={onClose}>
                    &times;
                </button>
                
                {/* Aquí inyectaremos los componentes de selección de rol o inicio de sesión más adelante */}
                <h2>Prueba: El modal está vivo</h2>
                
            </div>
        </div>
    );
};

export default AuthModal;