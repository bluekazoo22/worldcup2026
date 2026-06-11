// 2026 FIFA World Cup - Tournament Data & Visual Mapping

export const COUNTRIES = {
  USA: {
    name: "USA",
    code: "us",
    emoji: "🇺🇸",
    primaryColor: "text-blue-500 border-blue-500/30",
    accentColor: "bg-red-600 hover:bg-red-500 text-white shadow-red-600/30",
    secondaryColor: "text-slate-100 hover:text-white border-slate-700/50 hover:border-slate-600",
    dynamicGradient: "from-slate-950 via-blue-950/40 to-slate-950",
    themeVariables: { "--glow-color": "rgba(239, 68, 68, 0.4)" }
  },
  Mexico: {
    name: "Mexico",
    code: "mx",
    emoji: "🇲🇽",
    primaryColor: "text-emerald-500 border-emerald-500/30",
    accentColor: "bg-red-600 hover:bg-red-500 text-white shadow-red-600/30",
    secondaryColor: "text-amber-400 hover:text-amber-300 border-emerald-700/40 hover:border-emerald-600",
    dynamicGradient: "from-slate-950 via-emerald-950/40 to-slate-950",
    themeVariables: { "--glow-color": "rgba(16, 185, 129, 0.4)" }
  },
  Canada: {
    name: "Canada",
    code: "ca",
    emoji: "🇨🇦",
    primaryColor: "text-red-500 border-red-500/30",
    accentColor: "bg-red-600 hover:bg-red-500 text-white shadow-red-600/30",
    secondaryColor: "text-slate-300 hover:text-slate-200 border-slate-700/50 hover:border-slate-600",
    dynamicGradient: "from-slate-950 via-red-950/30 to-slate-950",
    themeVariables: { "--glow-color": "rgba(239, 68, 68, 0.4)" }
  },
  Japan: {
    name: "Japan",
    code: "jp",
    emoji: "🇯🇵",
    primaryColor: "text-sky-500 border-sky-500/30",
    accentColor: "bg-red-600 hover:bg-red-500 text-white shadow-red-600/30",
    secondaryColor: "text-indigo-400 hover:text-indigo-300 border-indigo-700/40 hover:border-indigo-600",
    dynamicGradient: "from-slate-950 via-slate-900 via-indigo-950/50 to-slate-950",
    themeVariables: { "--glow-color": "rgba(239, 68, 68, 0.5)" }
  },
  Brazil: {
    name: "Brazil",
    code: "br",
    emoji: "🇧🇷",
    primaryColor: "text-yellow-400 border-yellow-400/30",
    accentColor: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30",
    secondaryColor: "text-blue-400 hover:text-blue-300 border-yellow-700/40 hover:border-yellow-600",
    dynamicGradient: "from-slate-950 via-yellow-950/15 via-emerald-950/30 to-slate-950",
    themeVariables: { "--glow-color": "rgba(16, 185, 129, 0.4)" }
  },
  Argentina: {
    name: "Argentina",
    code: "ar",
    emoji: "🇦🇷",
    primaryColor: "text-sky-400 border-sky-400/30",
    accentColor: "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/30",
    secondaryColor: "text-slate-100 hover:text-white border-sky-700/40 hover:border-sky-600",
    dynamicGradient: "from-slate-950 via-sky-950/40 to-slate-950",
    themeVariables: { "--glow-color": "rgba(245, 158, 11, 0.4)" }
  },
  Germany: {
    name: "Germany",
    code: "de",
    emoji: "🇩🇪",
    primaryColor: "text-amber-500 border-amber-500/30",
    accentColor: "bg-neutral-800 hover:bg-neutral-700 text-amber-400 shadow-neutral-800/50 border border-amber-500/30",
    secondaryColor: "text-red-500 hover:text-red-400 border-neutral-700/50 hover:border-neutral-600",
    dynamicGradient: "from-slate-950 via-neutral-900/60 via-amber-950/10 to-slate-950",
    themeVariables: { "--glow-color": "rgba(245, 158, 11, 0.3)" }
  },
  Spain: {
    name: "Spain",
    code: "es",
    emoji: "🇪🇸",
    primaryColor: "text-red-500 border-red-500/30",
    accentColor: "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/30",
    secondaryColor: "text-yellow-500 hover:text-yellow-400 border-red-700/40 hover:border-red-600",
    dynamicGradient: "from-slate-950 via-red-950/20 via-amber-950/20 to-slate-950",
    themeVariables: { "--glow-color": "rgba(239, 68, 68, 0.4)" }
  },
  England: {
    name: "England",
    code: "gb-eng",
    emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    primaryColor: "text-blue-400 border-blue-400/30",
    accentColor: "bg-red-600 hover:bg-red-500 text-white shadow-red-600/30",
    secondaryColor: "text-slate-100 hover:text-white border-slate-700/50 hover:border-slate-600",
    dynamicGradient: "from-slate-950 via-blue-950/20 to-slate-950",
    themeVariables: { "--glow-color": "rgba(59, 130, 246, 0.4)" }
  },
  France: {
    name: "France",
    code: "fr",
    emoji: "🇫🇷",
    primaryColor: "text-blue-500 border-blue-500/30",
    accentColor: "bg-red-600 hover:bg-red-500 text-white shadow-red-600/30",
    secondaryColor: "text-slate-200 hover:text-white border-blue-700/40 hover:border-blue-600",
    dynamicGradient: "from-slate-950 via-blue-950/40 to-slate-950",
    themeVariables: { "--glow-color": "rgba(59, 130, 246, 0.4)" }
  },
  Portugal: {
    name: "Portugal",
    code: "pt",
    emoji: "🇵🇹",
    primaryColor: "text-emerald-500 border-emerald-500/30",
    accentColor: "bg-red-600 hover:bg-red-500 text-white shadow-red-600/30",
    secondaryColor: "text-amber-400 hover:text-amber-300 border-emerald-700/40 hover:border-emerald-600",
    dynamicGradient: "from-slate-950 via-red-950/30 via-emerald-950/20 to-slate-950",
    themeVariables: { "--glow-color": "rgba(16, 185, 129, 0.4)" }
  },
  Italy: {
    name: "Italy",
    code: "it",
    emoji: "🇮🇹",
    primaryColor: "text-blue-500 border-blue-500/30",
    accentColor: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30",
    secondaryColor: "text-slate-100 hover:text-white border-blue-700/40 hover:border-blue-600",
    dynamicGradient: "from-slate-950 via-blue-950/40 to-slate-950",
    themeVariables: { "--glow-color": "rgba(59, 130, 246, 0.4)" }
  },
  // Default fallback for any other country
  Default: {
    name: "Hub Default",
    code: "un",
    emoji: "🏆",
    primaryColor: "text-cyan-400 border-cyan-400/30",
    accentColor: "bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-600/30",
    secondaryColor: "text-slate-300 hover:text-white border-slate-700/50 hover:border-slate-600",
    dynamicGradient: "from-slate-950 via-slate-900 to-slate-950",
    themeVariables: { "--glow-color": "rgba(34, 211, 238, 0.4)" }
  }
};

// 48 teams grouped into 12 groups (A to L)
export const GROUPS = {
  A: { name: "Group A", teams: ["Canada", "Colombia", "Nigeria", "Austria"] },
  B: { name: "Group B", teams: ["Mexico", "Switzerland", "Egypt", "Australia"] },
  C: { name: "Group C", teams: ["USA", "Uruguay", "Morocco", "South Korea"] },
  D: { name: "Group D", teams: ["Brazil", "Poland", "Senegal", "Saudi Arabia"] },
  E: { name: "Group E", teams: ["Argentina", "Denmark", "Algeria", "Japan"] },
  F: { name: "Group F", teams: ["France", "Croatia", "Tunisia", "Costa Rica"] },
  G: { name: "Group G", teams: ["England", "Peru", "Ghana", "Iran"] },
  H: { name: "Group H", teams: ["Spain", "Sweden", "Cameroon", "United Arab Emirates"] },
  I: { name: "Group I", teams: ["Portugal", "Netherlands", "Mali", "Chile"] },
  J: { name: "Group J", teams: ["Italy", "Belgium", "Honduras", "Iraq"] },
  K: { name: "Group K", teams: ["Germany", "Ecuador", "Jamaica", "Qatar"] },
  L: { name: "Group L", teams: ["Ukraine", "Turkey", "Wales", "Norway"] }
};

// Flag URL mapping utility
export const getFlagUrl = (countryName) => {
  const custom = COUNTRIES[countryName];
  if (custom && custom.code !== "un") {
    return `https://flagcdn.com/w80/${custom.code}.png`;
  }
  
  // Direct names mapping
  const mappings = {
    "Colombia": "co", "Nigeria": "ng", "Austria": "at",
    "Switzerland": "ch", "Egypt": "eg", "Australia": "au",
    "Uruguay": "uy", "Morocco": "ma", "South Korea": "kr",
    "Poland": "pl", "Senegal": "sn", "Saudi Arabia": "sa",
    "Denmark": "dk", "Algeria": "dz", "Croatia": "hr",
    "Tunisia": "tn", "Costa Rica": "cr", "Peru": "pe",
    "Ghana": "gh", "Iran": "ir", "Sweden": "se",
    "Cameroon": "cm", "United Arab Emirates": "ae", "Netherlands": "nl",
    "Mali": "ml", "Chile": "cl", "Belgium": "be",
    "Honduras": "hn", "Iraq": "iq", "Ecuador": "ec",
    "Jamaica": "jm", "Qatar": "qa", "Ukraine": "ua",
    "Turkey": "tr", "Wales": "gb-wls", "Norway": "no"
  };
  
  const code = mappings[countryName] || "us";
  return `https://flagcdn.com/w80/${code}.png`;
};

// Pre-scheduled Matches for all 12 groups (6 matches per group = 72 matches total)
const generateMatches = () => {
  const matches = [];
  let id = 1;
  
  Object.keys(GROUPS).forEach((groupKey) => {
    const t = GROUPS[groupKey].teams;
    // Standard round-robin scheduling for 4 teams:
    // Round 1: 1 v 2, 3 v 4
    // Round 2: 1 v 3, 2 v 4
    // Round 3: 1 v 4, 2 v 3
    const fixtures = [
      { home: t[0], away: t[1], round: 1 },
      { home: t[2], away: t[3], round: 1 },
      { home: t[0], away: t[2], round: 2 },
      { home: t[1], away: t[3], round: 2 },
      { home: t[0], away: t[3], round: 3 },
      { home: t[1], away: t[2], round: 3 }
    ];
    
    fixtures.forEach((f) => {
      matches.push({
        id: id++,
        group: groupKey,
        round: f.round,
        teamHome: f.home,
        teamAway: f.away,
        homeScore: "",
        awayScore: "",
        predicted: false
      });
    });
  });
  
  return matches;
};

export const INITIAL_MATCHES = generateMatches();

// Mock Roster Details matching API-Football schemas
// Standard schema has team info and a list of players
export const ROSTERS = {
  USA: {
    team: { id: 1, name: "USA", country: "United States", founded: 1913, logo: "https://flagcdn.com/w80/us.png", fifaRank: 11, manager: "Mauricio Pochettino", keyPlayer: "Christian Pulisic" },
    recentForm: ["W", "D", "W", "L", "W"],
    topScorers: [
      { name: "Christian Pulisic", goals: 5, position: "Attacker", photo: "https://media.api-sports.io/football/players/2222.png" },
      { name: "Folarin Balogun", goals: 3, position: "Attacker", photo: "https://media.api-sports.io/football/players/2223.png" },
      { name: "Weston McKennie", goals: 2, position: "Midfielder", photo: "https://media.api-sports.io/football/players/2224.png" }
    ],
    players: [
      { id: 101, name: "Matt Turner", age: 31, number: 1, position: "Goalkeeper" },
      { id: 102, name: "Antonee Robinson", age: 28, number: 5, position: "Defender" },
      { id: 103, name: "Tim Ream", age: 38, number: 13, position: "Defender" },
      { id: 104, name: "Chris Richards", age: 26, number: 4, position: "Defender" },
      { id: 105, name: "Tyler Adams", age: 27, number: 4, position: "Midfielder" },
      { id: 106, name: "Yunus Musah", age: 23, number: 6, position: "Midfielder" },
      { id: 107, name: "Weston McKennie", age: 27, number: 8, position: "Midfielder" },
      { id: 108, name: "Christian Pulisic", age: 27, number: 10, position: "Attacker" },
      { id: 109, name: "Timothy Weah", age: 26, number: 11, position: "Attacker" },
      { id: 110, name: "Folarin Balogun", age: 24, number: 20, position: "Attacker" }
    ]
  },
  Japan: {
    team: { id: 2, name: "Japan", country: "Japan", founded: 1921, logo: "https://flagcdn.com/w80/jp.png", fifaRank: 18, manager: "Hajime Moriyasu", keyPlayer: "Kaoru Mitoma" },
    recentForm: ["W", "W", "W", "D", "W"],
    topScorers: [
      { name: "Ayase Ueda", goals: 6, position: "Attacker" },
      { name: "Kaoru Mitoma", goals: 4, position: "Midfielder" },
      { name: "Ritsu Doan", goals: 3, position: "Midfielder" }
    ],
    players: [
      { id: 201, name: "Zion Suzuki", age: 23, number: 1, position: "Goalkeeper" },
      { id: 202, name: "Ko Itakura", age: 29, number: 4, position: "Defender" },
      { id: 203, name: "Shogo Taniguchi", age: 34, number: 3, position: "Defender" },
      { id: 204, name: "Koki Machida", age: 28, number: 15, position: "Defender" },
      { id: 205, name: "Wataru Endo", age: 33, number: 6, position: "Midfielder" },
      { id: 206, name: "Hidemasa Morita", age: 31, number: 5, position: "Midfielder" },
      { id: 207, name: "Ritsu Doan", age: 27, number: 10, position: "Midfielder" },
      { id: 208, name: "Kaoru Mitoma", age: 29, number: 7, position: "Midfielder" },
      { id: 209, name: "Takefusa Kubo", age: 25, number: 20, position: "Midfielder" },
      { id: 210, name: "Ayase Ueda", age: 27, number: 9, position: "Attacker" }
    ]
  },
  Mexico: {
    team: { id: 3, name: "Mexico", country: "Mexico", founded: 1922, logo: "https://flagcdn.com/w80/mx.png", fifaRank: 15, manager: "Javier Aguirre", keyPlayer: "Santiago Giménez" },
    recentForm: ["D", "W", "L", "W", "W"],
    topScorers: [
      { name: "Santiago Giménez", goals: 4, position: "Attacker" },
      { name: "Luis Chávez", goals: 2, position: "Midfielder" },
      { name: "Orbelín Pineda", goals: 2, position: "Midfielder" }
    ],
    players: [
      { id: 301, name: "Luis Malagón", age: 29, number: 1, position: "Goalkeeper" },
      { id: 302, name: "César Montes", age: 29, number: 3, position: "Defender" },
      { id: 303, name: "Johan Vásquez", age: 27, number: 5, position: "Defender" },
      { id: 304, name: "Jorge Sánchez", age: 28, number: 19, position: "Defender" },
      { id: 305, name: "Luis Chávez", age: 30, number: 18, position: "Midfielder" },
      { id: 306, name: "Edson Álvarez", age: 28, number: 4, position: "Midfielder" },
      { id: 307, name: "Orbelín Pineda", age: 30, number: 17, position: "Midfielder" },
      { id: 308, name: "César Huerta", age: 25, number: 21, position: "Attacker" },
      { id: 309, name: "Santiago Giménez", age: 25, number: 9, position: "Attacker" },
      { id: 310, name: "Julián Quiñones", age: 29, number: 10, position: "Attacker" }
    ]
  },
  Brazil: {
    team: { id: 4, name: "Brazil", country: "Brazil", founded: 1914, logo: "https://flagcdn.com/w80/br.png", fifaRank: 5, manager: "Dorival Júnior", keyPlayer: "Vinícius Júnior" },
    recentForm: ["W", "W", "L", "D", "W"],
    topScorers: [
      { name: "Rodrygo Goes", goals: 5, position: "Attacker" },
      { name: "Vinícius Júnior", goals: 4, position: "Attacker" },
      { name: "Raphinha", goals: 3, position: "Midfielder" }
    ],
    players: [
      { id: 401, name: "Alisson Becker", age: 33, number: 1, position: "Goalkeeper" },
      { id: 402, name: "Marquinhos", age: 32, number: 4, position: "Defender" },
      { id: 403, name: "Gabriel Magalhães", age: 28, number: 3, position: "Defender" },
      { id: 404, name: "Danilo", age: 34, number: 2, position: "Defender" },
      { id: 405, name: "Bruno Guimarães", age: 28, number: 5, position: "Midfielder" },
      { id: 406, name: "Lucas Paquetá", age: 28, number: 8, position: "Midfielder" },
      { id: 407, name: "Raphinha", age: 29, number: 7, position: "Midfielder" },
      { id: 408, name: "Vinícius Júnior", age: 25, number: 7, position: "Attacker" },
      { id: 409, name: "Rodrygo Goes", age: 25, number: 10, position: "Attacker" },
      { id: 410, name: "Endrick", age: 19, number: 9, position: "Attacker" }
    ]
  },
  Argentina: {
    team: { id: 5, name: "Argentina", country: "Argentina", founded: 1893, logo: "https://flagcdn.com/w80/ar.png", fifaRank: 1, manager: "Lionel Scaloni", keyPlayer: "Lionel Messi" },
    recentForm: ["W", "W", "L", "W", "W"],
    topScorers: [
      { name: "Lionel Messi", goals: 7, position: "Attacker" },
      { name: "Lautaro Martínez", goals: 5, position: "Attacker" },
      { name: "Julián Álvarez", goals: 4, position: "Attacker" }
    ],
    players: [
      { id: 501, name: "Emiliano Martínez", age: 33, number: 23, position: "Goalkeeper" },
      { id: 502, name: "Cristian Romero", age: 28, number: 13, position: "Defender" },
      { id: 503, name: "Nicolás Otamendi", age: 38, number: 19, position: "Defender" },
      { id: 504, name: "Nahuel Molina", age: 28, number: 26, position: "Defender" },
      { id: 505, name: "Rodrigo De Paul", age: 32, number: 7, position: "Midfielder" },
      { id: 506, name: "Alexis Mac Allister", age: 27, number: 20, position: "Midfielder" },
      { id: 507, name: "Enzo Fernández", age: 25, number: 24, position: "Midfielder" },
      { id: 508, name: "Lionel Messi", age: 38, number: 10, position: "Attacker" },
      { id: 509, name: "Lautaro Martínez", age: 28, number: 22, position: "Attacker" },
      { id: 510, name: "Julián Álvarez", age: 26, number: 9, position: "Attacker" }
    ]
  }
};

// Autogenerate a fallback roster profile for any other country
export const getTeamRoster = (countryName) => {
  if (ROSTERS[countryName]) return ROSTERS[countryName];
  
  // Fallback generation
  return {
    team: {
      id: Math.floor(Math.random() * 1000) + 10,
      name: countryName,
      country: countryName,
      founded: 1900 + Math.floor(Math.random() * 80),
      logo: getFlagUrl(countryName),
      fifaRank: 20 + Math.floor(Math.random() * 60),
      manager: `Coach ${countryName}`,
      keyPlayer: `Captain ${countryName}`
    },
    recentForm: ["W", "D", "L", "W", "D"].sort(() => Math.random() - 0.5),
    topScorers: [
      { name: `Star Striker`, goals: 3, position: "Attacker" },
      { name: `Playmaker`, goals: 2, position: "Midfielder" }
    ],
    players: [
      { id: 901, name: "GK Keeper", age: 28, number: 1, position: "Goalkeeper" },
      { id: 902, name: "DF Pillar", age: 26, number: 4, position: "Defender" },
      { id: 903, name: "DF Shield", age: 29, number: 5, position: "Defender" },
      { id: 904, name: "MF Engine", age: 27, number: 8, position: "Midfielder" },
      { id: 905, name: "MF Spark", age: 24, number: 10, position: "Midfielder" },
      { id: 906, name: "FW Spear", age: 25, number: 9, position: "Attacker" }
    ]
  };
};
