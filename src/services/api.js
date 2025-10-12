const BACKEND_URL = "https://convenient-computation-dom-dome.trycloudflare.com";

export const checkHealth = async () => {
  const response = await fetch(`${BACKEND_URL}/health`);
  return await response.json();
};

export const registerTeam = async (teamData) => {
  const response = await fetch(`${BACKEND_URL}/register/team`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(teamData),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Team registration failed');
  }
  
  return await response.json();
};

export const registerContingent = async (contingentData) => {
  const response = await fetch(`${BACKEND_URL}/register/contingent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contingentData),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Contingent registration failed');
  }
  
  return await response.json();
};
