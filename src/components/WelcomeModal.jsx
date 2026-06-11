import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { getFlagUrl } from '../data/tournamentData';

export default function WelcomeModal() {
  const { userNation, setUserNation, allThemes } = useTheme();

  if (userNation) return null;

  // Key teams we want to display prominently
  const prominentTeams = [
    "USA", "Mexico", "Canada", "Japan", 
    "Brazil", "Argentina", "France", "Germany", 
    "Spain", "England", "Portugal", "Italy"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md animate-fade-in p-4">
      <div className="w-full max-w-2xl glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden animate-slide-up">
        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>

        <div className="text-center relative z-10">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-tr from-cyan-500 to-emerald-500 rounded-full shadow-lg shadow-cyan-500/20 mb-4 animate-bounce">
            <span className="text-3xl">🏆</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            2026 FIFA WORLD CUP
          </h1>
          <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mt-1">
            FAN PREDICTOR HUB
          </p>
          <p className="text-slate-400 text-sm mt-3 max-w-md mx-auto">
            Choose your nation to personalize the hub with team colors, active glows, and start your championship prediction.
          </p>

          <div className="mt-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 text-left mb-3 px-1">
              Select Your Allegiance
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {prominentTeams.map((teamName) => {
                const team = allThemes[teamName];
                const flagUrl = getFlagUrl(teamName);
                
                return (
                  <button
                    key={teamName}
                    onClick={() => setUserNation(teamName)}
                    className="flex flex-col items-center justify-center p-4 bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/80 rounded-xl transition-all duration-300 group hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                  >
                    <div className="w-12 h-8 rounded-md overflow-hidden shadow-md group-hover:scale-110 transition-transform duration-300 mb-2 border border-slate-800">
                      <img src={flagUrl} alt={teamName} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs font-bold text-slate-300 group-hover:text-white">
                      {team.emoji} {teamName}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-slate-900 text-xs text-slate-500">
            Co-hosted by Canada, Mexico, and the United States.
          </div>
        </div>
      </div>
    </div>
  );
}
