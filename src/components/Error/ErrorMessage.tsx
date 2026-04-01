import { AlertCircle } from 'lucide-react';

import styles from './ErrorMessage.module.css';

export const ErrorMessage = ({ message }: { message: string }) => (
  <div className={styles.container}>
    <AlertCircle size={24} />
    <span>{message}</span>
  </div>
);
