import { useTheme } from 'next-themes';

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <button className="theme-switcher" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {theme === 'dark' ? '🌙' : '☀️'}
      </button>
    </div>
  );
};

export default ThemeSwitch;
