import React from 'react';
import './LoginForm.css'; //estilos del formulario

export default function LoginForm({ role, onBack }) {
    //Diccionario de seleccion
    const roleLabels = {
        docente: 'profesor',
        alumno: 'alumno',
        padre: 'padre'
    };

    return (
        <div className="login-layout">
            
            {/* PANEL IZQUIERDO */}

            
            <div className="login-left-panel">
                {/* Botón para regresar a la selección de rol */}
                <button className="back-btn" onClick={onBack}>
                    &larr; Volver
                </button>

                <div className="login-illustrations">
                    {/* cambiar <img> con los recursos reales*/}
                    <img src="/leftIcon.png" alt="Ilustración educativa" />
                </div>
                <h3 className="left-panel-title">Evolución del aula digital</h3>
                
            </div>

            {/* PANEL DERECHO */}
            <div className="login-right-panel">
                
                

                <div className="login-header-form">
                    <span className="welcome-subtitle">Bienvenido a la red social educativa</span>
                    <h2>
                        Inicia sesión como <br/>
                        <span className="highlight-role">{roleLabels[role] || 'usuario'}</span>
                    </h2>
                </div>

                <form className="login-form">
                    {/* Contenedor del Input de Correo */}
                    <div className="input-wrapper">
                        <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                        <input type="email" placeholder="Usuario@ejemplo.com" className="auth-input" />
                    </div>

                    {/* Contenedor del Input de Contraseña */}
                    <div className="input-wrapper">
                        <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <input type="password" placeholder="Ingrese su contraseña" className="auth-input" />
                    </div>

                    <div className="form-options">
                        <label className="checkbox-label">
                            <input type="checkbox" /> 
                            <span>Recordarme</span>
                        </label>
                        <a href="#forgot" className="forgot-link">¿Olvidaste tu contraseña?</a>
                    </div>

                    <button type="submit" className="btn-submit-login">
                        Iniciar sesión
                    </button>
                </form>

                <div className="divider-container">
                    <span className="divider-text">o continua con</span>
                </div>

               <button type="button" className="btn-social-login">
                    <svg className="social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span>Google</span>
                </button>

                <p className="register-footer">
                    ¿No tienes una cuenta? <a href="#register">Regístrate</a>
                </p>
            </div>
        </div>
    );
}