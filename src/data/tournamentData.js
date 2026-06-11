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

// 100+ National Teams database for allegiance selection
export const ALL_NATIONS = [
  { name: "USA", code: "us", emoji: "🇺🇸" },
  { name: "Mexico", code: "mx", emoji: "🇲🇽" },
  { name: "Canada", code: "ca", emoji: "🇨🇦" },
  { name: "Japan", code: "jp", emoji: "🇯🇵" },
  { name: "Brazil", code: "br", emoji: "🇧🇷" },
  { name: "Argentina", code: "ar", emoji: "🇦🇷" },
  { name: "Germany", code: "de", emoji: "🇩🇪" },
  { name: "Spain", code: "es", emoji: "🇪🇸" },
  { name: "England", code: "gb-eng", emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { name: "France", code: "fr", emoji: "🇫🇷" },
  { name: "Portugal", code: "pt", emoji: "🇵🇹" },
  { name: "Italy", code: "it", emoji: "🇮🇹" },
  { name: "Colombia", code: "co", emoji: "🇨🇴" },
  { name: "Nigeria", code: "ng", emoji: "🇳🇬" },
  { name: "Austria", code: "at", emoji: "🇦🇹" },
  { name: "Switzerland", code: "ch", emoji: "🇨🇭" },
  { name: "Egypt", code: "eg", emoji: "🇪🇬" },
  { name: "Australia", code: "au", emoji: "🇦🇺" },
  { name: "Uruguay", code: "uy", emoji: "🇺🇾" },
  { name: "Morocco", code: "ma", emoji: "🇲🇦" },
  { name: "South Korea", code: "kr", emoji: "🇰🇷" },
  { name: "Poland", code: "pl", emoji: "🇵🇱" },
  { name: "Senegal", code: "sn", emoji: "🇸🇳" },
  { name: "Saudi Arabia", code: "sa", emoji: "🇸🇦" },
  { name: "Denmark", code: "dk", emoji: "🇩🇰" },
  { name: "Algeria", code: "dz", emoji: "🇩🇿" },
  { name: "Croatia", code: "hr", emoji: "🇭🇷" },
  { name: "Tunisia", code: "tn", emoji: "🇹🇳" },
  { name: "Costa Rica", code: "cr", emoji: "🇨🇷" },
  { name: "Peru", code: "pe", emoji: "🇵🇪" },
  { name: "Ghana", code: "gh", emoji: "🇬🇭" },
  { name: "Iran", code: "ir", emoji: "🇮🇷" },
  { name: "Sweden", code: "se", emoji: "🇸🇪" },
  { name: "Cameroon", code: "cm", emoji: "🇨🇲" },
  { name: "United Arab Emirates", code: "ae", emoji: "🇦🇪" },
  { name: "Netherlands", code: "nl", emoji: "🇳🇱" },
  { name: "Mali", code: "ml", emoji: "🇲🇱" },
  { name: "Chile", code: "cl", emoji: "🇨🇱" },
  { name: "Belgium", code: "be", emoji: "🇧🇪" },
  { name: "Honduras", code: "hn", emoji: "🇭🇳" },
  { name: "Iraq", code: "iq", emoji: "🇮🇶" },
  { name: "Ecuador", code: "ec", emoji: "🇪🇨" },
  { name: "Jamaica", code: "jm", emoji: "🇯🇲" },
  { name: "Qatar", code: "qa", emoji: "🇶🇦" },
  { name: "Ukraine", code: "ua", emoji: "🇺🇦" },
  { name: "Turkey", code: "tr", emoji: "🇹🇷" },
  { name: "Wales", code: "gb-wls", emoji: "🏴󠁧󠁢󠁷󠁬󠁳󠁿" },
  { name: "Norway", code: "no", emoji: "🇳🇴" },
  
  // Non-qualified / Other FIFA members (to make it 100+)
  { name: "Greece", code: "gr", emoji: "🇬🇷" },
  { name: "Scotland", code: "gb-sct", emoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
  { name: "Ireland", code: "ie", emoji: "🇮🇪" },
  { name: "Northern Ireland", code: "gb-nir", emoji: "🇬🇧" },
  { name: "New Zealand", code: "nz", emoji: "🇳🇿" },
  { name: "China", code: "cn", emoji: "🇨🇳" },
  { name: "India", code: "in", emoji: "🇮🇳" },
  { name: "Vietnam", code: "vn", emoji: "🇻🇳" },
  { name: "Thailand", code: "th", emoji: "🇹🇭" },
  { name: "Singapore", code: "sg", emoji: "🇸🇬" },
  { name: "Malaysia", code: "my", emoji: "🇲🇾" },
  { name: "Indonesia", code: "id", emoji: "🇮🇩" },
  { name: "Philippines", code: "ph", emoji: "🇵🇭" },
  { name: "South Africa", code: "za", emoji: "🇿🇦" },
  { name: "Ivory Coast", code: "ci", emoji: "🇨🇮" },
  { name: "Czechia", code: "cz", emoji: "🇨🇿" },
  { name: "Slovakia", code: "sk", emoji: "🇸🇰" },
  { name: "Hungary", code: "hu", emoji: "🇭🇺" },
  { name: "Romania", code: "ro", emoji: "🇷🇴" },
  { name: "Bulgaria", code: "bg", emoji: "🇧🇬" },
  { name: "Serbia", code: "rs", emoji: "🇷🇸" },
  { name: "Slovenia", code: "si", emoji: "🇸🇮" },
  { name: "Finland", code: "fi", emoji: "🇫🇮" },
  { name: "Iceland", code: "is", emoji: "🇮🇸" },
  { name: "Bolivia", code: "bo", emoji: "🇧🇴" },
  { name: "Paraguay", code: "py", emoji: "🇵🇾" },
  { name: "Venezuela", code: "ve", emoji: "🇻🇪" },
  { name: "Panama", code: "pa", emoji: "🇵🇦" },
  { name: "Haiti", code: "ht", emoji: "🇭🇹" },
  { name: "El Salvador", code: "sv", emoji: "🇸🇻" },
  { name: "Honduras", code: "hn", emoji: "🇭🇳" },
  { name: "Guatemala", code: "gt", emoji: "🇬🇹" },
  { name: "Trinidad and Tobago", code: "tt", emoji: "🇹🇹" },
  { name: "New Zealand", code: "nz", emoji: "🇳🇿" },
  { name: "Fiji", code: "fj", emoji: "🇫🇯" },
  { name: "Angola", code: "ao", emoji: "🇦🇴" },
  { name: "DR Congo", code: "cd", emoji: "🇨🇩" },
  { name: "Zambia", code: "zm", emoji: "🇿🇲" },
  { name: "Kenya", code: "ke", emoji: "🇰🇪" },
  { name: "Uganda", code: "ug", emoji: "🇺🇬" },
  { name: "Jordan", code: "jo", emoji: "🇯🇴" },
  { name: "Syria", code: "sy", emoji: "🇸🇾" },
  { name: "Uzbekistan", code: "uz", emoji: "🇺🇿" },
  { name: "Albania", code: "al", emoji: "🇦🇱" },
  { name: "North Macedonia", code: "mk", emoji: "🇲🇰" },
  { name: "Bosnia and Herzegovina", code: "ba", emoji: "🇧🇦" },
  { name: "Montenegro", code: "me", emoji: "🇲🇪" },
  { name: "Georgia", code: "ge", emoji: "🇬🇪" },
  { name: "Cyprus", code: "cy", emoji: "🇨🇾" },
  { name: "Estonia", code: "ee", emoji: "🇪🇪" },
  { name: "Latvia", code: "lv", emoji: "🇱🇻" },
  { name: "Lithuania", code: "lt", emoji: "🇱🇹" },
  { name: "Luxembourg", code: "lu", emoji: "🇱🇺" },
  { name: "Malta", code: "mt", emoji: "🇲🇹" },
  { name: "Armenia", code: "am", emoji: "🇦🇲" },
  { name: "Azerbaijan", code: "az", emoji: "🇦🇿" }
];

// Flag URL mapping utility
export const getFlagUrl = (countryName) => {
  const custom = COUNTRIES[countryName];
  if (custom && custom.code !== "un") {
    return `https://flagcdn.com/w80/${custom.code}.png`;
  }
  
  // Look up in ALL_NATIONS
  const nation = ALL_NATIONS.find(n => n.name.toLowerCase() === countryName.toLowerCase());
  if (nation) {
    return `https://flagcdn.com/w80/${nation.code}.png`;
  }

  return `https://flagcdn.com/w80/us.png`;
};

// Pre-scheduled Matches for all 12 groups (6 matches per group = 72 matches total)
const generateMatches = () => {
  const matches = [];
  let id = 1;
  
  Object.keys(GROUPS).forEach((groupKey) => {
    const t = GROUPS[groupKey].teams;
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
export const ROSTERS = {
  USA: {
    team: { id: 1, name: "USA", country: "United States", founded: 1913, logo: "https://flagcdn.com/w80/us.png", fifaRank: 11, manager: "Mauricio Pochettino", keyPlayer: "Christian Pulisic" },
    recentForm: ["W", "D", "W", "L", "W"],
    topScorers: [
      { name: "Christian Pulisic", goals: 5, position: "Attacker" },
      { name: "Folarin Balogun", goals: 3, position: "Attacker" }
    ],
    players: [
      { id: 101, name: "Matt Turner", age: 31, number: 1, position: "Goalkeeper" },
      { id: 102, name: "Antonee Robinson", age: 28, number: 5, position: "Defender" },
      { id: 108, name: "Christian Pulisic", age: 27, number: 10, position: "Attacker" }
    ]
  },
  Japan: {
    team: { id: 2, name: "Japan", country: "Japan", founded: 1921, logo: "https://flagcdn.com/w80/jp.png", fifaRank: 18, manager: "Hajime Moriyasu", keyPlayer: "Kaoru Mitoma" },
    recentForm: ["W", "W", "W", "D", "W"],
    topScorers: [
      { name: "Ayase Ueda", goals: 6, position: "Attacker" }
    ],
    players: [
      { id: 201, name: "Zion Suzuki", age: 23, number: 1, position: "Goalkeeper" },
      { id: 208, name: "Kaoru Mitoma", age: 29, number: 7, position: "Midfielder" }
    ]
  }
};

export const getTeamRoster = (countryName) => {
  if (ROSTERS[countryName]) return ROSTERS[countryName];
  
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
      { name: `Star Striker`, goals: 3, position: "Attacker" }
    ],
    players: [
      { id: 901, name: "GK Keeper", age: 28, number: 1, position: "Goalkeeper" },
      { id: 906, name: "FW Spear", age: 25, number: 9, position: "Attacker" }
    ]
  };
};
