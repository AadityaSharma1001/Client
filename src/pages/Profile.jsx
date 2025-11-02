import React, { useEffect, useState } from "react"
import { FiUser, FiMail, FiPhone, FiHome, FiHash, FiBook, FiUsers, FiCheckCircle, FiXCircle, FiLogOut, FiSettings, FiTrendingUp, FiX, FiTrash2, FiAward, FiAlertCircle } from "react-icons/fi"
import "../styles/Profile.css"
import useLocalStorage from "../hooks/useLocalStorage"
import Particles from "../components/Particles"


const UserProfile = () => {
    const [profile, setProfile] = useState(null)
    const [allTeams, setAllTeams] = useState([])
    const [teamsLoading, setTeamsLoading] = useState(false)
    const [token, setToken] = useLocalStorage("token", "")
    const [uniqueId, setUniqueId] = useLocalStorage("uniqueId", "")
    const [selectedTeam, setSelectedTeam] = useState(null)
    const [showTeamModal, setShowTeamModal] = useState(false)
    const [showManageModal, setShowManageModal] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [playerToRemove, setPlayerToRemove] = useState(null)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
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
            } catch (error) {
                setProfile({ error: true })
            }
        }
        fetchProfile()
    }, [token, backendUrl])


    useEffect(() => {
        const fetchAllTeams = async () => {
            setTeamsLoading(true)
            try {
                const res = await fetch(`${backendUrl}/account/displayTeam/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
                const data = await res.json()
                setAllTeams(Array.isArray(data.team_data) ? data.team_data : [])
            } catch (error) {
                setAllTeams([])
            } finally {
                setTeamsLoading(false)
            }
        }

        if (token) {
            fetchAllTeams()
        }
    }, [token, backendUrl])


    const handleViewTeam = (team) => {
        setSelectedTeam(team)
        setShowTeamModal(true)
    }


    const handleManageTeam = (team) => {
        setSelectedTeam(team)
        setShowManageModal(true)
    }


    const handleCloseTeamModal = () => {
        setShowTeamModal(false)
        setSelectedTeam(null)
    }


    const handleCloseManageModal = () => {
        setShowManageModal(false)
        setSelectedTeam(null)
    }


    const handleOpenRemoveConfirm = (playerId, playerName, playerEmail) => {
        setPlayerToRemove({ id: playerId, name: playerName, email: playerEmail })
        setShowConfirmModal(true)
    }


    const handleCloseConfirmModal = () => {
        setShowConfirmModal(false)
        setPlayerToRemove(null)
    }


    const handleConfirmRemove = async () => {
        if (!playerToRemove) return

        try {
            const res = await fetch(`${backendUrl}/registration/removeplayer/`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: playerToRemove.id,
                    teamId: selectedTeam.team_id
                })
            })

            if (res.ok) {
                // Update the selectedTeam to remove the player from UI
                setSelectedTeam(prevTeam => ({
                    ...prevTeam,
                    players_info: prevTeam.players_info.filter(p => p.user_id !== playerToRemove.id)
                }))

                // Also update allTeams
                setAllTeams(prevTeams =>
                    prevTeams.map(team =>
                        team.team_id === selectedTeam.team_id
                            ? {
                                ...team,
                                players_info: team.players_info.filter(p => p.user_id !== playerToRemove.id)
                            }
                            : team
                    )
                )

                // Show success message
                setSuccessMessage(`Removed ${playerToRemove.name} (${playerToRemove.email})`)
                setShowSuccessMessage(true)
                setTimeout(() => setShowSuccessMessage(false), 4000)

                // Close confirmation modal
                handleCloseConfirmModal()
            } else {
                alert("Failed to remove player. Try again later.")
            }
        } catch (error) {
            alert("Error removing player. Try again later.")
        }
    }


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
                        <div className="info-value">
                            {profile.accommodation === "Y" ? 'Yes' : 'No'}
                            {profile.accommodation === "Y" && (
                                <span className={`payment-badge-mini ${profile.accommodation_payment === 'Yes' ? 'paid' : 'pending'}`}>
                                    {profile.accommodation_payment === 'Yes' ? '✓ Paid' : '⏳ Payment Pending'}
                                </span>
                            )}
                        </div>
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
                        <div className="info-title"><FiUsers /> Teams Enrolled</div>
                        <div className="info-value">{allTeams.length} Teams</div>
                    </div>
                </section>

                <section className="verify-participants-section">
                    <div className="verify-participants-card">
                        <div className="verify-participants-content">
                            <div className="verify-participants-text">
                                <h3 className="verify-participants-title">
                                    <FiCheckCircle /> Verify Participants
                                </h3>
                                <p className="verify-participants-mandatory">
                                    <strong>Mandatory:</strong> All team participants must be verified through the official verification form.
                                </p>
                            </div>
                            <a
                                href="https://docs.google.com/forms/d/e/1FAIpQLSdWIu1JGUVuYJyzmDLEmmxsX29eq7G4RMkgD9fJNWb_sxFmUQ/viewform"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="verify-participants-btn"
                            >
                                Verify Participants
                            </a>
                        </div>
                    </div>
                </section>

                <section className="teams-details-section">
                    <div className="teams-section-header">
                        <h2 className="teams-details-title">
                            <FiUsers /> All Teams
                        </h2>
                        <span className="teams-count">{allTeams.length} teams</span>
                    </div>

                    {teamsLoading ? (
                        <div className="teams-loading">
                            <div className="loading-spinner" />
                            <p>Loading teams...</p>
                        </div>
                    ) : allTeams.length > 0 ? (
                        <div className="teams-grid">
                            {allTeams.map((team, index) => (
                                <div className="team-card" key={`${team.team_id}-${index}`}>
                                    <div className="team-card-header">
                                        <div className="team-sport-badge">
                                            <span className="sport-name">
                                                {team.sport === "Athletics" && team.athletics_events?.length > 0
                                                    ? `${team.sport} (${team.athletics_events.join(", ")})`
                                                    : team.sport === "Valorant" ? "Free Fire" : team.sport
                                                }
                                            </span>
                                        </div>
                                        {team.captain && (
                                            <span className="captain-badge">
                                                <FiCheckCircle /> Captain
                                            </span>
                                        )}
                                    </div>


                                    <div className="team-card-body">
                                        <div className="team-info-row">
                                            <span className="team-label">Team ID</span>
                                            <span className="team-value team-id">{team.team_id}</span>
                                        </div>


                                        <div className="team-info-row">
                                            <span className="team-label">College</span>
                                            <span className="team-value">{team.college}</span>
                                        </div>


                                        <div className="team-info-row">
                                            <span className="team-label">Captain</span>
                                            <span className="team-value">{team.captain_name}</span>
                                        </div>


                                        <div className="team-info-row">
                                            <span className="team-label">Category</span>
                                            <span className="team-value">{team.category || 'N/A'}</span>
                                        </div>


                                        <div className="team-info-row">
                                            <span className="team-label">Players</span>
                                            <span className="team-value">{team.players_info?.length || 0} members</span>
                                        </div>


                                        <div className="team-info-row">
                                            <span className="team-label">Payment</span>
                                            <span className={`team-value payment-status ${team.payment_information === 'Paid' ? 'paid' : 'pending'}`}>
                                                {team.payment_information || 'N/A'}
                                            </span>
                                        </div>



                                    </div>


                                    <div className="team-card-footer">
                                        <button
                                            className="view-team-button"
                                            onClick={() => handleViewTeam(team)}
                                        >
                                            <FiUsers /> My Team
                                        </button>
                                        {team.captain && (
                                            <button
                                                className="manage-team-button"
                                                onClick={() => handleManageTeam(team)}
                                            >
                                                <FiSettings /> Manage Team
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-teams">
                            <p>No teams found</p>
                        </div>
                    )}
                </section>
            </div>

            {showTeamModal && selectedTeam && (
                <div className="modal-overlay" onClick={handleCloseTeamModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div>
                                <h2 className="modal-title">
                                    {selectedTeam.sport === "Athletics" && selectedTeam.athletics_events?.length > 0
                                        ? `${selectedTeam.sport} (${selectedTeam.athletics_events.join(", ")})`
                                        : selectedTeam.sport
                                    }
                                </h2>
                                <p className="modal-subtitle">Team ID: {selectedTeam.team_id}</p>
                            </div>
                            <button className="modal-close-btn" onClick={handleCloseTeamModal}>
                                <FiX />
                            </button>
                        </div>


                        <div className="modal-body">
                            <div className="team-details">
                                <div className="detail-item">
                                    <span className="detail-label">College:</span>
                                    <span className="detail-value">{selectedTeam.college}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Captain:</span>
                                    <span className="detail-value">{selectedTeam.captain_name}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Category:</span>
                                    <span className="detail-value">{selectedTeam.category}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Payment Status:</span>
                                    <span className={`detail-value payment-badge ${selectedTeam.payment_information === 'Paid' ? 'paid' : 'pending'}`}>
                                        {selectedTeam.payment_information}
                                    </span>
                                </div>
                            </div>


                            <div className="players-section">
                                <h3 className="players-title">
                                    <FiUsers /> Team Players ({selectedTeam.players_info?.length || 0})
                                </h3>
                                <div className="players-list">
                                    {selectedTeam.players_info && selectedTeam.players_info.length > 0 ? (
                                        selectedTeam.players_info.map((player, index) => (
                                            <div className="player-card" key={`${player.user_id}-${index}`}>
                                                <div className="player-avatar">
                                                    <FiUser />
                                                </div>
                                                <div className="player-info">
                                                    <h4 className="player-name">{player.name}</h4>
                                                    <p className="player-email">
                                                        <FiMail /> <span>{player.email}</span>
                                                    </p>
                                                    {player.phone && (
                                                        <p className="player-phone">
                                                            <FiPhone /> <span>{player.phone}</span>
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="no-players">No players found</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showManageModal && selectedTeam && (
                <div className="modal-overlay" onClick={handleCloseManageModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div>
                                <h2 className="modal-title">
                                    Manage - {selectedTeam.sport === "Athletics" && selectedTeam.athletics_events?.length > 0
                                        ? `${selectedTeam.sport} (${selectedTeam.athletics_events.join(", ")})`
                                        : (selectedTeam.sport === "Valorant" ? "Free Fire" : selectedTeam.sport)
                                    }
                                </h2>
                                <p className="modal-subtitle">Team ID: {selectedTeam.team_id}</p>
                            </div>
                            <button className="modal-close-btn" onClick={handleCloseManageModal}>
                                <FiX />
                            </button>
                        </div>


                        <div className="modal-body">
                            <div className="team-details">
                                <div className="detail-item">
                                    <span className="detail-label">College:</span>
                                    <span className="detail-value">{selectedTeam.college}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Captain:</span>
                                    <span className="detail-value">{selectedTeam.captain_name}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Category:</span>
                                    <span className="detail-value">{selectedTeam.category}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Payment Status:</span>
                                    <span className={`detail-value payment-badge ${selectedTeam.payment_information === 'Paid' ? 'paid' : 'pending'}`}>
                                        {selectedTeam.payment_information}
                                    </span>
                                </div>
                            </div>


                            <div className="players-section">
                                <h3 className="players-title">
                                    <FiUsers /> Team Members ({selectedTeam.players_info?.length || 0})
                                </h3>
                                <div className="players-list">
                                    {selectedTeam.players_info && selectedTeam.players_info.length > 0 ? (
                                        selectedTeam.players_info.map((player, index) => (
                                            <div className="player-card manage-player-card" key={`${player.user_id}-${index}`}>
                                                <div className="player-avatar">
                                                    <FiUser />
                                                </div>
                                                <div className="player-info">
                                                    <h4 className="player-name">{player.name}</h4>
                                                    <p className="player-email">
                                                        <FiMail /> <span>{player.email}</span>
                                                    </p>
                                                    {player.phone && (
                                                        <p className="player-phone">
                                                            <FiPhone /> <span>{player.phone}</span>
                                                        </p>
                                                    )}
                                                </div>
                                                {selectedTeam.captain_name === player.name ? (
                                                    <div className="captain-icon-badge" title="Team Captain">
                                                        <FiAward />
                                                    </div>
                                                ) : (
                                                    <button
                                                        className="remove-player-btn"
                                                        onClick={() => handleOpenRemoveConfirm(player.user_id, player.name, player.email)}
                                                        title={`Remove ${player.name}`}
                                                    >
                                                        <FiTrash2 />
                                                    </button>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="no-players">No players found</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showConfirmModal && playerToRemove && (
                <div className="modal-overlay" onClick={handleCloseConfirmModal}>
                    <div className="confirmation-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="confirmation-header">
                            <FiAlertCircle className="confirmation-icon" />
                            <h2>Remove Player</h2>
                        </div>

                        <div className="confirmation-body">
                            <p>Are you sure you want to remove <strong>{playerToRemove.name}</strong> ({playerToRemove.email}) from the team?</p>
                            <p className="confirmation-warning">This action cannot be undone.</p>
                        </div>

                        <div className="confirmation-footer">
                            <button className="btn-cancel" onClick={handleCloseConfirmModal}>
                                Cancel
                            </button>
                            <button className="btn-confirm" onClick={handleConfirmRemove}>
                                Remove Player
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showSuccessMessage && (
                <div className="success-toast">
                    <div className="toast-content">
                        <FiCheckCircle className="toast-icon" />
                        <span>{successMessage}</span>
                    </div>
                </div>
            )}
        </div>
    )
}


export default UserProfile