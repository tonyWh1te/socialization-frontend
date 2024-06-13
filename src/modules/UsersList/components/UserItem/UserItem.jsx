import { XCircleIcon } from '@heroicons/react/24/solid';
import { ItemListWrapper } from '../../../../UI';
import { ROLES } from '../../../../utils/constants';
import styles from './UserItem.module.css';

const UserItem = ({ user }) => {
  const { id, name, email, role } = user;

  return (
    <ItemListWrapper>
      <div className={styles.info}>
        <img
          src=""
          alt=""
        />
        <div className={styles.text}>
          <p className={styles.name}>{name}</p>
          <p className={styles.role}>{role}</p>
        </div>
      </div>
      <div className={styles.buttons}>
        <button
          type="button"
          className={styles.button}
        >
          Просмотр профиля
        </button>
        {role === ROLES.Observed && (
          <button
            type="button"
            className={styles.button}
          >
            Назначить
          </button>
        )}
        <button
          className={styles.close}
          type="button"
          aria-label="Удалить тест"
          onClick={() => {}}
        >
          <XCircleIcon className={styles.icon} />
        </button>
      </div>
    </ItemListWrapper>
  );
};

export default UserItem;
