import React, { useState, useEffect } from 'react';
import { getTeamRoster, getFlagUrl } from '../data/tournamentData';
import { fetchRealRoster } from '../utils/apiFootball';
import { X, ShieldAlert, Award, User, Target, Loader2, Database, Wifi } from 'lucide-react';

export default function RosterDrawer({ countryName, onClose }) {
  const [loading, setLoading] = useState(true);
  const [roster, setRoster] = useState(null);
  const [isApiLive, setIsApiLive] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const loadRosterData = async () => {
      if (!countryName) return;
      setLoading(true);
      
      try {
        const liveData = await fetchRealRoster(countryName);
        if (liveData) {
          setRoster(liveData);
          setIsApiLive(true);
        } else {
          // Fallback to local mock data
          const localData = getTeamRoster(countryName);
          setRoster(localData);
          setIsApiLive(false);
        }
      } catch (err) {
        console.warn("Failed loading live API, falling back to mock:", err);
        const localData = getTeamRoster(countryName);
        setRoster(localData);
        setIsApiLive(false);
      } finally {
        setLoading(false);
      }
    };

    loadRosterData();
  }, [countryName]);

  if (!countryName) return null;

  const flagUrl = getFlagUrl(countryName);

  // Group players by position if loaded
  let goalkeepers = [];
  let defenders = [];
  let midfielders = [];
  let attackers = [];

  if (roster && roster.players) {
    goalkeepers = roster.players.filter(p => p.position === 'Goalkeeper');
    defenders = roster.players.filter(p => p.position === 'Defender');
    midfielders = roster.players.filter(p => p.position === 'Midfielder');
    attackers = roster.players.filter(p => p.position === 'Attacker' || p.position === 'Forward' || p.position === 'Attacker/Forward');
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs animate-fade-in"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-slate-900 border-l border-white/10 shadow-2xl p-6 overflow-y-auto animate-slide-in-right scrollbar-thin">
        
        {/* Top Close bar */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
            National Team Profile
          </span>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-950/40 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          /* Pulse Skeleton Loader */
          <div className="space-y-6 animate-pulse">
            <div className="flex items-center space-x-4 pb-6 border-b border-white/5">
              <div className="w-20 h-14 bg-slate-800 rounded-lg"></div>
              <div className="space-y-2 flex-1">
                <div className="h-6 bg-slate-800 rounded w-2/3"></div>
                <div className="h-4 bg-slate-800 rounded w-1/2"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-14 bg-slate-850 rounded-xl"></div>
              <div className="h-14 bg-slate-850 rounded-xl"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-slate-850 rounded w-1/3"></div>
              <div className="h-10 bg-slate-850 rounded"></div>
              <div className="h-10 bg-slate-850 rounded"></div>
              <div className="h-10 bg-slate-850 rounded"></div>
            </div>
          </div>
        ) : (
          /* Loaded Profile content */
          roster && (
            <div className="space-y-6">
              {/* Flag and Profile Info */}
              <div className="flex items-center justify-between pb-6 border-b border-white/5 gap-3">
                <div className="flex items-center space-x-4 truncate">
                  <div className="w-20 h-14 rounded-lg overflow-hidden border border-slate-800 shadow-md flex-shrink-0">
                    <img 
                      src={roster.team.logo || flagUrl} 
                      alt={countryName} 
                      className="w-full h-full object-cover" 
                      onError={(e) => { e.target.src = flagUrl; }}
                    />
                  </div>
                  <div className="truncate">
                    <h2 className="text-2xl font-black text-white uppercase leading-none truncate">{countryName}</h2>
                    <div className="flex items-center space-x-2 mt-1 text-xs text-slate-400">
                      <span>FIFA Rank: #{roster.team.fifaRank}</span>
                      <span>•</span>
                      <span>Founded: {roster.team.founded}</span>
                    </div>
                  </div>
                </div>

                {/* API Status Badge */}
                <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1.5 rounded-lg border flex items-center space-x-1.5 flex-shrink-0 ${
                  isApiLive 
                    ? 'bg-cyan-500/10 border-cyan-500/25 text-cyan-400' 
                    : 'bg-amber-500/10 border-amber-500/25 text-amber-400'
                }`}>
                  {isApiLive ? <Wifi className="w-3.5 h-3.5" /> : <Database className="w-3.5 h-3.5" />}
                  <span>{isApiLive ? "API Live" : "Mock Demo"}</span>
                </span>
              </div>

              {/* Quick Facts */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950/30 p-3 rounded-xl border border-white/5">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 block">Manager</span>
                  <span className="text-xs font-bold text-slate-200 mt-0.5 block truncate">{roster.team.manager}</span>
                </div>
                <div className="bg-slate-950/30 p-3 rounded-xl border border-white/5">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 block">Key Player</span>
                  <span className="text-xs font-bold text-slate-200 mt-0.5 block truncate">{roster.team.keyPlayer}</span>
                </div>
              </div>

              {/* Recent Form */}
              <div className="py-2 border-b border-white/5">
                <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">Recent Form</h4>
                <div className="flex items-center space-x-2">
                  {roster.recentForm.map((result, idx) => {
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
              <div className="py-2 border-b border-white/5">
                <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-3">Top Goalscorers</h4>
                <div className="space-y-2">
                  {roster.topScorers.map((scorer, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/20 border border-white/5 text-xs">
                      <div className="flex items-center space-x-2 font-semibold text-slate-200 truncate mr-2">
                        <span className="w-5 h-5 rounded bg-slate-800 text-[9px] font-black flex items-center justify-center text-slate-400 flex-shrink-0">
                          {idx + 1}
                        </span>
                        {scorer.photo && (
                          <img 
                            src={scorer.photo} 
                            alt={scorer.name} 
                            className="w-5 h-5 rounded-full object-cover border border-slate-800"
                          />
                        )}
                        <span className="truncate">{scorer.name}</span>
                      </div>
                      <div className="flex items-center space-x-1 font-mono font-bold text-cyan-400 flex-shrink-0">
                        <Target className="w-3.5 h-3.5" />
                        <span>{scorer.goals} Goals</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Squad List */}
              <div className="py-2 space-y-4">
                <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Squad Roster ({roster.players.length})</h4>

                {/* Render position grouping */}
                {[
                  { title: "Goalkeepers", list: goalkeepers },
                  { title: "Defenders", list: defenders },
                  { title: "Midfielders", list: midfielders },
                  { title: "Attackers", list: attackers }
                ].map(group => group.list.length > 0 && (
                  <div key={group.title}>
                    <h5 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 px-1">{group.title}</h5>
                    <div className="grid grid-cols-1 gap-1">
                      {group.list.map(p => (
                        <div key={p.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/20 border border-white/5 text-xs text-slate-300 hover:border-white/10 transition-colors">
                          <div className="flex items-center space-x-2 truncate">
                            {p.photo && (
                              <img 
                                src={p.photo} 
                                alt={p.name} 
                                className="w-5 h-5 rounded-full object-cover border border-slate-800 flex-shrink-0"
                              />
                            )}
                            <span className="font-semibold truncate">{p.name}</span>
                            {p.age && <span className="text-[10px] text-slate-500">({p.age} yrs)</span>}
                          </div>
                          <span className="font-mono text-slate-500 flex-shrink-0">
                            {p.number ? `#${p.number}` : "-"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}
