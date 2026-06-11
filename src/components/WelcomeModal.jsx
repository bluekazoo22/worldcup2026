import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { getFlagUrl, ALL_NATIONS } from '../data/tournamentData';
import { Search, Trophy } from 'lucide-react';

export default function WelcomeModal() {
  const { userNation, setUserNation } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  if (userNation) return null;

  // Key teams to show as quick-select suggestions
  const prominentTeams = [
    "USA", "Mexico", "Canada", "Japan", 
    "Brazil", "Argentina", "France", "Germany", 
    "Spain", "England", "Portugal", "Italy"
  ];

  // Filter nations based on query
  const filteredNations = ALL_NATIONS.filter(nation => 
    nation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md animate-fade-in p-4">
      <div className="w-full max-w-2xl glass-panel p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden animate-slide-up">
        {/* Decorative background blurs */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col h-full max-h-[85vh]">
          {/* Top Branding */}
          <div className="text-center mb-5">
            <div className="inline-flex items-center justify-center p-2.5 bg-gradient-to-tr from-cyan-500 to-emerald-500 rounded-full shadow-lg shadow-cyan-500/20 mb-3">
              <span className="text-2xl">🏆</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent uppercase">
              Select Your Allegiance
            </h1>
            <p className="text-slate-400 text-xs mt-1.5 max-w-md mx-auto">
              Personalize the hub with your team's flag and colors, and watch the visual system adapt.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative mb-5">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search 100+ national teams (e.g. Netherlands, Scotland, Peru...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-semibold"
            />
          </div>

          {/* Search Results / Prominent Grid */}
          <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin space-y-5 max-h-[45vh]">
            
            {searchQuery === "" ? (
              <>
                {/* Suggestions Header */}
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2 px-1">
                    Featured Powerhouses & Hosts
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                    {prominentTeams.map((teamName) => {
                      const flagUrl = getFlagUrl(teamName);
                      return (
                        <button
                          key={teamName}
                          onClick={() => setUserNation(teamName)}
                          className="flex items-center space-x-2.5 p-2.5 bg-slate-900/40 border border-slate-850 hover:border-slate-700 hover:bg-slate-800/80 rounded-xl transition-all duration-200 group active:scale-95 text-left"
                        >
                          <div className="w-8 h-5.5 rounded overflow-hidden flex-shrink-0 border border-slate-800">
                            <img src={flagUrl} alt={teamName} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-xs font-bold text-slate-300 group-hover:text-white truncate">
                            {teamName}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* All list */}
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2 px-1">
                    All 100+ Nations List
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {ALL_NATIONS.map((nation) => {
                      const flagUrl = getFlagUrl(nation.name);
                      return (
                        <button
                          key={nation.name}
                          onClick={() => setUserNation(nation.name)}
                          className="flex items-center space-x-2.5 p-2 bg-slate-950/40 border border-slate-900 hover:border-slate-700 hover:bg-slate-900/80 rounded-xl transition-all duration-200 group active:scale-95 text-left"
                        >
                          <div className="w-6.5 h-4.5 rounded-sm overflow-hidden flex-shrink-0 border border-slate-950">
                            <img src={flagUrl} alt={nation.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-[11px] font-semibold text-slate-400 group-hover:text-white truncate">
                            {nation.emoji} {nation.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              /* Display search matches */
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2 px-1">
                  Search Matches ({filteredNations.length})
                </h3>
                {filteredNations.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {filteredNations.map((nation) => {
                      const flagUrl = getFlagUrl(nation.name);
                      return (
                        <button
                          key={nation.name}
                          onClick={() => setUserNation(nation.name)}
                          className="flex items-center space-x-2.5 p-2 bg-slate-950/40 border border-slate-900 hover:border-slate-700 hover:bg-slate-900/80 rounded-xl transition-all duration-200 group active:scale-95 text-left"
                        >
                          <div className="w-6.5 h-4.5 rounded-sm overflow-hidden flex-shrink-0 border border-slate-950">
                            <img src={flagUrl} alt={nation.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-[11px] font-semibold text-slate-300 group-hover:text-white truncate">
                            {nation.emoji} {nation.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-center py-6 text-slate-500 text-xs font-semibold">
                    No national teams match your search.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
