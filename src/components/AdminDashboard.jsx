import React, { useState, useEffect } from 'react';
import { fetchAdminStats } from '../firebase/config';
import { ShieldAlert, Database, Users, TrendingUp, Cpu, RefreshCw, BarChart2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function AdminDashboard({ userEmail }) {
  const { activeTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    isLiveCloud: false,
    totalPredictions: 0,
    documents: []
  });

  const isAdmin = userEmail === "mrnoahchen@gmail.com";

  const loadStats = async () => {
    setLoading(true);
    const data = await fetchAdminStats();
    setStats(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) {
      loadStats();
    }
  }, [userEmail]);

  if (!isAdmin) {
    return (
      <div className="glass-panel p-8 rounded-2xl border border-red-500/20 text-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-red-500 mx-auto animate-bounce" />
        <h3 className="text-lg font-black text-white uppercase tracking-wider">Access Restricted</h3>
        <p className="text-slate-400 text-xs max-w-sm mx-auto">
          The Admin Control Center is restricted to the administrator email <strong>mrnoahchen@gmail.com</strong>.
        </p>
      </div>
    );
  }

  // Aggregate Allegiance distributions
  const allegianceCounts = {};
  let totalHypeClicks = 0;
  stats.documents.forEach((doc) => {
    const nation = doc.userNation || "Not Selected";
    allegianceCounts[nation] = (allegianceCounts[nation] || 0) + 1;
    totalHypeClicks += doc.hypeCount || 0;
  });

  const allegianceArray = Object.keys(allegianceCounts).map((nation) => ({
    name: nation,
    count: allegianceCounts[nation],
    percent: Math.round((allegianceCounts[nation] / (stats.documents.length || 1)) * 100)
  })).sort((a, b) => b.count - a.count);

  const avgHype = stats.documents.length > 0 ? Math.round(totalHypeClicks / stats.documents.length) : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Panel */}
      <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-white uppercase tracking-wider">Admin Control Panel</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Restricted workspace for account <strong>{userEmail}</strong>
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <span className={`text-[10px] font-bold px-3 py-1.5 rounded-xl border flex items-center space-x-1.5 ${
            stats.isLiveCloud 
              ? 'bg-emerald-500/15 border-emerald-500/25 text-emerald-400' 
              : 'bg-amber-500/15 border-amber-500/25 text-amber-400'
          }`}>
            <Database className="w-3.5 h-3.5" />
            <span>{stats.isLiveCloud ? "Live Firestore Connected" : "Local Mock Datastore"}</span>
          </span>
          <button
            onClick={loadStats}
            disabled={loading}
            className="p-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-all disabled:opacity-50"
            title="Reload metrics"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 glass-panel border border-white/5 rounded-2xl flex flex-col items-center justify-center space-y-3">
          <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Compiling database analytics...</span>
        </div>
      ) : (
        <>
          {/* Metrics grids */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-panel p-5 rounded-2xl border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500">Total Synced Profiles</span>
                <span className="text-3xl font-black text-white block mt-1 font-mono">{stats.totalPredictions}</span>
              </div>
              <Users className="w-8 h-8 text-cyan-500 opacity-60" />
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500">Average Hype Clicks</span>
                <span className="text-3xl font-black text-white block mt-1 font-mono">{avgHype}</span>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-500 opacity-60" />
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500">Total Hype Boosts</span>
                <span className="text-3xl font-black text-white block mt-1 font-mono">{totalHypeClicks}</span>
              </div>
              <BarChart2 className="w-8 h-8 text-amber-500 opacity-60" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Country Allegiances Breakdown SVG Chart */}
            <div className="glass-panel p-5 rounded-2xl border border-white/5">
              <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4 flex items-center space-x-2">
                <BarChart2 className="w-4 h-4 text-cyan-500" />
                <span>Allegiances Distribution</span>
              </h4>

              <div className="space-y-3">
                {allegianceArray.length === 0 ? (
                  <p className="text-slate-500 text-xs py-4 text-center">No user data available.</p>
                ) : (
                  allegianceArray.map((row) => (
                    <div key={row.name} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-400">
                        <span>{row.name}</span>
                        <span className="font-mono text-slate-200">{row.count} ({row.percent}%)</span>
                      </div>
                      
                      {/* Stylized Progress/Bar */}
                      <div className="w-full bg-slate-950 h-3.5 rounded-lg overflow-hidden border border-white/5 relative">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-emerald-500 h-full rounded transition-all duration-1000"
                          style={{ width: `${row.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Active User Table list */}
            <div className="glass-panel p-5 rounded-2xl border border-white/5">
              <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4 flex items-center space-x-2">
                <Users className="w-4 h-4 text-emerald-500" />
                <span>Active Database Records</span>
              </h4>

              <div className="max-h-60 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                {stats.documents.map((docItem) => (
                  <div 
                    key={docItem.id}
                    className="flex justify-between items-center p-2.5 rounded-xl bg-slate-950/40 border border-white/5 text-xs"
                  >
                    <div className="truncate max-w-[150px]">
                      <span className="font-mono text-slate-300 block truncate">{docItem.id}</span>
                      <span className="text-[10px] text-slate-500 block">
                        Allegiance: <strong className="text-slate-400">{docItem.userNation || "Guest"}</strong>
                      </span>
                    </div>
                    
                    <div className="text-right">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">Hype level</span>
                      <span className="font-mono font-bold text-amber-500">{docItem.hypeCount || 0} XP</span>
                    </div>
                  </div>
                ))}

                {stats.documents.length === 0 && (
                  <p className="text-slate-500 text-xs py-8 text-center">No documents in synced collections.</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
