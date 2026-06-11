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

import { Activity, ShieldAlert, Award, Grid, GitBranch, Search, Star, Shield } from 'lucide-react';

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
  const [syncing, setSyncing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Setup guest ID if not present
  useEffect(() => {
    if (!localStorage.getItem("wc2026_user_id")) {
      localStorage.setItem("wc2026_user_id", userId);
    }
  }, [userId]);

  // Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (authUser) => {
      if (authUser) {
        setUser(authUser);
        setUserId(authUser.uid);
        
        // Fetch saved predictions for authenticated user
        const savedData = await loadPredictions(authUser.uid);
        if (savedData) {
          if (savedData.userNation) setUserNation(savedData.userNation);
          if (savedData.matches) setMatches(savedData.matches);
          if (savedData.knockoutWinners) setKnockoutWinners(savedData.knockoutWinners);
          if (savedData.hypeCount) setHypeCount(savedData.hypeCount);
        } else {
          // If no predictions exist in the cloud yet, push current local guest predictions to new account!
          await savePredictions(authUser.uid, {
            userNation,
            matches,
            knockoutWinners,
            hypeCount
          });
        }
      } else {
        setUser(null);
        // Revert to localStorage guest ID
        const guestId = localStorage.getItem("wc2026_user_id") || "guest_reverted";
        setUserId(guestId);

        // Load guest predictions
        const savedData = await loadPredictions(guestId);
        if (savedData) {
          if (savedData.userNation) setUserNation(savedData.userNation);
          if (savedData.matches) setMatches(savedData.matches);
          if (savedData.knockoutWinners) setKnockoutWinners(savedData.knockoutWinners);
          if (savedData.hypeCount) setHypeCount(savedData.hypeCount);
        }
      }
    });

    return () => unsubscribe();
  }, [setUserNation]);

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

      // 1. Validate Round of 32 Winners
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

      // 2. Validate Round of 16 Matchups
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

      // 3. Validate Quarterfinal Matchups
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

      // 4. Validate Semifinal Matchups
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

      // 5. Validate Final Matchup
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

  const handleSyncCloud = async () => {
    setSyncing(true);
    const result = await savePredictions(userId, {
      userNation,
      matches,
      knockoutWinners,
      hypeCount
    });
    setSyncing(false);
    if (result.success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleSignOut = async () => {
    await signOutUser();
    // Clear prediction states
    setMatches(INITIAL_MATCHES);
    setKnockoutWinners({});
    setHypeCount(0);
    setActiveTab("predict");
  };

  // Compile Workspace tabs (Conditionally include Admin tab if user is mrnoahchen@gmail.com)
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
      {/* Welcome Intercept Modal */}
      <WelcomeModal />

      {/* Cloud Authentication modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={(u) => {
          setUser(u);
          setUserId(u.uid);
        }}
      />

      {/* Sticky Header */}
      <Header
        badgeRanking={badgeRanking}
        user={user}
        onOpenLoginModal={() => setIsAuthModalOpen(true)}
        onSignOut={handleSignOut}
      />

      {/* Floating Save success popup */}
      {saveSuccess && (
        <div className="fixed bottom-5 right-5 z-50 bg-emerald-500/90 border border-emerald-400 text-white font-bold text-xs py-3 px-5 rounded-2xl shadow-xl backdrop-blur-md animate-slide-up flex items-center space-x-2">
          <span className="text-sm">⚡</span>
          <span>Predictions synced successfully to cloud database!</span>
        </div>
      )}

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
            onSyncCloud={handleSyncCloud}
            syncing={syncing}
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
