import { nanoid } from '@reduxjs/toolkit';
import { Field } from 'formik';
import { XMarkIcon, Square2StackIcon, TrashIcon } from '@heroicons/react/24/solid';
import { InputText } from '../../../../UI';
import styles from './QuestionEdit.module.css';

const QuestionEdit = ({ question, qIndex, arrayHelpers }) => {
  const { remove, insert } = arrayHelpers;

  const onControlQuestion =
    (callback, ...args) =>
    () => {
      callback(...args);
    };

  const renderQuestionContent = (q) => {
    const { type, answers } = q;

    switch (type) {
      case 'text':
        return (
          <input
            className={styles.answerText}
            type="text"
            disabled
            value=""
            placeholder="Ответ"
          />
        );
      case 'radio':
      case 'checkbox': {
        const answersElements = answers.map((answer) => (
          <div
            className={styles.answerItem}
            key={answer.id}
          >
            <label htmlFor={`answer-key-${answer.id}`}>
              <input
                className={styles.answerInput}
                type={type}
                id={`answer-key-${answer.id}`}
                disabled
              />
              {answer.text}
            </label>
            <XMarkIcon className={styles.icon} />
          </div>
        ));

        return <div className={styles.answers}>{answersElements}</div>;
      }
      default:
        return null;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <InputText
          wrapperClassNames={styles.questionTitleWrapper}
          className={styles.questionTitle}
          name={`questions[${qIndex}].title`}
          placeholder="Вопрос"
        />
        <Field
          className={styles.select}
          name={`questions[${qIndex}].type`}
          as="select"
        >
          <option
            className={styles.option}
            value="text"
          >
            Текст
          </option>
          <option
            className={styles.option}
            value="radio"
          >
            Один из списка
          </option>
          <option
            className={styles.option}
            value="checkbox"
          >
            Несколько из списка
          </option>
        </Field>
      </div>
      {renderQuestionContent(question)}
      <div className={styles.bottom}>
        <Square2StackIcon
          onClick={onControlQuestion(insert, qIndex + 1, { ...question, id: nanoid() })}
          className={styles.icon}
        />
        <TrashIcon
          className={styles.icon}
          onClick={onControlQuestion(remove, qIndex)}
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
    </div>
  );
};

export default QuestionEdit;
