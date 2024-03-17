import { useState } from 'react';
import clsx from 'clsx';
import { UserCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { mobileLinks, links } from './NavData';
import styles from './Header.module.css';

const Header = () => {
  const [active, setActive] = useState(false);

  const onMenuClick = () => {
    setActive((prevActive) => !prevActive);
  };

  const menuBgClasses = clsx(styles.menuClose, {
    [styles.menuOpen]: active,
  });

  const menuListClasses = clsx(styles.list, {
    [styles.listOpen]: active,
  });

  const accountLink = mobileLinks.find((link) => link.title === 'Личный кабинет');

  return (
    <>
      {/* eslint-disable-next-line */}
      <div
        className={menuBgClasses}
        onClick={onMenuClick}
      />
      <header className={styles.header}>
        <div className={styles.containerFluid}>
          <div className={styles.inner}>
            <nav className={styles.nav}>
              <button
                type="button"
                aria-label="открыть Меню"
                className={styles.menuButton}
                onClick={onMenuClick}
              >
                <span />
                <span />
                <span />
              </button>
              <ul className={menuListClasses}>
                <li className={styles.close}>
                  <button
                    aria-label="закрыть Меню"
                    type="button"
                    onClick={onMenuClick}
                  >
                    <XMarkIcon className={styles.icon} />
                  </button>
                </li>
                {links.map((link) => (
                  <li
                    key={link.title}
                    className={styles.item}
                  >
                    <a
                      className={styles.link}
                      href={link.path}
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
                <li className={styles.mobile}>
                  <ul className={styles.mobileList}>
                    {mobileLinks.map((link) => (
                      <li
                        key={link.title}
                        className={styles.mobileItem}
                      >
                        <a
                          className={styles.mobileLink}
                          href={link.path}
                        >
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
            <div className={styles.user}>
              <a
                href={accountLink.path}
                aria-label={accountLink.title}
              >
                <UserCircleIcon className={`${styles.icon} ${styles.userIcon}`} />
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
