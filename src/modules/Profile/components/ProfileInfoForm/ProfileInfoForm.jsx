import { Form } from 'formik';
import { Button, UploadFile, InputText, SpinnerMini } from '../../../../UI';
import { ROLES } from '../../../../utils/constants';
import styles from './ProfileInfoForm.module.css';

const inputFields = [
  {
    name: 'name',
    label: 'Имя',
  },
  {
    name: 'last_name',
    label: 'Фамилия',
  },
  {
    name: 'second_name',
    label: 'Отчество (при наличии)',
  },
  {
    name: 'email',
    label: 'Email',
  },
];

const ProfileInfoForm = ({ formikProps, preview, onUpload, onShowModal, fileRef, userRole }) => {
  const submitBtnContent = formikProps.isSubmitting ? <SpinnerMini /> : 'Сохранить';

  return (
    <Form
      method="post"
      className={styles.form}
    >
      <div className={styles.left}>
        <div className={styles.avatarWrapper}>
          <img
            className={styles.avatar}
            src={preview}
            alt="avatar"
          />
        </div>
        {userRole !== ROLES.observed.code && (
          <UploadFile
            fileRef={fileRef}
            label="Изменить фото"
            className={styles.upload}
            onChange={onUpload(formikProps)}
            inputProps={{
              name: 'photo',
              accept: 'image/png, image/jpeg, image/jpg',
            }}
          />
        )}
      </div>
      <div className={styles.right}>
        {inputFields.map(({ name, label }) => (
          <InputText
            key={name}
            wrapperClassNames={styles.input}
            label={label}
            name={name}
            disabled={userRole === ROLES.observed.code}
          />
        ))}
        <div className={styles.saveButtonWrapper}>
          {userRole !== ROLES.observed.code && (
            <Button
              className={styles.saveButton}
              onClick={onShowModal}
            >
              Смена пароля
            </Button>
          )}

          <Button
            className={styles.saveButton}
            type="submit"
            onClick={formikProps.handleSubmit}
            disabled={formikProps.isSubmitting || userRole === ROLES.observed.code}
          >
            {submitBtnContent}
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default ProfileInfoForm;
