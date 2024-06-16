import { Form } from 'formik';
import { Button, InputText, SpinnerMini, FormikSelect } from '../../../../UI';
import { ROLES } from '../../../../utils/constants';
import styles from './NewUserFormLayout.module.css';

const NewUserFormLayout = ({
  isSubmitting,
  handleSubmit,
  selectRoles,
  formValues,
  selectTutor,
}) => {
  const submitButtonText = isSubmitting ? 'Добавление...' : 'Добавить';

  return (
    <Form
      method="post"
      className={styles.form}
    >
      <div className={styles.row}>
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
      </div>
      <div className={styles.row}>
        <InputText
          wrapperClassNames={styles.inputText}
          name="dob"
          label="Дата рождения *"
          type="date"
        />
        <InputText
          wrapperClassNames={styles.inputText}
          name="email"
          label="Почта *"
        />
      </div>
      <div className={styles.row}>
        <InputText
          wrapperClassNames={styles.inputText}
          name="login"
          label="Логин *"
        />
        <InputText
          wrapperClassNames={styles.inputText}
          name="password"
          label="Пароль *"
        />
      </div>
      <div className={styles.row}>
        <FormikSelect
          className={styles.select}
          name="role"
          options={selectRoles}
          label="Роль"
          selectProps={{
            className: styles.selectInput,
          }}
        />
        {formValues.role === ROLES.observed.code && (
          <FormikSelect
            className={styles.select}
            name="tutor"
            options={selectTutor}
            label="Выберите наставника"
            selectProps={{
              className: styles.selectInput,
            }}
          />
        )}
      </div>
      <div className={styles.btnRow}>
        <Button
          className={styles.addButton}
          disabled={isSubmitting}
          onClick={handleSubmit}
          type="submit"
        >
          {submitButtonText}
        </Button>
      </div>
    </Form>
  );
};

export default NewUserFormLayout;
