import React, { useState } from 'react';
import { signInWithEmail, signUpWithEmail, signInWithGoogle } from '../firebase/config';
import { Mail, Lock, X, LogIn, UserPlus, ShieldAlert, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [activeTab, setActiveTab] = useState("signin"); // signin or signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simple validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      let user;
      if (activeTab === "signin") {
        user = await signInWithEmail(email, password);
      } else {
        user = await signUpWithEmail(email, password);
      }
      
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });

      onAuthSuccess(user);
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.message || "Authentication failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const user = await signInWithGoogle();
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.7 }
      });
      onAuthSuccess(user);
      onClose();
    } catch (err) {
      console.error(err);
      setError("Google Authentication cancelled or failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="w-full max-w-md glass-panel p-6 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden animate-slide-up">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-950/40 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Branding header */}
        <div className="text-center mb-6">
          <div className="inline-flex p-2.5 bg-gradient-to-tr from-cyan-500 to-emerald-500 rounded-xl mb-3 shadow-lg shadow-cyan-500/10">
            <Award className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-black text-white uppercase tracking-wider leading-none">
            Fan Predictor Cloud
          </h3>
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-cyan-400 mt-1 block">
            Sync your tournament tree to your profile
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 bg-slate-950/60 p-1 border border-slate-800 rounded-xl mb-5">
          <button
            onClick={() => { setActiveTab("signin"); setError(""); }}
            className={`flex items-center justify-center space-x-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "signin"
                ? "bg-slate-900 border border-slate-800 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
          <button
            onClick={() => { setActiveTab("signup"); setError(""); }}
            className={`flex items-center justify-center space-x-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "signup"
                ? "bg-slate-900 border border-slate-800 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Sign Up</span>
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start space-x-2 text-xs text-red-400">
            <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500 block px-1">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                required
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 pl-10 pr-4 py-2 rounded-xl text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-semibold"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500 block px-1">
              Password (min. 6 chars)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 pl-10 pr-4 py-2 rounded-xl text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-semibold"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 border border-transparent rounded-xl text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-cyan-500/10 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? "Authenticating..." : activeTab === "signin" ? "Enter the Hub" : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-4 items-center">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-3 text-[8px] font-bold uppercase tracking-widest text-slate-600">
            or continue with
          </span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        {/* Google sign-in button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-bold text-slate-300 hover:text-white flex items-center justify-center space-x-2 transition-all active:scale-95 disabled:opacity-50"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Google Account</span>
        </button>
      </div>
    </div>
  );
}
