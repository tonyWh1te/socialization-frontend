import { Form } from 'formik';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Button, UploadFile, InputText, SpinnerMini } from '../../../../UI';
import { userIconV2Big } from '../../../../assets';
import { ROLES } from '../../../../utils/constants';
import styles from './ProfileInfoForm.module.css';

const inputFields = [
  {
    name: 'name',
    label: 'Имя',
    type: 'text',
  },
  {
    name: 'second_name',
    label: 'Фамилия',
    type: 'text',
  },
  {
    name: 'last_name',
    label: 'Отчество (при наличии)',
    type: 'text',
  },
  {
    name: 'birthday',
    label: 'Дата рождения',
    type: 'date',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
  },
];

const ProfileInfoForm = ({
  formikProps,
  preview,
  onUpload,
  onShowModal,
  fileRef,
  userRole,
  onFotoDelete,
}) => {
  const submitBtnContent = formikProps.isSubmitting ? <SpinnerMini /> : 'Сохранить';

  return (
    <Form
      method="post"
      className={styles.form}
    >
      <div className={styles.left}>
        {preview ? (
          <div className={styles.avatarWrapper}>
            <div className={styles.avatarContainer}>
              <img
                className={styles.avatar}
                src={preview}
                alt="avatar"
              />
            </div>
            {userRole !== ROLES.Observed && (
              <button
                type="button"
                aria-label="Удалить фото"
                className={styles.close}
                onClick={onFotoDelete}
              >
                <XMarkIcon className={styles.icon} />
              </button>
            )}
          </div>
        ) : (
          <img
            className={styles.defaultAvatar}
            src={userIconV2Big}
            alt="avatar"
          />
        )}

        {userRole !== ROLES.Observed && (
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
        {inputFields.map(({ name, label, type }) => (
          <InputText
            key={name}
            wrapperClassNames={styles.input}
            label={label}
            name={name}
            type={type}
            disabled={userRole === ROLES.Observed}
          />
        ))}
        <div className={styles.saveButtonWrapper}>
          {userRole !== ROLES.Observed && (
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
            disabled={formikProps.isSubmitting || userRole === ROLES.Observed}
          >
            {submitBtnContent}
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default ProfileInfoForm;
