import { useFormikContext } from 'formik';
import { nanoid } from '@reduxjs/toolkit';
import { InputText } from '../../../../UI';
import QuestionFooter from '../QuestionFooter/QuestionFooter';
import ListEditableAnswers from '../ListEditableAnswers/ListEditableAnswers';
import FormikSelect from '../FormikSelect/FormikSelect';
import TextAnswerPreview from '../TextAnswerPreview/TextAnswerPreview';
import styles from './QuestionEdit.module.css';

const QuestionEdit = ({ question, qIndex, arrayHelpers }) => {
  const { setFieldValue } = useFormikContext();

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
        return <TextAnswerPreview />;
      }
      case 'radio':
      case 'checkbox': {
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

  const onChangeQuestionType = (q, index) => (e) => {
    const { value: type } = e.target;
    const { answers } = q;

    if (type === 'text') {
      setFieldValue(`questions[${index}].answers`, []);
    } else if (type === 'radio' || type === 'checkbox') {
      if (answers.length === 0) {
        const newAnswer = {
          id: nanoid(),
          text: 'Ответ 1',
          point: 1,
        };

        const newAnswers = [newAnswer];

        setFieldValue(`questions[${index}].answers`, newAnswers);
      }
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
          onChange={onChangeQuestionType(question, qIndex)}
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