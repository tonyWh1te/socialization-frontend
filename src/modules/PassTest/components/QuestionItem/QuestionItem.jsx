import { TestCard, InputText, FormikCheckbox, FormikRadio } from '../../../../UI';
import styles from './QuestionItem.module.css';

const QuestionItem = ({ question }) => {
  const renderQuestionContent = (q) => {
    switch (q.type) {
      case 'text':
        return (
          <InputText
            type="text"
            name={`${q.id}`}
          />
        );

      case 'checkbox':
        return (
          <div className={styles.answers}>
            {q.answers.map((a) => (
              <FormikCheckbox
                className={styles.answer}
                key={a.id}
                label={a.text}
                checkboxProps={{
                  value: a.id,
                  name: `${q.id}`,
                }}
              />
            ))}
          </div>
        );

      case 'radio':
        return (
          <div className={styles.answers}>
            {q.answers.map((a) => (
              <FormikRadio
                className={styles.answer}
                key={a.id}
                label={a.text}
                radioProps={{
                  value: a.id,
                  name: `${q.id}`,
                }}
              />
            ))}
          </div>
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
