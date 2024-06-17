import { Button, InputText, FormikSelect, SpinnerMini } from '../../../../UI';
import { transformUsersToSelectOptions } from '../../utils/data.helper';
import { ROLES } from '../../../../utils/constants';
import styles from './NewUserFormStage1.module.css';

const NewUserFormStage1 = ({
  isSubmitting,
  selectRoles,
  formValues,
  tutors,
  onRoleSelect,
  isLoadingTutors,
}) => {
  const submitBtnContent = isSubmitting ? <SpinnerMini /> : 'Далее';

  return (
    <>
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
          name="birthday"
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
          name="role.code"
          options={selectRoles}
          label="Роль"
          onChange={onRoleSelect}
          selectProps={{
            className: styles.selectInput,
          }}
        />

        {isLoadingTutors && (
          <div className="basis-20 self-center">
            <SpinnerMini />
          </div>
        )}

        {formValues.role.code === ROLES.observed.code && !isLoadingTutors && (
          <FormikSelect
            className={styles.select}
            name="role.tutor_id"
            options={transformUsersToSelectOptions(tutors)}
            label="Выберите наставника"
            selectProps={{
              className: styles.selectInput,
            }}
          />
        )}
      </div>
      <div className={styles.btnRow}>
        <Button type="submit">{submitBtnContent}</Button>
      </div>
    </>
  );
};

export default NewUserFormStage1;
