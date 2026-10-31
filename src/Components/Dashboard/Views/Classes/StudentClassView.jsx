
import { useEffect, useState } from 'react';
import './StudentClassView.css';

const API_URL =
    import.meta.env.VITE_API_URL ||
    'http://localhost:3000';

export default function StudentClassView({ firebaseUser, onOpenClass }) {
    const [classes, setClasses] = useState([]);
    const [requests, setRequests] = useState([]);
    const [classCode, setClassCode] = useState('');

    const [loading, setLoading] = useState(true);
    const [joining, setJoining] = useState(false);
    const [error, setError] = useState('');
    const [notice, setNotice] = useState('');

    // Consultar la API con el token Firebase
    const apiRequest = async (path, options = {}) => {
        const token = await firebaseUser.getIdToken();

        const response = await fetch(`${API_URL}${path}`, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok || !data.ok) {
            throw new Error(
                data.message || 'No se pudo completar la operación.'
            );
        }

        return data;
    };

    // Consultar las clases y solicitudes actuales
    const loadClasses = async () => {
        const data = await apiRequest(
            '/api/classrooms/student/mine'
        );

        setClasses(data.classes);
        setRequests(data.requests);
    };

    useEffect(() => {
        if (!firebaseUser) return;

        let active = true;

        const load = async () => {
            try {
                const data = await apiRequest(
                    '/api/classrooms/student/mine'
                );

                if (!active) return;

                setClasses(data.classes);
                setRequests(data.requests);

            } catch (err) {
                if (active) setError(err.message);
            } finally {
                if (active) setLoading(false);
            }
        };

        load();

        return () => {
            active = false;
        };
    }, [firebaseUser]);

    // Unirse a una clase mediante código
    const handleJoinClass = async (event) => {
        event.preventDefault();

        if (joining || !classCode.trim()) return;

        setJoining(true);
        setError('');
        setNotice('');

        try {
            const result = await apiRequest(
                '/api/classrooms/join',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        classCode: classCode.trim()
                    })
                }
            );

            // Respuesta del backend:
            // status: "active" o "pending"
            if (result.status === 'active') {
                setNotice(
                    'Te has unido correctamente a la clase.'
                );
            } else if (result.status === 'pending') {
                setNotice(
                    'Solicitud enviada. Espera la aprobación del docente.'
                );
            } else {
                throw new Error(
                    'El servidor devolvió un estado desconocido.'
                );
            }

            setClassCode('');
            await loadClasses();

        } catch (err) {
            setError(err.message);
        } finally {
            setJoining(false);
        }
    };

    return (
        <div className="scv-container">

            <div className="scv-heading">
                <h2>Mis clases</h2>
                <p>
                    Consulta tus clases y únete a nuevos
                    espacios de aprendizaje.
                </p>
            </div>

            <section className="scv-join-card">
                <h3>Unirme a una clase</h3>

                <p>
                    Introduce el código que te proporcionó
                    tu docente.
                </p>

                <form
                    onSubmit={handleJoinClass}
                    className="scv-join-form"
                >
                    <input
                        type="text"
                        value={classCode}
                        onChange={(e) =>
                            setClassCode(
                                e.target.value.toUpperCase()
                            )
                        }
                        maxLength={64}
                        autoComplete="off"
                        placeholder="Código de clase"
                        aria-label="Código de clase"
                        required
                    />

                    <button
                        type="submit"
                        disabled={joining || !classCode.trim()}
                    >
                        {joining
                            ? 'Procesando...'
                            : 'Unirme a la clase'}
                    </button>
                </form>
            </section>

            {error && (
                <p className="scv-error" role="alert">
                    {error}
                </p>
            )}

            {notice && (
                <p className="scv-success" role="status">
                    {notice}
                </p>
            )}

            <div className="scv-stats">
                <div className="scv-stat">
                    <span>Clases inscritas</span>
                    <strong>{classes.length}</strong>
                </div>

                <div className="scv-stat">
                    <span>Solicitudes pendientes</span>
                    <strong>{requests.length}</strong>
                </div>
            </div>

            <section className="scv-section">
                <h3>Mis clases inscritas</h3>

                {loading ? (
                    <p>Cargando tus clases...</p>
                ) : classes.length === 0 ? (
                    <p>
                        Todavía no estás inscrito en ninguna clase.
                        Introduce un código para comenzar.
                    </p>
                ) : (
                    <div className="scv-class-grid">
                        {classes.map((cls) => (
                            <article
                                className="scv-class-card"
                                key={cls.id}
                            >
                                <span className="scv-active">
                                    Inscrito
                                </span>

                                <h4>{cls.title}</h4>

                                <p>
                                    {cls.gradeLevel || 'Sin grado'}
                                    {cls.section
                                        ? ` · Sección ${cls.section}`
                                        : ''}
                                </p>

                                {cls.academicYear && (
                                    <small>
                                        Año escolar: {cls.academicYear}
                                    </small>
                                )}

                                {cls.schoolName && (
                                    <small>{cls.schoolName}</small>
                                )}

                                <button
                                    type="button"
                                    className="scv-enter-class"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        onOpenClass?.(cls);
                                    }}
                                >
                                    Entrar a clase
                                </button>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            {!loading && requests.length > 0 && (
                <section className="scv-section">
                    <h3>Solicitudes pendientes</h3>

                    <div className="scv-class-grid">
                        {requests.map((request) => (
                            <article
                                className="scv-class-card"
                                key={request.id}
                                onClick={() => onOpenClass?.(request)}
                                onKeyDown={(event) => {
                                    if (
                                        event.target === event.currentTarget &&
                                        (event.key === 'Enter' || event.key === ' ')
                                    ) {
                                        event.preventDefault();
                                        onOpenClass?.(request);
                                    }
                                }}
                                tabIndex={0}
                            >
                                <span className="scv-pending">
                                    Pendiente de aprobación
                                </span>

                                <h4>{request.title}</h4>

                                <p>
                                    Esperando la respuesta del docente.
                                </p>
                            </article>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
