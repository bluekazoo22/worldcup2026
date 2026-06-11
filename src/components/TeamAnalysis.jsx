import React, { useState } from 'react';
import { getFlagUrl, GROUPS } from '../data/tournamentData';
import { useTheme } from '../context/ThemeContext';
import { Search, Filter, Eye } from 'lucide-react';

export default function TeamAnalysis({ onFlagClick }) {
  const { activeTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("All");

  // Flat list of all 48 teams
  const allTeams = [];
  Object.keys(GROUPS).forEach((groupKey) => {
    GROUPS[groupKey].teams.forEach((teamName) => {
      allTeams.push({
        name: teamName,
        group: groupKey
      });
    });
  });

  // Filter teams based on search query and selected group
  const filteredTeams = allTeams.filter((team) => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGroup = selectedGroup === "All" || team.group === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  const groupsList = ["All", ...Object.keys(GROUPS)];

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/40 p-4 border border-white/5 rounded-2xl">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search teams (e.g. USA, Japan, Argentina...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 pl-10 pr-4 py-2 rounded-xl text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-semibold"
          />
        </div>

        {/* Group selector filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-slate-500 text-xs font-bold uppercase tracking-wider flex items-center space-x-1 whitespace-nowrap">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Group:</span>
          </span>
          <div className="flex space-x-1">
            {groupsList.map((g) => {
              const isActive = selectedGroup === g;
              return (
                <button
                  key={g}
                  onClick={() => setSelectedGroup(g)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? `${activeTheme.accentColor} text-white shadow-sm`
                      : 'bg-slate-950/40 border border-slate-900 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {g}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredTeams.map((team) => {
          const flagUrl = getFlagUrl(team.name);
          return (
            <div
              key={team.name}
              className="glass-panel p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-between text-center group transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:shadow-lg relative overflow-hidden"
            >
              {/* Top group badge */}
              <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-slate-950/80 border border-white/5 text-[8px] font-extrabold tracking-wider text-slate-500 uppercase">
                Group {team.group}
              </div>

              <div className="flex flex-col items-center mt-3">
                {/* Flag */}
                <div className="w-14 h-10 rounded-md overflow-hidden shadow-md border border-slate-800/80 group-hover:scale-110 transition-transform duration-300 mb-3">
                  <img src={flagUrl} alt={team.name} className="w-full h-full object-cover" />
                </div>

                {/* Team Name */}
                <span className="text-xs font-extrabold text-slate-200 group-hover:text-white uppercase tracking-wider truncate max-w-[110px]">
                  {team.name}
                </span>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onFlagClick(team.name)}
                className="mt-4 w-full flex items-center justify-center space-x-1.5 bg-slate-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-white py-1.5 px-2.5 rounded-xl transition-all"
              >
                <Eye className="w-3.5 h-3.5 text-cyan-500" />
                <span>Roster</span>
              </button>
            </div>
          );
        })}
      </div>

      {filteredTeams.length === 0 && (
        <div className="text-center py-12 glass-panel border border-white/5 rounded-2xl">
          <p className="text-slate-500 text-sm font-semibold">No teams found matching search criteria.</p>
        </div>
      )}
    </div>
  );
}
