import { describe, it, expect } from 'vitest';
import { calculateStandings, generateRoundOf32Matches } from './predictorEngine';
import { INITIAL_MATCHES, GROUPS } from '../data/tournamentData';

describe('Predictor Standings Engine tests', () => {
  
  it('should initialize empty standings correctly', () => {
    const { standings } = calculateStandings([]);
    
    // Check that we have 12 groups
    expect(Object.keys(standings)).toHaveLength(12);
    
    // Check Group A initialization
    const groupA = standings.A;
    expect(groupA).toHaveLength(4);
    expect(groupA[0].played).toBe(0);
    expect(groupA[0].points).toBe(0);
    expect(groupA[0].goalDifference).toBe(0);
  });

  it('should compute points and goals correctly', () => {
    // Group A has: Mexico, South Africa, South Korea, Czechia
    const mockMatches = [
      { id: 1, group: "A", teamHome: "Mexico", teamAway: "South Africa", homeScore: "2", awayScore: "1" }, // Mexico +3 pts, GD +1, GF 2, GA 1
      { id: 2, group: "A", teamHome: "South Korea", teamAway: "Czechia", homeScore: "1", awayScore: "1" },  // South Korea +1 pt, Czechia +1 pt
      { id: 28, group: "A", teamHome: "Mexico", teamAway: "South Korea", homeScore: "0", awayScore: "0" },  // Mexico +1 pt, South Korea +1 pt
    ];

    const { standings } = calculateStandings(mockMatches);
    const mexico = standings.A.find(t => t.name === "Mexico");
    const southAfrica = standings.A.find(t => t.name === "South Africa");
    const southKorea = standings.A.find(t => t.name === "South Korea");

    // Mexico stats check
    expect(mexico.played).toBe(2);
    expect(mexico.points).toBe(4); // 3 (win) + 1 (draw)
    expect(mexico.goalsFor).toBe(2);
    expect(mexico.goalsAgainst).toBe(1);
    expect(mexico.goalDifference).toBe(1);

    // South Africa stats check
    expect(southAfrica.played).toBe(1);
    expect(southAfrica.points).toBe(0); // loss
    expect(southAfrica.goalDifference).toBe(-1);

    // South Korea stats check
    expect(southKorea.played).toBe(2);
    expect(southKorea.points).toBe(2); // 2 draws
  });

  it('should sort standings using points and goal difference tiebreakers', () => {
    // Group B: Canada, Bosnia and Herzegovina, Qatar, Switzerland
    const mockMatches = [
      { id: 3, group: "B", teamHome: "Canada", teamAway: "Bosnia and Herzegovina", homeScore: "3", awayScore: "0" }, // Canada 3pts GD+3
      { id: 5, group: "B", teamHome: "Qatar", teamAway: "Switzerland", homeScore: "2", awayScore: "1" },               // Qatar 3pts GD+1
    ];

    const { standings } = calculateStandings(mockMatches);
    
    // Canada should be 1st, Qatar 2nd
    expect(standings.B[0].name).toBe("Canada");
    expect(standings.B[1].name).toBe("Qatar");
    expect(standings.B[2].name).toBe("Switzerland"); // 0pts GD-1
    expect(standings.B[3].name).toBe("Bosnia and Herzegovina");  // 0pts GD-3
  });

  it('should isolate the top qualifiers and 8 best third place teams', () => {
    const mockMatches = [...INITIAL_MATCHES];
    
    // In Group G: Belgium, Egypt, Iran, New Zealand. Make New Zealand (3rd) win a game -> 3 pts
    const matchA = mockMatches.find(m => m.group === "G" && m.teamHome === "Iran" && m.teamAway === "New Zealand");
    if (matchA) {
      matchA.homeScore = "0";
      matchA.awayScore = "3"; // New Zealand gets 3 points
    }

    const { qualifiers } = calculateStandings(mockMatches);
    
    // We should extract exactly 12 winners and 12 runners-up
    expect(qualifiers.winners).toHaveLength(12);
    expect(qualifiers.runnersUp).toHaveLength(12);
    
    // We should isolate exactly 8 best third place teams
    expect(qualifiers.bestThird).toHaveLength(8);
  });

  it('should generate 16 matchups for Round of 32', () => {
    const { qualifiers } = calculateStandings(INITIAL_MATCHES);
    const r32 = generateRoundOf32Matches(qualifiers);
    
    expect(r32).toHaveLength(16);
    r32.forEach(match => {
      expect(match.teamHome).toBeDefined();
      expect(match.teamAway).toBeDefined();
      expect(match.winner).toBe("");
    });
  });

});
