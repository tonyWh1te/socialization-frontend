import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserCredentials, logout } from '../../slice/authSlice';
import { useLazyGetUserInfoQuery } from '../../api/authApiSlice';
import { selectCurrentToken } from '../../slice/selectors';

/**
 * Получаем инфу о пользователе при первом открытии приложения
 */
const AuthInit = ({ children }) => {
  const dispatch = useDispatch();
  const access = useSelector(selectCurrentToken);
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  const { data, isLoading, isError } = useLazyGetUserInfoQuery();

  useEffect(() => {
    const userRequest = async () => {
      console.log('get user info');
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          const user = { name: 'John', second_name: 'Doe', login: 'admin', role: 'tutor' };
          resolve(user);
        }, 3000);
      });

      dispatch(setUserCredentials(response));
      setShowSplashScreen(false);
    };

    console.log('access', access);

    if (access) {
      // userRequest();
    } else {
      dispatch(logout());
      // setShowSplashScreen(false);
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (data) {
      setUserCredentials(data);
    }
  }, [data]);

  return isLoading ? <p>Загрузка...</p> : children;
};

export default AuthInit;
