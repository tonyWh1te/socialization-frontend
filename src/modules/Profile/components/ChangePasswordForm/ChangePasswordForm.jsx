import { Form } from 'formik';
import { InputText, Button, SpinnerMini } from '../../../../UI';
import styles from './ChangePasswordForm.module.css';

const ChangePasswordForm = ({ isSubmitting, handleSubmit }) => {
  const submitBtnContent = isSubmitting ? <SpinnerMini /> : 'Изменить';

  return (
    <Form
      className={styles.form}
      method="post"
    >
      <InputText
        wrapperClassNames={styles.inputWrapper}
        name="old_password"
        type="password"
        label="Старый пароль"
      />
      <InputText
        wrapperClassNames={styles.inputWrapper}
        name="new_password"
        type="password"
        label="Новый пароль"
      />
      <Button
        className={styles.button}
        onClick={handleSubmit}
        disabled={isSubmitting}
        type="submit"
      >
        {submitBtnContent}
      </Button>
    </Form>
  );
};

export default ChangePasswordForm;
