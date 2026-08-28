import { useState } from 'react';


const ROLES = [
    {
        id: 'docente',
        title: 'Docente',
        desc: 'Gestiona tus clases y comunicación con estudiantes.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
        )
    },
    {
        id: 'alumno',
        title: 'Alumno',
        desc: 'Accede a tus clases, tareas y recursos de aprendizaje.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
        )
    },
    {
        id: 'padre',
        title: 'Padre',
        desc: 'Mantente informado sobre el progreso y actividades escolares.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        )
    }
];

export default function RoleSelect({ onRoleSelected }) {
    
    // Inicia en 'null' nada está seleccionado
    const [selectedId, setSelectedId] = useState(null);

    // clic del usuario
    const handleSelect = (id) => {
        setSelectedId(id); // Guarda tarjeta seleccionada
        
        // pausa antes de pasar al siguiente modal (login) 
        setTimeout(() => {
            if(onRoleSelected) onRoleSelected(id);
        }, 450);
    };

    return (
        <div className="role-select-container">
            {/* 4. ENCABEZADO */}
            <div className="role-header">
                <h2>¿Quién eres?</h2>
                <p>Selecciona el tipo de cuenta con el que deseas acceder</p>
            </div>

            {/*Recorre el arreglo ROLES con .map() */}
            <div className="role-grid">
                {ROLES.map((role) => {
                    const isActive = selectedId === role.id; 

                    return (
                        
                        <div 
                            key={role.id} 
                            className={`role-card ${isActive ? 'active' : ''}`}
                            onClick={() => handleSelect(role.id)}
                        >
                            {/* Checkmark superior derecho */}
                            {/* {isActive && (
                                <div className="role-badge-active">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                            )} */}

                            <div className="role-icon-circle">
                                {role.icon}
                            </div>
                            
                            <h3>{role.title}</h3>
                            <p>{role.desc}</p>

                            {/* Circulo inferior de selección */}
                            <div className="role-check-circle">
                                {isActive && (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <p className="role-footer-text">Tu información siempre estará segura con nosotros.</p>
        </div>
    );
}