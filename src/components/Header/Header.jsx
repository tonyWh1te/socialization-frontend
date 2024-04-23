import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import React from 'react';
import styles from './Header.module.scss';
import UserIcon from '../../assets/icons/user-icon.svg';

function Header() {
  const [currentActive, setCurrentActive] = useState('/');

  const navigate = useNavigate();

  const navigateHandler = (index) => {
    setCurrentActive(index);
    navigate(index);
  };

  return (
    <div className={styles.header}>
      <div className={styles.navContainer}>
        <div
          className={`${styles.navItem} ${currentActive === '/' ? styles.navItemCurrent : ''}`}
          onClick={() => navigateHandler('/')}
        >
          Главная
        </div>
        <div
          className={`${styles.navItem} ${currentActive === '/users' ? styles.navItemCurrent : ''}`}
          onClick={() => navigateHandler('/users')}
        >
          Пользователи
        </div>
        <div
          className={`${styles.navItem} ${currentActive === '/games' ? styles.navItemCurrent : ''}`}
          onClick={() => navigateHandler('/games')}
        >
          Игры
        </div>
        <div
          className={`${styles.navItem} ${currentActive === '/tests' ? styles.navItemCurrent : ''}`}
          onClick={() => navigateHandler('/tests')}
        >
          Тесты
        </div>
      </div>
      <div className={styles.userProfile}>
        <img
          src={UserIcon}
          onClick={() => navigateHandler('/profile')}
        ></img>
      </div>
    </div>
  );
}

export default Header;
