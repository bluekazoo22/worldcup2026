import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "wc2026-62e45",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const isFirebaseConfigured = !!(firebaseConfig.apiKey && firebaseConfig.projectId);

let app;
let db;
let auth;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    auth = getAuth(app);
    console.log("Firebase & Auth initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize Firebase:", error);
  }
} else {
  console.warn("Firebase credentials not detected. Running Auth and Firestore in Mock Offline Mode.");
}

// ----------------------------------------------------
// Mock Auth session simulator for local development
// ----------------------------------------------------
const mockAuthListeners = new Set();
let mockCurrentUser = (() => {
  const saved = localStorage.getItem("wc2026_mock_user");
  return saved ? JSON.parse(saved) : null;
})();

const triggerMockAuthStateChange = (user) => {
  mockAuthListeners.forEach((callback) => callback(user));
};

// ----------------------------------------------------
// Public Authentication Methods
// ----------------------------------------------------

// Sign in with email and password
export const signInWithEmail = async (email, password) => {
  if (auth) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  }
  
  // Mock fallback
  await new Promise((resolve) => setTimeout(resolve, 800));
  const user = { uid: "mock_uid_" + email.replace(/[^a-zA-Z0-9]/g, ""), email };
  mockCurrentUser = user;
  localStorage.setItem("wc2026_mock_user", JSON.stringify(user));
  triggerMockAuthStateChange(user);
  return user;
};

// Sign up with email and password
export const signUpWithEmail = async (email, password) => {
  if (auth) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    return cred.user;
  }

  // Mock fallback
  await new Promise((resolve) => setTimeout(resolve, 800));
  const user = { uid: "mock_uid_" + email.replace(/[^a-zA-Z0-9]/g, ""), email };
  mockCurrentUser = user;
  localStorage.setItem("wc2026_mock_user", JSON.stringify(user));
  triggerMockAuthStateChange(user);
  return user;
};

// Sign in with Google Popup
export const signInWithGoogle = async () => {
  if (auth) {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    return cred.user;
  }

  // Mock fallback
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const user = { uid: "mock_google_user", email: "mrnoahchen@gmail.com" }; // Quick default to mrnoahchen for admin testing!
  mockCurrentUser = user;
  localStorage.setItem("wc2026_mock_user", JSON.stringify(user));
  triggerMockAuthStateChange(user);
  return user;
};

// Sign out
export const signOutUser = async () => {
  if (auth) {
    await signOut(auth);
    return;
  }

  // Mock fallback
  await new Promise((resolve) => setTimeout(resolve, 400));
  mockCurrentUser = null;
  localStorage.removeItem("wc2026_mock_user");
  triggerMockAuthStateChange(null);
};

// Listen to auth state changes
export const onAuthStateChange = (callback) => {
  if (auth) {
    return onAuthStateChanged(auth, callback);
  }

  // Mock fallback
  mockAuthListeners.add(callback);
  // Trigger initial callback immediately
  callback(mockCurrentUser);
  
  // Return unsubscribe function
  return () => {
    mockAuthListeners.delete(callback);
  };
};

// ----------------------------------------------------
// Public Firestore Methods (Scoped to user account)
// ----------------------------------------------------

// Save user predictions
export const savePredictions = async (userId, data) => {
  if (db) {
    try {
      const userDocRef = doc(db, "predictions", userId);
      await setDoc(userDocRef, {
        ...data,
        updatedAt: new Date().toISOString()
      });
      return { success: true, cloud: true };
    } catch (e) {
      console.error("Error saving to Firestore:", e);
    }
  }

  // Fallback to local storage
  localStorage.setItem(`wc2026_pred_${userId}`, JSON.stringify(data));
  await new Promise(resolve => setTimeout(resolve, 600));
  return { success: true, cloud: false };
};

// Load user predictions
export const loadPredictions = async (userId) => {
  if (db) {
    try {
      const userDocRef = doc(db, "predictions", userId);
      const snap = await getDoc(userDocRef);
      if (snap.exists()) {
        return snap.data();
      }
    } catch (e) {
      console.error("Error loading from Firestore:", e);
    }
  }

  // Fallback to local storage
  const local = localStorage.getItem(`wc2026_pred_${userId}`);
  await new Promise(resolve => setTimeout(resolve, 500));
  return local ? JSON.parse(local) : null;
};

// Admin metrics fetcher (fetch list of predictions or simulated aggregation)
export const fetchAdminStats = async () => {
  if (db) {
    try {
      // Pull all documents in the predictions collection
      const predCol = collection(db, "predictions");
      const snap = await getDocs(predCol);
      const docsData = [];
      snap.forEach(doc => {
        docsData.push({ id: doc.id, ...doc.data() });
      });
      return {
        isLiveCloud: true,
        totalPredictions: docsData.length,
        documents: docsData
      };
    } catch (e) {
      console.error("Failed to fetch live admin stats, using simulated:", e);
    }
  }

  // Simulated admin database analytics for testing
  await new Promise(resolve => setTimeout(resolve, 800));
  return {
    isLiveCloud: false,
    totalPredictions: 47,
    documents: [
      { id: "mock_user_1", userNation: "USA", hypeCount: 142 },
      { id: "mock_user_2", userNation: "Japan", hypeCount: 89 },
      { id: "mock_user_3", userNation: "Brazil", hypeCount: 201 },
      { id: "mock_user_4", userNation: "Argentina", hypeCount: 312 },
      { id: "mock_user_5", userNation: "Mexico", hypeCount: 110 }
    ]
  };
};
