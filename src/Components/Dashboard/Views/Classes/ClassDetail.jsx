
import React, { useEffect, useState } from 'react';
import './ClassDetail.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function ClassDetail({
    classroomId,
    firebaseUser,
    onBack,
    onSettingsUpdated
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
        <div className="class-detail">

            {loading ? (
                <p>Cargando información de la clase...</p>

            ) : error ? (
                <p className="class-detail-error" role="alert">
                    {error}
                </p>

            ) : classroom && (
                <>
                    <div className="class-detail-header">
                        <div>
                            <span className="class-detail-label">
                                Mi aula
                            </span>

                            <h1>{classroom.name}</h1>

                            <p>
                                {classroom.description ||
                                    'Sin descripción registrada.'}
                            </p>
                        </div>

                        <span className="class-detail-status">
                            Activa
                        </span>
                    </div>

                    <div className="class-detail-grid">

                        <div className="class-detail-card">
                            <span>Grado</span>
                            <strong>
                                {classroom.gradeLevel || 'Sin asignar'}
                            </strong>
                        </div>

                        <div className="class-detail-card">
                            <span>Sección</span>
                            <strong>
                                {classroom.section || 'Sin asignar'}
                            </strong>
                        </div>

                        <div className="class-detail-card">
                            <span>Año escolar</span>
                            <strong>
                                {classroom.academicYear || 'Sin asignar'}
                            </strong>
                        </div>

                        <div className="class-detail-card">
                            <span>Estudiantes inscritos</span>
                            <strong>{classroom.students}</strong>
                        </div>

                    </div>

                    <div className="class-detail-section">
                        <h2>Información de la clase</h2>

                        <div className="class-detail-row">
                            <span>Código de clase</span>
                            <strong>{classroom.classCode}</strong>
                        </div>


                        <div className="class-detail-join-settings">

                            <h3>Configuración de ingreso</h3>

                            {/* Modo de ingreso */}
                            <div className="class-detail-setting-field">
                                <label htmlFor="detailJoinMode">
                                    Modo de ingreso
                                </label>

                                <select
                                    id="detailJoinMode"
                                    value={joinMode}
                                    onChange={(e) => {
                                        setJoinMode(e.target.value);
                                        setSettingsSuccess('');
                                    }}
                                    disabled={savingSettings}
                                    className="class-detail-select"
                                >
                                    <option value="approval">
                                        Requiere aprobación del docente
                                    </option>

                                    <option value="automatic">
                                        Ingreso automático con código
                                    </option>
                                </select>
                            </div>

                            {/* Habilitar o deshabilitar inscripciones */}
                            <label className="class-detail-checkbox">
                                <input
                                    type="checkbox"
                                    checked={joinEnabled}
                                    disabled={savingSettings}
                                    onChange={(e) => {
                                        setJoinEnabled(e.target.checked);
                                        setSettingsSuccess('');
                                    }}
                                />

                                Permitir nuevas inscripciones
                            </label>

                            {/* Mensajes */}
                            {settingsError && (
                                <p role="alert" className="class-detail-error">
                                    {settingsError}
                                </p>
                            )}

                            {settingsSuccess && (
                                <p role="status" className="class-detail-success">
                                    {settingsSuccess}
                                </p>
                            )}

                            {/* Guardar cambios */}
                            <button
                                type="button"
                                className="class-detail-save"
                                onClick={handleSaveSettings}
                                disabled={
                                    savingSettings ||
                                    (
                                        joinMode === classroom.joinMode &&
                                        joinEnabled === classroom.joinEnabled
                                    )
                                }
                            >
                                {savingSettings
                                    ? 'Guardando...'
                                    : 'Guardar configuración'}
                            </button>

                        </div>


                        <div className="class-detail-row">
                            <span>Colegio</span>
                            <strong>
                                {classroom.schoolName ||
                                    'Clase independiente'}
                            </strong>
                        </div>

                        <div className="class-detail-row">
                            <span>Tu participación</span>
                            <strong>
                                {classroom.memberRole === 'OWNER'
                                    ? 'Propietario'
                                    : 'Docente'}
                            </strong>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
