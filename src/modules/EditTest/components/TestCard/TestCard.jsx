import clsx from 'clsx';
import styles from './TestCard.module.css';

const TestCard = ({ active, className, children }) => {
  const wrapperClasses = clsx(styles.card, className);
  const activeClasses = clsx({ [styles.active]: active });

  return (
    <div
      role="presentation"
      className={wrapperClasses}
    >
      <div className={activeClasses} />

      {children}
    </div>
  );
};

export default TestCard;
