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
            "Men": { "min": 1, "max": 4 }
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
        "hasEvents": true,
        "maxEvents": 3,
        "genderCategories": ["Men", "Women"],
        "events": {
            "Track Events": {
                "100m": { "min": 1, "max": 1 },
                "200m": { "min": 1, "max": 1 },
                "400m": { "min": 1, "max": 1 },
                "800m": { "min": 1, "max": 1 },
                "1500m": { "min": 1, "max": 1 },
                "5km": { "min": 1, "max": 1 },
                "4x100m": { "min": 4, "max": 4 },
                "4x400m": { "min": 4, "max": 4 }
            },
            "Field Events": {
                "Discus Throw": { "min": 1, "max": 1 },
                "Shot Put": { "min": 1, "max": 1 },
                "High Jump": { "min": 1, "max": 1 },
                "Long Jump": { "min": 1, "max": 1 },
                "Triple Jump": { "min": 1, "max": 1 }
            }
        }
    },
};

const CATEGORY_MAP = {
    "Men": "M",
    "Women": "W",
    "Men Team": "M",
    "Women Team": "W",
    "Mixed": "X",
    "Women Singles": "S",
    "Men Singles": "S",
    "X": "X"
};

const TeamReg = ({ isOpen, onClose, sportName }) => {
    const [activeTab, setActiveTab] = useState('create');
    const [selectedGender, setSelectedGender] = useState('');
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
    const isAthletics = sportInfo?.hasEvents;
    const maxEvents = sportInfo?.maxEvents || 999;

    useEffect(() => {
        if (isOpen) {
            setActiveTab('create');
            setSelectedGender('');
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
                if (isAthletics && prev.length >= maxEvents) {
                    setSubmitError(`You can select a maximum of ${maxEvents} events`);
                    setTimeout(() => setSubmitError(''), 3000);
                    return prev;
                }
                return [...prev, category];
            }
        });
    };

    const handleTeamSizeChange = (category, value) => {
        const numValue = parseInt(value) || 0;

        let min, max;
        if (isAthletics) {
            const eventData = Object.values(sportInfo.events).flatMap(events =>
                Object.entries(events)
            ).find(([eventName]) => category === `${selectedGender} - ${eventName}`)?.[1];
            min = eventData?.min || 1;
            max = eventData?.max || 1;
        } else {
            ({ min, max } = sportInfo.categories[category]);
        }

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
            setSubmitError('Please select at least one event');
            return false;
        }

        if (isAthletics && selectedCategories.length > maxEvents) {
            setSubmitError(`You can select a maximum of ${maxEvents} events`);
            return false;
        }

        if (isAthletics && !selectedGender) {
            setSubmitError('Please select a gender category');
            return false;
        }

        selectedCategories.forEach(category => {
            const data = teamData[category];

            let min, max;
            if (isAthletics) {
                const eventData = Object.values(sportInfo.events).flatMap(events =>
                    Object.entries(events)
                ).find(([eventName]) => category === `${selectedGender} - ${eventName}`)?.[1];
                min = eventData?.min || 1;
                max = eventData?.max || 1;
            } else {
                ({ min, max } = sportInfo.categories[category]);
            }

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
            let payload;

            if (isAthletics) {
                const eventNames = selectedCategories.map(cat => cat.replace(`${selectedGender} - `, ''));
                const teamSizes = selectedCategories.map(cat => teamData[cat].teamSize);
                const teamNames = selectedCategories.map(cat => teamData[cat].teamName);

                const categoryCode = CATEGORY_MAP[selectedGender];
                const categories = Array(eventNames.length).fill(categoryCode);

                payload = {
                    sport: sportInfo.no,
                    categories: categories,
                    teamsize: teamSizes,
                    teams: teamNames,
                    event_data: eventNames
                };
            } else {
                const categories = selectedCategories.map(cat => CATEGORY_MAP[cat] || cat);
                const teamsize = selectedCategories.map(cat => teamData[cat].teamSize);
                const teams = selectedCategories.map(cat => teamData[cat].teamName);

                payload = {
                    sport: sportInfo.no,
                    categories: categories,
                    teamsize: teamsize,
                    teams: teams
                };
            }

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
                let errorMessage = 'Registration failed';

                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorData.Error || errorData.error || JSON.stringify(errorData);
                } catch (e) {
                    if (response.status === 404) {
                        errorMessage = 'Endpoint not found. Please check with administrator.';
                    } else if (response.status === 500) {
                        errorMessage = 'Server error. Please try again later.';
                    } else if (response.status === 403) {
                        errorMessage = 'You are already registered for this event.';
                    } else if (response.status === 401) {
                        errorMessage = 'Session expired. Please login again.';
                    } else if (response.status === 400) {
                        errorMessage = 'Invalid request format. Please check the data.';
                    } else {
                        errorMessage = `Server error (${response.status}). Please try again.`;
                    }
                }

                throw new Error(errorMessage);
            }

            let responseData;
            try {
                responseData = await response.json();
            } catch (e) {
                responseData = { message: 'Team created successfully!' };
            }

            console.log('Success response:', responseData);
            setSuccessMessage(responseData.message || 'Team created successfully!');
            setSubmitSuccess(true);

            setTimeout(() => {
                onClose();
            }, 2000);

        } catch (error) {
            let errorMessage = error.message || 'Failed to register. Please try again.';

            if (sportInfo?.no === "14") {
                errorMessage = errorMessage.replace(/Valorant/gi, 'Free Fire');
            }

            if (errorMessage.toLowerCase().includes('count') ||
                errorMessage.toLowerCase().includes('limit') ||
                errorMessage.toLowerCase().includes('maximum') ||
                errorMessage.toLowerCase().includes('exceed')) {
                errorMessage = `Registration limit reached. ${errorMessage}`;
            }

            console.error('Error:', error);
            setSubmitError(errorMessage);
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
            const response = await fetch(`${backendUrl}/account/jointeam/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ teamId: teamId })
            });

            if (!response.ok) {
                let errorMessage = 'Failed to join team';

                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorData.Error || errorData.error || errorMessage;
                } catch (e) {
                    if (response.status === 404) {
                        errorMessage = 'Team not found.';
                    } else if (response.status === 500) {
                        errorMessage = 'Server error. Please try again later.';
                    } else if (response.status === 401) {
                        errorMessage = 'Session expired. Please login again.';
                    } else {
                        errorMessage = `Server error (${response.status}). Please try again.`;
                    }
                }

                throw new Error(errorMessage);
            }

            let responseData;
            try {
                responseData = await response.json();
            } catch (e) {
                responseData = { message: 'Successfully joined team!' };
            }

            setSuccessMessage(responseData.message || 'Successfully joined team!');
            setSubmitSuccess(true);

            setTimeout(() => {
                onClose();
            }, 2000);

        } catch (error) {
            setSubmitError(error.message || 'Failed to join team. Please try again.');
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
                                Join Team (Case Sensitive)
                            </button>
                        </div>

                        {activeTab === 'create' ? (
                            <form onSubmit={handleCreateTeam} className="team-reg-form">
                                {isAthletics && (
                                    <div className="form-section">
                                        <h3 className="section-title">Select Gender Category</h3>
                                        <div className="gender-buttons">
                                            {sportInfo.genderCategories.map(gender => (
                                                <button
                                                    key={gender}
                                                    type="button"
                                                    className={`gender-button ${selectedGender === gender ? 'active' : ''}`}
                                                    onClick={() => {
                                                        setSelectedGender(gender);
                                                        setSelectedCategories([]);
                                                        setTeamData({});
                                                    }}
                                                    disabled={isSubmitting}
                                                >
                                                    {gender}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {isAthletics && selectedGender && (
                                    <div className="form-section">
                                        <h3 className="section-title">
                                            Select Events (Max {maxEvents}) - {selectedCategories.length}/{maxEvents} selected
                                        </h3>
                                        {Object.entries(sportInfo.events).map(([eventType, events]) => (
                                            <div key={eventType} className="event-type-section">
                                                <h4 className="event-type-heading">{eventType}</h4>
                                                <div className="category-grid">
                                                    {Object.entries(events).map(([eventName, eventData]) => {
                                                        const categoryKey = `${selectedGender} - ${eventName}`;
                                                        const isSelected = selectedCategories.includes(categoryKey);
                                                        const isDisabled = !isSelected && selectedCategories.length >= maxEvents;

                                                        return (
                                                            <label
                                                                key={eventName}
                                                                className={`category-checkbox ${isDisabled ? 'disabled' : ''}`}
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={isSelected}
                                                                    onChange={() => handleCategoryToggle(categoryKey)}
                                                                    disabled={isSubmitting || isDisabled}
                                                                />
                                                                <span className="category-label">{eventName}</span>
                                                                <span className="category-range">
                                                                    ({eventData.min}-{eventData.max})
                                                                </span>
                                                            </label>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {!isFreeFire && !isAthletics && (
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
                                        {selectedCategories.map(category => {
                                            let min, max;
                                            if (isAthletics) {
                                                const eventName = category.replace(`${selectedGender} - `, '');
                                                const eventData = Object.values(sportInfo.events).flatMap(events =>
                                                    Object.entries(events)
                                                ).find(([name]) => name === eventName)?.[1];
                                                min = eventData?.min || 1;
                                                max = eventData?.max || 1;
                                            } else {
                                                ({ min, max } = sportInfo.categories[category]);
                                            }

                                            return (
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
                                                                Team Size (Min: {min}, Max: {max})
                                                            </label>
                                                            <input
                                                                id={`teamSize-${category}`}
                                                                type="number"
                                                                min={min}
                                                                max={max}
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
                                            );
                                        })}
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