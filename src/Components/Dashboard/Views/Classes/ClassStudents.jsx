
import { useEffect, useState } from 'react';
import './ClassStudents.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function ClassStudents({
    classroomId,
    firebaseUser,
    onBack,
    onStudentsChanged
}) {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [personalCode, setPersonalCode] = useState('');

    const [matches, setMatches] = useState(null);
    const [confirmedDifferent, setConfirmedDifferent] = useState(false);

    // Peticiones autenticadas a Express
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
                data.message || 'Ocurrió un error en el servidor.'
            );
        }

        return data;
    };

    // Cargar alumnos inscritos
    useEffect(() => {
        if (!classroomId || !firebaseUser) return;

        let active = true;

        const load = async () => {
            try {
                const data = await apiRequest(
                    `/api/classrooms/${classroomId}/students`
                );

                if (active) setStudents(data.students);

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
    }, [classroomId, firebaseUser]);

    // Refrescar después de una inscripción
    const refreshStudents = async () => {
        const data = await apiRequest(
            `/api/classrooms/${classroomId}/students`
        );

        setStudents(data.students);
        onStudentsChanged?.(data.students.length);
    };

    // Buscar posibles expedientes duplicados
    const handleSearch = async (event) => {
        event.preventDefault();

        if (busy) return;

        setBusy(true);
        setError('');
        setSuccess('');
        setMatches(null);
        setConfirmedDifferent(false);

        try {
            const data = await apiRequest(
                `/api/classrooms/${classroomId}/students/search`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        firstName: firstName.trim(),
                        lastName: lastName.trim()
                    })
                }
            );

            setMatches(data.students);

        } catch (err) {
            setError(err.message);
        } finally {
            setBusy(false);
        }
    };

    // Inscribir un alumno que ya existe
    const handleEnrollExisting = async (studentId) => {
        if (busy) return;

        setBusy(true);
        setError('');
        setSuccess('');

        try {
            await apiRequest(
                `/api/classrooms/${classroomId}/students/enroll-existing`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ studentId })
                }
            );

            await refreshStudents();

            setSuccess('Estudiante incorporado correctamente.');
            setMatches(null);

        } catch (err) {
            setError(err.message);
        } finally {
            setBusy(false);
        }
    };

    // Registrar un alumno nuevo sin cuenta Firebase
    const handleCreateStudent = async () => {
        if (busy || matches === null) return;

        if (matches.length > 0 && !confirmedDifferent) {
            setError(
                'Revisa las coincidencias antes de crear otro expediente.'
            );
            return;
        }

        setBusy(true);
        setError('');
        setSuccess('');

        try {
            await apiRequest(
                `/api/classrooms/${classroomId}/students`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        firstName: firstName.trim(),
                        lastName: lastName.trim(),
                        personalCode: personalCode.trim() || null
                    })
                }
            );

            await refreshStudents();

            setFirstName('');
            setLastName('');
            setPersonalCode('');
            setMatches(null);
            setConfirmedDifferent(false);
            setSuccess('Estudiante registrado correctamente.');

        } catch (err) {
            setError(err.message);
        } finally {
            setBusy(false);
        }
    };

    const changeName = (setter, value) => {
        setter(value);
        setMatches(null);
        setConfirmedDifferent(false);
        setSuccess('');
    };

    return (
        <div className="class-students">

            <button
                type="button"
                className="cs-back"
                onClick={onBack}
            >
                ← Volver a detalles
            </button>

            <div className="cs-header">
                <div>
                    <h2>Estudiantes de la clase</h2>
                    <p>Administra las matrículas y expedientes.</p>
                </div>
                <strong>{students.length} inscritos</strong>
            </div>

            <section className="cs-section">
                <h3>Agregar estudiante</h3>
                <p>
                    Busca primero si el alumno ya está registrado
                    para evitar crear expedientes duplicados.
                </p>

                <form onSubmit={handleSearch} className="cs-form">
                    <div className="cs-fields">
                        <label>
                            Nombres
                            <input
                                required
                                maxLength={120}
                                value={firstName}
                                onChange={(e) =>
                                    changeName(setFirstName, e.target.value)
                                }
                                placeholder="Nombres del estudiante"
                            />
                        </label>

                        <label>
                            Apellidos
                            <input
                                required
                                maxLength={120}
                                value={lastName}
                                onChange={(e) =>
                                    changeName(setLastName, e.target.value)
                                }
                                placeholder="Apellidos del estudiante"
                            />
                        </label>
                    </div>

                    <button type="submit" disabled={busy}>
                        {busy ? 'Procesando...' : 'Buscar estudiante'}
                    </button>
                </form>

                {matches !== null && (
                    <div className="cs-results">
                        <h4>Resultados de la búsqueda</h4>

                        {matches.length === 0 ? (
                            <p>No hay coincidencias accesibles.</p>
                        ) : (
                            matches.map((student) => (
                                <div className="cs-result" key={student.id}>
                                    <div>
                                        <strong>
                                            {student.firstName} {student.lastName}
                                        </strong>
                                        <small>
                                            {student.hasPersonalCode
                                                ? 'Con Código Personal'
                                                : 'Sin Código Personal'}
                                        </small>
                                    </div>

                                    <button
                                        type="button"
                                        disabled={
                                            busy || student.alreadyEnrolled
                                        }
                                        onClick={() =>
                                            handleEnrollExisting(student.id)
                                        }
                                    >
                                        {student.alreadyEnrolled
                                            ? 'Ya inscrito'
                                            : 'Incorporar'}
                                    </button>
                                </div>
                            ))
                        )}

                        <div className="cs-new-student">
                            <h4>Registrar estudiante nuevo</h4>

                            <p>
                                Hazlo únicamente si confirmaste que
                                no corresponde a un expediente existente.
                            </p>

                            {matches.length > 0 && (
                                <label className="cs-confirm">
                                    <input
                                        type="checkbox"
                                        checked={confirmedDifferent}
                                        onChange={(e) =>
                                            setConfirmedDifferent(
                                                e.target.checked
                                            )
                                        }
                                    />
                                    Confirmo que es una persona diferente
                                    a las coincidencias encontradas.
                                </label>
                            )}

                            <label className="cs-code-label">
                                Código Personal MINEDUC (opcional)
                                <input
                                    value={personalCode}
                                    maxLength={64}
                                    onChange={(e) =>
                                        setPersonalCode(e.target.value)
                                    }
                                    placeholder="Código Personal"
                                    autoComplete="off"
                                />
                            </label>

                            <button
                                type="button"
                                disabled={
                                    busy ||
                                    (matches.length > 0 && !confirmedDifferent)
                                }
                                onClick={handleCreateStudent}
                            >
                                Registrar estudiante nuevo
                            </button>
                        </div>
                    </div>
                )}
            </section>

            {error && <p className="cs-error" role="alert">{error}</p>}
            {success && <p className="cs-success" role="status">{success}</p>}

            <section className="cs-section">
                <h3>Estudiantes inscritos</h3>

                {loading ? (
                    <p>Cargando estudiantes...</p>
                ) : students.length === 0 ? (
                    <p>Aún no hay estudiantes inscritos.</p>
                ) : (
                    <div className="cs-list">
                        {students.map((student) => (
                            <div className="cs-result" key={student.id}>
                                <div>
                                    <strong>
                                        {student.firstName} {student.lastName}
                                    </strong>
                                    <small>
                                        {student.hasAccount
                                            ? 'Con cuenta'
                                            : 'Sin cuenta Firebase'}
                                    </small>
                                </div>
                                <span className="cs-active">Activo</span>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
