import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { selectCurrentUser } from '../../modules/Auth';
import { links } from './NavData';
import UserIcon from '../../assets/icons/user-icon.svg';
import styles from './Header.module.scss';

function Header() {
  const currentUser = useSelector(selectCurrentUser);

  const menuItemClasses =
    () =>
    ({ isActive }) =>
      clsx(styles.navItem, { [styles.navItemCurrent]: isActive });

  return (
    <div className={styles.header}>
      <div className={styles.navContainer}>
        {currentUser &&
          links[currentUser.role].map((link) => (
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
          {currentUser?.photo ? (
            <div className={styles.photoWrapper}>
              <img
                src={currentUser?.photo}
                alt="user"
              />
            </div>
          ) : (
            <img
              src={UserIcon}
              alt="user"
            />
          )}
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
