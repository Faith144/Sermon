import { useEffect, useState } from "react"
import { logout, get_sermon, get_telegram_audios } from "../endpoints/api"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const [sermon, setSermon] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [telegram, setTelegram] = useState([])
    const nav = useNavigate()
    
    // Function to extract YouTube video ID from various URL formats
    const getYouTubeVideoId = (url) => {
        if (!url) return null;
        
        if (url.length === 11 && !url.includes('/')) {
            return url;
        }
        
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?#]+)/,
            /youtube\.com\/watch\?.*v=([^&?#]+)/,
            /youtu\.be\/([^&?#]+)/
        ];
        
        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match && match[1]) {
                return match[1];
            }
        }
        
        return null;
    }

    useEffect(() => {
         const fetchAudio = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await get_telegram_audios()
            
            console.log("📢 RAW API RESPONSE:", response)
            
            // Check what's in each audio object
            if (Array.isArray(response)) {
                response.forEach((audio, index) => {
                    console.log(`Audio ${index}:`, {
                        title: audio.title,
                        audio_file: audio.audio_file,
                        has_url_field: !!audio.audio_file_url,
                        full_object: audio
                    })
                })
                
                setTelegram(response)
            } else {
                setTelegram([])
            }
        } catch (err) {
            setError("Failed to load Audio")
            console.error("Error fetching telegram audio:", err)
            setTelegram([])
        } finally {
            setLoading(false)
        }
    }
        const fetchData = async () => {
            try {
                setLoading(true)
                setError(null)
                
                const [sermonsData, audioData] = await Promise.all([
                    get_sermon().catch(err => {
                        console.error("Error fetching sermons:", err);
                        return [];
                    }),
                    get_telegram_audios().catch(err => {
                        console.error("Error fetching audio:", err);
                        return [];
                    })
                ]);
                
                // Process sermons
                if (Array.isArray(sermonsData)) {
                    const processedSermons = sermonsData.map(sermon => ({
                        ...sermon,
                        validVideoId: getYouTubeVideoId(sermon.youtube_url)
                    }))
                    setSermon(processedSermons)
                } else {
                    setSermon([])
                }
                
                // Process audio - Cloudinary URLs are already full URLs
                if (Array.isArray(audioData)) {
                    setTelegram(audioData)
                } else {
                    setTelegram([])
                }
                
            } catch (err) {
                setError("Failed to load content")
                console.error("Error fetching data:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchAudio();
        fetchData();
    }, [])

    const handleLogout = async () => {
        try {
            const success = await logout()
            if (success) {
                nav('/login')
            }
        } catch (err) {
            console.error("Logout error:", err)
        }
    }

    if (loading) {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-12 text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3">Loading content...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8">
                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            <div>{error}</div>
                        </div>
                        <div className="text-center">
                            <button 
                                className="btn btn-primary" 
                                onClick={() => window.location.reload()}
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mt-4">
            {/* Header Section */}
            <header className="row mb-5">
                <div className="col-12 text-center">
                    <h1 className="display-4 mb-3">Welcome back user</h1>
                </div>
            </header>

            {/* Sermons Section */}
            <section className="row mb-5">
                <div className="col-12">
                    <h2 className="h3 mb-4">Sermons</h2>
                    {sermon.length === 0 ? (
                        <div className="text-center py-4">
                            <p className="text-muted lead">No sermons available</p>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {sermon.map((sermonItem) => (
                                <div key={sermonItem.id} className="col-12 col-lg-6">
                                    <div className="card shadow-sm h-100">
                                        {sermonItem.validVideoId ? (
                                            <div className="ratio ratio-16x9">
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${sermonItem.validVideoId}`}
                                                    title={sermonItem.title}
                                                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    loading="lazy"
                                                />
                                            </div>
                                        ) : (
                                            <div className="ratio ratio-16x9 bg-light d-flex align-items-center justify-content-center">
                                                <div className="text-center text-muted">
                                                    Invalid YouTube URL
                                                    <br />
                                                    <small>{sermonItem.youtube_url}</small>
                                                </div>
                                            </div>
                                        )}
                                        <div className="card-body">
                                            <h5 className="card-title">{sermonItem.title}</h5>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Telegram Audios Section */}
            <section className="row mb-5">
                <div className="col-12">
                    <h2 className="h3 mb-4">Audio Messages</h2>
                    {telegram.length === 0 ? (
                        <div className="text-center py-4">
                            <p className="text-muted lead">No audio messages available</p>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {telegram.map((audio) => (
                                <div key={audio.id} className="col-12 col-lg-6">
                                    <div className="card shadow-sm h-100">
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {audio.title || "Untitled audio"}
                                            </h5>
                                            {audio.audio_file ? (
                                                <div className="mt-3">
                                                    <audio controls className="w-100">
                                                        <source src={audio.audio_url} type="audio/mpeg" />
                                                        Your browser does not support the audio element.
                                                    </audio>
                                                    <div className="mt-2">
                                                        <a 
                                                            href={audio.audio_url}
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="btn btn-sm btn-outline-primary"
                                                        >
                                                            Download Audio
                                                        </a>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="alert alert-warning mt-3">
                                                    Audio file not available
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Logout Section */}
            <section className="row">
                <div className="col-12 text-center">
                    <button 
                        onClick={handleLogout} 
                        className="btn btn-danger btn-lg"
                    >
                        Logout
                    </button>
                </div>
            </section>
        </div>
    )
}

export default Home