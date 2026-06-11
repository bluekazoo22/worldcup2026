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

// 48 teams grouped into 12 groups (A to L) - Restructured to match official 2026 World Cup Groupings
export const GROUPS = {
  A: { name: "Group A", teams: ["Mexico", "South Africa", "South Korea", "Czechia"] },
  B: { name: "Group B", teams: ["Canada", "Bosnia and Herzegovina", "Qatar", "Switzerland"] },
  C: { name: "Group C", teams: ["Brazil", "Morocco", "Haiti", "Scotland"] },
  D: { name: "Group D", teams: ["United States", "Paraguay", "Australia", "Türkiye"] },
  E: { name: "Group E", teams: ["Germany", "Curaçao", "Ivory Coast", "Ecuador"] },
  F: { name: "Group F", teams: ["Netherlands", "Japan", "Sweden", "Tunisia"] },
  G: { name: "Group G", teams: ["Belgium", "Egypt", "Iran", "New Zealand"] },
  H: { name: "Group H", teams: ["Spain", "Cape Verde", "Saudi Arabia", "Uruguay"] },
  I: { name: "Group I", teams: ["France", "Senegal", "Iraq", "Norway"] },
  J: { name: "Group J", teams: ["Argentina", "Algeria", "Austria", "Jordan"] },
  K: { name: "Group K", teams: ["Portugal", "DR Congo", "Uzbekistan", "Colombia"] },
  L: { name: "Group L", teams: ["England", "Croatia", "Ghana", "Panama"] }
};

// 100+ National Teams database for allegiance selection
export const ALL_NATIONS = [
  { name: "USA", code: "us", emoji: "🇺🇸" },
  { name: "United States", code: "us", emoji: "🇺🇸" },
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
  { name: "Türkiye", code: "tr", emoji: "🇹🇷" },
  { name: "Wales", code: "gb-wls", emoji: "🏴󠁧󠁢󠁷󠁬󠁳󠁿" },
  { name: "Norway", code: "no", emoji: "🇳🇴" },
  { name: "Curaçao", code: "cw", emoji: "🇨🇼" },
  { name: "Curacao", code: "cw", emoji: "🇨🇼" },
  { name: "Ivory Coast", code: "ci", emoji: "🇨🇮" },
  { name: "South Africa", code: "za", emoji: "🇿🇦" },
  { name: "Cape Verde", code: "cv", emoji: "🇨🇻" },
  { name: "Bosnia and Herzegovina", code: "ba", emoji: "🇧🇦" },
  { name: "DR Congo", code: "cd", emoji: "🇨🇩" },
  { name: "Uzbekistan", code: "uz", emoji: "🇺🇿" },
  { name: "Panama", code: "pa", emoji: "🇵🇦" },
  { name: "Haiti", code: "ht", emoji: "🇭🇹" },
  { name: "Scotland", code: "gb-sct", emoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
  { name: "Jordan", code: "jo", emoji: "🇯🇴" },
  { name: "Czechia", code: "cz", emoji: "🇨🇿" },
  { name: "New Zealand", code: "nz", emoji: "🇳🇿" },
  
  // Extra nations to support 100+ selection
  { name: "Greece", code: "gr", emoji: "🇬🇷" },
  { name: "Ireland", code: "ie", emoji: "🇮🇪" },
  { name: "Northern Ireland", code: "gb-nir", emoji: "🇬🇧" },
  { name: "China", code: "cn", emoji: "🇨🇳" },
  { name: "India", code: "in", emoji: "🇮🇳" },
  { name: "Vietnam", code: "vn", emoji: "🇻🇳" },
  { name: "Thailand", code: "th", emoji: "🇹🇭" },
  { name: "Singapore", code: "sg", emoji: "🇸🇬" },
  { name: "Malaysia", code: "my", emoji: "🇲🇾" },
  { name: "Indonesia", code: "id", emoji: "🇮🇩" },
  { name: "Philippines", code: "ph", emoji: "🇵🇭" },
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
  { name: "El Salvador", code: "sv", emoji: "🇸🇻" },
  { name: "Guatemala", code: "gt", emoji: "🇬🇹" },
  { name: "Trinidad and Tobago", code: "tt", emoji: "🇹🇹" },
  { name: "Fiji", code: "fj", emoji: "🇫🇯" },
  { name: "Angola", code: "ao", emoji: "🇦🇴" },
  { name: "Zambia", code: "zm", emoji: "🇿🇲" },
  { name: "Kenya", code: "ke", emoji: "🇰🇪" },
  { name: "Uganda", code: "ug", emoji: "🇺🇬" },
  { name: "Jordan", code: "jo", emoji: "🇯🇴" },
  { name: "Syria", code: "sy", emoji: "🇸🇾" },
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
  
  // Look up in ALL_NATIONS mapping
  const matchName = countryName === "United States" ? "USA" : countryName;
  const nation = ALL_NATIONS.find(n => n.name.toLowerCase() === matchName.toLowerCase());
  if (nation) {
    return `https://flagcdn.com/w80/${nation.code}.png`;
  }

  // Common manual fallbacks for spelling discrepancies
  const fallbackMappings = {
    "United States": "us", "Paraguay": "py", "Morocco": "ma", "Scotland": "gb-sct",
    "Türkiye": "tr", "Turkey": "tr", "Germany": "de", "Curaçao": "cw", "Curacao": "cw",
    "Ivory Coast": "ci", "Ecuador": "ec", "Japan": "jp", "Tunisia": "tn", "Sweden": "se",
    "Cape Verde": "cv", "Saudi Arabia": "sa", "Uruguay": "uy", "Egypt": "eg", "Iran": "ir",
    "New Zealand": "nz", "Senegal": "sn", "Iraq": "iq", "Norway": "no", "Algeria": "dz",
    "Austria": "at", "Jordan": "jo", "DR Congo": "cd", "Croatia": "hr", "Ghana": "gh",
    "Panama": "pa", "Colombia": "co", "Uzbekistan": "uz"
  };
  const code = fallbackMappings[countryName] || "us";
  return `https://flagcdn.com/w80/${code}.png`;
};

// Official 72 Group stage fixtures
export const INITIAL_MATCHES = [
  // Thursday, June 11
  { id: 1, group: "A", round: 1, teamHome: "Mexico", teamAway: "South Africa", date: "Thursday, June 11", time: "3:00 PM ET", venue: "Mexico City", homeScore: "", awayScore: "", predicted: false },
  { id: 2, group: "A", round: 1, teamHome: "South Korea", teamAway: "Czechia", date: "Thursday, June 11", time: "10:00 PM ET", venue: "Zapopan, Mexico", homeScore: "", awayScore: "", predicted: false },

  // Friday, June 12
  { id: 3, group: "B", round: 1, teamHome: "Canada", teamAway: "Bosnia and Herzegovina", date: "Friday, June 12", time: "3:00 PM ET", venue: "Toronto", homeScore: "", awayScore: "", predicted: false },
  { id: 4, group: "D", round: 1, teamHome: "United States", teamAway: "Paraguay", date: "Friday, June 12", time: "9:00 PM ET", venue: "Inglewood, Calif.", homeScore: "", awayScore: "", predicted: false },

  // Saturday, June 13
  { id: 5, group: "B", round: 1, teamHome: "Qatar", teamAway: "Switzerland", date: "Saturday, June 13", time: "3:00 PM ET", venue: "Santa Clara, Calif.", homeScore: "", awayScore: "", predicted: false },
  { id: 6, group: "C", round: 1, teamHome: "Brazil", teamAway: "Morocco", date: "Saturday, June 13", time: "6:00 PM ET", venue: "East Rutherford, New Jersey", homeScore: "", awayScore: "", predicted: false },
  { id: 7, group: "C", round: 1, teamHome: "Haiti", teamAway: "Scotland", date: "Saturday, June 13", time: "9:00 PM ET", venue: "Foxborough, Mass.", homeScore: "", awayScore: "", predicted: false },
  { id: 8, group: "D", round: 1, teamHome: "Australia", teamAway: "Türkiye", date: "Saturday, June 13", time: "12:00 AM ET (June 14)", venue: "Vancouver, Canada", homeScore: "", awayScore: "", predicted: false },

  // Sunday, June 14
  { id: 9, group: "E", round: 1, teamHome: "Germany", teamAway: "Curaçao", date: "Sunday, June 14", time: "1:00 PM ET", venue: "Houston", homeScore: "", awayScore: "", predicted: false },
  { id: 10, group: "F", round: 1, teamHome: "Netherlands", teamAway: "Japan", date: "Sunday, June 14", time: "4:00 PM ET", venue: "Arlington, Texas", homeScore: "", awayScore: "", predicted: false },
  { id: 11, group: "E", round: 1, teamHome: "Ivory Coast", teamAway: "Ecuador", date: "Sunday, June 14", time: "7:00 PM ET", venue: "Philadelphia", homeScore: "", awayScore: "", predicted: false },
  { id: 12, group: "F", round: 1, teamHome: "Sweden", teamAway: "Tunisia", date: "Sunday, June 14", time: "10:00 PM ET", venue: "Guadalupe, Mexico", homeScore: "", awayScore: "", predicted: false },

  // Monday, June 15
  { id: 13, group: "H", round: 1, teamHome: "Spain", teamAway: "Cape Verde", date: "Monday, June 15", time: "1:00 PM ET", venue: "Atlanta", homeScore: "", awayScore: "", predicted: false },
  { id: 14, group: "G", round: 1, teamHome: "Belgium", teamAway: "Egypt", date: "Monday, June 15", time: "6:00 PM ET", venue: "Seattle", homeScore: "", awayScore: "", predicted: false },
  { id: 15, group: "H", round: 1, teamHome: "Saudi Arabia", teamAway: "Uruguay", date: "Monday, June 15", time: "6:00 PM ET", venue: "Miami Gardens, Fla.", homeScore: "", awayScore: "", predicted: false },
  { id: 16, group: "G", round: 1, teamHome: "Iran", teamAway: "New Zealand", date: "Monday, June 15", time: "12:00 AM ET (June 16)", venue: "Inglewood, Calif.", homeScore: "", awayScore: "", predicted: false },

  // Tuesday, June 16
  { id: 17, group: "I", round: 1, teamHome: "France", teamAway: "Senegal", date: "Tuesday, June 16", time: "3:00 PM ET", venue: "East Rutherford, N.J.", homeScore: "", awayScore: "", predicted: false },
  { id: 18, group: "I", round: 1, teamHome: "Iraq", teamAway: "Norway", date: "Tuesday, June 16", time: "6:00 PM ET", venue: "Foxborough, Mass.", homeScore: "", awayScore: "", predicted: false },
  { id: 19, group: "J", round: 1, teamHome: "Argentina", teamAway: "Algeria", date: "Tuesday, June 16", time: "9:00 PM ET", venue: "Kansas City, Mo.", homeScore: "", awayScore: "", predicted: false },
  { id: 20, group: "J", round: 1, teamHome: "Austria", teamAway: "Jordan", date: "Tuesday, June 16", time: "12:00 AM ET (June 17)", venue: "Santa Clara, Calif.", homeScore: "", awayScore: "", predicted: false },

  // Wednesday, June 17
  { id: 21, group: "K", round: 1, teamHome: "Portugal", teamAway: "DR Congo", date: "Wednesday, June 17", time: "1:00 PM ET", venue: "Houston", homeScore: "", awayScore: "", predicted: false },
  { id: 22, group: "L", round: 1, teamHome: "England", teamAway: "Croatia", date: "Wednesday, June 17", time: "4:00 PM ET", venue: "Arlington, Texas", homeScore: "", awayScore: "", predicted: false },
  { id: 23, group: "L", round: 1, teamHome: "Ghana", teamAway: "Panama", date: "Wednesday, June 17", time: "7:00 PM ET", venue: "Toronto", homeScore: "", awayScore: "", predicted: false },
  { id: 24, group: "K", round: 1, teamHome: "Uzbekistan", teamAway: "Colombia", date: "Wednesday, June 17", time: "10:00 PM ET", venue: "Mexico City", homeScore: "", awayScore: "", predicted: false },

  // Thursday, June 18
  { id: 25, group: "A", round: 2, teamHome: "Czechia", teamAway: "South Africa", date: "Thursday, June 18", time: "12:00 PM ET", venue: "Atlanta", homeScore: "", awayScore: "", predicted: false },
  { id: 26, group: "B", round: 2, teamHome: "Switzerland", teamAway: "Bosnia and Herzegovina", date: "Thursday, June 18", time: "3:00 PM ET", venue: "Inglewood, Calif.", homeScore: "", awayScore: "", predicted: false },
  { id: 27, group: "B", round: 2, teamHome: "Canada", teamAway: "Qatar", date: "Thursday, June 18", time: "6:00 PM ET", venue: "Vancouver, Canada", homeScore: "", awayScore: "", predicted: false },
  { id: 28, group: "A", round: 2, teamHome: "Mexico", teamAway: "South Korea", date: "Thursday, June 18", time: "11:00 PM ET", venue: "Zapopan, Mexico", homeScore: "", awayScore: "", predicted: false },

  // Friday, June 19
  { id: 29, group: "D", round: 2, teamHome: "United States", teamAway: "Australia", date: "Friday, June 19", time: "3:00 PM ET", venue: "Seattle", homeScore: "", awayScore: "", predicted: false },
  { id: 30, group: "C", round: 2, teamHome: "Scotland", teamAway: "Morocco", date: "Friday, June 19", time: "6:00 PM ET", venue: "Foxborough, Mass.", homeScore: "", awayScore: "", predicted: false },
  { id: 31, group: "C", round: 2, teamHome: "Brazil", teamAway: "Haiti", date: "Friday, June 19", time: "9:00 PM ET", venue: "Philadelphia", homeScore: "", awayScore: "", predicted: false },
  { id: 32, group: "D", round: 2, teamHome: "Türkiye", teamAway: "Paraguay", date: "Friday, June 19", time: "12:00 AM ET (June 20)", venue: "Santa Clara, Calif.", homeScore: "", awayScore: "", predicted: false },

  // Saturday, June 20
  { id: 33, group: "F", round: 2, teamHome: "Netherlands", teamAway: "Sweden", date: "Saturday, June 20", time: "1:00 PM ET", venue: "Houston", homeScore: "", awayScore: "", predicted: false },
  { id: 34, group: "E", round: 2, teamHome: "Germany", teamAway: "Ivory Coast", date: "Saturday, June 20", time: "4:00 PM ET", venue: "Toronto", homeScore: "", awayScore: "", predicted: false },
  { id: 35, group: "E", round: 2, teamHome: "Ecuador", teamAway: "Curaçao", date: "Saturday, June 20", time: "8:00 PM ET", venue: "Kansas City, Mo.", homeScore: "", awayScore: "", predicted: false },
  { id: 36, group: "F", round: 2, teamHome: "Tunisia", teamAway: "Japan", date: "Saturday, June 20", time: "12:00 AM ET (June 21)", venue: "Guadalupe, Mexico", homeScore: "", awayScore: "", predicted: false },

  // Sunday, June 21
  { id: 37, group: "H", round: 2, teamHome: "Spain", teamAway: "Saudi Arabia", date: "Sunday, June 21", time: "12:00 PM ET", venue: "Atlanta", homeScore: "", awayScore: "", predicted: false },
  { id: 38, group: "G", round: 2, teamHome: "Belgium", teamAway: "Iran", date: "Sunday, June 21", time: "3:00 PM ET", venue: "Inglewood, Calif.", homeScore: "", awayScore: "", predicted: false },
  { id: 39, group: "H", round: 2, teamHome: "Uruguay", teamAway: "Cape Verde", date: "Sunday, June 21", time: "6:00 PM ET", venue: "Miami Gardens, Fla.", homeScore: "", awayScore: "", predicted: false },
  { id: 40, group: "G", round: 2, teamHome: "New Zealand", teamAway: "Egypt", date: "Sunday, June 21", time: "9:00 PM ET", venue: "Vancouver", homeScore: "", awayScore: "", predicted: false },

  // Monday, June 22
  { id: 41, group: "J", round: 2, teamHome: "Argentina", teamAway: "Austria", date: "Monday, June 22", time: "1:00 PM ET", venue: "Arlington, Texas", homeScore: "", awayScore: "", predicted: false },
  { id: 42, group: "I", round: 2, teamHome: "France", teamAway: "Iraq", date: "Monday, June 22", time: "5:00 PM ET", venue: "Philadelphia", homeScore: "", awayScore: "", predicted: false },
  { id: 43, group: "I", round: 2, teamHome: "Norway", teamAway: "Senegal", date: "Monday, June 22", time: "8:00 PM ET", venue: "East Rutherford, N.J.", homeScore: "", awayScore: "", predicted: false },
  { id: 44, group: "J", round: 2, teamHome: "Jordan", teamAway: "Algeria", date: "Monday, June 22", time: "11:00 PM ET", venue: "Santa Clara, Calif.", homeScore: "", awayScore: "", predicted: false },

  // Tuesday, June 23
  { id: 45, group: "K", round: 2, teamHome: "Portugal", teamAway: "Uzbekistan", date: "Tuesday, June 23", time: "1:00 PM ET", venue: "Houston", homeScore: "", awayScore: "", predicted: false },
  { id: 46, group: "L", round: 2, teamHome: "England", teamAway: "Ghana", date: "Tuesday, June 23", time: "4:00 PM ET", venue: "Foxborough, Mass.", homeScore: "", awayScore: "", predicted: false },
  { id: 47, group: "L", round: 2, teamHome: "Panama", teamAway: "Croatia", date: "Tuesday, June 23", time: "7:00 PM ET", venue: "Toronto", homeScore: "", awayScore: "", predicted: false },
  { id: 48, group: "K", round: 2, teamHome: "Colombia", teamAway: "DR Congo", date: "Tuesday, June 23", time: "10:00 PM ET", venue: "Zapopan, Mexico", homeScore: "", awayScore: "", predicted: false },

  // Wednesday, June 24
  { id: 49, group: "B", round: 3, teamHome: "Switzerland", teamAway: "Canada", date: "Wednesday, June 24", time: "3:00 PM ET", venue: "Vancouver, Canada", homeScore: "", awayScore: "", predicted: false },
  { id: 50, group: "B", round: 3, teamHome: "Bosnia and Herzegovina", teamAway: "Qatar", date: "Wednesday, June 24", time: "3:00 PM ET", venue: "Seattle", homeScore: "", awayScore: "", predicted: false },
  { id: 51, group: "C", round: 3, teamHome: "Scotland", teamAway: "Brazil", date: "Wednesday, June 24", time: "6:00 PM ET", venue: "Miami Gardens, Fla.", homeScore: "", awayScore: "", predicted: false },
  { id: 52, group: "C", round: 3, teamHome: "Morocco", teamAway: "Haiti", date: "Wednesday, June 24", time: "6:00 PM ET", venue: "Atlanta", homeScore: "", awayScore: "", predicted: false },
  { id: 53, group: "A", round: 3, teamHome: "Czechia", teamAway: "Mexico", date: "Wednesday, June 24", time: "9:00 PM ET", venue: "Mexico City", homeScore: "", awayScore: "", predicted: false },
  { id: 54, group: "A", round: 3, teamHome: "South Africa", teamAway: "South Korea", date: "Wednesday, June 24", time: "9:00 PM ET", venue: "Guadalupe, Mexico", homeScore: "", awayScore: "", predicted: false },

  // Thursday, June 25
  { id: 55, group: "E", round: 3, teamHome: "Ecuador", teamAway: "Germany", date: "Thursday, June 25", time: "4:00 PM ET", venue: "East Rutherford, N.J.", homeScore: "", awayScore: "", predicted: false },
  { id: 56, group: "E", round: 3, teamHome: "Curaçao", teamAway: "Ivory Coast", date: "Thursday, June 25", time: "4:00 PM ET", venue: "Philadelphia", homeScore: "", awayScore: "", predicted: false },
  { id: 57, group: "F", round: 3, teamHome: "Japan", teamAway: "Sweden", date: "Thursday, June 25", time: "7:00 PM ET", venue: "Arlington, Texas", homeScore: "", awayScore: "", predicted: false },
  { id: 58, group: "F", round: 3, teamHome: "Tunisia", teamAway: "Netherlands", date: "Thursday, June 25", time: "7:00 PM ET", venue: "Kansas City, Mo.", homeScore: "", awayScore: "", predicted: false },
  { id: 59, group: "D", round: 3, teamHome: "Türkiye", teamAway: "United States", date: "Thursday, June 25", time: "10:00 PM ET", venue: "Inglewood, Calif.", homeScore: "", awayScore: "", predicted: false },
  { id: 60, group: "D", round: 3, teamHome: "Paraguay", teamAway: "Australia", date: "Thursday, June 25", time: "10:00 PM ET", venue: "Santa Clara, Calif.", homeScore: "", awayScore: "", predicted: false },

  // Friday, June 26
  { id: 61, group: "I", round: 3, teamHome: "Norway", teamAway: "France", date: "Friday, June 26", time: "3:00 PM ET", venue: "Foxborough, Mass.", homeScore: "", awayScore: "", predicted: false },
  { id: 62, group: "I", round: 3, teamHome: "Senegal", teamAway: "Iraq", date: "Friday, June 26", time: "3:00 PM ET", venue: "Toronto", homeScore: "", awayScore: "", predicted: false },
  { id: 63, group: "H", round: 3, teamHome: "Cape Verde", teamAway: "Saudi Arabia", date: "Friday, June 26", time: "8:00 PM ET", venue: "Houston", homeScore: "", awayScore: "", predicted: false },
  { id: 64, group: "H", round: 3, teamHome: "Uruguay", teamAway: "Spain", date: "Friday, June 26", time: "8:00 PM ET", venue: "Zapopan, Mexico", homeScore: "", awayScore: "", predicted: false },
  { id: 65, group: "G", round: 3, teamHome: "Egypt", teamAway: "Iran", date: "Friday, June 26", time: "11:00 PM ET", venue: "Seattle", homeScore: "", awayScore: "", predicted: false },
  { id: 66, group: "G", round: 3, teamHome: "New Zealand", teamAway: "Belgium", date: "Friday, June 26", time: "11:00 PM ET", venue: "Vancouver, Canada", homeScore: "", awayScore: "", predicted: false },

  // Saturday, June 27
  { id: 67, group: "L", round: 3, teamHome: "Panama", teamAway: "England", date: "Saturday, June 27", time: "5:00 PM ET", venue: "East Rutherford, N.J.", homeScore: "", awayScore: "", predicted: false },
  { id: 68, group: "L", round: 3, teamHome: "Croatia", teamAway: "Ghana", date: "Saturday, June 27", time: "5:00 PM ET", venue: "Philadelphia", homeScore: "", awayScore: "", predicted: false },
  { id: 69, group: "K", round: 3, teamHome: "Colombia", teamAway: "Portugal", date: "Saturday, June 27", time: "7:30 PM ET", venue: "Miami Gardens, Fla.", homeScore: "", awayScore: "", predicted: false },
  { id: 70, group: "K", round: 3, teamHome: "DR Congo", teamAway: "Uzbekistan", date: "Saturday, June 27", time: "7:30 PM ET", venue: "Atlanta Stadium", homeScore: "", awayScore: "", predicted: false },
  { id: 71, group: "J", round: 3, teamHome: "Algeria", teamAway: "Austria", date: "Saturday, June 27", time: "10:00 PM ET", venue: "Kansas City, Mo.", homeScore: "", awayScore: "", predicted: false },
  { id: 72, group: "J", round: 3, teamHome: "Jordan", teamAway: "Argentina", date: "Saturday, June 27", time: "10:00 PM ET", venue: "Arlington, Texas", homeScore: "", awayScore: "", predicted: false }
];

// Mock squad details structured for drawer profiles
export const ROSTERS = {
  "United States": {
    team: { id: 1, name: "United States", country: "United States", founded: 1913, logo: "https://flagcdn.com/w80/us.png", fifaRank: 11, manager: "Mauricio Pochettino", keyPlayer: "Christian Pulisic" },
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
  "Mexico": {
    team: { id: 3, name: "Mexico", country: "Mexico", founded: 1922, logo: "https://flagcdn.com/w80/mx.png", fifaRank: 15, manager: "Javier Aguirre", keyPlayer: "Santiago Giménez" },
    recentForm: ["D", "W", "L", "W", "W"],
    topScorers: [
      { name: "Santiago Giménez", goals: 4, position: "Attacker" },
      { name: "Luis Chávez", goals: 2, position: "Midfielder" }
    ],
    players: [
      { id: 301, name: "Luis Malagón", age: 29, number: 1, position: "Goalkeeper" },
      { id: 309, name: "Santiago Giménez", age: 25, number: 9, position: "Attacker" }
    ]
  },
  "Canada": {
    team: { id: 6, name: "Canada", country: "Canada", founded: 1912, logo: "https://flagcdn.com/w80/ca.png", fifaRank: 40, manager: "Jesse Marsch", keyPlayer: "Alphonso Davies" },
    recentForm: ["W", "L", "W", "D", "W"],
    topScorers: [
      { name: "Jonathan David", goals: 4, position: "Attacker" },
      { name: "Alphonso Davies", goals: 2, position: "Midfielder" }
    ],
    players: [
      { id: 601, name: "Maxime Crépeau", age: 32, number: 1, position: "Goalkeeper" },
      { id: 602, name: "Alphonso Davies", age: 25, number: 19, position: "Midfielder" },
      { id: 603, name: "Jonathan David", age: 26, number: 10, position: "Attacker" }
    ]
  }
};

export const getTeamRoster = (countryName) => {
  const normName = countryName === "USA" ? "United States" : countryName;
  if (ROSTERS[normName]) return ROSTERS[normName];
  
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
