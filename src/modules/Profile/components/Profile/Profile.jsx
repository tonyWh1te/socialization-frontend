import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { deleteFromStorage } from '@rehooks/local-storage';
import { logout } from '../../../Auth';
import { Container, Button } from '../../../../UI';
import { getLocalStorageItem } from '../../../../utils/helpers';
import styles from './Profile.module.css';

const Profile = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(getLocalStorageItem('auth'))?.user;

  const onLogout = () => () => {
    deleteFromStorage('auth');
    dispatch(logout());
  };

  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.top} />
          <div className={styles.bottom}>
            <Button
              onClick={onLogout()}
              className={styles.button}
            >
              Выйти
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Profile;
