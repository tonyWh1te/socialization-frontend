import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import { useChangeUserInfoMutation } from '../../api/profileApiSlice';
import { useGetUserInfoQuery } from '../../../../app/api/common/usersApiSlice';
import { logout, setUserCredentials } from '../../../Auth';

import { Container, Button, ErrorMessage, SpinnerBig } from '../../../../UI';
import { Portal } from '../../../../components';
import ChangePasswordModal from '../ChangePasswordModal/ChangePasswordModal';
import ProfileInfoForm from '../ProfileInfoForm/ProfileInfoForm';

import { profileSchema } from '../../utils/validation.helper';
import { ALLOWED_TYPES, MAX_FILE_SIZE } from '../../utils/constants';
import styles from './Profile.module.css';

const Profile = () => {
  const fileRef = useRef(null);

  const [changeUserInfo] = useChangeUserInfoMutation();
  const { data: user, isFetching, isLoading, isError } = useGetUserInfoQuery();

  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  if (isLoading || isFetching) {
    return <SpinnerBig className="mt-10" />;
  }

  if (isError) {
    return (
      <ErrorMessage
        message="Ошибка загрузки профиля"
        className="mt-10"
      />
    );
  }
  const initialValues = {
    name: user?.name || '',
    last_name: user?.patronymic || '',
    second_name: user?.second_name || '',
    birthday: user?.birthday || '',
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

  const onShowModal = () => {
    setShowModal(true);
  };

  const onLogout = () => {
    dispatch(logout());
    navigate('/auth');
  };

  const onSubmit = async (values) => {
    const newInfo = {
      ...values,
      photo: values.photo.indexOf('data:image') === -1 ? null : values.photo,
    };

    try {
      const res = await changeUserInfo({ id: user.id, data: newInfo }).unwrap();

      if (!res.success) {
        throw new Error(res.errors[0]);
      }

      dispatch(setUserCredentials(res.result));

      toast.success('Данные профиля обновлены');
    } catch (error) {
      toast.error(error?.data?.detail || error.message || 'Что-то пошло не так');
    }
  };

  const onUpload =
    ({ setFieldValue, touched, setTouched }) =>
    (e) => {
      const selectedFile = e.target.files[0];

      if (selectedFile) {
        setTouched({ ...touched, photo: true });

        if (!ALLOWED_TYPES.includes(selectedFile.type) || selectedFile.size > MAX_FILE_SIZE) {
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
          setFieldValue('photo', reader.result);
        };
        reader.readAsDataURL(selectedFile);
      }
    };

  return (
    <>
      <div className={styles.wrapper}>
        <Container>
          <div className={styles.inner}>
            <Formik
              onSubmit={onSubmit}
              initialValues={initialValues}
              validationSchema={profileSchema.concat(uploadedFileSchema)}
            >
              {(formikProps) => (
                <ProfileInfoForm
                  user={user}
                  formikProps={formikProps}
                  preview={preview}
                  onUpload={onUpload}
                  onShowModal={onShowModal}
                  fileRef={fileRef}
                />
              )}
            </Formik>
            <div className={styles.bottom}>
              <Button onClick={onLogout}>Выйти</Button>
            </div>
          </div>
        </Container>
      </div>
      <Portal>
        <ChangePasswordModal
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </Portal>
    </>
  );
};

export default Profile;
