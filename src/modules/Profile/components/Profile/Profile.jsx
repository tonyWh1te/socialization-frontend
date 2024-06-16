import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import { useChangeUserInfoMutation } from '../../api/profileApiSlice';
import { logout, setUserCredentials, selectCurrentUser } from '../../../Auth';

import { Container, Button } from '../../../../UI';
import { Portal } from '../../../../components';
import ChangePasswordModal from '../ChangePasswordModal/ChangePasswordModal';
import ProfileInfoForm from '../ProfileInfoForm/ProfileInfoForm';

import { profileSchema } from '../../utils/validation.helper';
import { ALLOWED_TYPES, MAX_FILE_SIZE } from '../../utils/constants';
import styles from './Profile.module.css';

const SERVER_URL = 'http://5.35.89.117:8084';

const Profile = () => {
  const fileRef = useRef(null);

  const [changeUserInfo] = useChangeUserInfoMutation();

  const user = useSelector(selectCurrentUser);

  const [preview, setPreview] = useState(user?.photo ? SERVER_URL + user.photo : null);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const initialValues = {
    name: user?.name || '',
    last_name: user?.last_name || '',
    second_name: user?.second_name || '',
    email: user?.email || '',
    photo: user?.photo ? SERVER_URL + user.photo : '',
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
  };

  const onSubmit = async (values) => {
    try {
      const res = await changeUserInfo({ id: user.id, data: values }).unwrap();

      dispatch(setUserCredentials(res));

      toast.success('Данные профиля обновлены');
    } catch (error) {
      toast.error(error?.data?.detail || 'Что-то пошло не так');
    }
  };

  const onFotoDelete =
    ({ setFieldValue }) =>
    () => {
      setPreview(null);
      fileRef.current.value = null;
      setFieldValue('photo', '');
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
                  onFotoDelete={onFotoDelete(formikProps)}
                  userRole={user?.role}
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
