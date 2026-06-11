import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { getFlagUrl } from '../data/tournamentData';
import { Heart, Vote, CloudLightning, Shield, Save, Loader2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function GamificationWidgets({
  groupPredictionsCount,
  knockoutPredictionsCount,
  badgeRanking,
  hypeCount,
  onIncrementHype,
  onSyncCloud,
  syncing
}) {
  const { userNation, activeTheme } = useTheme();

  // Mock Polls State
  const [polls, setPolls] = useState({
    coHostSemi: {
      question: "Will a co-host (USA/MEX/CAN) reach the Semifinals?",
      voted: false,
      votes: { yes: 1420, no: 2105 },
      userVote: null
    },
    goldenBoot: {
      question: "Who will win the Golden Boot?",
      voted: false,
      votes: { Mbappe: 1205, Haaland: 1040, Vinicius: 890, Bellingham: 654, Other: 310 },
      userVote: null
    }
  });

  const fireConfetti = () => {
    // Blast confetti in selected team theme colors
    const colors = activeTheme.name === "Hub Default" 
      ? ['#22d3ee', '#06b6d4', '#ffffff'] 
      : activeTheme.primaryColor.includes('blue') 
        ? ['#3b82f6', '#ef4444', '#ffffff']
        : activeTheme.primaryColor.includes('emerald')
          ? ['#10b981', '#ef4444', '#f59e0b']
          : ['#3b82f6', '#10b981', '#e2e8f0'];

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 },
      colors: colors
    });
    onIncrementHype();
  };

  const handleVote = (pollKey, option) => {
    if (polls[pollKey].voted) return;

    setPolls(prev => {
      const poll = prev[pollKey];
      const updatedVotes = { ...poll.votes, [option]: poll.votes[option] + 1 };
      return {
        ...prev,
        [pollKey]: {
          ...poll,
          voted: true,
          votes: updatedVotes,
          userVote: option
        }
      };
    });

    // Small celebratory confetti for voting!
    confetti({
      particleCount: 20,
      spread: 40,
      origin: { y: 0.9 }
    });
  };

  // Hype milestone calculations
  const maxHypeForLevel = 50;
  const hypeLevel = Math.floor(hypeCount / maxHypeForLevel) + 1;
  const hypeProgress = (hypeCount % maxHypeForLevel) * (100 / maxHypeForLevel);
  
  const getHypeTitle = (level) => {
    if (level === 1) return "Casual Supporter";
    if (level === 2) return "Die-Hard Fan";
    if (level === 3) return "Stadium Regular";
    if (level === 4) return "Ultras Leader";
    return "Football Oracle";
  };

  return (
    <div className="space-y-6">
      {/* 1. Profile Level and Cloud Sync Card */}
      <div className="glass-panel p-5 rounded-2xl border border-white/5 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl"></div>
        
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3.5">
            <div className={`p-3 rounded-2xl bg-slate-900 border ${activeTheme.primaryColor} flex items-center justify-center shadow-lg shadow-cyan-500/5`}>
              <Shield className={`w-6 h-6 ${activeTheme.primaryColor.split(' ')[0]}`} />
            </div>
            <div>
              <span className="text-[8px] font-extrabold uppercase tracking-widest text-slate-500">
                Predictor Profile
              </span>
              <h3 className="text-md font-black text-white leading-tight uppercase">
                {badgeRanking}
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Allegiance: <span className="text-slate-200 font-bold">{userNation || "None Selected"}</span>
              </p>
            </div>
          </div>

          {/* Sync Button */}
          <button
            onClick={onSyncCloud}
            disabled={syncing}
            className={`flex items-center space-x-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 py-1.5 px-3 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition-all disabled:opacity-50`}
          >
            {syncing ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
            ) : (
              <Save className="w-3.5 h-3.5 text-cyan-500" />
            )}
            <span>{syncing ? "Saving..." : "Save to Cloud"}</span>
          </button>
        </div>

        {/* Prediction Stats Progress meters */}
        <div className="mt-5 space-y-3 pt-4 border-t border-white/5">
          {/* Group predictions */}
          <div>
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              <span>Group Stage Predictions</span>
              <span className="font-mono text-white">{groupPredictionsCount} / 72</span>
            </div>
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-white/5">
              <div
                className="bg-gradient-to-r from-cyan-500 to-emerald-500 h-full rounded-full transition-all duration-700"
                style={{ width: `${(groupPredictionsCount / 72) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Knockout predictions */}
          <div>
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              <span>Knockout Stage Predictions</span>
              <span className="font-mono text-white">{knockoutPredictionsCount} / 31</span>
            </div>
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-white/5">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-700"
                style={{ width: `${(knockoutPredictionsCount / 31) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Fan Hype Clicker */}
      {userNation && (
        <div className="glass-panel p-5 rounded-2xl border border-white/5 flex flex-col items-center text-center">
          <span className="text-[8px] font-extrabold uppercase tracking-widest text-slate-500 block self-start mb-2">
            Fan Hype Center
          </span>

          <div className="relative">
            <button
              onClick={fireConfetti}
              className="group w-24 h-24 rounded-full bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center justify-center shadow-lg transition-all active:scale-95 focus:outline-none relative overflow-hidden"
              style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.4)' }}
            >
              {/* Spinning backdrop glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-emerald-500/10 opacity-60 group-hover:rotate-180 transition-transform duration-1000"></div>
              
              <img
                src={getFlagUrl(userNation)}
                alt={userNation}
                className="w-14 h-9 object-cover rounded shadow-md group-hover:scale-110 transition-transform duration-300 relative z-10 border border-slate-950"
              />
            </button>
            <div className="absolute -bottom-1.5 -right-1.5 bg-red-600 text-white rounded-full p-1.5 shadow-md flex items-center justify-center border border-slate-950 animate-pulse">
              <Heart className="w-3.5 h-3.5 fill-current" />
            </div>
          </div>

          <h4 className="text-sm font-extrabold text-white mt-4 uppercase tracking-wider">
            {userNation} Hype Power
          </h4>
          <span className="text-[10px] font-bold text-cyan-400 tracking-wider">
            Lvl {hypeLevel} - {getHypeTitle(hypeLevel)}
          </span>

          {/* Progress bar */}
          <div className="w-full mt-3">
            <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-white/5 relative">
              <div
                className="bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${hypeProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[9px] font-bold uppercase tracking-wider text-slate-500 mt-1 px-1">
              <span>Hype Meter</span>
              <span>{hypeCount % maxHypeForLevel} / {maxHypeForLevel} XP</span>
            </div>
          </div>

          <button
            onClick={fireConfetti}
            className={`mt-4 w-full flex items-center justify-center space-x-1.5 py-2 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-white ${activeTheme.accentColor} transition-all shadow-md active:scale-95`}
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Spam Hype Boost!</span>
          </button>
        </div>
      )}

      {/* 3. Fan Mood Polls */}
      <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-5">
        <span className="text-[8px] font-extrabold uppercase tracking-widest text-slate-500 block mb-1">
          Fan Mood Polls
        </span>

        {Object.keys(polls).map((pollKey) => {
          const poll = polls[pollKey];
          const totalVotes = Object.values(poll.votes).reduce((a, b) => a + b, 0);

          return (
            <div key={pollKey} className="space-y-3 pb-4 border-b border-white/5 last:border-b-0 last:pb-0">
              <h4 className="text-xs font-bold text-slate-200 flex items-start space-x-1.5 leading-tight">
                <Vote className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                <span>{poll.question}</span>
              </h4>

              <div className="space-y-2">
                {Object.keys(poll.votes).map((opt) => {
                  const voteCount = poll.votes[opt];
                  const percent = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
                  const isUserVote = poll.userVote === opt;

                  return (
                    <button
                      key={opt}
                      disabled={poll.voted}
                      onClick={() => handleVote(pollKey, opt)}
                      className={`w-full text-left relative overflow-hidden rounded-xl border p-2.5 flex items-center justify-between text-xs font-bold transition-all ${
                        poll.voted
                          ? isUserVote
                            ? `${activeTheme.primaryColor.split(' ')[1]} border-cyan-500/50 text-white`
                            : 'border-slate-800 bg-slate-950/20 text-slate-500'
                          : 'border-slate-800 hover:border-slate-700 bg-slate-950/40 hover:bg-slate-900/60 text-slate-300 hover:text-white'
                      }`}
                    >
                      {/* Polling bar background animation */}
                      {poll.voted && (
                        <div
                          className="absolute inset-y-0 left-0 bg-slate-800/40 transition-all duration-1000 z-0"
                          style={{ width: `${percent}%` }}
                        ></div>
                      )}

                      <span className="relative z-10 flex items-center space-x-1.5">
                        <span>{opt}</span>
                        {isUserVote && (
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                        )}
                      </span>
                      <span className="relative z-10 font-mono text-slate-400">
                        {percent}%
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
