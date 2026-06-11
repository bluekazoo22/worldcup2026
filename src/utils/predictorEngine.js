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
    
    // Check if score is entered (allow 0 as valid score)
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
      // 1. Points
      if (b.points !== a.points) return b.points - a.points;
      // 2. Goal Difference
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      // 3. Goals For
      if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
      // 4. Wins
      if (b.won !== a.won) return b.won - a.won;
      // 5. Default alphabetical to keep sorting deterministic
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

// Map qualifiers into a structured Round of 32 matches list.
// The qualifiers are objects returned by calculateStandings.
// We use group winners, runners up, and the 8 best 3rd places.
export const generateRoundOf32Matches = (qualifiers) => {
  const { winners, runnersUp, bestThird } = qualifiers;

  // Winners index: A=0, B=1, C=2, D=3, E=4, F=5, G=6, H=7, I=8, J=9, K=10, L=11
  // RunnersUp index: A=0, B=1, C=2, D=3, E=4, F=5, G=6, H=7, I=8, J=9, K=10, L=11

  // Safe fetch helper in case data is loading or undefined
  const getW = (index, fallback) => (winners[index] ? winners[index].name : fallback);
  const getRU = (index, fallback) => (runnersUp[index] ? runnersUp[index].name : fallback);
  const getT3 = (index, fallback) => (bestThird[index] ? bestThird[index].name : fallback);

  // Define 16 Matchups for Round of 32
  // We pair all 12 winners, 12 runners-up, and 8 third-places:
  // - 8 Winners vs 3rd-places
  // - 4 Winners vs Runners-Up
  // - 4 Runners-Up vs Runners-Up
  return [
    { id: "R32-1", round: "R32", teamHome: getW(0, "1A"), teamAway: getT3(0, "3rd-1"), homeScore: "", awayScore: "", winner: "" }, // 1A vs T3_1
    { id: "R32-2", round: "R32", teamHome: getW(8, "1I"), teamAway: getRU(0, "2A"), homeScore: "", awayScore: "", winner: "" }, // 1I vs 2A
    { id: "R32-3", round: "R32", teamHome: getW(1, "1B"), teamAway: getT3(1, "3rd-2"), homeScore: "", awayScore: "", winner: "" }, // 1B vs T3_2
    { id: "R32-4", round: "R32", teamHome: getRU(4, "2E"), teamAway: getRU(5, "2F"), homeScore: "", awayScore: "", winner: "" }, // 2E vs 2F
    
    { id: "R32-5", round: "R32", teamHome: getW(2, "1C"), teamAway: getT3(2, "3rd-3"), homeScore: "", awayScore: "", winner: "" }, // 1C vs T3_3
    { id: "R32-6", round: "R32", teamHome: getW(9, "1J"), teamAway: getRU(1, "2B"), homeScore: "", awayScore: "", winner: "" }, // 1J vs 2B
    { id: "R32-7", round: "R32", teamHome: getW(3, "1D"), teamAway: getT3(3, "3rd-4"), homeScore: "", awayScore: "", winner: "" }, // 1D vs T3_4
    { id: "R32-8", round: "R32", teamHome: getRU(6, "2G"), teamAway: getRU(7, "2H"), homeScore: "", awayScore: "", winner: "" }, // 2G vs 2H
    
    { id: "R32-9", round: "R32", teamHome: getW(4, "1E"), teamAway: getT3(4, "3rd-5"), homeScore: "", awayScore: "", winner: "" }, // 1E vs T3_5
    { id: "R32-10", round: "R32", teamHome: getW(10, "1K"), teamAway: getRU(2, "2C"), homeScore: "", awayScore: "", winner: "" }, // 1K vs 2C
    { id: "R32-11", round: "R32", teamHome: getW(5, "1F"), teamAway: getT3(5, "3rd-6"), homeScore: "", awayScore: "", winner: "" }, // 1F vs T3_6
    { id: "R32-12", round: "R32", teamHome: getRU(8, "2I"), teamAway: getRU(9, "2J"), homeScore: "", awayScore: "", winner: "" }, // 2I vs 2J
    
    { id: "R32-13", round: "R32", teamHome: getW(6, "1G"), teamAway: getT3(6, "3rd-7"), homeScore: "", awayScore: "", winner: "" }, // 1G vs T3_7
    { id: "R32-14", round: "R32", teamHome: getW(11, "1L"), teamAway: getRU(3, "2D"), homeScore: "", awayScore: "", winner: "" }, // 1L vs 2D
    { id: "R32-15", round: "R32", teamHome: getW(7, "1H"), teamAway: getT3(7, "3rd-8"), homeScore: "", awayScore: "", winner: "" }, // 1H vs T3_8
    { id: "R32-16", round: "R32", teamHome: getRU(10, "2K"), teamAway: getRU(11, "2L"), homeScore: "", awayScore: "", winner: "" } // 2K vs 2L
  ];
};
