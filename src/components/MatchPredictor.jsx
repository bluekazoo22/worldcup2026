import React, { useState } from 'react';
import { getFlagUrl, GROUPS } from '../data/tournamentData';
import { useTheme } from '../context/ThemeContext';
import { Star, ShieldAlert, Award } from 'lucide-react';

export default function MatchPredictor({ matches, onUpdateMatchScore, onFlagClick }) {
  const { activeTheme } = useTheme();
  const [activeGroup, setActiveGroup] = useState("A");

  const groupsList = Object.keys(GROUPS);

  // Filter matches for the currently active group
  const groupMatches = matches.filter((m) => m.group === activeGroup);

  const handleQuickPredict = (matchId, outcome) => {
    // Presets for quick scoring
    let home = 0;
    let away = 0;
    
    if (outcome === 'home') {
      home = 2;
      away = 1;
    } else if (outcome === 'away') {
      home = 1;
      away = 2;
    } else {
      home = 1;
      away = 1;
    }
    onUpdateMatchScore(matchId, home.toString(), away.toString());
  };

  const handleInputChange = (matchId, isHome, value) => {
    // Strip non-numeric and clamp
    const cleanValue = value.replace(/[^0-9]/g, '').slice(0, 2);
    const match = matches.find(m => m.id === matchId);
    if (match) {
      if (isHome) {
        onUpdateMatchScore(matchId, cleanValue, match.awayScore);
      } else {
        onUpdateMatchScore(matchId, match.homeScore, cleanValue);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Group Selector Navigation */}
      <div className="flex overflow-x-auto pb-3 gap-2 scrollbar-thin border-b border-white/5">
        {groupsList.map((g) => {
          const isActive = activeGroup === g;
          return (
            <button
              key={g}
              onClick={() => setActiveGroup(g)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                isActive
                  ? `${activeTheme.accentColor} text-white shadow-lg`
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              Group {g}
            </button>
          );
        })}
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {groupMatches.map((match) => {
          const isPredicted = match.homeScore !== "" && match.awayScore !== "";
          const hScore = parseInt(match.homeScore, 10);
          const aScore = parseInt(match.awayScore, 10);

          let resultText = "";
          if (isPredicted) {
            if (hScore > aScore) resultText = `${match.teamHome} Win`;
            else if (hScore < aScore) resultText = `${match.teamAway} Win`;
            else resultText = "Draw";
          }

          return (
            <div
              key={match.id}
              className={`glass-panel p-5 rounded-2xl border transition-all duration-500 hover:shadow-xl relative overflow-hidden cyber-card ${
                isPredicted ? 'border-white/15' : 'border-white/5'
              }`}
            >
              {/* Top Meta info */}
              <div className="flex justify-between items-center mb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <span>Fixture #{match.id}</span>
                <span className="flex items-center space-x-1">
                  <span>Round {match.round}</span>
                  {isPredicted && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  )}
                </span>
              </div>

              {/* Match Score UI */}
              <div className="flex items-center justify-between gap-2">
                {/* Home Team */}
                <div className="flex-1 flex flex-col items-center text-center">
                  <button
                    onClick={() => onFlagClick(match.teamHome)}
                    className="w-14 h-9 rounded-md overflow-hidden shadow-md border border-slate-800 hover:scale-110 active:scale-95 transition-transform duration-300 mb-2"
                    title={`Click to analyze ${match.teamHome}`}
                  >
                    <img
                      src={getFlagUrl(match.teamHome)}
                      alt={match.teamHome}
                      className="w-full h-full object-cover"
                    />
                  </button>
                  <span className="text-xs font-bold text-slate-300 truncate max-w-[100px]">
                    {match.teamHome}
                  </span>
                </div>

                {/* Score inputs */}
                <div className="flex items-center justify-center space-x-2">
                  <input
                    type="text"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    placeholder="-"
                    value={match.homeScore}
                    onChange={(e) => handleInputChange(match.id, true, e.target.value)}
                    className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-center font-mono text-xl font-bold text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                  <span className="text-slate-600 font-extrabold text-lg">:</span>
                  <input
                    type="text"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    placeholder="-"
                    value={match.awayScore}
                    onChange={(e) => handleInputChange(match.id, false, e.target.value)}
                    className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-center font-mono text-xl font-bold text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>

                {/* Away Team */}
                <div className="flex-1 flex flex-col items-center text-center">
                  <button
                    onClick={() => onFlagClick(match.teamAway)}
                    className="w-14 h-9 rounded-md overflow-hidden shadow-md border border-slate-800 hover:scale-110 active:scale-95 transition-transform duration-300 mb-2"
                    title={`Click to analyze ${match.teamAway}`}
                  >
                    <img
                      src={getFlagUrl(match.teamAway)}
                      alt={match.teamAway}
                      className="w-full h-full object-cover"
                    />
                  </button>
                  <span className="text-xs font-bold text-slate-300 truncate max-w-[100px]">
                    {match.teamAway}
                  </span>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between gap-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                  Quick Pick:
                </span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleQuickPredict(match.id, 'home')}
                    className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider rounded-md border border-slate-800 hover:border-slate-600 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  >
                    1 (Win)
                  </button>
                  <button
                    onClick={() => handleQuickPredict(match.id, 'draw')}
                    className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider rounded-md border border-slate-800 hover:border-slate-600 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  >
                    X (Draw)
                  </button>
                  <button
                    onClick={() => handleQuickPredict(match.id, 'away')}
                    className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider rounded-md border border-slate-800 hover:border-slate-600 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  >
                    2 (Win)
                  </button>
                </div>
              </div>

              {/* Simulated Prediction result overlay */}
              {isPredicted && (
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[8px] font-black tracking-widest text-emerald-400 uppercase">
                  {resultText}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
