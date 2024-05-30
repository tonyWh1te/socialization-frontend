import { TestCard, InputText } from '../../../../UI';
import styles from './QuestionItem.module.css';

const QuestionItem = ({ question }) => {
  const renderQuestionContent = (q) => {
    switch (q.type) {
      case 'text':
        break;

      default:
        break;
    }
  };

  return <TestCard className={styles.question}>QuestionItem</TestCard>;
};

export default QuestionItem;
