import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { links } from './NavData';
import UserIcon from '../../assets/icons/user-icon.svg';
import styles from './Header.module.scss';

function Header() {
  const menuItemClasses =
    () =>
    ({ isActive }) =>
      clsx(styles.navItem, { [styles.navItemCurrent]: isActive });

  return (
    <div className={styles.header}>
      <div className={styles.navContainer}>
        {links.map((link) => (
          <NavLink
            key={link.title}
            to={link.path}
            className={menuItemClasses()}
          >
            {link.title}
          </NavLink>
        ))}
      </div>
      <div className={styles.userProfile}>
        <NavLink to="/profile">
          <img
            src={UserIcon}
            alt="user"
          />
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
