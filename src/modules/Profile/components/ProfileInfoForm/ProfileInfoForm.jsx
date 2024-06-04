import { Form } from 'formik';
import { Button, UploadFile, InputText } from '../../../../UI';
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

const ProfileInfoForm = ({ formikProps, preview, onUpload, onShowModal, fileRef }) => (
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
      <UploadFile
        fileRef={fileRef}
        label="Изменить фото"
        className={styles.upload}
        onChange={onUpload(formikProps)}
        inputProps={{
          name: 'avatar',
          accept: 'image/png, image/jpeg, image/jpg',
        }}
      />
    </div>
    <div className={styles.right}>
      {inputFields.map(({ name, label }) => (
        <InputText
          key={name}
          wrapperClassNames={styles.input}
          label={label}
          name={name}
        />
      ))}
      <div className={styles.saveButtonWrapper}>
        <Button
          className={styles.saveButton}
          onClick={onShowModal}
        >
          Смена пароля
        </Button>
        <Button
          className={styles.saveButton}
          type="submit"
          onClick={formikProps.handleSubmit}
        >
          Сохранить
        </Button>
      </div>
    </div>
  </Form>
);

export default ProfileInfoForm;
