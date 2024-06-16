import { useSelector } from 'react-redux';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';
import { useDeleteUserMutation } from '../../api/usersApiSlice';
import { selectCurrentUser } from '../../../Auth';
import { ItemListWrapper } from '../../../../UI';
import { userIconV2 } from '../../../../assets';
import { ROLES } from '../../../../utils/constants';
import { toInitial } from '../../utils/string.helper';
import styles from './UserItem.module.css';

const UserItem = ({ user }) => {
  const { id, name, role, photo, last_name: lastName, second_name: secondName } = user;

  const [deleteUser] = useDeleteUserMutation();

  const { id: currentUserId } = useSelector(selectCurrentUser);

  const onDelete = (userId) => async () => {
    const toastId = toast.loading('Удаление пользователя...');

    try {
      await deleteUser(userId).unwrap();

      toast.update(toastId, {
        render: 'Пользователь удален',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: 'Произошла ошибка при удалении пользователя',
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <ItemListWrapper>
      <div className={styles.info}>
        {photo ? (
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              src={photo}
              alt="user"
            />
          </div>
        ) : (
          <img
            src={userIconV2}
            alt="user"
          />
        )}
        <div className={styles.text}>
          <p className={styles.name}>{`${lastName} ${toInitial(name)} ${toInitial(secondName)}`}</p>
          <p className={styles.role}>{ROLES[role]?.label ?? 'Неизвестная роль'}</p>
        </div>
      </div>
      <div className={styles.buttons}>
        <button
          type="button"
          className={styles.button}
        >
          Профиль
        </button>
        {id !== currentUserId && (
          <button
            className={styles.delete}
            type="button"
            aria-label="Удалить пользователя"
            onClick={onDelete(id)}
          >
            <XCircleIcon className={styles.icon} />
          </button>
        )}
      </div>
    </ItemListWrapper>
  );
};

export default UserItem;
