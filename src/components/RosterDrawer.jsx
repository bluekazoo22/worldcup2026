import React, { useEffect } from 'react';
import { getTeamRoster, getFlagUrl } from '../data/tournamentData';
import { X, ShieldAlert, Award, User, Target } from 'lucide-react';

export default function RosterDrawer({ countryName, onClose }) {
  // Prevent body scrolling when drawer is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!countryName) return null;

  const roster = getTeamRoster(countryName);
  const { team, recentForm, topScorers, players } = roster;
  const flagUrl = getFlagUrl(countryName);

  // Group players by position
  const goalkeepers = players.filter(p => p.position === 'Goalkeeper');
  const defenders = players.filter(p => p.position === 'Defender');
  const midfielders = players.filter(p => p.position === 'Midfielder');
  const attackers = players.filter(p => p.position === 'Attacker' || p.position === 'Forward');

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs animate-fade-in"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-slate-900 border-l border-white/10 shadow-2xl p-6 overflow-y-auto animate-slide-in-right scrollbar-thin">
        {/* Header bar */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
            National Team Profile
          </span>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-950/40 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Flag and Profile Info */}
        <div className="flex items-center space-x-4 pb-6 border-b border-white/5">
          <div className="w-20 h-14 rounded-lg overflow-hidden border border-slate-800 shadow-md">
            <img src={flagUrl} alt={countryName} className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white uppercase leading-none">{countryName}</h2>
            <div className="flex items-center space-x-2 mt-1 text-xs text-slate-400">
              <span>FIFA Rank: #{team.fifaRank}</span>
              <span>•</span>
              <span>Founded: {team.founded}</span>
            </div>
          </div>
        </div>

        {/* Quick Facts */}
        <div className="py-4 border-b border-white/5 grid grid-cols-2 gap-4">
          <div className="bg-slate-950/30 p-3 rounded-xl border border-white/5">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 block">Manager</span>
            <span className="text-xs font-bold text-slate-200 mt-0.5 block">{team.manager}</span>
          </div>
          <div className="bg-slate-950/30 p-3 rounded-xl border border-white/5">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 block">Key Player</span>
            <span className="text-xs font-bold text-slate-200 mt-0.5 block">{team.keyPlayer}</span>
          </div>
        </div>

        {/* Recent Form */}
        <div className="py-4 border-b border-white/5">
          <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">Recent Form</h4>
          <div className="flex items-center space-x-2">
            {recentForm.map((result, idx) => {
              let bg = "bg-slate-700 text-slate-300";
              if (result === 'W') bg = "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
              else if (result === 'L') bg = "bg-red-500/20 text-red-400 border border-red-500/30";
              else bg = "bg-amber-500/20 text-amber-400 border border-amber-500/30";

              return (
                <span 
                  key={idx} 
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${bg}`}
                >
                  {result}
                </span>
              );
            })}
          </div>
        </div>

        {/* Top Scorers */}
        <div className="py-4 border-b border-white/5">
          <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-3">Top Goalscorers</h4>
          <div className="space-y-2">
            {topScorers.map((scorer, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/20 border border-white/5 text-xs">
                <div className="flex items-center space-x-2 font-semibold text-slate-200">
                  <span className="w-5 h-5 rounded bg-slate-800 text-[9px] font-black flex items-center justify-center text-slate-400">
                    {idx + 1}
                  </span>
                  <span>{scorer.name}</span>
                </div>
                <div className="flex items-center space-x-1 font-mono font-bold text-cyan-400">
                  <Target className="w-3.5 h-3.5" />
                  <span>{scorer.goals} Goals</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Squad List */}
        <div className="py-4 space-y-5">
          <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Squad Roster</h4>

          {/* Goalkeepers */}
          {goalkeepers.length > 0 && (
            <div>
              <h5 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Goalkeepers</h5>
              <div className="space-y-1">
                {goalkeepers.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/20 border border-white/5 text-xs text-slate-300">
                    <span className="font-semibold">{p.name}</span>
                    <span className="font-mono text-slate-500">#{p.number}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Defenders */}
          {defenders.length > 0 && (
            <div>
              <h5 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Defenders</h5>
              <div className="space-y-1">
                {defenders.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/20 border border-white/5 text-xs text-slate-300">
                    <span className="font-semibold">{p.name}</span>
                    <span className="font-mono text-slate-500">#{p.number}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Midfielders */}
          {midfielders.length > 0 && (
            <div>
              <h5 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Midfielders</h5>
              <div className="space-y-1">
                {midfielders.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/20 border border-white/5 text-xs text-slate-300">
                    <span className="font-semibold">{p.name}</span>
                    <span className="font-mono text-slate-500">#{p.number}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Attackers */}
          {attackers.length > 0 && (
            <div>
              <h5 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Attackers</h5>
              <div className="space-y-1">
                {attackers.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/20 border border-white/5 text-xs text-slate-300">
                    <span className="font-semibold">{p.name}</span>
                    <span className="font-mono text-slate-500">#{p.number}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
