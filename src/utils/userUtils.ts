import type { User } from '../types/user';

export const getInitials = (name: string) => {
  const [firstName, lastName] = name.split(' ');
  return (lastName ? firstName[0] + lastName[0] : firstName[0]).toUpperCase();
};

export const getHashColor = (name: string) => {
  const sum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = sum % 360;

  return `hsl(${hue}, 80%, 30%)`;
};

export const sortUsersByFavorites = (users: User[], favorites: number[]): User[] => {
  return [...users].sort((a, b) => {
    const aFav = favorites.includes(a.id);
    const bFav = favorites.includes(b.id);

    if (aFav === bFav) return 0;
    return aFav ? -1 : 1;
  })
};

export const filterUsersByName = (users: User[], query: string): User[] => {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return users;

  return users.filter((user) => user.name.toLowerCase().includes(lowerQuery));
};