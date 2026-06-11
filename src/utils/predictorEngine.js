import { GROUPS } from '../data/tournamentData';

// Calculate standings based on matches array
export const calculateStandings = (matches) => {
  const standings = {};

  // 1. Initialize stats for all 48 teams
  Object.keys(GROUPS).forEach((groupKey) => {
    standings[groupKey] = GROUPS[groupKey].teams.map((teamName) => ({
      name: teamName,
      group: groupKey,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
    }));
  });

  // 2. Aggregate scores from played/predicted matches
  matches.forEach((match) => {
    const { group, teamHome, teamAway, homeScore, awayScore } = match;
    
    if (homeScore !== "" && awayScore !== "" && homeScore !== null && awayScore !== null) {
      const hScore = parseInt(homeScore, 10);
      const aScore = parseInt(awayScore, 10);

      if (!isNaN(hScore) && !isNaN(aScore)) {
        const homeStats = standings[group].find((t) => t.name === teamHome);
        const awayStats = standings[group].find((t) => t.name === teamAway);

        if (homeStats && awayStats) {
          homeStats.played += 1;
          awayStats.played += 1;
          homeStats.goalsFor += hScore;
          homeStats.goalsAgainst += aScore;
          awayStats.goalsFor += aScore;
          awayStats.goalsAgainst += hScore;
          homeStats.goalDifference = homeStats.goalsFor - homeStats.goalsAgainst;
          awayStats.goalDifference = awayStats.goalsFor - awayStats.goalsAgainst;

          if (hScore > aScore) {
            homeStats.won += 1;
            homeStats.points += 3;
            awayStats.lost += 1;
          } else if (hScore < aScore) {
            awayStats.won += 1;
            awayStats.points += 3;
            homeStats.lost += 1;
          } else {
            homeStats.drawn += 1;
            homeStats.points += 1;
            awayStats.drawn += 1;
            awayStats.points += 1;
          }
        }
      }
    }
  });

  // 3. Sort each group individually
  const sortedStandings = {};
  Object.keys(standings).forEach((groupKey) => {
    sortedStandings[groupKey] = [...standings[groupKey]].sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
      if (b.won !== a.won) return b.won - a.won;
      return a.name.localeCompare(b.name);
    });
  });

  // 4. Extract Top 2 and 3rd-place teams
  const groupWinners = [];
  const groupRunnersUp = [];
  const thirdPlaceTeams = [];

  Object.keys(sortedStandings).forEach((groupKey) => {
    const list = sortedStandings[groupKey];
    groupWinners.push(list[0]);
    groupRunnersUp.push(list[1]);
    thirdPlaceTeams.push(list[2]);
  });

  // 5. Sort third-place teams to get the 8 best
  const sortedThirdPlaces = [...thirdPlaceTeams].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    if (b.won !== a.won) return b.won - a.won;
    return a.name.localeCompare(b.name);
  });

  const bestThird = sortedThirdPlaces.slice(0, 8);

  return {
    standings: sortedStandings,
    qualifiers: {
      winners: groupWinners,       // 12 teams (index 0 to 11 corresponding to Group A-L)
      runnersUp: groupRunnersUp,   // 12 teams (index 0 to 11 corresponding to Group A-L)
      bestThird: bestThird,        // 8 teams (sorted, index 0 to 7)
    }
  };
};

// Map qualifiers into the official 16 Round of 32 matchups list
export const generateRoundOf32Matches = (qualifiers) => {
  const { winners, runnersUp, bestThird } = qualifiers;

  // Winners index: A=0, B=1, C=2, D=3, E=4, F=5, G=6, H=7, I=8, J=9, K=10, L=11
  // RunnersUp index: A=0, B=1, C=2, D=3, E=4, F=5, G=6, H=7, I=8, J=9, K=10, L=11

  // Safe fetch helper
  const getW = (index, fallback) => (winners[index] ? winners[index].name : fallback);
  const getRU = (index, fallback) => (runnersUp[index] ? runnersUp[index].name : fallback);
  const getT3 = (index, fallback) => (bestThird[index] ? bestThird[index].name : fallback);

  // Define 16 Matchups matching the official 2026 World Cup Bracket Slots:
  return [
    { id: "R32-1", round: "R32", teamHome: getRU(0, "RU-A"), teamAway: getRU(1, "RU-B"), date: "Sunday, June 28", venue: "Inglewood, Calif.", homeScore: "", awayScore: "", winner: "" },
    { id: "R32-2", round: "R32", teamHome: getW(2, "W-C"), teamAway: getRU(5, "RU-F"), date: "Monday, June 29", venue: "Houston", homeScore: "", awayScore: "", winner: "" },
    { id: "R32-3", round: "R32", teamHome: getW(4, "W-E"), teamAway: getT3(0, "T3-1"), date: "Monday, June 29", venue: "Foxborough, Mass.", homeScore: "", awayScore: "", winner: "" },
    { id: "R32-4", round: "R32", teamHome: getW(5, "W-F"), teamAway: getRU(2, "RU-C"), date: "Monday, June 29", venue: "Guadalupe, Mexico", homeScore: "", awayScore: "", winner: "" },
    
    { id: "R32-5", round: "R32", teamHome: getRU(4, "RU-E"), teamAway: getRU(8, "RU-I"), date: "Tuesday, June 30", venue: "Arlington, Texas", homeScore: "", awayScore: "", winner: "" },
    { id: "R32-6", round: "R32", teamHome: getW(8, "W-I"), teamAway: getT3(1, "T3-2"), date: "Tuesday, June 30", venue: "East Rutherford, N.J.", homeScore: "", awayScore: "", winner: "" },
    { id: "R32-7", round: "R32", teamHome: getW(0, "W-A"), teamAway: getT3(2, "T3-3"), date: "Tuesday, June 30", venue: "Mexico City", homeScore: "", awayScore: "", winner: "" },
    { id: "R32-8", round: "R32", teamHome: getW(11, "W-L"), teamAway: getT3(3, "T3-4"), date: "Wednesday, July 1", venue: "Atlanta", homeScore: "", awayScore: "", winner: "" },
    
    { id: "R32-9", round: "R32", teamHome: getW(6, "W-G"), teamAway: getT3(4, "T3-5"), date: "Wednesday, July 1", venue: "Seattle", homeScore: "", awayScore: "", winner: "" },
    { id: "R32-10", round: "R32", teamHome: getW(3, "W-D"), teamAway: getT3(5, "T3-6"), date: "Wednesday, July 1", venue: "Santa Clara, Calif.", homeScore: "", awayScore: "", winner: "" },
    { id: "R32-11", round: "R32", teamHome: getW(7, "W-H"), teamAway: getRU(9, "RU-J"), date: "Thursday, July 2", venue: "Inglewood, Calif.", homeScore: "", awayScore: "", winner: "" },
    { id: "R32-12", round: "R32", teamHome: getRU(10, "RU-K"), teamAway: getRU(11, "RU-L"), date: "Thursday, July 2", venue: "Toronto", homeScore: "", awayScore: "", winner: "" },
    
    { id: "R32-13", round: "R32", teamHome: getW(1, "W-B"), teamAway: getT3(6, "T3-7"), date: "Thursday, July 2", venue: "Vancouver, Canada", homeScore: "", awayScore: "", winner: "" },
    { id: "R32-14", round: "R32", teamHome: getRU(3, "RU-D"), teamAway: getRU(6, "RU-G"), date: "Friday, July 3", venue: "Arlington, Texas", homeScore: "", awayScore: "", winner: "" },
    { id: "R32-15", round: "R32", teamHome: getW(9, "W-J"), teamAway: getRU(7, "RU-H"), date: "Friday, July 3", venue: "Miami Gardens, Fla.", homeScore: "", awayScore: "", winner: "" },
    { id: "R32-16", round: "R32", teamHome: getW(10, "W-K"), teamAway: getT3(7, "T3-8"), date: "Friday, July 3", venue: "Kansas City, Mo.", homeScore: "", awayScore: "", winner: "" }
  ];
};
