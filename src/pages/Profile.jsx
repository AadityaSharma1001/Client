import React, { useEffect, useMemo, useState } from "react"
import { FiUser, FiMail, FiPhone, FiHome, FiHash, FiBook, FiUsers, FiCheckCircle, FiXCircle, FiLogOut } from "react-icons/fi"
import "../styles/Profile.css"
import useLocalStorage from "../hooks/useLocalStorage"
import Particles from "../components/Particles"

const UserProfile = () => {
    const [profile, setProfile] = useState(null)
    const [token, setToken] = useLocalStorage("token", "")
    const [uniqueId, setUniqueId] = useLocalStorage("uniqueId", "")
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

    const initials = useMemo(() => {
        const first = profile?.first_name?.[0] || ""
        const last = profile?.last_name?.[0] || ""
        const joined = `${first}${last}`.trim()
        return joined || (profile?.email ? profile.email[0]?.toUpperCase() : "U")
    }, [profile])

    const teams = useMemo(() => {
        if (!profile) return []
        const multi = profile.teams || profile.team_ids
        if (Array.isArray(multi) && multi.length > 0) return multi
        if (profile.team_id) return [profile.team_id]
        return []
    }, [profile])

    const handleLogout = () => {
        localStorage.clear()
        setToken("")
        setUniqueId("")
        window.location.reload()
    }

    if (!profile) {
        return (
            <div className="profile-loading">
                <Particles particleColors={['#d4af37', '#b78f28']} particleCount={2000} speed={0.1} />
                <div className="profile-skeleton">
                    <div className="skeleton-avatar" />
                    <div className="skeleton-line w-60" />
                    <div className="skeleton-line w-40" />
                    <div className="skeleton-grid">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div className="skeleton-card" key={i} />
                        ))}
                    </div>
                </div>
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
                <Particles particleColors={['#d4af37', '#06b6d4', '#b78f28']} particleCount={2400} speed={0.12} />
            </div>

            <div className="profile-container">

                {/* 🔹 Logout Button */}
                <button className="logout-button" onClick={handleLogout}>
                    <FiLogOut /> Logout
                </button>

                <section className="profile-hero">
                    <div className="avatar-ring">
                        <div className="avatar-circle"><FiUser aria-label="User avatar" /></div>
                    </div>
                    <div className="hero-text">
                        <h1 className="profile-title">{profile.first_name} {profile.last_name}</h1>
                        <p className="profile-subtitle"><FiMail /> {profile.email}</p>
                        <div className="profile-badges">
                            <span className="badge"><FiHash /> ID: {uniqueId}</span>
                            <span className={`badge ${profile.accommodation === "Y" ? 'ok' : 'muted'}`}>
                                {profile.accommodation === "Y" ? <FiCheckCircle /> : <FiXCircle />}
                                {profile.accommodation === "Y" ? 'Accommodation' : 'No Accommodation'}
                            </span>
                        </div>
                    </div>
                </section>

                <section className="profile-grid">
                    <div className="info-card">
                        <div className="info-title"><FiUser /> Full Name</div>
                        <div className="info-value">{profile.first_name} {profile.last_name}</div>
                    </div>
                    <div className="info-card">
                        <div className="info-title"><FiPhone /> Phone</div>
                        <div className="info-value">{profile.phone || '—'}</div>
                    </div>
                    <div className="info-card">
                        <div className="info-title"><FiHome /> Accommodation</div>
                        <div className="info-value">{profile.accommodation === "Y" ? 'Yes' : 'No'}</div>
                    </div>
                    <div className="info-card">
                        <div className="info-title"><FiHash /> Unique ID</div>
                        <div className="info-value">{uniqueId}</div>
                    </div>
                    <div className="info-card span-2 college-card">
                        <div className="info-title"><FiBook /> College</div>
                        <div className="info-value">{profile.college || '—'}</div>
                    </div>
                    <div className="info-card span-2">
                        <div className="info-title"><FiUsers /> Teams</div>
                        <div className="info-value">
                            {teams.length > 0 ? (
                                <div className="teams-list">
                                    {teams.map((t, i) => (
                                        <span className="badge" key={`${t}-${i}`}>{String(t)}</span>
                                    ))}
                                </div>
                            ) : 'NA'}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default UserProfile