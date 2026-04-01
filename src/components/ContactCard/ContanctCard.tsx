import { Star, House } from 'lucide-react';
import { getInitials, getHashColor } from '../../utils/userUtils';

import styles from './ContactCard.module.css';

import type { User } from '../../types/user';

interface ContactCardProps {
  user: User;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export const ContactCard = ({ user, isFavorite, onToggleFavorite }: ContactCardProps) => {
  const avatarColor = getHashColor(user.name);
  const initials = getInitials(user.name);

  return (
    <div className={styles.card}>
      <div 
        className={styles.avatar} 
        style={{ backgroundColor: avatarColor }}
      >
        {initials}
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{user.name}</h3>
        <p className={styles.email}>{user.email}</p>
        <p className={styles.city}><House size={16}/> {user.address}</p>
      </div>

      <button 
        className={styles.favoriteBtn} 
        onClick={() => onToggleFavorite(user.id)}
      >
        <Star 
          size={20} 
          className={isFavorite ? styles.activeStar : ''} 
        />
      </button>
    </div>
  );
};
