
import React, { useState } from 'react';
import './JoinSchoolModal.css';

export default function JoinSchoolModal({ isOpen, onClose, userProfile }) {

    const [step, setStep] = useState(1); // 1: Buscar, 2: Confirmar
    const [schoolCode, setSchoolCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';


    if (!isOpen) return null;


    const schools = [
        { name: 'Instituto San Gabriel', code: 'ISG-2025', color: 'bg-yellow' },
        { name: 'Colegio Lomas del Valle', code: 'CLV-1024', color: 'bg-blue' },
        { name: 'Centro Educativo Horizonte', code: 'CEH-7788', color: 'bg-green' }
    ]

    const selectedSchool = schools.find(
        (s) => s.code.toLowerCase() === schoolCode.trim().toLowerCase()
    ) || {
        name: 'Colegio seleccionado',
        code: schoolCode
    };


    const handleJoinSchool = async () => {
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch(`${API_URL}/api/colegios/unirse`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: userProfile?.uid || userProfile?.id,
                    codigoColegio: schoolCode
                })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Solicitud enviada correctamente.' });
                setSchoolCode('');
                setTimeout(() => {
                    setMessage({ type: '', text: '' });
                    setStep(1); // Reinicia el paso
                    onClose();
                }, 2000);
            } else {
                setMessage({ type: 'error', text: data.error || 'Ocurrió un error al enviar la solicitud.' });
            }

        } catch (error) {
            setMessage({ type: 'error', text: 'Error al conectar con el servidor.' })
        } finally {
            setIsLoading(false);
        }
    };

    const resetAndClose = () => {
        setStep(1);
        setSchoolCode('');
        setMessage({ type: '', text: '' });
        onClose();
    };


    return (
        <div className="jsm-overlay" onClick={onClose}>
            <div className="jsm-content" onClick={(e) => e.stopPropagation()}>

                {/* Botón cerrar superior derecho */}
                <button className="jsm-close-btn" onClick={onClose}>&times;</button>

                {/* --- PANEL IZQUIERDO --- */}
                <div className="jsm-left-panel">
                    <div className="jsm-icon-wrapper">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="48" height="48">
                            <path d="M3 21h18"></path>
                            <path d="M5 21V7l7-4 7 4v14"></path>
                            <path d="M9 21v-4a3 3 0 0 1 6 0v4"></path>
                            <line x1="9" y1="11" x2="9" y2="11.01"></line>
                            <line x1="15" y1="11" x2="15" y2="11.01"></line>
                            <line x1="12" y1="11" x2="12" y2="11.01"></line>
                        </svg>
                    </div>
                    <h2 className="jsm-title">Unirse a un colegio</h2>


                    <p className="jsm-description">
                        Conéctate con tu colegio para acceder a tus clases, estudiantes y recursos.
                    </p>


                    {/* Línea de tiempo */}
                    <div className="jsm-stepper" >
                        {/* Paso 1 */}
                        <div className={`jsm-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                            <div className="jsm-step-indicator">{step > 1 ? '✔' : '1'}</div>
                            <span className="jsm-step-text">Buscar colegio</span>
                            <div className="jsm-step-line"></div>
                        </div>
                        {/* Paso 2 */}
                        <div className={`jsm-step ${step >= 2 ? 'active' : ''}`}>
                            <div className="jsm-step-indicator">2</div>
                            <span className="jsm-step-text">Confirmar solicitud</span>
                            <div className="jsm-step-line"></div>
                        </div>
                        {/* Paso 3 (Visual) */}
                        <div className="jsm-step">
                            <div className="jsm-step-indicator">3</div>
                            <span className="jsm-step-text">¡Listo!</span>
                        </div>
                    </div>

                    {/* Cuadro información inferior */}
                    <div className="jsm-info-box">
                        <span className="jsm-info-icon">ⓘ</span>
                        <p>Si tu colegio no aparece en la lista, puedes contactar al administrador del sistema para que te agreguen.</p>
                    </div>
                </div>

                {/* --- PANEL DERECHO --- */}
                <div className="jsm-right-panel">

                    {step === 1 && (
                        <>
                            <h2 className="jsm-right-title">Buscar un colegio</h2>
                            {/* <p className="jsm-right-subtitle">
                        Ingresa el nombre de tu colegio o el código que te proporcionaron.
                    </p> */}

                            {/* Buscador */}
                            <div className="jsm-search-wrapper">
                                <svg className="jsm-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                                <input
                                    type="text"
                                    className="jsm-search-input"
                                    placeholder="Nombre del colegio o código"
                                    value={schoolCode}
                                    onChange={(e) => setSchoolCode(e.target.value)}
                                />
                            </div>

                            <h4 className="jsm-list-title">Colegios asociados</h4>

                            {/* Lista de colegios */}
                            <div className="jsm-schools-list">
                                {schools.map((school) => (
                                    <div
                                        key={school.code}
                                        className="jsm-school-card"
                                        onClick={() => setSchoolCode(school.code)}
                                    >
                                        <div className={`jsm-school-icon ${school.color}`}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                                                <path d="M3 21h18"></path>
                                                <path d="M5 21V7l7-4 7 4v14"></path>
                                                <path d="M9 21v-4a3 3 0 0 1 6 0v4"></path>
                                                <line x1="9" y1="11" x2="9" y2="11.01"></line>
                                                <line x1="15" y1="11" x2="15" y2="11.01"></line>
                                                <line x1="12" y1="11" x2="12" y2="11.01"></line>
                                            </svg>
                                        </div>
                                        <div className="jsm-school-info">
                                            <h5>{school.name}</h5>
                                            <span>Código: {school.code}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="jsm-actions">
                                <button className="jsm-btn-cancel" onClick={resetAndClose}>Cancelar</button>
                                <button
                                    className="jsm-btn-continue"
                                    disabled={!schoolCode.trim()}
                                    onClick={() => setStep(2)}
                                >
                                    Continuar
                                </button>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <h2 className="jsm-right-title">Revisa tu solicitud</h2>

                            {/* Tarjeta de Resumen */}
                            <div className="jsm-review-card">

                                {/* Fila Colegio */}
                                <div className="jsm-review-row">
                                    <div className="jsm-review-icon bg-yellow">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                                            <path d="M3 21h18"></path>
                                            <path d="M5 21V7l7-4 7 4v14"></path>
                                            <path d="M9 21v-4a3 3 0 0 1 6 0v4"></path>
                                            <line x1="9" y1="11" x2="9" y2="11.01"></line>
                                            <line x1="15" y1="11" x2="15" y2="11.01"></line>
                                            <line x1="12" y1="11" x2="12" y2="11.01"></line>
                                        </svg>
                                    </div>
                                    <div className="jsm-review-data">
                                        <span className="jsm-review-label">Colegio</span>
                                        <h5 className="jsm-review-value">{selectedSchool.name}</h5>
                                        <span className="jsm-review-sub">Código: {selectedSchool.code}</span>
                                    </div>
                                </div>

                                {/* Fila Docente */}
                                <div className="jsm-review-row">
                                    <div className="jsm-review-icon bg-blue">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                    </div>
                                    <div className="jsm-review-data">
                                        <span className="jsm-review-label">Docente</span>
                                        <h5 className="jsm-review-value">{userProfile?.firstname || 'Jorge'} {userProfile?.lastname || ''}</h5>
                                    </div>
                                </div>

                                {/* Fila Correo  */}
                                <div className="jsm-review-row">
                                    <div className="jsm-review-icon bg-green">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                            <polyline points="22,6 12,13 2,6"></polyline>
                                        </svg>
                                    </div>
                                    <div className="jsm-review-data">
                                        <span className="jsm-review-label">Correo electrónico</span>
                                        <h5 className="jsm-review-value">{userProfile?.email || 'docente@colegio.com'}</h5>
                                    </div>
                                </div>
                            </div>

                            {/* Alerta informativa */}
                            <div className="jsm-alert-blue">
                                <span className="jsm-alert-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="16" x2="12" y2="12"></line>
                                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                    </svg>
                                </span>
                                <p>Al enviar tu solicitud, el colegio recibirá una notificación y la revisará. Te avisaremos por este medio una vez sea aprobada.</p>
                            </div>

                            {message.text && (
                                <div style={{ marginTop: '1rem', color: message.type === 'error' ? 'red' : 'green', fontSize: '0.9rem', textAlign: 'center' }}>
                                    {message.text}
                                </div>
                            )}

                            {/* Acciones */}
                            <div className="jsm-actions" style={{ justifyContent: 'space-between', marginTop: 'auto' }}>
                                <button className="jsm-btn-text" onClick={() => setStep(1)} disabled={isLoading}>
                                    ← Volver
                                </button>
                                <button className="jsm-btn-primary-solid" onClick={handleJoinSchool} disabled={isLoading}>
                                    {isLoading ? 'Enviando...' : 'Enviar solicitud'}
                                </button>
                            </div>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
}