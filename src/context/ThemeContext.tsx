import React, { createContext, useContext, useState, useEffect } from 'react';

export type AppTheme = 'brown' | 'light';

interface ThemeContextType {
  theme: AppTheme;
  isLight: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'brown',
  isLight: false,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<AppTheme>(() => {
    try {
      const saved = localStorage.getItem('shrees_bakery_theme');
      return (saved === 'light' ? 'light' : 'brown') as AppTheme;
    } catch {
      return 'brown';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('shrees_bakery_theme', theme);
    } catch (e) {
      console.error(e);
    }

    if (theme === 'light') {
      document.documentElement.classList.add('theme-light');
      document.body.style.backgroundColor = '#faf5ee';
      document.body.style.color = '#261106';
    } else {
      document.documentElement.classList.remove('theme-light');
      document.body.style.backgroundColor = '#140703';
      document.body.style.color = '#fbf6ee';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'brown' ? 'light' : 'brown'));
  };

  return (
    <ThemeContext.Provider value={{ theme, isLight: theme === 'light', toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
