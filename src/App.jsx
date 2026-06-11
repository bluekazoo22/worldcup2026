import React, { useState, useEffect } from 'react';
import { useTheme } from './context/ThemeContext';
import { INITIAL_MATCHES, GROUPS } from './data/tournamentData';
import { calculateStandings, generateRoundOf32Matches } from './utils/predictorEngine';
import { savePredictions, loadPredictions, onAuthStateChange, signOutUser } from './firebase/config';

import Header from './components/Header';
import WelcomeModal from './components/WelcomeModal';
import GroupStandings from './components/GroupStandings';
import MatchPredictor from './components/MatchPredictor';
import KnockoutBracket from './components/KnockoutBracket';
import TeamAnalysis from './components/TeamAnalysis';
import RosterDrawer from './components/RosterDrawer';
import GamificationWidgets from './components/GamificationWidgets';
import AuthModal from './components/AuthModal';
import AdminDashboard from './components/AdminDashboard';

import { Activity, ShieldAlert, Award, Grid, GitBranch, Search, Star, Shield, AlertTriangle } from 'lucide-react';

export default function App() {
  const { userNation, setUserNation, activeTheme } = useTheme();

  // Core App State
  const [matches, setMatches] = useState(INITIAL_MATCHES);
  const [knockoutWinners, setKnockoutWinners] = useState({});
  const [hypeCount, setHypeCount] = useState(0);
  const [activeTab, setActiveTab] = useState("predict");
  const [selectedRosterTeam, setSelectedRosterTeam] = useState(null);

  // Authentication states
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem("wc2026_user_id") || "guest_" + Math.random().toString(36).substring(2, 9);
  });

  // Syncing states
  const [syncStatus, setSyncStatus] = useState("idle"); // idle, saving, saved, error
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

  // Elimination alert states
  const [silencedNation, setSilencedNation] = useState(null);
  const [showEliminationModal, setShowEliminationModal] = useState(false);

  // Setup guest ID if not present
  useEffect(() => {
    if (!localStorage.getItem("wc2026_user_id")) {
      localStorage.setItem("wc2026_user_id", userId);
    }
  }, [userId]);

  // Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (authUser) => {
      setIsInitialLoadComplete(false);
      if (authUser) {
        setUser(authUser);
        setUserId(authUser.uid);
        
        const savedData = await loadPredictions(authUser.uid);
        if (savedData) {
          if (savedData.userNation) setUserNation(savedData.userNation);
          if (savedData.matches) setMatches(savedData.matches);
          if (savedData.knockoutWinners) setKnockoutWinners(savedData.knockoutWinners);
          if (savedData.hypeCount) setHypeCount(savedData.hypeCount);
        } else {
          await savePredictions(authUser.uid, {
            userNation,
            matches,
            knockoutWinners,
            hypeCount
          });
        }
      } else {
        setUser(null);
        const guestId = localStorage.getItem("wc2026_user_id") || "guest_reverted";
        setUserId(guestId);

        const savedData = await loadPredictions(guestId);
        if (savedData) {
          if (savedData.userNation) setUserNation(savedData.userNation);
          if (savedData.matches) setMatches(savedData.matches);
          if (savedData.knockoutWinners) setKnockoutWinners(savedData.knockoutWinners);
          if (savedData.hypeCount) setHypeCount(savedData.hypeCount);
        }
      }
      setIsInitialLoadComplete(true);
    });

    return () => unsubscribe();
  }, [setUserNation]);

  // Debounced Auto-Save to Firestore or LocalStorage
  useEffect(() => {
    if (!isInitialLoadComplete || !userId) return;

    setSyncStatus("saving");

    const timer = setTimeout(async () => {
      try {
        const result = await savePredictions(userId, {
          userNation,
          matches,
          knockoutWinners,
          hypeCount
        });
        
        if (result.success) {
          setSyncStatus("saved");
          const idleTimer = setTimeout(() => setSyncStatus("idle"), 2500);
          return () => clearTimeout(idleTimer);
        } else {
          setSyncStatus("error");
        }
      } catch (err) {
        console.error("Auto-save error:", err);
        setSyncStatus("error");
      }
    }, 1500); // 1.5s delay before saving

    return () => clearTimeout(timer);
  }, [userId, userNation, matches, knockoutWinners, hypeCount, isInitialLoadComplete]);

  // Derived Calculations
  const { standings, qualifiers } = calculateStandings(matches);
  const r32Matches = generateRoundOf32Matches(qualifiers);
  const bestThirdNames = qualifiers.bestThird.map((t) => t.name);

  // Count predictions for stats
  const groupPredictionsCount = matches.filter(
    (m) => m.homeScore !== "" && m.awayScore !== "" && m.homeScore !== null && m.awayScore !== null
  ).length;

  const knockoutPredictionsCount = Object.keys(knockoutWinners).length;

  // Calculate Badge Tier
  let badgeRanking = "Armchair Critic";
  if (groupPredictionsCount > 0 && groupPredictionsCount < 36) {
    badgeRanking = "Pundit in Training";
  } else if (groupPredictionsCount >= 36 && groupPredictionsCount < 72) {
    badgeRanking = "Tactical Analyst";
  } else if (groupPredictionsCount === 72) {
    if (knockoutPredictionsCount < 31) {
      badgeRanking = "Tactical Genius";
    } else {
      badgeRanking = "Oracle of the Cup";
    }
  }

  // Cascading Knockout Reset Effect
  useEffect(() => {
    const cleanKnockoutWinners = () => {
      let cleaned = false;
      const newWinners = { ...knockoutWinners };

      r32Matches.forEach((m) => {
        const winner = newWinners[m.id];
        if (winner) {
          if (winner !== m.teamHome && winner !== m.teamAway) {
            delete newWinners[m.id];
            cleaned = true;
          }
        }
      });

      const getWinner = (mId) => newWinners[mId] || "";

      const r16 = [
        { id: "R16-1", t1: getWinner("R32-1"), t2: getWinner("R32-2") },
        { id: "R16-2", t1: getWinner("R32-3"), t2: getWinner("R32-4") },
        { id: "R16-3", t1: getWinner("R32-5"), t2: getWinner("R32-6") },
        { id: "R16-4", t1: getWinner("R32-7"), t2: getWinner("R32-8") },
        { id: "R16-5", t1: getWinner("R32-9"), t2: getWinner("R32-10") },
        { id: "R16-6", t1: getWinner("R32-11"), t2: getWinner("R32-12") },
        { id: "R16-7", t1: getWinner("R32-13"), t2: getWinner("R32-14") },
        { id: "R16-8", t1: getWinner("R32-15"), t2: getWinner("R32-16") },
      ];

      r16.forEach((m) => {
        const winner = newWinners[m.id];
        if (winner) {
          if (winner !== m.t1 && winner !== m.t2) {
            delete newWinners[m.id];
            cleaned = true;
          }
        }
      });

      const qf = [
        { id: "QF-1", t1: getWinner("R16-1"), t2: getWinner("R16-2") },
        { id: "QF-2", t1: getWinner("R16-3"), t2: getWinner("R16-4") },
        { id: "QF-3", t1: getWinner("R16-5"), t2: getWinner("R16-6") },
        { id: "QF-4", t1: getWinner("R16-7"), t2: getWinner("R16-8") },
      ];

      qf.forEach((m) => {
        const winner = newWinners[m.id];
        if (winner) {
          if (winner !== m.t1 && winner !== m.t2) {
            delete newWinners[m.id];
            cleaned = true;
          }
        }
      });

      const sf = [
        { id: "SF-1", t1: getWinner("QF-1"), t2: getWinner("QF-2") },
        { id: "SF-2", t1: getWinner("QF-3"), t2: getWinner("QF-4") },
      ];

      sf.forEach((m) => {
        const winner = newWinners[m.id];
        if (winner) {
          if (winner !== m.t1 && winner !== m.t2) {
            delete newWinners[m.id];
            cleaned = true;
          }
        }
      });

      const finalT1 = getWinner("SF-1");
      const finalT2 = getWinner("SF-2");
      const finalWinner = newWinners["FINAL"];
      if (finalWinner) {
        if (finalWinner !== finalT1 && finalWinner !== finalT2) {
          delete newWinners["FINAL"];
          cleaned = true;
        }
      }

      if (cleaned) {
        setKnockoutWinners(newWinners);
      }
    };

    cleanKnockoutWinners();
  }, [matches, knockoutWinners]);

  // Dynamic Allegiance Elimination Evaluation
  useEffect(() => {
    if (!userNation || silencedNation === userNation) {
      setShowEliminationModal(false);
      return;
    }

    let teamGroupKey = null;
    Object.keys(GROUPS).forEach(key => {
      if (GROUPS[key].teams.includes(userNation)) {
        teamGroupKey = key;
      }
    });

    if (!teamGroupKey) return;

    const groupMatches = matches.filter(m => m.group === teamGroupKey);
    const groupCompleted = groupMatches.every(
      m => m.homeScore !== "" && m.awayScore !== "" && m.homeScore !== null && m.awayScore !== null
    );

    if (groupCompleted) {
      const groupStandings = standings[teamGroupKey];
      const teamStandingIdx = groupStandings.findIndex(t => t.name === userNation);

      if (teamStandingIdx === 3 || (teamStandingIdx === 2 && !bestThirdNames.includes(userNation))) {
        setShowEliminationModal(true);
        return;
      }

      const r32Match = r32Matches.find(m => m.teamHome === userNation || m.teamAway === userNation);
      if (r32Match) {
        const w32 = knockoutWinners[r32Match.id];
        if (w32 && w32 !== userNation) {
          setShowEliminationModal(true);
          return;
        }

        if (w32 === userNation) {
          const r16MatchId = "R16-" + Math.ceil(parseInt(r32Match.id.replace("R32-", ""), 10) / 2);
          const w16 = knockoutWinners[r16MatchId];
          if (w16 && w16 !== userNation) {
            setShowEliminationModal(true);
            return;
          }

          if (w16 === userNation) {
            const qfMatchId = "QF-" + Math.ceil(parseInt(r16MatchId.replace("R16-", ""), 10) / 2);
            const wqf = knockoutWinners[qfMatchId];
            if (wqf && wqf !== userNation) {
              setShowEliminationModal(true);
              return;
            }

            if (wqf === userNation) {
              const sfMatchId = "SF-" + Math.ceil(parseInt(qfMatchId.replace("QF-", ""), 10) / 2);
              const wsf = knockoutWinners[sfMatchId];
              if (wsf && wsf !== userNation) {
                setShowEliminationModal(true);
                return;
              }

              if (wsf === userNation) {
                const wfinal = knockoutWinners["FINAL"];
                if (wfinal && wfinal !== userNation) {
                  setShowEliminationModal(true);
                  return;
                }
              }
            }
          }
        }
      }
    }

    setShowEliminationModal(false);
  }, [matches, knockoutWinners, userNation, silencedNation, standings, bestThirdNames, r32Matches]);

  useEffect(() => {
    setSilencedNation(null);
  }, [userNation]);

  // State Updates
  const handleUpdateMatchScore = (matchId, homeScore, awayScore) => {
    setMatches((prevMatches) =>
      prevMatches.map((m) =>
        m.id === matchId
          ? {
              ...m,
              homeScore: homeScore,
              awayScore: awayScore,
              predicted: homeScore !== "" && awayScore !== ""
            }
          : m
      )
    );
  };

  const handleSelectKnockoutWinner = (matchId, winnerTeam) => {
    setKnockoutWinners((prev) => ({
      ...prev,
      [matchId]: winnerTeam
    }));
  };

  const handleSignOut = async () => {
    await signOutUser();
    setMatches(INITIAL_MATCHES);
    setKnockoutWinners({});
    setHypeCount(0);
    setActiveTab("predict");
  };

  // Compile Workspace tabs
  const tabs = [
    { id: "predict", label: "My Match Predictor", icon: Star },
    { id: "hub", label: "Live Tournament Hub", icon: Grid },
    { id: "bracket", label: "Knockout Tree", icon: GitBranch },
    { id: "analysis", label: "Team Analysis Panels", icon: Search }
  ];

  const isAdmin = user && user.email === "mrnoahchen@gmail.com";
  if (isAdmin) {
    tabs.push({ id: "admin", label: "Admin Panel", icon: Shield });
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b ${activeTheme.dynamicGradient} text-slate-100 flex flex-col transition-all duration-1000`}>
      
      {/* Welcome Intercept Modal (Opens only when logged in and allegiance is null) */}
      {user && <WelcomeModal />}

      {/* Cloud Authentication modal - FORCED until signed in */}
      <AuthModal
        isOpen={!user || isAuthModalOpen}
        closable={!!user}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={(u) => {
          setUser(u);
          setUserId(u.uid);
        }}
      />

      {/* Team Elimination Check Overlay Alert */}
      {showEliminationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="w-full max-w-md glass-panel p-6 rounded-2xl border border-red-500/20 shadow-2xl text-center space-y-4 animate-slide-up">
            <div className="inline-flex p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-full animate-pulse">
              <AlertTriangle className="w-6 h-6" />
            </div>
            
            <h3 className="text-lg font-black text-white uppercase tracking-wider">
              Allegiance Compromised!
            </h3>
            
            <p className="text-slate-300 text-xs leading-relaxed">
              In your predictions, <strong>{userNation}</strong> has been knocked out! Do you wish to switch allegiance to another nation, or do you stand with them till the end?
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  setSilencedNation(userNation);
                  setShowEliminationModal(false);
                }}
                className="py-2.5 px-4 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-all active:scale-95"
              >
                Keep Faith ✊
              </button>
              
              <button
                onClick={() => {
                  setUserNation(null);
                  setShowEliminationModal(false);
                }}
                className="py-2.5 px-4 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all active:scale-95 shadow-lg shadow-red-600/10"
              >
                Switch Allegiance
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Header */}
      <Header
        badgeRanking={badgeRanking}
        user={user}
        onOpenLoginModal={() => setIsAuthModalOpen(true)}
        onSignOut={handleSignOut}
      />

      {/* Main Workspace Layout */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left main workspace */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Tab buttons switcher */}
          <div className="flex bg-slate-900/40 p-1 border border-white/5 rounded-2xl overflow-x-auto gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? `${activeTheme.accentColor} text-white shadow-lg`
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
                  }`}
                >
                  <Icon className="w-4.5 h-4.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab contents */}
          <div className="animate-fade-in">
            {activeTab === "predict" && (
              <MatchPredictor
                matches={matches}
                onUpdateMatchScore={handleUpdateMatchScore}
                onFlagClick={setSelectedRosterTeam}
              />
            )}
            {activeTab === "hub" && (
              <GroupStandings
                standings={standings}
                bestThirdNames={bestThirdNames}
                onFlagClick={setSelectedRosterTeam}
              />
            )}
            {activeTab === "bracket" && (
              <KnockoutBracket
                r32Matches={r32Matches}
                knockoutWinners={knockoutWinners}
                onSelectKnockoutWinner={handleSelectKnockoutWinner}
                onFlagClick={setSelectedRosterTeam}
              />
            )}
            {activeTab === "analysis" && (
              <TeamAnalysis onFlagClick={setSelectedRosterTeam} />
            )}
            {activeTab === "admin" && isAdmin && (
              <AdminDashboard userEmail={user.email} />
            )}
          </div>
        </div>

        {/* Right dashboard side widgets (Gamification panel) */}
        <div className="space-y-6">
          <GamificationWidgets
            groupPredictionsCount={groupPredictionsCount}
            knockoutPredictionsCount={knockoutPredictionsCount}
            badgeRanking={badgeRanking}
            hypeCount={hypeCount}
            onIncrementHype={() => setHypeCount((prev) => prev + 1)}
            isGuest={!user}
            syncStatus={syncStatus}
          />
        </div>
      </main>

      {/* Roster Modal Sliding Side-Drawer */}
      {selectedRosterTeam && (
        <RosterDrawer
          countryName={selectedRosterTeam}
          onClose={() => setSelectedRosterTeam(null)}
        />
      )}
    </div>
  );
}
