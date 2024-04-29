import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAddTestMutation } from '../../api/testApiSlice';
import { Input } from '../../../../UI';
import styles from './CreateTestForm.module.css';

const CreateTestForm = ({ toggleModal }) => {
  const initialState = {
    title: '',
    description: '',
  };

  const [testData, setTestData] = useState(initialState);
  const [addTest, { isLoading: isCreating }] = useAddTestMutation();

  const onReset = () => {
    setTestData(initialState);
  };

  const onChange = (event) => {
    setTestData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (testData.title === '') {
      return;
    }

    try {
      const testId = await addTest(testData).unwrap();

      onReset();
      toggleModal();
    } catch (error) {
      toast.error(error?.data?.detail || 'Что-то пошло не так');
    }
  };

  const btnCreateText = isCreating ? 'Добавление...' : 'Добавить';

  return (
    <div>
      <h3 className={styles.title}>Создание теста</h3>
      <form onSubmit={onSubmit}>
        <Input
          name="title"
          type="text"
          label="Название"
          errorMessage="Поле Название не может быть пустым"
          onChange={onChange}
          value={testData.title}
          required
        />
        <Input
          name="description"
          type="text"
          label="Описание"
          onChange={onChange}
          value={testData.description}
        />
        <button type="submit">{btnCreateText}</button>
      </form>
    </div>
  );
};

export default CreateTestForm;
