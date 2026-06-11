import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { getFlagUrl } from '../data/tournamentData';
import { Trophy, Shield, RefreshCw, LogOut, User, LogIn } from 'lucide-react';

export default function Header({ badgeRanking, user, onOpenLoginModal, onSignOut, lastRefreshed }) {
  const { userNation, setUserNation, activeTheme, allThemes } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  // Countdown timer to the opening match (June 11, 2026 at 17:00:00 Local/Eastern)
  useEffect(() => {
    const openingDate = new Date("2026-06-11T17:00:00-04:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = openingDate - now;

      if (diff <= 0) {
        setTimeLeft("Tournament Live! ⚽");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const badgeConfig = {
    "Armchair Critic": { color: "border-slate-600 bg-slate-900/80 text-slate-400" },
    "Pundit in Training": { color: "border-amber-600 bg-amber-950/20 text-amber-400" },
    "Tactical Analyst": { color: "border-sky-600 bg-sky-950/20 text-sky-400" },
    "Tactical Genius": { color: "border-emerald-600 bg-emerald-950/20 text-emerald-400 animate-pulse" },
    "Oracle of the Cup": { color: "border-cyan-500 bg-cyan-950/30 text-cyan-300 shadow-cyan-500/20 animate-pulse" }
  };

  const currentBadgeStyle = badgeConfig[badgeRanking] || badgeConfig["Armchair Critic"];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/70 backdrop-blur-md border-b border-white/5 px-4 lg:px-8 py-3 flex items-center justify-between transition-colors duration-1000">
      {/* Branding */}
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg bg-slate-900 border ${activeTheme.primaryColor} flex items-center justify-center`}>
          <Trophy className={`w-5 h-5 ${activeTheme.primaryColor.split(' ')[0]}`} />
        </div>
        <div>
          <h1 className="font-black text-sm tracking-widest text-white leading-none">
            FIFA WORLD CUP
          </h1>
          <span className={`text-[10px] font-extrabold uppercase tracking-widest ${activeTheme.primaryColor.split(' ')[0]}`}>
            2026 FAN HUB
          </span>
        </div>
      </div>

      {/* Live Sync Status */}
      {lastRefreshed && (
        <div className="hidden lg:flex items-center space-x-2 bg-slate-900/60 border border-emerald-500/20 py-1.5 px-3 rounded-full text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-slate-400 uppercase tracking-widest text-[9px] font-bold">Live Sync:</span>
          <span className="text-emerald-400 font-mono text-[10px]">Active ({lastRefreshed})</span>
        </div>
      )}

      {/* Countdown Timer */}
      <div className="hidden md:flex items-center space-x-2 bg-slate-900/60 border border-white/5 py-1.5 px-3 rounded-full text-xs font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
        <span className="text-slate-400 uppercase tracking-widest text-[9px] font-bold">Opening Kickoff:</span>
        <span className="text-white font-mono">{timeLeft}</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        {/* Profile Badge */}
        <div className={`hidden sm:flex items-center space-x-1 px-2.5 py-1 border rounded-md text-[10px] font-extrabold tracking-wider uppercase ${currentBadgeStyle.color}`}>
          <Shield className="w-3.5 h-3.5" />
          <span>{badgeRanking}</span>
        </div>

        {/* Guest Login or Account Panel */}
        {!user ? (
          <button
            onClick={onOpenLoginModal}
            className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 py-1.5 px-3.5 rounded-xl text-xs font-black uppercase tracking-wider text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5 text-cyan-400" />
            <span>Login</span>
          </button>
        ) : (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center space-x-2 bg-slate-900 border ${activeTheme.primaryColor} py-1 px-2.5 rounded-full text-xs font-bold text-slate-200 transition-all hover:bg-slate-800 focus:outline-none`}
            >
              <div className="p-0.5 bg-slate-800 rounded-full">
                <User className="w-3 h-3 text-cyan-400" />
              </div>
              <span className="max-w-[80px] truncate text-[10px]">{user.email}</span>
              <RefreshCw className="w-3 h-3 text-slate-400 hover:text-white" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 animate-slide-up">
                <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1.5 border-b border-white/5 truncate">
                  Logged in as: <br />
                  <span className="text-slate-300 font-semibold font-mono">{user.email}</span>
                </div>
                
                {/* Switch allegiance header option */}
                <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500 px-3 pt-2 pb-1">
                  Change Allegiance
                </div>
                
                <div className="max-h-40 overflow-y-auto px-1">
                  {Object.keys(allThemes)
                    .filter((name) => name !== "Default")
                    .map((name) => (
                      <button
                        key={name}
                        onClick={() => {
                          setUserNation(name);
                          setDropdownOpen(false);
                        }}
                        className="flex items-center space-x-2.5 w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-800 text-[10px] font-semibold text-slate-300 hover:text-white transition-colors"
                      >
                        <img
                          src={getFlagUrl(name)}
                          alt={name}
                          className="w-5 h-3.5 object-cover rounded border border-slate-800"
                        />
                        <span>{name}</span>
                      </button>
                    ))}
                </div>

                <div className="border-t border-white/5 mt-2 pt-1">
                  <button
                    onClick={() => {
                      onSignOut();
                      setDropdownOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full text-left px-3 py-2 rounded-lg hover:bg-red-950/20 text-[10px] font-bold uppercase tracking-wider text-red-400 hover:text-red-300 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
