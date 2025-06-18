import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-lg bg-tertiary hover:bg-tertiary/80 transition-all duration-200 group"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400 group-hover:rotate-12 transition-transform duration-200" />
      ) : (
        <Moon className="w-5 h-5 text-blue-400 group-hover:-rotate-12 transition-transform duration-200" />
      )}
    </button>
  );
};

export default ThemeToggle;