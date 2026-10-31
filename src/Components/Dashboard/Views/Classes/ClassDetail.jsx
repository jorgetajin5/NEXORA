
import React, { useEffect, useState } from 'react';
import { BookOpen, GraduationCap, Layers, CalendarDays, UsersRound, Hash, Settings2, School, ShieldCheck, CheckCircle2, Save, ClipboardList } from 'lucide-react';
import './ClassDetail.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function ClassDetail({
    classroomId,
    firebaseUser,
    onBack,
    onSettingsUpdated,
    onManageStudents,
    onManageRequests,
    embedded = false
}) {
    const [classroom, setClassroom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Para estados de la clase
    const [joinMode, setJoinMode] = useState('approval');
    const [joinEnabled, setJoinEnabled] = useState(true);

    const [savingSettings, setSavingSettings] = useState(false);
    const [settingsError, setSettingsError] = useState('');
    const [settingsSuccess, setSettingsSuccess] = useState('');

    useEffect(() => {
        if (!firebaseUser || !classroomId) {
            setLoading(false);
            setError('No hay una sesión o clase válida.');
            return;
        }

        const controller = new AbortController();

        const fetchClassroom = async () => {
            setLoading(true);
            setError('');
            setClassroom(null);

            try {
                const token = await firebaseUser.getIdToken();

                const response = await fetch(
                    `${API_URL}/api/classrooms/${classroomId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        signal: controller.signal
                    }
                );

                const data = await response.json();

                if (!response.ok || !data.ok) {
                    throw new Error(
                        data.message || 'No se pudo cargar la clase.'
                    );
                }

                if (!controller.signal.aborted) {
                    setClassroom(data.classroom);

                    setJoinMode(data.classroom.joinMode);
                    setJoinEnabled(data.classroom.joinEnabled);

                    setSettingsError('');
                    setSettingsSuccess('');
                }

            } catch (err) {
                if (!controller.signal.aborted) {
                    setError(err.message);
                }

            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchClassroom();

        return () => controller.abort();

    }, [classroomId, firebaseUser]);



    // guarda la configuración de la clase
    const handleSaveSettings = async () => {
        if (!classroom || savingSettings) return;

        setSavingSettings(true);
        setSettingsError('');
        setSettingsSuccess('');

        try {
            const token = await firebaseUser.getIdToken();

            const response = await fetch(
                `${API_URL}/api/classrooms/${classroomId}/join-settings`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        joinMode,
                        joinEnabled
                    })
                }
            );

            const data = await response.json();

            if (!response.ok || !data.ok) {
                throw new Error(
                    data.message || 'No se pudo guardar la configuración.'
                );
            }

            // Actualizar datos locales con la respuesta real
            setClassroom((previous) => ({
                ...previous,
                joinMode: data.settings.joinMode,
                joinEnabled: data.settings.joinEnabled
            }));

            onSettingsUpdated?.(data.settings);

            setSettingsSuccess(
                'Configuración guardada correctamente.'
            );

        } catch (error) {
            setSettingsError(error.message);

        } finally {
            setSavingSettings(false);
        }
    };


    return (
        <div className={`class-detail${embedded ? ' class-detail--embedded' : ''}`}>
            {loading ? (
                <p className="class-detail-feedback">Cargando información de la clase...</p>
            ) : error ? (
                <p className="class-detail-error" role="alert">{error}</p>
            ) : classroom && (
                <>
                    {/* En el modal conservamos el encabezado con el nombre de la clase.
                        En la pestaña no se repite: ya está visible arriba. */}
                    {!embedded && (
                        <header className="class-detail-header">
                            <div className="class-detail-hero-main">
                                <span className="class-detail-hero-icon" aria-hidden="true">
                                    <BookOpen size={22} />
                                </span>
                                <div>
                                    <span className="class-detail-label">Mi aula</span>
                                    <h1>{classroom.name}</h1>
                                    <p>{classroom.description || 'Sin descripción registrada.'}</p>
                                </div>
                            </div>
                            <span className="class-detail-status">
                                <CheckCircle2 size={15} aria-hidden="true" />
                                Activa
                            </span>
                        </header>
                    )}

                    {/* Una sola tarjeta agrupa los datos académicos */}
                    <section className="class-detail-section class-detail-overview" aria-labelledby="class-detail-overview-title">
                        <div className="class-detail-section-heading">
                            <span className="class-detail-section-icon" aria-hidden="true">
                                <BookOpen size={19} strokeWidth={1.9} />
                            </span>
                            <div className="class-detail-heading-text">
                                <h2 id="class-detail-overview-title">Información general</h2>
                                <p>{classroom.description || 'Datos académicos y participantes de esta clase.'}</p>
                            </div>
                            {embedded && (
                                <span className="class-detail-status">
                                    <CheckCircle2 size={15} aria-hidden="true" />
                                    Activa
                                </span>
                            )}
                        </div>

                        <div className="class-detail-grid">
                            <div className="class-detail-card">
                                <span className="class-detail-card-icon" aria-hidden="true"><GraduationCap size={18} /></span>
                                <span>Grado</span>
                                <strong>{classroom.gradeLevel || 'Sin asignar'}</strong>
                            </div>
                            <div className="class-detail-card">
                                <span className="class-detail-card-icon" aria-hidden="true"><Layers size={18} /></span>
                                <span>Sección</span>
                                <strong>{classroom.section || 'Sin asignar'}</strong>
                            </div>
                            <div className="class-detail-card">
                                <span className="class-detail-card-icon" aria-hidden="true"><CalendarDays size={18} /></span>
                                <span>Año escolar</span>
                                <strong>{classroom.academicYear || 'Sin asignar'}</strong>
                            </div>
                            <div className="class-detail-card">
                                <span className="class-detail-card-icon" aria-hidden="true"><UsersRound size={18} /></span>
                                <span>Estudiantes</span>
                                <strong>{classroom.students ?? 0}</strong>
                            </div>
                        </div>
                    </section>

                    {/* Código de acceso y configuración funcional existente */}
                    <section className="class-detail-section class-detail-access" aria-labelledby="class-detail-access-title">
                        <div className="class-detail-section-heading">
                            <span className="class-detail-section-icon class-detail-section-icon--gold" aria-hidden="true">
                                <Settings2 size={19} strokeWidth={1.9} />
                            </span>
                            <div className="class-detail-heading-text">
                                <h2 id="class-detail-access-title">Acceso e inscripciones</h2>
                                <p>Administra cómo los estudiantes pueden unirse a esta clase.</p>
                            </div>
                        </div>

                        <div className="class-detail-code-row">
                            <div className="class-detail-code-label">
                                <Hash size={17} aria-hidden="true" />
                                <span>Código de clase</span>
                            </div>
                            <strong className="class-detail-code">{classroom.classCode}</strong>
                        </div>

                        <div className="class-detail-join-settings">
                            <h3>Configuración de ingreso</h3>

                            <div className="class-detail-setting-field">
                                <label htmlFor="detailJoinMode">Modo de ingreso</label>
                                <select
                                    id="detailJoinMode"
                                    value={joinMode}
                                    onChange={(event) => {
                                        setJoinMode(event.target.value);
                                        setSettingsSuccess('');
                                    }}
                                    disabled={savingSettings}
                                    className="class-detail-select"
                                >
                                    <option value="approval">Requiere aprobación del docente</option>
                                    <option value="automatic">Ingreso automático con código</option>
                                </select>
                            </div>

                            <div className="class-detail-join-footer">
                                <label className="class-detail-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={joinEnabled}
                                        disabled={savingSettings}
                                        onChange={(event) => {
                                            setJoinEnabled(event.target.checked);
                                            setSettingsSuccess('');
                                        }}
                                    />
                                    Permitir nuevas inscripciones
                                </label>

                                <button
                                    type="button"
                                    className="class-detail-save"
                                    onClick={handleSaveSettings}
                                    disabled={
                                        savingSettings ||
                                        (joinMode === classroom.joinMode &&
                                            joinEnabled === classroom.joinEnabled)
                                    }
                                >
                                    <Save size={16} aria-hidden="true" />
                                    {savingSettings ? 'Guardando...' : 'Guardar cambios'}
                                </button>
                            </div>

                            {settingsError && (
                                <p className="class-detail-error" role="alert">{settingsError}</p>
                            )}
                            {settingsSuccess && (
                                <p className="class-detail-success" role="status">
                                    <CheckCircle2 size={16} aria-hidden="true" />
                                    {settingsSuccess}
                                </p>
                            )}
                        </div>
                    </section>

                    <section className="class-detail-section class-detail-extra" aria-labelledby="class-detail-extra-title">
                        <div className="class-detail-section-heading">
                            <span className="class-detail-section-icon" aria-hidden="true">
                                <School size={19} strokeWidth={1.9} />
                            </span>
                            <div className="class-detail-heading-text">
                                <h2 id="class-detail-extra-title">Información adicional</h2>
                                <p>Institución y participación dentro de la clase.</p>
                            </div>
                        </div>
                        <div className="class-detail-row">
                            <span><School size={17} aria-hidden="true" /> Colegio</span>
                            <strong>{classroom.schoolName || 'Clase independiente'}</strong>
                        </div>
                        <div className="class-detail-row">
                            <span><ShieldCheck size={17} aria-hidden="true" /> Tu participación</span>
                            <strong>{classroom.memberRole === 'OWNER' ? 'Propietario' : 'Docente'}</strong>
                        </div>

                        {/* Estos accesos solo se muestran en el modal antiguo.
                            En la pestaña serían botones redundantes. */}
                        {!embedded && (onManageStudents || onManageRequests) && (
                            <div className="class-detail-quick-actions">
                                {onManageStudents && (
                                    <button type="button" className="class-detail-secondary" onClick={onManageStudents}>
                                        <UsersRound size={16} aria-hidden="true" />
                                        Gestionar estudiantes
                                    </button>
                                )}
                                {onManageRequests && (
                                    <button type="button" className="class-detail-secondary" onClick={onManageRequests}>
                                        <ClipboardList size={16} aria-hidden="true" />
                                        Solicitudes de ingreso
                                    </button>
                                )}
                            </div>
                        )}
                    </section>
                </>
            )}
        </div>
    );
}
