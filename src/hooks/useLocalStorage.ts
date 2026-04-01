import { useState, useEffect } from 'react';

import type { StorageKey } from '../types/stotage';

export function useLocalStorage<T>(key: StorageKey, initialValue: T) {

  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
