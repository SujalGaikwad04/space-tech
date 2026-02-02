import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {isDarkMode ? (
                <span className="theme-icon">☀️</span>
            ) : (
                <span className="theme-icon">🌙</span>
            )}
        </button>
    );
};

export default ThemeToggle;
