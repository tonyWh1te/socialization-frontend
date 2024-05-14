import TestCard from '../TestCard/TestCard';
import { InputText } from '../../../../UI';
import styles from './FormTop.module.css';

const FormTop = () => (
  <TestCard className={styles.formTop}>
    <InputText
      wrapperClassNames="mb-4"
      name="title"
      placeholder="Название теста"
    />
    <InputText
      wrapperClassNames="h-auto"
      name="description"
      placeholder="Описание теста"
      as="textarea"
    />
  </TestCard>
);

export default FormTop;
