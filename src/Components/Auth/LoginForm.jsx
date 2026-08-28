import React, { useState } from 'react';
// herramientas de Firebase
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';

import './LoginForm.css'; //estilos del formulario



export default function LoginForm({ role, onBack }) {
    // estados para capturar los datos del formulario y controlar la vista
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isRegistering, setIsRegistering] = useState(false); // Falso = Login, Verdadero = Registro
    const [errorMsg, setErrorMsg] = useState('');

    //Diccionario de seleccion
    const roleLabels = {
        docente: 'profesor',
        alumno: 'alumno',
        padre: 'padre'
    };

    // Función principal que se ejecuta al enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que la página se recargue
        setErrorMsg(''); // Limpia errores previos

        // valida la contraseña antes de enviar a Firebase
        if (isRegistering && password !== confirmPassword) {
            setErrorMsg('Las contraseñas no coinciden. Inténtalo de nuevo.');
            return; // Detiene la ejecución para no enviar datos erróneos
        }

        try {
            if (isRegistering) {
                // Modo Registro o creacion de usuario
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);

                // guarda el nombre en el perfil del usuario de Firebase
                await updateProfile(userCredential.user, {
                    displayName: name
                });

                console.log("Usuario registrado exitosamente:", userCredential.user);
                // >>> redirigir al panel de control (Dashboard)

            } else {
                // Modo Login
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                console.log("Inicio de sesión exitoso:");
                // console.log("Inicio de sesión exitoso:", userCredential.user);
                // redirigir a Dashboard
            }
        } catch (error) {
            console.error("Error de Firebase:", error.code);
            // errores comunes de Firebase al español
            if (error.code === 'auth/email-already-in-use') setErrorMsg('Este correo ya está registrado.');
            else if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') setErrorMsg('Correo o contraseña incorrectos.');
            else if (error.code === 'auth/weak-password') setErrorMsg('La contraseña debe tener al menos 6 caracteres.');
            else setErrorMsg('Ocurrió un error. Inténtalo de nuevo.');
        }
    };


    // Función para autenticación con Google
    const handleGoogleSignIn = async () => {
        setErrorMsg(''); // Limpia errores previos
        const provider = new GoogleAuthProvider();
        
        try {
            const result = await signInWithPopup(auth, provider);
            console.log("Autenticación con Google exitosa:");
            //console.log("Autenticación con Google exitosa:", result.user);
            
            // redirigir al Dashboard
        } catch (error) {
            console.error("Error de Firebase con Google:", error.code);
            // Controla si el usuario cierra la ventana antes de terminar
            if (error.code === 'auth/popup-closed-by-user') {
                return; // se ignora error.
            }
            setErrorMsg('Ocurrió un error al conectar con Google.');
        }
    };






    // Función para alternar entre Login y Registro
    const toggleMode = (e) => {
        e.preventDefault();
        setIsRegistering(!isRegistering);
        setErrorMsg(''); 
        // limpia los campos al cambiar de vista
        setName('');
        setPassword('');
        setConfirmPassword('');
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
                    <img src="/leftIcon.png" alt="Ilustración educativa" />
                </div>
                <h3 className="left-panel-title">Evolución del aula digital</h3>

            </div>

            {/* PANEL DERECHO */}
            <div className="login-right-panel">
                <div className="login-header-form">
                    <span className="welcome-subtitle">Bienvenido a la red social educativa</span>
                    <h2>
                        Inicia sesión como <br />
                        <span className="highlight-role">{roleLabels[role] || 'usuario'}</span>
                    </h2>
                </div>

                {/* Muestra mensaje de error si existe */}
                {errorMsg && <div className="error-message">{errorMsg}</div>}

                <form className="login-form" onSubmit={handleSubmit}>
                    {/* Campo de Nombre, (solo para registro de nuevo usuario) */}
                    {isRegistering && (
                        <div className="input-wrapper">
                            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            <input 
                                type="text" 
                                placeholder="Nombre completo" 
                                className="auth-input" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required={isRegistering} 
                            />
                        </div>
                    )}


                    {/* Contenedor del Input de Correo */}

                    <div className="input-wrapper">
                        <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>

                        <input 
                            type="email" 
                            placeholder="Usuario@ejemplo.com" 
                            className="auth-input" value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />

                    </div>

                    {/* Contenedor del Input de Contraseña */}
                    <div className="input-wrapper">
                        <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <input 
                            type="password" 
                            placeholder="Ingrese su contraseña" 
                            className="auth-input" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>


                    {/*Campo de Confirmar Contraseña (solo para registro de nuevo usuario) */}
                    {isRegistering && (
                        <div className="input-wrapper">
                            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            <input 
                                type="password" 
                                placeholder="Confirme su contraseña" 
                                className="auth-input" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required={isRegistering}
                            />
                        </div>
                    )}



                    {/* Opciones de recordar/olvidó contraseña (solo para login) */}
                    {!isRegistering && (
                        <div className="form-options">
                            <label className="checkbox-label">
                                <input type="checkbox" /> 
                                <span>Recordarme</span>
                            </label>
                            <a href="#forgot" className="forgot-link">¿Olvidaste tu contraseña?</a>
                        </div>
                    )}

                    <button type="submit" className="btn-submit-login">
                        {isRegistering ? 'Crear cuenta' : 'Iniciar sesión'}
                    </button>
                </form>

                <div className="divider-container">
                    <span className="divider-text">o continua con</span>
                </div>

                <button type="button" className="btn-social-login" onClick={handleGoogleSignIn}>
                    <svg className="social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    <span>Google</span>
                </button>

                <p className="register-footer">
                    {/* Cambio de texto  según el estado */}
                    {isRegistering ? '¿Ya tienes una cuenta? ' : '¿No tienes una cuenta? '}
                    
                    {/*  evento onClick y la función toggleMode */}
                    <a href="#toggle" onClick={toggleMode}>
                        {isRegistering ? 'Inicia sesión' : 'Regístrate'}
                    </a>
                </p>
            </div>
        </div>
    );
}