import { nanoid } from '@reduxjs/toolkit';
import { Field } from 'formik';
import { Square2StackIcon, TrashIcon } from '@heroicons/react/24/solid';
import { onFieldArrayControl } from '../../utils/form.helper';
import styles from './QuestionFooter.module.css';

const QuestionFooter = ({ qIndex, question, arrayHelpers }) => {
  const { remove, insert } = arrayHelpers;

  return (
    <div className={styles.bottom}>
      <Square2StackIcon
        onClick={onFieldArrayControl(insert, qIndex + 1, {
          ...question,
          id: nanoid(),
          open: false,
        })}
        className={`icon ${styles.icon}`}
      />
      <TrashIcon
        className={`icon ${styles.icon}`}
        onClick={onFieldArrayControl(remove, qIndex)}
      />

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
  );
};

export default QuestionFooter;
