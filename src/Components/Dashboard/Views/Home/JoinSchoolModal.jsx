
import React, { useState } from 'react';
import './JoinSchoolModal.css';

export default function JoinSchoolModal({ isOpen, onClose, userProfile }) {

    const [step, setStep] = useState(1); // 1: Buscar, 2: Confirmar
    const [schoolCode, setSchoolCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';


    if (!isOpen) return null;

    const selectedSchool = {
        name: 'Instituto San Gabriel',
        code: schoolCode || 'ISG-2025'
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
                        🏫
                    </div>
                    <h2 className="jsm-title">Unirse a un colegio</h2>


                    <p className="jsm-description">
                        Conéctate con tu colegio para acceder a tus clases, estudiantes y recursos.
                    </p>


                    {/* Línea de tiempo */}
                    <div className="jsm-stepper" style={{ marginTop: '2rem' }}>
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
                    <p className="jsm-right-subtitle">
                        Ingresa el nombre de tu colegio o el código que te proporcionaron.
                    </p>

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

                    <h4 className="jsm-list-title">Colegios más recientes</h4>

                    {/* Lista de colegios */}
                    <div className="jsm-schools-list">
                        <div className="jsm-school-card">
                            <div className="jsm-school-icon bg-yellow">🏫</div>
                            <div className="jsm-school-info">
                                <h5>Instituto San Gabriel</h5>
                                <span>Código: ISG-2025</span>
                            </div>
                            <span className="jsm-chevron">&gt;</span>
                        </div>

                        <div className="jsm-school-card">
                            <div className="jsm-school-icon bg-blue">🏫</div>
                            <div className="jsm-school-info">
                                <h5>Colegio Lomas del Valle</h5>
                                <span>Código: CLV-1024</span>
                            </div>
                            <span className="jsm-chevron">&gt;</span>
                        </div>

                        <div className="jsm-school-card">
                            <div className="jsm-school-icon bg-green">🏫</div>
                            <div className="jsm-school-info">
                                <h5>Centro Educativo Horizonte</h5>
                                <span>Código: CEH-7788</span>
                            </div>
                            <span className="jsm-chevron">&gt;</span>
                        </div>
                    </div>

                    <div className="jsm-actions">
                        <button className="jsm-btn-cancel" onClick={resetAndClose}>Cancelar</button>
                        <button
                            className="jsm-btn-continue"
                            disabled={!schoolCode.trim()}
                            onClick={() => setStep(2)}
                        >
                            Continuar →
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
                                    <div className="jsm-review-icon bg-yellow">🏫</div>
                                    <div className="jsm-review-data">
                                        <span className="jsm-review-label">Colegio</span>
                                        <h5 className="jsm-review-value">{selectedSchool.name}</h5>
                                        <span className="jsm-review-sub">Código: {selectedSchool.code}</span>
                                    </div>
                                </div>

                                {/* Fila Docente */}
                                <div className="jsm-review-row">
                                    <div className="jsm-review-icon bg-blue">👨‍🏫</div>
                                    <div className="jsm-review-data">
                                        <span className="jsm-review-label">Docente</span>
                                        <h5 className="jsm-review-value">{userProfile?.firstname || 'Jorge'} {userProfile?.lastname || ''}</h5>
                                    </div>
                                </div>

                                {/* Fila Correo (Recomendado para docentes) */}
                                <div className="jsm-review-row">
                                    <div className="jsm-review-icon bg-green">✉️</div>
                                    <div className="jsm-review-data">
                                        <span className="jsm-review-label">Correo electrónico</span>
                                        <h5 className="jsm-review-value">{userProfile?.email || 'docente@colegio.com'}</h5>
                                    </div>
                                </div>
                            </div>

                            {/* Alerta azul informativa */}
                            <div className="jsm-alert-blue">
                                <span className="jsm-alert-icon">ℹ️</span>
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