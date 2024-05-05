import { InputText } from '../../../../UI';
import styles from './QuestionPreview.module.css';

const QuestionPreview = ({ question }) => {
  const { title, answers, type } = question;

  return (
    <div className={styles.wrapper}>
      <h5 className={styles.title}>{title}</h5>
      <div className={styles.answers}>
        {answers.map((answer) => (
          <label
            key={answer.id}
            htmlFor={answer.id}
          >
            <input
              type={type}
              id={answer.id}
              disabled
            />
            {answer.text}
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionPreview;
