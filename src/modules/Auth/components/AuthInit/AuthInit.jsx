import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocalStorage } from '@rehooks/local-storage';
import { setUserCredentials, logout } from '../../slice/authSlice';
import { useLazyGetUserInfoQuery } from '../../api/authApiSlice';

/**
 * Получаем инфу о пользователе при первом открытии приложения
 */
const AuthInit = ({ children }) => {
  const dispatch = useDispatch();
  const [auth] = useLocalStorage('auth', null);

  const [getUserInfo, { isLoading, isUninitialized }] = useLazyGetUserInfoQuery();

  const access = auth?.access;

  useEffect(() => {
    // const userRequest = async () => {
    //   console.log('get user info');
    //   const response = await new Promise((resolve) => {
    //     setTimeout(() => {
    //       const user = { name: 'John', second_name: 'Doe', login: 'admin', role: 'tutor' };
    //       resolve(user);
    //     }, 3000);
    //   });

    //   dispatch(setUserCredentials(response));
    //   setShowSplashScreen(false);
    // };

    const userRequest = async () => {
      try {
        const user = await getUserInfo().unwrap();

        dispatch(setUserCredentials(user));
      } catch (error) {
        dispatch(logout());
      }
    };

    if (access) {
      userRequest();
    } else {
      dispatch(logout());
    }

    // eslint-disable-next-line
  }, []);

  return isLoading || isUninitialized ? <p>Загрузка...</p> : children;
};

export default AuthInit;
