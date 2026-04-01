import { useEffect } from 'react';
import { SearchX } from 'lucide-react';

import { ContactCard } from '../ContactCard/ContanctCard';

import { useLocalStorage } from '../../hooks/useLocalStorage';
import { sortUsersByFavorites } from '../../utils/userUtils';

import { STORAGE_KEYS } from '../../constants/storage';

import styles from './ContactList.module.css';

import type { User } from '../../types/user';

interface ContactListProps {
  users: User[];
}

const fKey = STORAGE_KEYS.FAVORITES;

export const ContactList = ({ users }: ContactListProps) => {

  const [favorites, setFavorites] = useLocalStorage<number[]>(fKey, []);

  useEffect(() => {
    localStorage.setItem(fKey, JSON.stringify(favorites));
  }, [favorites]);

  const sortedUsers = sortUsersByFavorites(users, favorites);

  const handleToggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  if (users.length === 0) {
    return (
      <div className={styles.empty}>
        <SearchX size={48} strokeWidth={1} />
        <p>Ничего не найдено</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {sortedUsers.map((user, i) => {
        const isFav = favorites.includes(user.id);

        return (
          <div
            key={`${user.id}-${isFav}`}
            className={styles.cardWrapper}
            style={{ '--i': i } as React.CSSProperties}
          >
            <ContactCard
              user={user}
              isFavorite={isFav}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>
        )
      })}
    </div>
  );

};

