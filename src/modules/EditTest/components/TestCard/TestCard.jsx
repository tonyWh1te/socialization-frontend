import clsx from 'clsx';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import styles from './TestCard.module.css';

const TestCard = ({ active, className, children, onClick }) => {
  const cardClasses = clsx(styles.card, className);
  const activeClasses = clsx({ [styles.active]: active });

  return (
    <div className={styles.wrapper}>
      <div
        role="presentation"
        className={cardClasses}
      >
        <div className={activeClasses} />
        {children}
      </div>
      {active && (
        <button
          type="button"
          className={styles.addButton}
          aria-label="Добавить вопрос"
          onClick={onClick}
        >
          <PlusCircleIcon className={`icon h-8 w-8 ${styles.icon}`} />
        </button>
      )}
    </div>
  );
};

export default TestCard;
