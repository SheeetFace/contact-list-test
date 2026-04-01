import { Loader2 } from 'lucide-react';

import styles from './Loader.module.css';

export const Loader = () => (
  <div className={styles.wrapper}>
    <Loader2 className={styles.spinner} size={40} />
    <p>Загрузка контактов...</p>
  </div>
);
