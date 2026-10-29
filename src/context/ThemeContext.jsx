import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
  theme: 'dark',
  isBright: false,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const savedTheme = window.localStorage.getItem('portfolio-theme');
        if (savedTheme === 'light' || savedTheme === 'dark') {
          return savedTheme;
        }
      }
    } catch {
      // Safe fallback for restricted environments
    }
    return 'dark';
  });

  const isBright = theme === 'light';

  useEffect(() => {
    try {
      if (typeof document !== 'undefined') {
        const root = document.documentElement;
        const body = document.body;

        if (theme === 'light') {
          root.classList.add('light');
          root.classList.remove('dark');
          body.classList.add('light');
          body.classList.remove('dark');
          root.style.colorScheme = 'light';
        } else {
          root.classList.add('dark');
          root.classList.remove('light');
          body.classList.add('dark');
          body.classList.remove('light');
          root.style.colorScheme = 'dark';
        }
      }

      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('portfolio-theme', theme);
      }
    } catch {
      // Safe fallback
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, isBright, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
