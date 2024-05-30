import clsx from 'clsx';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import AddQuestionButton from '../AddQuestionButton/AddQuestionButton';
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
        <AddQuestionButton
          className={styles.addButton}
          onClick={onClick}
        >
          <PlusCircleIcon className="icon h-8 w-8 stroke-gray-500" />
        </AddQuestionButton>
      )}
    </div>
  );
};

export default TestCard;
