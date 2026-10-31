
import { useEffect, useState } from 'react';
import './ClassJoinRequests.css';

const API_URL =
    import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function ClassJoinRequests({
    classroomId,
    firebaseUser,
    onBack,
    onApproved
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
        if (processingId) return;

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

            // Actualizar inmediatamente el listado
            setRequests((previous) =>
                previous.filter((request) =>
                    request.id !== requestId
                )
            );

            setSuccess(result.message);

            if (isApproval) {
                onApproved?.();
            }

        } catch (err) {
            setError(err.message);

            // Si otra persona ya resolvió la solicitud,
            // actualizar el listado desde PostgreSQL.
            try {
                await loadRequests();
            } catch {
                // Conservamos el mensaje principal.
            }
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <div className="cjr-container">
            <button
                type="button"
                className="cjr-back"
                onClick={onBack}
            >
                ← Volver a detalles
            </button>

            <div className="cjr-header">
                <div>
                    <h2>Solicitudes de ingreso</h2>
                    <p>
                        Aprueba o rechaza los estudiantes
                        que solicitaron entrar a esta clase.
                    </p>
                </div>

                <span className="cjr-count">
                    {requests.length} pendientes
                </span>
            </div>

            {error && (
                <p className="cjr-error" role="alert">
                    {error}
                </p>
            )}

            {success && (
                <p className="cjr-success" role="status">
                    {success}
                </p>
            )}

            {loading ? (
                <p>Cargando solicitudes...</p>
            ) : requests.length === 0 ? (
                <div className="cjr-empty">
                    <h3>No hay solicitudes pendientes</h3>
                    <p>
                        Cuando un estudiante ingrese el código
                        de esta clase y necesite aprobación,
                        su solicitud aparecerá aquí.
                    </p>
                </div>
            ) : (
                <div className="cjr-list">
                    {requests.map((request) => (
                        <article
                            key={request.id}
                            className="cjr-request"
                        >
                            <div className="cjr-student">
                                <strong>
                                    {request.firstName}{' '}
                                    {request.lastName}
                                </strong>

                                <small>
                                    Solicitó ingresar el{' '}
                                    {new Date(
                                        request.requestedAt
                                    ).toLocaleDateString('es-GT')}
                                </small>

                                <span className="cjr-pending">
                                    Pendiente
                                </span>
                            </div>

                            <div className="cjr-actions">
                                <button
                                    type="button"
                                    className="cjr-approve"
                                    disabled={processingId !== null}
                                    onClick={() =>
                                        handleReview(
                                            request.id,
                                            'approved'
                                        )
                                    }
                                >
                                    {processingId === request.id
                                        ? 'Procesando...'
                                        : 'Aprobar'}
                                </button>

                                <button
                                    type="button"
                                    className="cjr-reject"
                                    disabled={processingId !== null}
                                    onClick={() =>
                                        handleReview(
                                            request.id,
                                            'rejected'
                                        )
                                    }
                                >
                                    Rechazar
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}
