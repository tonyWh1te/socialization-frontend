import { nanoid } from '@reduxjs/toolkit';
import { InputText } from '../../../../UI';
import QuestionFooter from '../QuestionFooter/QuestionFooter';
import ListEditableAnswers from '../ListEditableAnswers/ListEditableAnswers';
import FormikSelect from '../FormikSelect/FormikSelect';
import TextAnswerPreview from '../TextAnswerPreview/TextAnswerPreview';
import styles from './QuestionEdit.module.css';

const QuestionEdit = ({ question, qIndex, arrayHelpers }) => {
  const selectOptions = [
    {
      value: 'text',
      label: 'Текст',
    },
    {
      value: 'radio',
      label: 'Один из списка',
    },
    {
      value: 'checkbox',
      label: 'Несколько из списка',
    },
  ];

  const renderQuestionContent = (q, index) => {
    const { type, answers } = q;

    switch (type) {
      case 'text': {
        answers.length = 0;

        return <TextAnswerPreview />;
      }
      case 'radio':
      case 'checkbox': {
        if (answers.length === 0) {
          const initAnswer = {
            id: nanoid(),
            text: 'Ответ 1',
          };

          answers.push(initAnswer);
        }

        return (
          <ListEditableAnswers
            qIndex={index}
            answers={answers}
            type={type}
          />
        );
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
        <FormikSelect
          name={`questions[${qIndex}].type`}
          options={selectOptions}
          ariaLabel="Тип вопроса"
        />
      </div>
      {renderQuestionContent(question, qIndex)}
      <QuestionFooter
        qIndex={qIndex}
        question={question}
        arrayHelpers={arrayHelpers}
      />
    </div>
  );
};

export default QuestionEdit;
