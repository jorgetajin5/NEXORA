
import React, { useState } from 'react';
import './Auth.css';
import RoleSelect from './RoleSelect';
import LoginForm from './LoginForm';

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {

    const [view, setView] = useState('roleSelect'); // seleccion del rol
    const [selectedRole, setSelectedRole] = useState(null); // guarda el rol "docente", etc.

    if (!isOpen) return null;

    // función para avanzar al login
    const handleRoleSelection = (roleId) => {
        setSelectedRole(roleId); // guarda el rol del usuario
        setView('login'); //cambia la vista al login
    };

    const handleClose = () => {
        setView('roleSelect');
        setSelectedRole(null);
        onClose();
    }

    return (
        <div className="modal-overlay" onClick={handleClose}>
            {/*clase extra si estamos en la vista de login */}
            <div className={`modal-content ${view === 'login' ? 'is-login-view' : ''}`} onClick={(e) => e.stopPropagation()}>
                
                <button className="modal-close-btn" onClick={handleClose}>
                    &times;
                </button>
                
                {/*  Si la vista es roleSelect, muestra las tarjetas o formulario*/}
                {view === 'roleSelect' ? (
                    <RoleSelect onRoleSelected={handleRoleSelection} />
                ) : (
                    <LoginForm 
                        role={selectedRole} 
                        onBack={() => setView('roleSelect')} 
                        // Recibe el usuario, cierra el modal y avisa a app.jsx
                        onLoginSuccess={(user) => {
                            handleClose(); // Cierra el modal
                            if (onLoginSuccess) onLoginSuccess(user); // Envía los datos
                        }}
                    />
                )}
                 Login
            </div>
        </div>
    );
};

export default AuthModal;