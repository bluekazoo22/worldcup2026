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
    // Group A has: Canada, Colombia, Nigeria, Austria
    const mockMatches = [
      { id: 1, group: "A", teamHome: "Canada", teamAway: "Colombia", homeScore: "2", awayScore: "1" }, // Canada +3 pts, GD +1, GF 2, GA 1
      { id: 2, group: "A", teamHome: "Nigeria", teamAway: "Austria", homeScore: "1", awayScore: "1" },  // Nigeria +1 pt, Austria +1 pt
      { id: 3, group: "A", teamHome: "Canada", teamAway: "Nigeria", homeScore: "0", awayScore: "0" },   // Canada +1 pt, Nigeria +1 pt
    ];

    const { standings } = calculateStandings(mockMatches);
    const canada = standings.A.find(t => t.name === "Canada");
    const colombia = standings.A.find(t => t.name === "Colombia");
    const nigeria = standings.A.find(t => t.name === "Nigeria");

    // Canada stats check
    expect(canada.played).toBe(2);
    expect(canada.points).toBe(4); // 3 (win) + 1 (draw)
    expect(canada.goalsFor).toBe(2);
    expect(canada.goalsAgainst).toBe(1);
    expect(canada.goalDifference).toBe(1);

    // Colombia stats check
    expect(colombia.played).toBe(1);
    expect(colombia.points).toBe(0); // loss
    expect(colombia.goalDifference).toBe(-1);

    // Nigeria stats check
    expect(nigeria.played).toBe(2);
    expect(nigeria.points).toBe(2); // 2 draws
  });

  it('should sort standings using points and goal difference tiebreakers', () => {
    // Group B: Mexico, Switzerland, Egypt, Australia
    const mockMatches = [
      { id: 7, group: "B", teamHome: "Mexico", teamAway: "Switzerland", homeScore: "3", awayScore: "0" }, // Mexico 3pts GD+3
      { id: 8, group: "B", teamHome: "Egypt", teamAway: "Australia", homeScore: "2", awayScore: "1" },    // Egypt 3pts GD+1
    ];

    const { standings } = calculateStandings(mockMatches);
    
    // Mexico should be 1st, Egypt 2nd
    expect(standings.B[0].name).toBe("Mexico");
    expect(standings.B[1].name).toBe("Egypt");
    expect(standings.B[2].name).toBe("Australia"); // 0pts GD-1
    expect(standings.B[3].name).toBe("Switzerland");  // 0pts GD-3
  });

  it('should isolate the top qualifiers and 8 best third place teams', () => {
    // Generate clean matches where certain groups have strong 3rd place teams
    const mockMatches = [...INITIAL_MATCHES];
    
    // In Group G: England, Peru, Ghana, Iran. Make Ghana (3rd) win a game -> 3 pts
    const matchA = mockMatches.find(m => m.group === "G" && m.teamHome === "Ghana" && m.teamAway === "Iran");
    if (matchA) {
      matchA.homeScore = "3";
      matchA.awayScore = "0"; // Ghana has 3 points
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
