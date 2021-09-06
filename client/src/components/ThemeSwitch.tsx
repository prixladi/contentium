import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [local, setLocal] = useState(false);

  // This is used so that forst render matches server
  useEffect(() => {
    setLocal(true);
  }, []);

  return (
    <div>
      <button className="theme-switcher" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {local && theme === 'dark' ? '🌙' : '☀️'}
      </button>
    </div>
  );
};

export default ThemeSwitch;
