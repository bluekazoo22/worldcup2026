import React from 'react';
import { getFlagUrl } from '../data/tournamentData';
import { useTheme } from '../context/ThemeContext';
import { ArrowUpRight, Minus, AlertTriangle } from 'lucide-react';

export default function GroupStandings({ standings, bestThirdNames, onFlagClick }) {
  const { activeTheme } = useTheme();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.keys(standings).map((groupKey) => {
        const groupTeams = standings[groupKey];

        return (
          <div
            key={groupKey}
            className="glass-panel p-5 rounded-2xl border border-white/5 shadow-lg relative overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-extrabold text-sm text-white tracking-widest uppercase">
                Group {groupKey}
              </h3>
              <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded bg-slate-900 border ${activeTheme.primaryColor}`}>
                STAGE Standings
              </span>
            </div>

            {/* Table */}
            <table className="w-full text-xs">
              <thead>
                <tr className="text-slate-500 font-bold uppercase tracking-wider text-[9px] border-b border-white/5">
                  <th className="py-2 text-left w-6">#</th>
                  <th className="py-2 text-left">Team</th>
                  <th className="py-2 text-center w-8" title="Played">MP</th>
                  <th className="py-2 text-center w-8" title="Goal Difference">GD</th>
                  <th className="py-2 text-center w-8 font-extrabold text-white" title="Points">PTS</th>
                </tr>
              </thead>
              <tbody>
                {groupTeams.map((team, idx) => {
                  const isTopTwo = idx < 2;
                  const isBestThird = idx === 2 && bestThirdNames.includes(team.name);
                  const isRegularThird = idx === 2 && !bestThirdNames.includes(team.name);
                  const isFourth = idx === 3;

                  // Compute row coloring/highlighting styles
                  let statusBadge = null;
                  let rowStyle = "hover:bg-slate-900/30 transition-colors";

                  if (isTopTwo) {
                    rowStyle += " text-slate-100 border-l-2 border-emerald-500/50 pl-1";
                    statusBadge = (
                      <span className="inline-flex items-center text-[7px] font-black tracking-widest uppercase text-emerald-400 bg-emerald-500/10 px-1 py-0.2 rounded leading-none border border-emerald-500/20">
                        Q
                      </span>
                    );
                  } else if (isBestThird) {
                    rowStyle += " text-slate-200 border-l-2 border-cyan-500/50 pl-1";
                    statusBadge = (
                      <span className="inline-flex items-center text-[7px] font-black tracking-widest uppercase text-cyan-400 bg-cyan-500/10 px-1 py-0.2 rounded leading-none border border-cyan-500/20">
                        Q3
                      </span>
                    );
                  } else if (isRegularThird) {
                    rowStyle += " text-slate-400 border-l-2 border-amber-500/30 pl-1";
                    statusBadge = (
                      <span className="inline-flex items-center text-[7px] font-black tracking-widest uppercase text-amber-500 bg-amber-500/10 px-1 py-0.2 rounded leading-none border border-amber-500/20">
                        3RD
                      </span>
                    );
                  } else if (isFourth) {
                    rowStyle += " text-slate-600 opacity-60";
                    statusBadge = (
                      <span className="inline-flex items-center text-[7px] font-black tracking-widest uppercase text-red-500 bg-red-500/10 px-1 py-0.2 rounded leading-none border border-red-500/20">
                        OUT
                      </span>
                    );
                  }

                  return (
                    <tr key={team.name} className={`${rowStyle} border-b border-white/5`}>
                      <td className="py-2.5 font-mono font-bold text-slate-500">
                        {idx + 1}
                      </td>
                      <td className="py-2.5 font-semibold text-slate-200">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onFlagClick(team.name)}
                            className="w-6 h-4 rounded-sm overflow-hidden shadow-sm hover:scale-110 active:scale-95 transition-transform duration-200 border border-slate-800"
                            title={`Click for ${team.name} roster`}
                          >
                            <img
                              src={getFlagUrl(team.name)}
                              alt={team.name}
                              className="w-full h-full object-cover"
                            />
                          </button>
                          <span className="truncate max-w-[100px] hover:text-white transition-colors cursor-pointer" onClick={() => onFlagClick(team.name)}>
                            {team.name}
                          </span>
                          {statusBadge}
                        </div>
                      </td>
                      <td className="py-2.5 text-center font-mono text-slate-300">
                        {team.played}
                      </td>
                      <td className={`py-2.5 text-center font-mono font-bold ${
                        team.goalDifference > 0 ? "text-emerald-400" : team.goalDifference < 0 ? "text-red-400" : "text-slate-500"
                      }`}>
                        {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
                      </td>
                      <td className="py-2.5 text-center font-mono font-black text-sm text-white">
                        {team.points}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
