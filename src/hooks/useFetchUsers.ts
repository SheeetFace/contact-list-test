import { useState, useEffect } from 'react';

import type { User, ApiUser } from '../types/user';

const url = "https://jsonplaceholder.typicode.com/users"

export const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Ошибка получения данных');
        const data = await response.json();

        const transformedData: User[] = data.map((user: ApiUser) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          address: user.address.city
        }));
        
        setUsers(transformedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return { users, isLoading, error };
};
