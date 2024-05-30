import { nanoid } from '@reduxjs/toolkit';
import { Field } from 'formik';
import { Square2StackIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { onFieldArrayControl } from '../../utils/form.helper';
import styles from './QuestionFooter.module.css';

const QuestionFooter = ({ qIndex, question, arrayHelpers, onShowPoints }) => {
  const { remove, insert } = arrayHelpers;

  return (
    <div className={styles.bottom}>
      <div className={styles.left}>
        {question.type !== 'text' && (
          <button
            type="button"
            className={styles.pointButton}
            onClick={onShowPoints}
          >
            Установить баллы
            <PencilSquareIcon className={`icon ${styles.icon}`} />
          </button>
        )}
      </div>
      <div className={styles.right}>
        <button
          type="button"
          aria-label="Копировать вопрос"
          onClick={onFieldArrayControl(insert, qIndex + 1, {
            ...question,
            id: nanoid(),
            open: false,
          })}
        >
          <Square2StackIcon className={`icon ${styles.icon}`} />
        </button>
        <button
          type="button"
          aria-label="Удалить вопрос"
          onClick={onFieldArrayControl(remove, qIndex)}
        >
          <TrashIcon className={`icon ${styles.icon}`} />
        </button>

        <div className={styles.required}>
          <label
            className={styles.switchLabel}
            htmlFor={`questions[${qIndex}].required`}
          >
            Обязательный вопрос
            <Field
              className={styles.switch}
              type="checkbox"
              name={`questions[${qIndex}].required`}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default QuestionFooter;
