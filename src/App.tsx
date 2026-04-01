import { useState } from 'react';

import { useFetchUsers } from './hooks/useFetchUsers';

import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';
import { SearchBar } from './components/SearchBar/SearchBar';
import { ContactList } from './components/ContactList/ContactList';
import { Loader } from './components/Loader/Loader';
import { ErrorMessage } from './components/Error/ErrorMessage';

import { filterUsersByName } from './utils/userUtils';

import styles from "./App.module.css";

function App() {
  const { users, isLoading, error } = useFetchUsers();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = filterUsersByName(users, searchQuery);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <ThemeToggle />
      </header>

      <SearchBar onSearch={setSearchQuery} />

      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!isLoading && !error && (
        <ContactList users={filteredUsers} />
      )}
    </div>
  );
}
export default App;