import { Input } from '../../../../UI';
import styles from './CreateTestForm.module.css';

const CreateTestForm = () => {
  const a = 1;

  return (
    <div>
      <h3 className={styles.title}>Создание теста</h3>
      <form>
        <Input
          name="title"
          type="text"
          placeholder="Название теста"
          required
        />
        <Input
          name="description"
          type="text"
          placeholder="Описание"
        />
      </form>
    </div>
  );
};

export default CreateTestForm;
