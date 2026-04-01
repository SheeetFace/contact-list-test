import { useEffect, useState } from 'react';

import { useDebounce } from '../../hooks/useDebounce';

import { Search, X } from 'lucide-react';

import styles from './SearchBar.module.css';

interface SearchBarProps {
    onSearch: (value: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [value, setValue] = useState('');

    const debouncedSearchTerm = useDebounce(value, 300);

    useEffect(() => {
        onSearch(debouncedSearchTerm);
    }, [debouncedSearchTerm, onSearch]);

    const handleClear = () => setValue('');

    return (
        <div className={styles.wrapper}>
            <Search className={styles.iconSearch} size={18} />

            <input
                type="text"
                className={styles.input}
                placeholder="Поиск"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />

            {value && (
                <button
                    className={styles.clearButton}
                    onClick={handleClear}
                >
                    <X size={18} />
                </button>
            )}
        </div>
    );
};
