import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import MoonImage from './MoonImage';
import SunImage from './SunImage';

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [local, setLocal] = useState(false);

  // This is used so that first render matches server
  useEffect(() => {
    setLocal(true);
  }, []);

  return (
    <div>
      <button
        className="theme-switcher"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {local && theme === 'dark' ? <MoonImage /> : <SunImage />}
      </button>
    </div>
  );
};

export default ThemeSwitch;
