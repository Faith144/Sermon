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
        
        // If it's already just a video ID (no URL)
        if (url.length === 11 && !url.includes('/')) {
            return url;
        }
        
        // Handle various YouTube URL formats
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
        const fetchSermon = async () => {
            try {
                setLoading(true)
                setError(null)
                const notes = await get_sermon()
                
                // Process sermons to ensure valid YouTube URLs
                const processedSermons = notes.map(sermon => ({
                    ...sermon,
                    validVideoId: getYouTubeVideoId(sermon.youtube_url)
                }))
                
                setSermon(processedSermons)
            } catch (err) {
                setError("Failed to load sermons")
                console.error("Error fetching sermons:", err)
            } finally {
                setLoading(false)
            }
        }

        const fetchAudio = async () => {
            try {
                setLoading(true)
                setError(null)
                const response = await get_telegram_audios()
                
                console.log("Telegram API response:", response) // Debug log
                
                // Handle the response properly
                if (Array.isArray(response)) {
                    // Success case - it's an array of audio objects
                    setTelegram(response)
                } else if (response && response.audios === "None") {
                    // Error case from backend
                    console.warn("No telegram audios found")
                    setTelegram([])
                } else {
                    // Unexpected response format
                    console.warn("Unexpected telegram response format:", response)
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
        fetchSermon();
        fetchAudio();
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
                        <p className="mt-3">Loading sermons...</p>
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
                            <p className="text-muted lead">No Telegram Audios available</p>
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
                                            {audio.audio_file && (
                                                <div className="mt-3">
                                                    <audio controls className="w-100">
                                                        <source src={audio.audio_file} />
                                                        Your browser does not support the audio element.
                                                    </audio>
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