import { VStack, Heading, Button, Box, Text, Spinner, Alert, AlertIcon } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { logout, get_sermon } from "../endpoints/api"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const [sermon, setSermon] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
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
        fetchSermon();
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
            <VStack spacing={4} p={8}>
                <Spinner size="xl" />
                <Text>Loading sermons...</Text>
            </VStack>
        )
    }

    if (error) {
        return (
            <VStack spacing={4} p={8}>
                <Alert status="error">
                    <AlertIcon />
                    {error}
                </Alert>
                <Button onClick={() => window.location.reload()}>
                    Try Again
                </Button>
            </VStack>
        )
    }

    return (
        <VStack spacing={6} p={6}>
            <Heading as="h1" size="xl" textAlign="center">
                Welcome back user
            </Heading>
            
            <VStack spacing={4} width="100%">
                {sermon.length === 0 ? (
                    <Text fontSize="lg" color="gray.500">
                        No sermons available
                    </Text>
                ) : (
                    sermon.map((sermonItem) => (
                        <Box 
                            key={sermonItem.id}
                            width="100%" 
                            maxWidth="560px"
                            borderRadius="lg"
                            overflow="hidden"
                            boxShadow="md"
                        >
                            {sermonItem.validVideoId ? (
                                <iframe
                                    width="100%"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${sermonItem.validVideoId}`}
                                    title={sermonItem.title}
                                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen 
                                    loading="lazy"
                                />
                            ) : (
                                <Box 
                                    height="315" 
                                    bg="gray.100" 
                                    display="flex" 
                                    alignItems="center" 
                                    justifyContent="center"
                                >
                                    <Text color="gray.500" textAlign="center">
                                        Invalid YouTube URL<br />
                                        <Text fontSize="sm" as="span">
                                            {sermonItem.youtube_url}
                                        </Text>
                                    </Text>
                                </Box>
                            )}
                            <Box p={4} bg="white">
                                <Text fontWeight="bold" fontSize="lg">
                                    {sermonItem.title}
                                </Text>
                            </Box>
                        </Box>
                    ))
                )}
            </VStack>
            
            <Button 
                onClick={handleLogout} 
                colorScheme="red" 
                size="lg"
            >
                Logout
            </Button>
        </VStack>
    )
}

export default Home