import { useState, useEffect } from 'react';

import { Moon, Sun } from 'lucide-react';

import styles from './ThemeToggle.module.css';

type Theme = 'dark' | 'light'

export const ThemeToggle = () => {
    const [theme, setTheme] = useState<Theme>('dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

    return (
        <button onClick={toggleTheme} className={styles.button}>
            <div key={theme}
                className={`${styles.iconWrapper} ${styles.toggleEnter}`}>

                {theme === 'dark' ?
                    <Moon size={18} className={styles.iconMoon} />
                    :
                    <Sun size={18} className={styles.iconSun} />
                }
            </div>
        </button>
    );
};
