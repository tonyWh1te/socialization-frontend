import { FieldArray, useFormikContext } from 'formik';
import { nanoid } from '@reduxjs/toolkit';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { InputText } from '../../../../UI';
import { onFieldArrayControl } from '../../utils/form.helper';
import styles from './ListEditableAnswers.module.css';

const ListEditableAnswers = ({ type, qIndex }) => {
  const { values: testValues } = useFormikContext();

  const { answers } = testValues.questions[qIndex];

  const INITIAL_ANSWER = {
    id: nanoid(),
    text: `Ответ ${answers.length + 1}`,
  };

  return (
    <div className={styles.answers}>
      <FieldArray
        name={`questions[${qIndex}].answers`}
        render={({ remove, push }) => (
          <>
            {answers.map((answer, index) => (
              <div
                className={styles.answerItem}
                key={answer.id}
              >
                <input
                  className={styles.answerInput}
                  type={type}
                  id={`answer-key-${answer.id}`}
                  disabled
                />
                <InputText
                  wrapperClassNames={styles.answerInputText}
                  name={`questions[${qIndex}].answers[${index}].text`}
                />
                {answers.length > 1 && (
                  <button
                    type="button"
                    aria-label="Удалить ответ"
                    onClick={onFieldArrayControl(remove, index)}
                  >
                    <XMarkIcon className={`icon ${styles.icon}`} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className={styles.button}
              onClick={onFieldArrayControl(push, INITIAL_ANSWER)}
            >
              Добавить ответ
            </button>
          </>
        )}
      />
    </div>
  );
};

export default ListEditableAnswers;
