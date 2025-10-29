import React, { useEffect, useState } from "react"
import { FiUser, FiMail, FiPhone, FiHome, FiHash, FiBook, FiUsers } from "react-icons/fi"
import "../styles/Profile.css"
import useLocalStorage from "../hooks/useLocalStorage"
import Particles from "../components/Particles"

const UserProfile = () => {
    const [profile, setProfile] = useState(null)
    const [token] = useLocalStorage("token", "")
    const [uniqueId] = useLocalStorage("uniqueId", "")
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`${backendUrl}/account/displayProfile/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
                const data = await res.json()
                setProfile(data)
            } catch {
                setProfile({ error: true })
            }
        }
        fetchProfile()
    }, [])

    if (!profile) {
        return (
            <div className="profile-loading">
                <Particles particleColors={['#d4af37', '#b78f28']} particleCount={2000} speed={0.1} />
                <h2>Loading profile...</h2>
            </div>
        )
    }

    if (profile.error) {
        return (
            <div className="profile-error">
                <h2>❌ Failed to load profile. Try again later.</h2>
            </div>
        )
    }

    return (
        <div className="profile-page">
            <div className="particles-background">
                <Particles particleColors={['#d4af37', '#b78f28']} particleCount={3000} speed={0.1} />
            </div>

            <div className="profile-card">
                <h1 className="profile-title">User Profile</h1>
                <hr className="divider" />

                <div className="profile-info">
                    <div className="profile-item"><FiUser /> <strong>Name:</strong> {profile.first_name} {profile.last_name}</div>
                    <div className="profile-item"><FiMail /> <strong>Email:</strong> {profile.email}</div>
                    <div className="profile-item"><FiPhone /> <strong>Phone:</strong> {profile.phone}</div>
                    <div className="profile-item"><FiBook /> <strong>College:</strong> {profile.college}</div>
                    <div className="profile-item"><FiHome /> <strong>Accommodation:</strong> {profile.accommodation_required === "Y" ? "Yes" : "No"}</div>
                    <div className="profile-item"><FiHash /> <strong>User ID:</strong> {uniqueId}</div>
                    <div className="profile-item"><FiUsers /> <strong>Team ID:</strong> {profile.team_id || "NA"}</div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
