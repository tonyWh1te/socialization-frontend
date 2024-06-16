import { InputText, Button, SpinnerMini } from '../../../../UI';
import styles from './NewUserFormStage2.module.css';

const NewUserFormStage2 = ({ isSubmitting, onGoBack }) => {
  const submitBtnContent = isSubmitting ? <SpinnerMini /> : 'Добавить';

  return (
    <>
      <InputText
        wrapperClassNames={styles.inputText}
        name="name"
        label="Имя *"
      />
      <InputText
        wrapperClassNames={styles.inputText}
        name="second_name"
        label="Фамилия *"
      />
      <InputText
        wrapperClassNames={styles.inputText}
        name="patronymic"
        label="Отчество (при наличии)"
      />
      <Button
        onClick={onGoBack}
        className={styles.saveButton}
      >
        Назад
      </Button>
      <Button
        type="submit"
        className={styles.saveButton}
      >
        {submitBtnContent}
      </Button>
    </>
  );
};

export default NewUserFormStage2;
