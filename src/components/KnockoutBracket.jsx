import React from 'react';
import { getFlagUrl } from '../data/tournamentData';
import { useTheme } from '../context/ThemeContext';
import { Trophy, Star, ShieldAlert } from 'lucide-react';

export default function KnockoutBracket({
  r32Matches,
  knockoutWinners,
  onSelectKnockoutWinner,
  onFlagClick
}) {
  const { activeTheme } = useTheme();

  // Helper to resolve the team name for downstream matches
  const getWinnerOf = (matchId, fallbackText) => {
    return knockoutWinners[matchId] || fallbackText;
  };

  // Define downstream matchups dynamically
  const r16Matchups = [
    { id: "R16-1", t1: getWinnerOf("R32-1", "Winner R32-1"), t2: getWinnerOf("R32-2", "Winner R32-2") },
    { id: "R16-2", t1: getWinnerOf("R32-3", "Winner R32-3"), t2: getWinnerOf("R32-4", "Winner R32-4") },
    { id: "R16-3", t1: getWinnerOf("R32-5", "Winner R32-5"), t2: getWinnerOf("R32-6", "Winner R32-6") },
    { id: "R16-4", t1: getWinnerOf("R32-7", "Winner R32-7"), t2: getWinnerOf("R32-8", "Winner R32-8") },
    { id: "R16-5", t1: getWinnerOf("R32-9", "Winner R32-9"), t2: getWinnerOf("R32-10", "Winner R32-10") },
    { id: "R16-6", t1: getWinnerOf("R32-11", "Winner R32-11"), t2: getWinnerOf("R32-12", "Winner R32-12") },
    { id: "R16-7", t1: getWinnerOf("R32-13", "Winner R32-13"), t2: getWinnerOf("R32-14", "Winner R32-14") },
    { id: "R16-8", t1: getWinnerOf("R32-15", "Winner R32-15"), t2: getWinnerOf("R32-16", "Winner R32-16") },
  ];

  const qfMatchups = [
    { id: "QF-1", t1: getWinnerOf("R16-1", "Winner R16-1"), t2: getWinnerOf("R16-2", "Winner R16-2") },
    { id: "QF-2", t1: getWinnerOf("R16-3", "Winner R16-3"), t2: getWinnerOf("R16-4", "Winner R16-4") },
    { id: "QF-3", t1: getWinnerOf("R16-5", "Winner R16-5"), t2: getWinnerOf("R16-6", "Winner R16-6") },
    { id: "QF-4", t1: getWinnerOf("R16-7", "Winner R16-7"), t2: getWinnerOf("R16-8", "Winner R16-8") },
  ];

  const sfMatchups = [
    { id: "SF-1", t1: getWinnerOf("QF-1", "Winner QF-1"), t2: getWinnerOf("QF-2", "Winner QF-2") },
    { id: "SF-2", t1: getWinnerOf("QF-3", "Winner QF-3"), t2: getWinnerOf("QF-4", "Winner QF-4") },
  ];

  const finalMatchup = {
    id: "FINAL",
    t1: getWinnerOf("SF-1", "Winner SF-1"),
    t2: getWinnerOf("SF-2", "Winner SF-2"),
  };

  const champion = getWinnerOf("FINAL", null);

  // Render a match UI block
  const renderMatchCard = (matchId, teamHome, teamAway, isInteractableHome, isInteractableAway) => {
    const winner = knockoutWinners[matchId];
    const hasWinner = !!winner;

    const selectWinner = (teamName) => {
      // Don't select placeholders
      if (teamName.startsWith("Winner ")) return;
      onSelectKnockoutWinner(matchId, teamName);
    };

    return (
      <div className={`flex flex-col bg-slate-900/50 border ${hasWinner ? 'border-white/10' : 'border-white/5'} rounded-xl p-3 w-48 shadow-md transition-all duration-300 relative`}>
        {/* Match Header */}
        <div className="text-[8px] font-extrabold uppercase tracking-widest text-slate-600 mb-2 flex justify-between">
          <span>{matchId}</span>
          {hasWinner && <span className="text-emerald-500">Predicted</span>}
        </div>

        <div className="space-y-1.5">
          {/* Team Home */}
          <button
            disabled={!isInteractableHome || teamHome.startsWith("Winner ")}
            onClick={() => selectWinner(teamHome)}
            className={`w-full flex items-center justify-between p-1.5 rounded-lg border text-left transition-all ${
              winner === teamHome
                ? `${activeTheme.accentColor} border-transparent text-white font-extrabold shadow-sm`
                : teamHome.startsWith("Winner ")
                ? 'border-transparent text-slate-600 cursor-not-allowed'
                : 'border-slate-800 hover:border-slate-700 bg-slate-950/40 text-slate-300 hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-2 truncate">
              {!teamHome.startsWith("Winner ") ? (
                <div
                  className="w-5 h-3.5 rounded-sm overflow-hidden flex-shrink-0 border border-slate-950 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onFlagClick(teamHome);
                  }}
                  title={`Roster for ${teamHome}`}
                >
                  <img src={getFlagUrl(teamHome)} alt={teamHome} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-5 h-3.5 rounded-sm bg-slate-800 flex-shrink-0"></div>
              )}
              <span className="text-[10px] truncate">{teamHome}</span>
            </div>
          </button>

          {/* Team Away */}
          <button
            disabled={!isInteractableAway || teamAway.startsWith("Winner ")}
            onClick={() => selectWinner(teamAway)}
            className={`w-full flex items-center justify-between p-1.5 rounded-lg border text-left transition-all ${
              winner === teamAway
                ? `${activeTheme.accentColor} border-transparent text-white font-extrabold shadow-sm`
                : teamAway.startsWith("Winner ")
                ? 'border-transparent text-slate-600 cursor-not-allowed'
                : 'border-slate-800 hover:border-slate-700 bg-slate-950/40 text-slate-300 hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-2 truncate">
              {!teamAway.startsWith("Winner ") ? (
                <div
                  className="w-5 h-3.5 rounded-sm overflow-hidden flex-shrink-0 border border-slate-950 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onFlagClick(teamAway);
                  }}
                  title={`Roster for ${teamAway}`}
                >
                  <img src={getFlagUrl(teamAway)} alt={teamAway} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-5 h-3.5 rounded-sm bg-slate-800 flex-shrink-0"></div>
              )}
              <span className="text-[10px] truncate">{teamAway}</span>
            </div>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Instructions header */}
      <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-extrabold text-sm text-white">Knockout Stage Bracket</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Click on a team in each matchup card to advance them to the next round. Emojis represent rosters.
          </p>
        </div>
        {champion && (
          <div className="flex items-center space-x-3 bg-gradient-to-tr from-yellow-500/20 to-amber-500/10 border border-yellow-500/30 rounded-xl px-4 py-2 animate-pulse">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <div>
              <span className="text-[8px] font-bold uppercase tracking-widest text-yellow-400 block">Your Predicted Champion</span>
              <span className="text-xs font-black text-white uppercase">{champion}</span>
            </div>
          </div>
        )}
      </div>

      {/* Bracket Tree Container */}
      <div className="flex overflow-x-auto pb-6 pt-4 gap-8 scrollbar-thin items-start min-h-[600px] justify-start px-2">
        {/* Column 1: Round of 32 */}
        <div className="flex flex-col space-y-4 flex-shrink-0">
          <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500 text-center border-b border-white/5 pb-1">
            Round of 32
          </h4>
          {r32Matches.map((m) =>
            renderMatchCard(m.id, m.teamHome, m.teamAway, true, true)
          )}
        </div>

        {/* Column 2: Round of 16 */}
        <div className="flex flex-col space-y-24 pt-10 flex-shrink-0">
          <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500 text-center border-b border-white/5 pb-1">
            Round of 16
          </h4>
          {r16Matchups.map((m) =>
            renderMatchCard(
              m.id,
              m.t1,
              m.t2,
              !m.t1.startsWith("Winner "),
              !m.t2.startsWith("Winner ")
            )
          )}
        </div>

        {/* Column 3: Quarter-Finals */}
        <div className="flex flex-col space-y-[240px] pt-28 flex-shrink-0">
          <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500 text-center border-b border-white/5 pb-1">
            Quarter-Finals
          </h4>
          {qfMatchups.map((m) =>
            renderMatchCard(
              m.id,
              m.t1,
              m.t2,
              !m.t1.startsWith("Winner "),
              !m.t2.startsWith("Winner ")
            )
          )}
        </div>

        {/* Column 4: Semi-Finals */}
        <div className="flex flex-col space-y-[490px] pt-60 flex-shrink-0">
          <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500 text-center border-b border-white/5 pb-1">
            Semi-Finals
          </h4>
          {sfMatchups.map((m) =>
            renderMatchCard(
              m.id,
              m.t1,
              m.t2,
              !m.t1.startsWith("Winner "),
              !m.t2.startsWith("Winner ")
            )
          )}
        </div>

        {/* Column 5: Final */}
        <div className="flex flex-col justify-center pt-[480px] flex-shrink-0">
          <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500 text-center border-b border-white/5 pb-1 mb-4">
            Final
          </h4>
          {renderMatchCard(
            finalMatchup.id,
            finalMatchup.t1,
            finalMatchup.t2,
            !finalMatchup.t1.startsWith("Winner "),
            !finalMatchup.t2.startsWith("Winner ")
          )}

          {/* Champion Display Box */}
          {champion && (
            <div className="mt-8 flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-b from-yellow-500/20 to-slate-900 border border-yellow-500/40 text-center animate-bounce shadow-2xl shadow-yellow-500/10">
              <div className="p-2 bg-yellow-500 text-slate-950 rounded-full mb-2">
                <Trophy className="w-6 h-6" />
              </div>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-yellow-400">
                2026 Champion
              </span>
              <span className="text-sm font-black text-white uppercase mt-0.5">
                {champion}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
