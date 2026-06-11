// Live API-Football Integration Utility
// Integrates API key: 05e45c59cef2fa9568384f2f123f783d

const API_KEY = import.meta.env.VITE_API_FOOTBALL_KEY || "05e45c59cef2fa9568384f2f123f783d";
const BASE_URL = "https://v3.football.api-sports.io";

const HEADERS = {
  "x-rapidapi-key": API_KEY,
  "x-rapidapi-host": "v3.football.api-sports.io"
};

// API Name Mappings (Adjust team names to match API-Football exactly)
const getApiTeamName = (name) => {
  const mappings = {
    "USA": "USA",
    "United Arab Emirates": "UAE",
    "South Korea": "Korea Republic",
    "Ivory Coast": "Ivory Coast",
    "Honduras": "Honduras",
    "Mali": "Mali"
  };
  return mappings[name] || name;
};

// Fetch real national team roster from API-Football
export const fetchRealRoster = async (teamName) => {
  const cacheKey = `wc2026_api_roster_${teamName}`;
  const cached = localStorage.getItem(cacheKey);

  // 24 Hour Caching (24 * 60 * 60 * 1000 ms = 86,400,000 ms)
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      const isExpired = Date.now() - parsed.timestamp > 86400000;
      if (!isExpired) {
        console.log(`[API-Football] Loaded cache for ${teamName}`);
        return parsed.data;
      }
    } catch (e) {
      console.warn("Failed to parse cached roster data, refetching...", e);
    }
  }

  const queryName = getApiTeamName(teamName);
  console.log(`[API-Football] Fetching live details for ${teamName} (query: ${queryName})`);

  try {
    // Step 1: Query Team ID
    const teamRes = await fetch(`${BASE_URL}/teams?name=${encodeURIComponent(queryName)}`, {
      method: "GET",
      headers: HEADERS
    });

    if (!teamRes.ok) throw new Error(`Team query failed: ${teamRes.status}`);
    const teamData = await teamRes.json();
    
    if (!teamData.response || teamData.response.length === 0) {
      throw new Error(`Team ${queryName} not found in API-Football`);
    }

    const teamProfile = teamData.response[0].team;
    const teamVenue = teamData.response[0].venue;
    const teamId = teamProfile.id;

    // Step 2: Query Squad List
    const squadRes = await fetch(`${BASE_URL}/players/squads?team=${teamId}`, {
      method: "GET",
      headers: HEADERS
    });

    if (!squadRes.ok) throw new Error(`Squad query failed: ${squadRes.status}`);
    const squadData = await squadRes.json();

    if (!squadData.response || squadData.response.length === 0) {
      throw new Error(`Squad for team ID ${teamId} not found in API-Football`);
    }

    const playersList = squadData.response[0].players.map(p => ({
      id: p.id,
      name: p.name,
      age: p.age,
      number: p.number || null,
      position: p.position,
      photo: p.photo
    }));

    // Step 3: Query Coach details (to populate Manager)
    let manager = "Unknown Coach";
    try {
      const coachRes = await fetch(`${BASE_URL}/coachs?team=${teamId}`, {
        method: "GET",
        headers: HEADERS
      });
      if (coachRes.ok) {
        const coachData = await coachRes.json();
        if (coachData.response && coachData.response.length > 0) {
          const activeCoach = coachData.response[0];
          manager = `${activeCoach.firstname} ${activeCoach.lastname}`;
        }
      }
    } catch (coachErr) {
      console.warn("Failed to fetch coach details from API, using default", coachErr);
    }

    // Structure output matching our standard app Roster drawer schema
    const formattedRoster = {
      team: {
        id: teamId,
        name: teamName,
        country: teamProfile.country,
        founded: teamProfile.founded || 1900,
        logo: teamProfile.logo,
        fifaRank: Math.floor(Math.random() * 20) + 5, // Mock rank since API-Football does not host FIFA ranks directly in basic team endpoints
        manager: manager,
        keyPlayer: playersList[0] ? playersList[0].name : "Star Player"
      },
      recentForm: ["W", "D", "W", "W", "L"], // Default recent form placeholder
      topScorers: playersList.slice(0, 3).map((p, idx) => ({
        name: p.name,
        goals: 6 - idx, // Mock scorers counts
        position: p.position,
        photo: p.photo
      })),
      players: playersList
    };

    // Save in cache
    localStorage.setItem(cacheKey, JSON.stringify({
      data: formattedRoster,
      timestamp: Date.now()
    }));

    return formattedRoster;
  } catch (error) {
    console.error(`[API-Football] Error fetching live data for ${teamName}:`, error);
    return null; // Return null so caller knows to use mock fallback
  }
};
