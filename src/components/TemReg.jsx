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
            "BGMI": { "min": 4, "max": 5 }
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
        "no": "13",
        "categories": {
            "Free Fire": { "min": 4, "max": 5 }
        }
    },
    "Athletics Championship": {
        "no": "1",
        "categories": {
            "Men": { "min": 1, "max": 42 },
            "Women": { "min": 1, "max": 42 }
        }
    }
};

const CATEGORY_MAP = {
    "Men": "M",
    "Women": "W",
    "Mixed": "X",
    "Women Singles": "S",
    "Men Singles": "S",
};

const TeamReg = ({ isOpen, onClose, sportName }) => {
    const [activeTab, setActiveTab] = useState('create');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [teamData, setTeamData] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [teamId, setTeamId] = useState('');
    const [token] = useLocalStorage("token", "");

    const sportInfo = SPORTS_DATA[sportName];

    useEffect(() => {
        if (isOpen) {
            setActiveTab('create');
            setSelectedCategories([]);
            setTeamData({});
            setErrors({});
            setSubmitError('');
            setSubmitSuccess(false);
            setSuccessMessage('');
            setTeamId('');
        }
    }, [isOpen, sportName]);

    const handleCategoryToggle = (category) => {
        setSelectedCategories(prev => {
            if (prev.includes(category)) {
                const newCategories = prev.filter(c => c !== category);
                const newTeamData = { ...teamData };
                delete newTeamData[category];
                setTeamData(newTeamData);

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
            const response = await fetch(`${backendUrl}/account/jointeam/`, {
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
                                Join Team
                            </button>
                        </div>

                        {activeTab === 'create' ? (
                            <form onSubmit={handleCreateTeam} className="team-reg-form">
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

                                {selectedCategories.length > 0 && (
                                    <div className="form-section">
                                        <h3 className="section-title">Team Details</h3>
                                        {selectedCategories.map(category => (
                                            <div key={category} className="team-details-card">
                                                <h4 className="category-heading">{category}</h4>

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
