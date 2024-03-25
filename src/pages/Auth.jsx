import React from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './Auth.module.css';
import Input from '../components/UI/Input/Input';
import Button from '../components/UI/Button/Button';
import bg1Mobile from '../images/background/bg1Mobile.svg';
import bg2Mobile from '../images/background/bg2Mobile.svg';
import bg3Mobile from '../images/background/bg3Mobile.svg';
import bg1Desktop from '../images/background/bg1Desktop.svg';
import bg2Desktop from '../images/background/bg2Desktop.svg';
import bg3Desktop from '../images/background/bg3Desktop.svg';

const Auth = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  const bg1 = isMobile ? bg1Mobile : bg1Desktop;
  const bg2 = isMobile ? bg2Mobile : bg2Desktop;
  const bg3 = isMobile ? bg3Mobile : bg3Desktop;

  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <span>Авторизация</span>
        <Input
          wrapperClassNames={styles.loginInput}
          name="login"
          placeholder="Логин"
        />
        <Input
          wrapperClassNames={styles.loginInput}
          name="password"
          placeholder="Пароль"
        />
        <Button className={styles.loginButton}>Войти</Button>
      </form>
      <div className={styles.background}>
        <img
          className={styles.backgroundImage1}
          src={bg1}
          alt="bg1"
        />
        <img
          className={styles.backgroundImage2}
          src={bg2}
          alt="bg2"
        />
        <img
          className={styles.backgroundImage3}
          src={bg3}
          alt="bg3"
        />
      </div>
    </div>
  );
};

export default Auth;
