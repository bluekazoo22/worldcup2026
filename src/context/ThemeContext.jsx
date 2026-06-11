import React, { createContext, useContext, useState, useEffect } from 'react';
import { COUNTRIES } from '../data/tournamentData';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [userNation, setUserNation] = useState(() => {
    return localStorage.getItem("wc2026_user_nation") || null;
  });

  const getTheme = () => {
    if (!userNation) return COUNTRIES.Default;
    return COUNTRIES[userNation] || COUNTRIES.Default;
  };

  const activeTheme = getTheme();

  // Apply theme-specific CSS variables to document.documentElement when theme changes
  useEffect(() => {
    if (userNation) {
      localStorage.setItem("wc2026_user_nation", userNation);
    } else {
      localStorage.removeItem("wc2026_user_nation");
    }

    const theme = getTheme();
    if (theme && theme.themeVariables) {
      Object.keys(theme.themeVariables).forEach((varName) => {
        document.documentElement.style.setProperty(varName, theme.themeVariables[varName]);
      });
    } else {
      document.documentElement.style.removeProperty('--glow-color');
    }
  }, [userNation]);

  return (
    <ThemeContext.Provider value={{ userNation, setUserNation, activeTheme, allThemes: COUNTRIES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
