import React, { useEffect } from 'react';
import { useSettings } from '../hooks/useIndexedDB';

const ThemeToggle: React.FC = () => {
  const { theme, updateTheme } = useSettings();

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
    } else {
      // defaultTheme as System preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const defaultTheme = prefersDark ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', defaultTheme);
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    updateTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };
  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;
