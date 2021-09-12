import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import MoonImage from './MoonImage';
import SunImage from './SunImage';

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // This is used so that first render matches server
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      <button
        className="theme-switcher"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {mounted ? theme === 'dark' ? <MoonImage /> : <SunImage /> : null}
      </button>
    </div>
  );
};

export default ThemeSwitch;
