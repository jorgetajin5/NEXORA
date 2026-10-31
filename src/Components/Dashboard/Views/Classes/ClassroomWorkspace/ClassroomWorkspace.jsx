
import { useEffect, useState } from 'react';

import ClassStudents from '../ClassStudents';
import ClassJoinRequests from '../ClassJoinRequests';
import ClassDetail from '../ClassDetail';

import './ClassroomWorkspace.css';

import { Image, CalendarDays, Paperclip, ChartNoAxesColumn, ThumbsUp, MessageCircle, Share2, Ellipsis, BookOpen, ArrowLeft } from 'lucide-react';

const API_URL =
    import.meta.env.VITE_API_URL ||
    'http://localhost:3000';

function ComposerIcon({ type }) {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {type === 'photo' && (
                <>
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-5-5L5 21" />
                </>
            )}

            {type === 'event' && (
                <>
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M16 3v4M8 3v4M3 10h18" />
                    <path d="m9 16 2 2 4-4" />
                </>
            )}

            {type === 'file' && (
                <path
                    d="m21.4 11.6-8.8 8.8a6 6 0 0 1-8.5-8.5L13 3a4 4 0 0 1 5.7 5.7l-8.9 8.9a2 2 0 0 1-2.8-2.8l8.2-8.2"
                />
            )}

            {type === 'poll' && (
                <>
                    <rect x="4" y="12" width="4" height="8" rx="1" />
                    <rect x="10" y="5" width="4" height="15" rx="1" />
                    <rect x="16" y="9" width="4" height="11" rx="1" />
                </>
            )}
        </svg>
    );
}


export default function ClassroomWorkspace({
    classroom,
    firebaseUser,
    userProfile,
    onBack
}) {
    const [activeTab, setActiveTab] = useState('publicaciones');

    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState('');

    const [loading, setLoading] = useState(true);
    const [publishing, setPublishing] = useState(false);
    const [reactingPostId, setReactingPostId] = useState(null);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [studentsCount, setStudentsCount] = useState(
        Number(classroom.students ?? 0)
    );

    const roleCode = String(
        userProfile?.roleCode ||
        userProfile?.rol ||
        ''
    ).toUpperCase();

    const isStaff = [
        'TEACHER',
        'DIRECTOR',
        'DOCENTE'
    ].includes(roleCode);

    const classroomId = classroom.id;

    const classroomName =
        classroom.title || classroom.name || 'Mi clase';

    const gradeLevel =
        classroom.gradeLevel || classroom.category || '';

    const tabs = isStaff
        ? [
            { id: 'publicaciones', label: 'Publicaciones' },
            { id: 'estudiantes', label: 'Estudiantes' },
            { id: 'solicitudes', label: 'Solicitudes' },
            { id: 'informacion', label: 'Información' }
        ]
        : [
            { id: 'publicaciones', label: 'Publicaciones' },
            { id: 'informacion', label: 'Información' }
        ];

    // Peticiones autenticadas
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
                data.message || 'Ocurrió un error en Nexora.'
            );
        }

        return data;
    };

    // Cargar publicaciones de PostgreSQL
    useEffect(() => {
        let active = true;

        const load = async () => {
            setLoading(true);

            try {
                const data = await apiRequest(
                    `/api/classrooms/${classroomId}/posts`
                );

                if (active) {
                    setPosts(data.posts || []);
                    setError('');
                }
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

    // Crear publicación de texto
    const handlePublish = async (event) => {
        event.preventDefault();

        if (!isStaff || publishing || !content.trim()) return;

        setPublishing(true);
        setError('');
        setSuccess('');

        try {
            const data = await apiRequest(
                `/api/classrooms/${classroomId}/posts`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        content: content.trim(),
                        audience: 'all'
                    })
                }
            );

            // Mostrar la nueva publicación sin recargar.
            setPosts((previous) => [
                data.post,
                ...previous.filter(
                    (post) => post.id !== data.post.id
                )
            ]);

            setContent('');
            //setSuccess('Publicación compartida correctamente.');
        } catch (err) {
            setError(err.message);
        } finally {
            setPublishing(false);
        }
    };

    // Actualizar contador después de aprobar solicitudes
    const refreshStudentsCount = async () => {
        try {
            const data = await apiRequest(
                `/api/classrooms/${classroomId}/students`
            );

            setStudentsCount(data.total);
        } catch (err) {
            console.error(
                'No se pudo actualizar el contador:',
                err
            );
        }
    };

    const formatDate = (value) => {
        if (!value) return '';

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) return '';

        return date.toLocaleString('es-GT', {
            dateStyle: 'medium',
            timeStyle: 'short'
        });
    };



    // Consulta el estado de la publicación y decide si POST o DELETE
    const handleToggleLike = async (post) => {
        // Evitar solicitudes simultáneas
        if (reactingPostId !== null) return;

        setReactingPostId(post.id);
        setError('');

        try {
            const method = post.likedByMe
                ? 'DELETE'
                : 'POST';

            const result = await apiRequest(
                `/api/classrooms/${classroomId}/posts/${post.id}/like`,
                { method }
            );

            // Actualizar únicamente la publicación afectada
            setPosts((previous) =>
                previous.map((item) =>
                    item.id === post.id
                        ? {
                            ...item,
                            likesCount: result.likesCount,
                            likedByMe: result.likedByMe
                        }
                        : item
                )
            );

        } catch (err) {
            setError(err.message);
        } finally {
            setReactingPostId(null);
        }
    };


    return (
        <div className="cw-workspace">

            {/* Cabecera de la clase */}

            <header className="cw-header">
                <div className="cw-title-group">
                    <div className="cw-title-info">
                        <h1>{classroomName}</h1>

                        <p>
                            {gradeLevel || 'Clase'}
                            {classroom.section
                                ? ` · Sección ${classroom.section}`
                                : ''}
                            {classroom.academicYear
                                ? ` · ${classroom.academicYear}`
                                : ''}
                        </p>
                    </div>

                    <div className="cw-header-icon" aria-hidden="true">
                        <BookOpen size={23} strokeWidth={1.8} />
                    </div>
                </div>
            </header>


            {/* Navegación entre pestañas */}
            <nav className="cw-tabs" aria-label="Secciones de clase">
                {tabs.map((tab) => (
                    <button
                        type="button"
                        key={tab.id}
                        className={
                            activeTab === tab.id
                                ? 'cw-tab cw-tab-active'
                                : 'cw-tab'
                        }
                        onClick={() => {
                            setActiveTab(tab.id);
                            setError('');
                            setSuccess('');
                        }}
                        aria-current={
                            activeTab === tab.id ? 'page' : undefined
                        }
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>

            {/* Contenido de la pestaña Publicaciones */}
            {activeTab === 'publicaciones' && (
                <div className="cw-layout">

                    <main className="cw-feed">

                        {/* Solo el personal puede crear publicaciones */}
                        {isStaff && (
                            <form
                                className="cw-composer"
                                onSubmit={handlePublish}
                            >
                                <div className="cw-composer-top">
                                    <div className="cw-composer-avatar">
                                        {(
                                            userProfile?.firstName ||
                                            'D'
                                        ).charAt(0).toUpperCase()}
                                    </div>

                                    <div className="cw-composer-input-wrap">
                                        <textarea
                                            className="cw-composer-input"
                                            value={content}
                                            onChange={(event) =>
                                                setContent(event.target.value)
                                            }
                                            placeholder="¿Qué quieres compartir con tu clase?"
                                            maxLength={5000}
                                            rows={1}
                                        />
                                    </div>
                                </div>

                                <div className="cw-composer-bottom">
                                    <div className="cw-composer-actions">
                                        <button
                                            type="button"
                                            className="cw-composer-action"
                                            disabled
                                            title="Disponible próximamente"
                                        >
                                            <span className="cw-composer-action-icon cw-composer-action-icon-green">
                                                <Image size={18} strokeWidth={2.2} />
                                            </span>
                                            <span>Foto / Video</span>
                                        </button>

                                        <button
                                            type="button"
                                            className="cw-composer-action"
                                            disabled
                                            title="Disponible próximamente"
                                        >
                                            <span className="cw-composer-action-icon cw-composer-action-icon-purple">
                                                <CalendarDays size={18} strokeWidth={2.2} />
                                            </span>
                                            <span>Evento</span>
                                        </button>

                                        <button
                                            type="button"
                                            className="cw-composer-action"
                                            disabled
                                            title="Disponible próximamente"
                                        >
                                            <span className="cw-composer-action-icon cw-composer-action-icon-yellow">
                                                <Paperclip size={18} strokeWidth={2.2} />
                                            </span>
                                            <span>Archivo</span>
                                        </button>

                                        <button
                                            type="button"
                                            className="cw-composer-action"
                                            disabled
                                            title="Disponible próximamente"
                                        >
                                            <span className="cw-composer-action-icon cw-composer-action-icon-blue">
                                                <ChartNoAxesColumn size={18} strokeWidth={2.2} />
                                            </span>
                                            <span>Encuesta</span>
                                        </button>
                                    </div>

                                    <button
                                        type="submit"
                                        className="cw-composer-submit"
                                        disabled={publishing || !content.trim()}
                                    >
                                        {publishing ? 'Publicando...' : 'Publicar'}
                                    </button>
                                </div>
                            </form>
                        )}

                        {error && (
                            <p className="cw-error" role="alert">
                                {error}
                            </p>
                        )}

                        {success && (
                            <p className="cw-success" role="status">
                                {success}
                            </p>
                        )}

                        {loading ? (
                            <div className="cw-empty">
                                Cargando publicaciones...
                            </div>
                        ) : posts.length === 0 ? (
                            <div className="cw-empty">
                                <h3>Aún no hay publicaciones</h3>
                                <p>
                                    {isStaff
                                        ? 'Comparte el primer anuncio con tus estudiantes.'
                                        : 'Aquí aparecerán las publicaciones de tu docente.'}
                                </p>
                            </div>
                        ) : (
                            posts.map((post) => (
                                <article
                                    key={post.id}
                                    className="cw-post"
                                >
                                    <div className="cw-post-header">
                                        <div className="cw-post-header-left">
                                            <div className="cw-post-avatar">
                                                {post.authorPhotoUrl ? (
                                                    <img
                                                        src={post.authorPhotoUrl}
                                                        alt={post.authorName || 'Autor'}
                                                        className="cw-post-avatar-image"
                                                    />
                                                ) : (
                                                    <span>
                                                        {(post.authorName || 'P')
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="cw-post-author">
                                                <strong>
                                                    {post.authorName || 'Profesor'}
                                                </strong>

                                                <span>
                                                    {formatDate(post.createdAt)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="cw-post-header-right">
                                            <span className="cw-post-type">
                                                Anuncio
                                            </span>

                                            <button
                                                type="button"
                                                className="cw-post-menu"
                                                title="Más opciones"
                                            >
                                                <Ellipsis size={20} strokeWidth={2.5} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="cw-post-body">
                                        {(post.content || '')
                                            .split('\n')
                                            .filter((line) => line.trim() !== '')
                                            .map((line, index) => (
                                                <p
                                                    key={`${post.id}-line-${index}`}
                                                    className="cw-post-paragraph"
                                                >
                                                    {line}
                                                </p>
                                            ))}
                                    </div>

                                    {/* Renderiza imagen si más adelante el post la incluye */}
                                    {post.imageUrl && (
                                        <div className="cw-post-media">
                                            <img
                                                src={post.imageUrl}
                                                alt="Contenido adjunto"
                                                className="cw-post-media-image"
                                            />
                                        </div>
                                    )}

                                    <div className="cw-post-footer">
                                        <button
                                            type="button"
                                            className={
                                                post.likedByMe
                                                    ? 'cw-post-action cw-post-action-like cw-post-action-like-active'
                                                    : 'cw-post-action cw-post-action-like'
                                            }
                                            onClick={() => handleToggleLike(post)}
                                            disabled={reactingPostId !== null}
                                        >
                                            <span className="cw-post-action-icon">
                                                <ThumbsUp size={18} strokeWidth={2.2} />
                                            </span>
                                            <span>Me gusta</span>
                                            <span className="cw-post-action-count">
                                                {post.likesCount ?? 0}
                                            </span>
                                        </button>

                                        <button
                                            type="button"
                                            className="cw-post-action"
                                            disabled
                                            title="Próximamente"
                                        >
                                            <span className="cw-post-action-icon">
                                                <MessageCircle size={18} strokeWidth={2.2} />
                                            </span>
                                            <span>Comentar</span>
                                        </button>

                                        <button
                                            type="button"
                                            className="cw-post-action"
                                            disabled
                                            title="Próximamente"
                                        >
                                            <span className="cw-post-action-icon">
                                                <Share2 size={18} strokeWidth={2.2} />
                                            </span>
                                            <span>Compartir</span>
                                        </button>
                                    </div>
                                </article>
                            ))
                        )}
                    </main>

                    {/* Columna derecha del mockup */}
                    <aside className="cw-aside">
                        <div className="cw-widget">
                            <h3>Información de la clase</h3>

                            <div className="cw-widget-row">
                                <span>Clase</span>
                                <strong>{classroomName}</strong>
                            </div>

                            {gradeLevel && (
                                <div className="cw-widget-row">
                                    <span>Grado</span>
                                    <strong>{gradeLevel}</strong>
                                </div>
                            )}

                            {classroom.section && (
                                <div className="cw-widget-row">
                                    <span>Sección</span>
                                    <strong>{classroom.section}</strong>
                                </div>
                            )}

                            {isStaff && (
                                <div className="cw-widget-row">
                                    <span>Estudiantes</span>
                                    <strong>{studentsCount}</strong>
                                </div>
                            )}
                        </div>

                        {isStaff && classroom.code && (
                            <div className="cw-widget">
                                <h3>Código de ingreso</h3>

                                <div className="cw-class-code">
                                    {classroom.code}
                                </div>

                                <p>
                                    Comparte este código únicamente
                                    con los estudiantes autorizados.
                                </p>
                            </div>
                        )}

                        <div className="cw-widget">
                            <h3>Espacio de aprendizaje</h3>
                            <p>
                                Las publicaciones de esta clase
                                están disponibles para sus
                                participantes autorizados.
                            </p>
                        </div>
                    </aside>
                </div>
            )}

            {/* Gestión de estudiantes del docente */}
            {activeTab === 'estudiantes' && isStaff && (
                <div className="cw-tab-content">
                    <ClassDetail
                        embedded
                        classroomId={classroomId}
                        firebaseUser={firebaseUser}
                        onBack={() => setActiveTab('publicaciones')}
                        onManageStudents={() => setActiveTab('estudiantes')}
                        onManageRequests={() => setActiveTab('solicitudes')}
                    />
                </div>
            )}

            {/* Solicitudes del docente */}
            {activeTab === 'solicitudes' && isStaff && (
                <div className="cw-tab-content">
                    <ClassJoinRequests
                        classroomId={classroomId}
                        firebaseUser={firebaseUser}
                        onBack={() =>
                            setActiveTab('publicaciones')
                        }
                        onApproved={refreshStudentsCount}
                    />
                </div>
            )}

            {/* Información y configuración */}
            {activeTab === 'informacion' && (
                <div
                    className={
                        isStaff
                            ? 'cw-tab-content cw-tab-content--info'
                            : 'cw-tab-content'
                    }
                >
                    {isStaff ? (
                        <ClassDetail
                            embedded
                            classroomId={classroomId}
                            firebaseUser={firebaseUser}
                            onBack={() =>
                                setActiveTab('publicaciones')
                            }
                            onManageStudents={() =>
                                setActiveTab('estudiantes')
                            }
                            onManageRequests={() =>
                                setActiveTab('solicitudes')
                            }
                        />
                    ) : (
                        <div className="cw-widget">
                            <h3>Información de la clase</h3>

                            <p>
                                <strong>Nombre:</strong>{' '}
                                {classroomName}
                            </p>

                            <p>
                                <strong>Grado:</strong>{' '}
                                {gradeLevel || 'No especificado'}
                            </p>

                            <p>
                                <strong>Sección:</strong>{' '}
                                {classroom.section || 'No especificada'}
                            </p>

                            <p>
                                <strong>Año escolar:</strong>{' '}
                                {classroom.academicYear || 'No especificado'}
                            </p>

                            {classroom.schoolName && (
                                <p>
                                    <strong>Colegio:</strong>{' '}
                                    {classroom.schoolName}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
