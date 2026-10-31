
import { useEffect, useState } from 'react';
import { Search, UsersRound, UserRoundPlus, UserRound, BadgeCheck, CheckCircle2, AlertCircle, UserMinus } from 'lucide-react';
import './ClassStudents.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function ClassStudents({
    classroomId,
    firebaseUser,
    onBack,
    onStudentsChanged,
    embedded = false
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


    const handleRemoveStudent = async (student) => {
        if (busy) return;

        const fullName =
            `${student.firstName} ${student.lastName}`.trim();

        const confirmed = window.confirm(
            `¿Retirar a ${fullName} de esta clase?\n\n` +
            'El estudiante perderá el acceso a esta clase, ' +
            'pero podrá volver a inscribirse posteriormente ' +
            'según la configuración de ingreso.\n\n' +
            'Su expediente académico y su historial se conservarán.'
        );

        if (!confirmed) return;

        setBusy(true);
        setError('');
        setSuccess('');

        try {
            await apiRequest(
                `/api/classrooms/${classroomId}/students/${student.id}/remove`,
                {
                    method: 'PATCH'
                }
            );

            // Consultar nuevamente la lista real y
            // actualizar el contador de la clase.
            await refreshStudents();

            // setSuccess(
            //     `${fullName} fue retirado de la clase correctamente.`
            // );

            // Descartar resultados de búsqueda anteriores.
            setMatches(null);

        } catch (err) {
            setError(err.message);
        } finally {
            setBusy(false);
        }
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
            {!embedded && (
                <button
                    type="button"
                    className="cs-back"
                    onClick={onBack}
                >
                    ← Volver a detalles
                </button>
            )}

            <section className="cs-management-card" aria-labelledby="cs-management-title">
                <header className="cs-header">
                    <div className="cs-heading">
                        <span className="cs-heading-icon" aria-hidden="true">
                            <UsersRound size={21} strokeWidth={1.9} />
                        </span>
                        <div>
                            <h2>Estudiantes</h2>
                            <p>Gestiona las inscripciones y expedientes de esta clase.</p>
                        </div>
                    </div>
                    <span className="cs-count">
                        <UsersRound size={15} aria-hidden="true" />
                        {students.length} {students.length === 1 ? 'inscrito' : 'inscritos'}
                    </span>
                </header>

                {error && (
                    <p className="cs-alert cs-error" role="alert">
                        <AlertCircle size={17} aria-hidden="true" /> {error}
                    </p>
                )}
                {success && (
                    <p className="cs-alert cs-success" role="status">
                        <CheckCircle2 size={17} aria-hidden="true" /> {success}
                    </p>
                )}

                <div className="cs-management-body">
                    <h3 id="cs-add-title">Agregar estudiante</h3>

                    <form onSubmit={handleSearch} className="cs-form">
                        <div className="cs-fields">
                            <label>
                                Nombres
                                <input
                                    required
                                    maxLength={120}
                                    value={firstName}
                                    onChange={(event) =>
                                        changeName(setFirstName, event.target.value)
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
                                    onChange={(event) =>
                                        changeName(setLastName, event.target.value)
                                    }
                                    placeholder="Apellidos del estudiante"
                                />
                            </label>
                        </div>
                        <button className="cs-button cs-button--primary" type="submit" disabled={busy}>
                            <Search size={16} aria-hidden="true" />
                            {busy ? 'Procesando...' : 'Buscar estudiante'}
                        </button>
                    </form>

                    {matches !== null && (
                        <div className="cs-results">
                            <h4>Coincidencias encontradas</h4>
                            {matches.length === 0 ? (
                                <p className="cs-no-matches">No encontramos expedientes accesibles con esos nombres.</p>
                            ) : (
                                <div className="cs-results-list">
                                    {matches.map((student) => (
                                        <div className="cs-result" key={student.id}>
                                            <div className="cs-student-identity">
                                                <span className="cs-student-avatar" aria-hidden="true">
                                                    <UserRound size={18} />
                                                </span>
                                                <div className="cs-student-details">
                                                    <strong>{student.firstName} {student.lastName}</strong>
                                                    <small>
                                                        {student.hasPersonalCode
                                                            ? 'Expediente con Código Personal'
                                                            : 'Expediente sin Código Personal'}
                                                    </small>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                className="cs-button cs-button--secondary"
                                                disabled={busy || student.alreadyEnrolled}
                                                onClick={() => handleEnrollExisting(student.id)}
                                            >
                                                {student.alreadyEnrolled ? 'Ya inscrito' : 'Incorporar'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="cs-new-student">
                                <div className="cs-section-heading cs-section-heading--small">
                                    <span className="cs-section-icon cs-section-icon--neutral" aria-hidden="true">
                                        <UserRoundPlus size={17} />
                                    </span>
                                    <div>
                                        <h4>Registrar estudiante nuevo</h4>
                                        <p>Solo si verificaste que no corresponde a un expediente existente.</p>
                                    </div>
                                </div>

                                {matches.length > 0 && (
                                    <label className="cs-confirm">
                                        <input
                                            type="checkbox"
                                            checked={confirmedDifferent}
                                            onChange={(event) =>
                                                setConfirmedDifferent(event.target.checked)
                                            }
                                        />
                                        <span>Confirmo que es una persona diferente a las coincidencias encontradas.</span>
                                    </label>
                                )}

                                <label className="cs-code-label">
                                    Código Personal MINEDUC (opcional)
                                    <input
                                        value={personalCode}
                                        maxLength={64}
                                        onChange={(event) => setPersonalCode(event.target.value)}
                                        placeholder="Código Personal"
                                        autoComplete="off"
                                    />
                                </label>

                                <button
                                    type="button"
                                    className="cs-button cs-button--primary"
                                    disabled={busy || (matches.length > 0 && !confirmedDifferent)}
                                    onClick={handleCreateStudent}
                                >
                                    <UserRoundPlus size={16} aria-hidden="true" />
                                    Registrar estudiante nuevo
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <section className="cs-section cs-enrolled-section" aria-labelledby="cs-list-title" >
                <div className="cs-section-heading">
                    <span className="cs-section-icon cs-section-icon--blue" aria-hidden="true">
                        <UsersRound size={19} strokeWidth={2} />
                    </span>
                    <div>
                        <h3 id="cs-list-title">Estudiantes inscritos</h3>
                        <p>Miembros con matrícula activa en esta clase.</p>
                    </div>
                </div>

                {loading ? (
                    <p className="cs-empty">Cargando estudiantes...</p>
                ) : students.length === 0 ? (
                    <div className="cs-empty">Todavía no hay estudiantes inscritos.</div>
                ) : (
                    <div className="cs-list">
                        {students.map((student) => (
                            <div className="cs-result cs-enrolled-row" key={student.id}>
                                <div className="cs-student-identity">
                                    <span className="cs-student-avatar" aria-hidden="true">
                                        <UserRound size={18} />
                                    </span>
                                    <div className="cs-student-details">
                                        <strong>{student.firstName} {student.lastName}</strong>
                                        <small>
                                            {student.hasAccount
                                                ? 'Con cuenta en Nexora'
                                                : 'Sin cuenta Firebase'}
                                        </small>
                                    </div>
                                </div>

                                <div className="cs-enrolled-actions">
                                    <span className="cs-active">
                                        <BadgeCheck size={14} aria-hidden="true" />
                                        Activo
                                    </span>

                                    <button
                                        type="button"
                                        className="cs-remove-button"
                                        disabled={busy}
                                        onClick={() => handleRemoveStudent(student)}
                                        aria-label={
                                            `Retirar a ${student.firstName} ${student.lastName} de la clase`
                                        }
                                        title="Retirar de esta clase"
                                    >
                                        <UserMinus
                                            size={16}
                                            strokeWidth={2}
                                            aria-hidden="true"
                                        />
                                        <span>Retirar</span>
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
