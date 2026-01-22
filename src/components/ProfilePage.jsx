import { useState, useEffect } from 'react'
import axios from 'axios'
import { MapPin, Link as LinkIcon, Users, BookMarked, Calendar } from 'lucide-react'
import './ProfilePage.css'

function ProfilePage({ username }) {
    const [userInfo, setUserInfo] = useState(null)
    const [userRepos, setUserRepos] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true)
            setError(null)

            try {
                console.log('Fetching data for user:', username)

                // Fetch user info and repos in parallel
                const [userResponse, reposResponse] = await Promise.all([
                    axios.get(`https://api.github.com/users/${username}`),
                    axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
                ])

                console.log('User data:', userResponse.data)
                console.log('Repos data:', reposResponse.data)

                setUserInfo(userResponse.data)
                setUserRepos(reposResponse.data)
            } catch (error) {
                console.error('Error fetching user data:', error)
                setError(error.response?.data?.message || error.message || 'Failed to load profile')
            } finally {
                setIsLoading(false)
            }
        }

        if (username) {
            fetchUserData()
        }
    }, [username])

    if (isLoading) {
        return (
            <div className="profile-loading fade-in">
                <div className="loading-spinner-large"></div>
                <p>Loading your profile...</p>
            </div>
        )
    }

    if (error || !userInfo) {
        return (
            <div className="profile-error fade-in">
                <div className="error-content glass-card">
                    <div className="error-icon">⚠️</div>
                    <h2>{error ? 'Error Loading Profile' : 'User Not Found'}</h2>
                    <p>{error || `The user "${username}" could not be found.`}</p>
                    <button
                        className="error-retry-button"
                        onClick={() => window.location.reload()}
                    >
                        Try Refreshing
                    </button>
                    <p className="error-hint">
                        Tip: Check your internet connection or try again later.
                    </p>
                </div>
            </div>
        )
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    }

    return (
        <div style={{ padding: '50px', color: 'white', background: '#1e1e1e', borderRadius: '12px', textAlign: 'center' }}>
            <h1>DEBUG MODE: Profile Page</h1>
            <p>Username: {username}</p>
            <p>If you see this, the component is rendering correctly!</p>
            <hr />
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
                <div className="loading-spinner-large"></div>
                <p>Checking assets...</p>
            </div>
        </div>
    )
}

export default ProfilePage
