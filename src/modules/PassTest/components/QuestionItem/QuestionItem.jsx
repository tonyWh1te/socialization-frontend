import { TestCard, InputText, FormikCheckbox } from '../../../../UI';
import styles from './QuestionItem.module.css';

const QuestionItem = ({ question, qIndex }) => {
  const renderQuestionContent = (q) => {
    switch (q.type) {
      case 'text':
        return (
          <InputText
            type="text"
            name={`answers[${qIndex}]`}
            required={q.required}
          />
        );

      case 'checkbox':
        return (
          <FormikCheckbox
            label="Вариант ответа"
            checkboxProps={{
              value: '4',
            }}
            name={`answers[${qIndex}]`}
            required={q.required}
          />
        );

      default:
        return null;
    }
  };

  return (
    <TestCard className={styles.question}>
      <h5 className={styles.title}>
        {question.title}
        {question.required && <span className="required"> *</span>}
      </h5>

      {renderQuestionContent(question)}
    </TestCard>
  );
};

export default QuestionItem;
