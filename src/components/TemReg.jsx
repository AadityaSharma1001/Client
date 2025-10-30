import React, { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import '../styles/TeamReg.css';

const SPORTS_DATA = {
    "Basketball Championship": {
        "no": "3",
        "categories": {
            "Men": { "min": 5, "max": 12 },
            "Women": { "min": 5, "max": 12 }
        }
    },
    "Football Cup": {
        "no": "5",
        "categories": {
            "Men": { "min": 11, "max": 16 }
        }
    },
    "Table Tennis Masters": {
        "no": "6",
        "categories": {
            "Men Singles": { "min": 1, "max": 1 },
            "Women Singles": { "min": 1, "max": 1 },
            "Men Team": { "min": 3, "max": 4 },
            "Women Team": { "min": 2, "max": 3 }
        }
    },
    "Cricket League": {
        "no": "4",
        "categories": {
            "Men": { "min": 11, "max": 16 }
        }
    },
    "Badminton Tournament": {
        "no": "2",
        "categories": {
            "Men": { "min": 3, "max": 5 },
            "Women": { "min": 2, "max": 3 },
            "Mixed": { "min": 2, "max": 2 }
        }
    },
    "Volleyball Championship": {
        "no": "8",
        "categories": {
            "Men": { "min": 6, "max": 12 },
            "Women": { "min": 6, "max": 12 }
        }
    },
    "Chess Masters": {
        "no": "12",
        "categories": {
            "Men": { "min": 4, "max": 5 }
        }
    },
    "BGMI Esports": {
        "no": "13",
        "categories": {
            "X": { "min": 4, "max": 5 }
        }
    },
    "Hockey Championship": {
        "no": "10",
        "categories": {
            "Men": { "min": 11, "max": 14 }
        }
    },
    "Kabaddi Tournament": {
        "no": "9",
        "categories": {
            "Men": { "min": 7, "max": 12 }
        }
    },
    "Powerlifting Championship": {
        "no": "16",
        "categories": {
            "Men": { "min": 4, "max": 8 }
        }
    },
    "Squash Championship": {
        "no": "11",
        "categories": {
            "Men": { "min": 3, "max": 4 },
            "Women": { "min": 3, "max": 4 }
        }
    },
    "Free Fire Esports": {
        "no": "14",
        "categories": {
            "X": { "min": 4, "max": 4 }
        }
    },
    "Athletics Championship": {
        "no": "1",
        "categories": {
            "Men": { "min": 1, "max": 42 },
            "Women": { "min": 1, "max": 42 }
        }
    },
};

const CATEGORY_MAP = {
    "Men": "M",
    "Women": "W",
    "Mixed": "X",
    "Women Singles": "S",
    "Men Singles": "S",
    "X": "X"
};

const TeamReg = ({ isOpen, onClose, sportName }) => {
    const [activeTab, setActiveTab] = useState('create');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [teamData, setTeamData] = useState({});
    const [playerIds, setPlayerIds] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [teamId, setTeamId] = useState('');
    const [token] = useLocalStorage("token", "");

    const sportInfo = SPORTS_DATA[sportName];
    const isFreeFire = sportInfo?.no === "14" || sportInfo?.no === "13";

    useEffect(() => {
        if (isOpen) {
            setActiveTab('create');
            if (isFreeFire) {
                setSelectedCategories(['X']);
                setTeamData({ 'X': { teamSize: 4, teamName: '' } });
            } else {
                setSelectedCategories([]);
                setTeamData({});
            }
            setPlayerIds({});
            setErrors({});
            setSubmitError('');
            setSubmitSuccess(false);
            setSuccessMessage('');
            setTeamId('');
        }
    }, [isOpen, sportName, isFreeFire]);

    const handleCategoryToggle = (category) => {
        setSelectedCategories(prev => {
            if (prev.includes(category)) {
                const newCategories = prev.filter(c => c !== category);
                const newTeamData = { ...teamData };
                delete newTeamData[category];
                setTeamData(newTeamData);

                const newPlayerIds = { ...playerIds };
                delete newPlayerIds[category];
                setPlayerIds(newPlayerIds);

                const newErrors = { ...errors };
                delete newErrors[`${category}_teamSize`];
                delete newErrors[`${category}_teamName`];
                setErrors(newErrors);

                return newCategories;
            } else {
                return [...prev, category];
            }
        });
    };

    const handleTeamSizeChange = (category, value) => {
        const numValue = parseInt(value) || 0;
        const { min, max } = sportInfo.categories[category];

        setTeamData(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                teamSize: numValue
            }
        }));

        if (isFreeFire) {
            const newPlayerIds = {};
            for (let i = 1; i <= numValue; i++) {
                newPlayerIds[`id${i}`] = playerIds[category]?.[`id${i}`] || '';
            }
            setPlayerIds(prev => ({
                ...prev,
                [category]: newPlayerIds
            }));
        }

        if (numValue < min || numValue > max) {
            setErrors(prev => ({
                ...prev,
                [`${category}_teamSize`]: `Team size must be between ${min} and ${max}`
            }));
        } else {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[`${category}_teamSize`];
                return newErrors;
            });
        }
    };

    const handleTeamNameChange = (category, value) => {
        setTeamData(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                teamName: value
            }
        }));

        if (!value.trim()) {
            setErrors(prev => ({
                ...prev,
                [`${category}_teamName`]: 'Team name is required'
            }));
        } else {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[`${category}_teamName`];
                return newErrors;
            });
        }
    };

    const handlePlayerIdChange = (category, idKey, value) => {
        setPlayerIds(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [idKey]: value
            }
        }));

        if (!value.trim()) {
            setErrors(prev => ({
                ...prev,
                [`${category}_${idKey}`]: 'Player ID is required'
            }));
        } else {
            const currentIds = { ...playerIds[category], [idKey]: value };
            const idValues = Object.values(currentIds).map(id => id?.trim().toLowerCase()).filter(Boolean);
            const hasDuplicate = idValues.filter(id => id === value.trim().toLowerCase()).length > 1;

            if (hasDuplicate) {
                setErrors(prev => ({
                    ...prev,
                    [`${category}_${idKey}`]: 'This player ID is already used'
                }));
            } else {
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors[`${category}_${idKey}`];
                    return newErrors;
                });
            }
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (selectedCategories.length === 0) {
            setSubmitError('Please select at least one category');
            return false;
        }

        selectedCategories.forEach(category => {
            const data = teamData[category];
            const { min, max } = sportInfo.categories[category];

            if (!data?.teamName?.trim()) {
                newErrors[`${category}_teamName`] = 'Team name is required';
            }

            if (!data?.teamSize || data.teamSize < min || data.teamSize > max) {
                newErrors[`${category}_teamSize`] = `Team size must be between ${min} and ${max}`;
            }

            if (isFreeFire && playerIds[category]) {
                const seenIds = new Set();

                Object.keys(playerIds[category]).forEach(idKey => {
                    const idValue = playerIds[category][idKey]?.trim();

                    if (!idValue) {
                        newErrors[`${category}_${idKey}`] = 'Player ID is required';
                    } else {
                        if (seenIds.has(idValue.toLowerCase())) {
                            newErrors[`${category}_${idKey}`] = 'This player ID is already used';
                        } else {
                            seenIds.add(idValue.toLowerCase());
                        }
                    }
                });
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateTeam = async (e) => {
        e.preventDefault();
        setSubmitError('');

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const categories = selectedCategories.map(cat => CATEGORY_MAP[cat] || cat);
            const teamsize = selectedCategories.map(cat => teamData[cat].teamSize);
            const teams = selectedCategories.map(cat => teamData[cat].teamName);

            const payload = {
                sport: sportInfo.no,
                categories: categories,
                teamsize: teamsize,
                teams: teams
            };

            if (isFreeFire && selectedCategories.length > 0) {
                const category = selectedCategories[0];
                if (sportInfo?.no === "14") {
                    payload.team_id = {
                        ...playerIds[category],
                        Id5: `Player5_${Math.random().toString(36).substring(2, 10)}`
                    };
                } else {
                    payload.team_id = playerIds[category];
                }
            }

            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const response = await fetch(`${backendUrl}/registration/createteam/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || errorData.Error || 'Registration failed');
            }

            const responseData = await response.json();
            setSuccessMessage(responseData.message || 'Team created successfully!');
            setSubmitSuccess(true);

            setTimeout(() => {
                onClose();
            }, 2000);

        } catch (error) {
            setSubmitError(error.message || 'Failed to register. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleJoinTeam = async (e) => {
        e.preventDefault();
        setSubmitError('');

        if (!teamId.trim()) {
            setSubmitError('Please enter a team ID');
            return;
        }

        setIsSubmitting(true);

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const response = await fetch(`${backendUrl}/account/jointeam`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ teamId: teamId })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || errorData.Error || 'Failed to join team');
            }

            const responseData = await response.json();
            setSuccessMessage(responseData.message || 'Successfully joined team!');
            setSubmitSuccess(true);

            setTimeout(() => {
                onClose();
            }, 2000);

        } catch (error) {
            setSubmitError(error.Message || 'Failed to join team. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) {
        return null;
    }

    if (!sportInfo) {
        return null;
    }

    return (
        <div className="team-reg-overlay" onClick={onClose}>
            <div className="team-reg-modal" onClick={(e) => e.stopPropagation()}>
                <button className="team-reg-close" onClick={onClose}>
                    &times;
                </button>

                <h2 className="team-reg-title">Register for {sportName}</h2>

                {submitSuccess ? (
                    <div className="team-reg-success">
                        <div className="success-icon">✓</div>
                        <p>{successMessage}</p>
                    </div>
                ) : (
                    <>
                        <div className="tab-buttons">
                            <button
                                className={`tab-button ${activeTab === 'create' ? 'active' : ''}`}
                                onClick={() => setActiveTab('create')}
                            >
                                Create Team
                            </button>
                            <button
                                className={`tab-button ${activeTab === 'join' ? 'active' : ''}`}
                                onClick={() => setActiveTab('join')}
                            >
                                Join Team
                            </button>
                        </div>

                        {activeTab === 'create' ? (
                            <form onSubmit={handleCreateTeam} className="team-reg-form">
                                {!isFreeFire && (
                                    <div className="form-section">
                                        <h3 className="section-title">Select Categories</h3>
                                        <div className="category-grid">
                                            {Object.keys(sportInfo.categories).map(category => (
                                                <label key={category} className="category-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedCategories.includes(category)}
                                                        onChange={() => handleCategoryToggle(category)}
                                                        disabled={isSubmitting}
                                                    />
                                                    <span className="category-label">{category}</span>
                                                    <span className="category-range">
                                                        ({sportInfo.categories[category].min}-{sportInfo.categories[category].max})
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {selectedCategories.length > 0 && (
                                    <div className="form-section">
                                        <h3 className="section-title">Team Details</h3>
                                        {selectedCategories.map(category => (
                                            <div key={category} className="team-details-card">
                                                {!isFreeFire && <h4 className="category-heading">{category}</h4>}

                                                <div className="form-group">
                                                    <label htmlFor={`teamName-${category}`}>Team Name</label>
                                                    <input
                                                        id={`teamName-${category}`}
                                                        type="text"
                                                        value={teamData[category]?.teamName || ''}
                                                        onChange={(e) => handleTeamNameChange(category, e.target.value)}
                                                        placeholder="Enter team name"
                                                        disabled={isSubmitting}
                                                        className={errors[`${category}_teamName`] ? 'error' : ''}
                                                    />
                                                    {errors[`${category}_teamName`] && (
                                                        <span className="error-message">{errors[`${category}_teamName`]}</span>
                                                    )}
                                                </div>

                                                {!isFreeFire && (
                                                    <div className="form-group">
                                                        <label htmlFor={`teamSize-${category}`}>
                                                            Team Size (Min: {sportInfo.categories[category].min}, Max: {sportInfo.categories[category].max})
                                                        </label>
                                                        <input
                                                            id={`teamSize-${category}`}
                                                            type="number"
                                                            min={sportInfo.categories[category].min}
                                                            max={sportInfo.categories[category].max}
                                                            value={teamData[category]?.teamSize || ''}
                                                            onChange={(e) => handleTeamSizeChange(category, e.target.value)}
                                                            placeholder="Enter team size"
                                                            disabled={isSubmitting}
                                                            className={errors[`${category}_teamSize`] ? 'error' : ''}
                                                        />
                                                        {errors[`${category}_teamSize`] && (
                                                            <span className="error-message">{errors[`${category}_teamSize`]}</span>
                                                        )}
                                                    </div>
                                                )}

                                                {isFreeFire && (
                                                    <div className="player-ids-section">
                                                        <h5 className="player-ids-heading">Player IDs</h5>
                                                        {['id1', 'id2', 'id3', 'id4'].map((idKey, i) => (
                                                            <div key={idKey} className="form-group">
                                                                <label htmlFor={`${category}-${idKey}`}>
                                                                    Player {i + 1}
                                                                </label>
                                                                <input
                                                                    id={`${category}-${idKey}`}
                                                                    type="text"
                                                                    value={playerIds[category]?.[idKey] || ''}
                                                                    onChange={(e) => handlePlayerIdChange(category, idKey, e.target.value)}
                                                                    placeholder={`Enter player ${i + 1} ID`}
                                                                    disabled={isSubmitting}
                                                                    className={errors[`${category}_${idKey}`] ? 'error' : ''}
                                                                />
                                                                {errors[`${category}_${idKey}`] && (
                                                                    <span className="error-message">{errors[`${category}_${idKey}`]}</span>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {submitError && (
                                    <div className="submit-error">
                                        {submitError}
                                    </div>
                                )}

                                <div className="form-actions">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="btn-cancel"
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn-submit"
                                        disabled={isSubmitting || selectedCategories.length === 0}
                                    >
                                        {isSubmitting ? 'Creating...' : 'Create Team'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleJoinTeam} className="team-reg-form">
                                <div className="form-section">
                                    <h3 className="section-title">Join Existing Team</h3>
                                    <div className="form-group">
                                        <label htmlFor="teamId">Team ID</label>
                                        <input
                                            id="teamId"
                                            type="text"
                                            value={teamId}
                                            onChange={(e) => setTeamId(e.target.value)}
                                            placeholder="Enter team ID"
                                            disabled={isSubmitting}
                                            className={submitError && !teamId.trim() ? 'error' : ''}
                                        />
                                    </div>
                                </div>

                                {submitError && (
                                    <div className="submit-error">
                                        {submitError}
                                    </div>
                                )}

                                <div className="form-actions">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="btn-cancel"
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn-submit"
                                        disabled={isSubmitting || !teamId.trim()}
                                    >
                                        {isSubmitting ? 'Joining...' : 'Join Team'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default TeamReg;