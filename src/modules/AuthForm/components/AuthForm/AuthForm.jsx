import { useMediaQuery } from 'react-responsive';
import { Button, Input } from '../../../../UI';
import {
  bg1Desktop,
  bg1Mobile,
  bg2Desktop,
  bg2Mobile,
  bg3Desktop,
  bg3Mobile,
} from '../../../../assets';
import styles from './AuthForm.module.css';

const AuthForm = () => {
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
          required
        />
        <Input
          wrapperClassNames={styles.loginInput}
          name="password"
          placeholder="Пароль"
          required
        />
        <Button
          className={styles.loginButton}
          type="submit"
        >
          Войти
        </Button>
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

export default AuthForm;
