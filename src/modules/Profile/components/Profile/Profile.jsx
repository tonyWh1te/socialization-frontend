import { useState, useRef } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { deleteFromStorage } from '@rehooks/local-storage';
import { useChangeUserInfoMutation } from '../../api/profileApiSlice';
import { logout } from '../../../Auth';

import { defaultUserPic } from '../../../../assets';
import { Container, Button, InputText, UploadFile, SpinnerMini } from '../../../../UI';
import { profileSchema } from '../../utils/validation.helper';
import { getLocalStorageItem } from '../../../../utils/helpers';
import { ALLOWED_TYPES, MAX_FILE_SIZE } from '../../utils/constants';
import styles from './Profile.module.css';

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

const Profile = () => {
  const fileRef = useRef(null);
  const [changeUserInfo, { isLoading, isError }] = useChangeUserInfoMutation();

  const user = JSON.parse(getLocalStorageItem('auth'))?.user;

  const [preview, setPreview] = useState(user?.photo || defaultUserPic);

  const dispatch = useDispatch();

  const initialValues = {
    name: user.name,
    last_name: user.last_name,
    second_name: user?.second_name || '',
    email: user?.email || '',
    photo: user?.photo || '',
  };

  const uploadedFileSchema = Yup.object({
    photo: Yup.mixed()
      .test('fileType', 'Данный тип файла не поддерживается', () => {
        const value = fileRef.current?.files[0];

        if (value) {
          return ALLOWED_TYPES.includes(value.type);
        }

        return true;
      })
      .test('fileSize', 'Размер файла не должен превышать 5MB', () => {
        const value = fileRef.current?.files[0];

        if (value) {
          return value.size <= MAX_FILE_SIZE;
        }

        return true;
      }),
  });

  const submitBtnText = isLoading ? <SpinnerMini /> : 'Сохранить';

  const onLogout = () => () => {
    deleteFromStorage('auth');
    dispatch(logout());
  };

  const onSubmit = async (values) => {
    const formData = new FormData();

    formData.append('login', user.login);
    formData.append('name', values.name);
    formData.append('last_name', values.last_name);
    formData.append('second_name', values.second_name);
    formData.append('email', values.email);
    formData.append('photo', values.photo);

    try {
      await changeUserInfo({ id: user.id, data: values }).unwrap();

      toast.success('Данные профиля обновлены');
    } catch (error) {
      console.error(error);
    }
  };

  const onUpload =
    ({ setFieldValue, touched, setTouched }) =>
    (e) => {
      const selectedFile = e.target.files[0];

      if (selectedFile) {
        setFieldValue('photo', selectedFile);
        setTouched({ ...touched, photo: true });

        if (!ALLOWED_TYPES.includes(selectedFile.type) || selectedFile.size > MAX_FILE_SIZE) {
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      }
    };

  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.inner}>
          <Formik
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={profileSchema.concat(uploadedFileSchema)}
          >
            {(formikProps) => (
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
                      name: 'photo',
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
                      type="submit"
                      onClick={formikProps.handleSubmit}
                    >
                      {submitBtnText}
                    </Button>
                    <Button onClick={onLogout()}>Выйти</Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </div>
  );
};

export default Profile;
