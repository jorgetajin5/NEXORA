import { useEffect, useState } from 'react';
import {
    ArrowLeft,
    ClipboardCheck,
    Clock3,
    Inbox,
    UserRound,
    CalendarDays,
    Check,
    X,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';
import './ClassJoinRequests.css';

const API_URL =
    import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function ClassJoinRequests({
    classroomId,
    firebaseUser,
    onBack,
    onApproved,
    embedded = false
}) {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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

    const loadRequests = async () => {
        const data = await apiRequest(
            `/api/classrooms/${classroomId}/join-requests`
        );
        setRequests(data.requests);
    };

    useEffect(() => {
        if (!classroomId || !firebaseUser) return;

        let active = true;

        const load = async () => {
            setLoading(true);
            try {
                const data = await apiRequest(
                    `/api/classrooms/${classroomId}/join-requests`
                );

                if (active) setRequests(data.requests);
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

    const handleReview = async (requestId, decision) => {
        if (processingId !== null) return;

        const isApproval = decision === 'approved';
        const confirmed = window.confirm(
            isApproval
                ? '¿Aprobar la solicitud e inscribir al estudiante?'
                : '¿Rechazar esta solicitud de ingreso?'
        );

        if (!confirmed) return;

        setProcessingId(requestId);
        setError('');
        setSuccess('');

        try {
            const result = await apiRequest(
                `/api/classrooms/${classroomId}/join-requests/${requestId}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ decision })
                }
            );

            // Mantener el comportamiento original: quitar del listado
            // la solicitud resuelta sin recargar toda la página.
            setRequests((previous) =>
                previous.filter((request) => request.id !== requestId)
            );

            setSuccess(result.message);

            if (isApproval) {
                onApproved?.();
            }
        } catch (err) {
            setError(err.message);

            // Si se resolvió desde otra sesión, actualizar la lista.
            try {
                await loadRequests();
            } catch {
                // Conservar el error principal.
            }
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <div className="cjr-container">
            {/* {!embedded && (
                <button
                    type="button"
                    className="cjr-back"
                    onClick={onBack}
                >
                    <ArrowLeft size={16} aria-hidden="true" />
                    Volver a detalles
                </button>
            )} */}

            <section className="cjr-panel" aria-labelledby="cjr-title">
                <header className="cjr-header">
                    <div className="cjr-heading">
                        <span className="cjr-heading-icon" aria-hidden="true">
                            <ClipboardCheck size={21} strokeWidth={1.9} />
                        </span>
                        <div className="cjr-heading-text">
                            <h2 id="cjr-title">Solicitudes de ingreso</h2>
                            <p>
                                Revisa y administra las solicitudes de nuevos estudiantes.
                            </p>
                        </div>
                    </div>
                    <span className="cjr-count">
                        <Clock3 size={15} aria-hidden="true" />
                        {requests.length}{' '}
                        {requests.length === 1 ? 'pendiente' : 'pendientes'}
                    </span>
                </header>

                {error && (
                    <p className="cjr-alert cjr-error" role="alert">
                        <AlertCircle size={17} aria-hidden="true" />
                        {error}
                    </p>
                )}

                {success && (
                    <p className="cjr-alert cjr-success" role="status">
                        <CheckCircle2 size={17} aria-hidden="true" />
                        {success}
                    </p>
                )}

                {loading ? (
                    <div className="cjr-empty" role="status">
                        <span className="cjr-empty-icon" aria-hidden="true">
                            <Clock3 size={24} />
                        </span>
                        <h3>Cargando solicitudes...</h3>
                    </div>
                ) : requests.length === 0 ? (
                    <div className="cjr-empty">
                        <span className="cjr-empty-icon" aria-hidden="true">
                            <Inbox size={26} strokeWidth={1.7} />
                        </span>
                        <h3>Sin solicitudes</h3>
                        <p>
                            No hay solicitudes pendientes. Cuando un alumno solicite
                            ingresar a esta clase, aparecerá aquí.
                        </p>
                    </div>
                ) : (
                    <div className="cjr-list">
                        {requests.map((request) => (
                            <article className="cjr-request" key={request.id}>
                                <div className="cjr-student">
                                    <span className="cjr-student-avatar" aria-hidden="true">
                                        <UserRound size={19} />
                                    </span>
                                    <div className="cjr-student-info">
                                        <strong>
                                            {request.firstName} {request.lastName}
                                        </strong>
                                        <small>
                                            <CalendarDays size={14} aria-hidden="true" />
                                            Solicitó ingresar el{' '}
                                            {new Date(
                                                request.requestedAt
                                            ).toLocaleDateString('es-GT')}
                                        </small>
                                        <span className="cjr-pending">
                                            <Clock3 size={13} aria-hidden="true" />
                                            Pendiente
                                        </span>
                                    </div>
                                </div>

                                <div className="cjr-actions">
                                    <button
                                        type="button"
                                        className="cjr-approve"
                                        disabled={processingId !== null}
                                        onClick={() =>
                                            handleReview(request.id, 'approved')
                                        }
                                    >
                                        <Check size={16} aria-hidden="true" />
                                        {processingId === request.id
                                            ? 'Procesando...'
                                            : 'Aprobar'}
                                    </button>
                                    <button
                                        type="button"
                                        className="cjr-reject"
                                        disabled={processingId !== null}
                                        onClick={() =>
                                            handleReview(request.id, 'rejected')
                                        }
                                    >
                                        <X size={16} aria-hidden="true" />
                                        Rechazar
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
