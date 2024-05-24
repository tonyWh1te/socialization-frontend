import { SearchBar } from '../../../../components';
import { Button, SpinnerMini } from '../../../../UI';
import styles from './AssignTestLayout.module.css';

const AssignTestLayout = (props) => {
  const {
    users,
    isError,
    isUsersLoading,
    onSearch,
    selectedUsers,
    onSelectUser,
    onAssign,
    isAssigned,
  } = props;

  const assignBtnContent = isAssigned ? <SpinnerMini /> : 'Назначить';

  return (
    <div className="text-center">
      <SearchBar
        className={styles.search}
        onSearch={onSearch}
      />
      {isUsersLoading && <p>Загрузка...</p>}
      {isError && <p>Произошла ошибка</p>}
      {!isUsersLoading && !isError && users && (
        <ul className={styles.list}>
          {users.map((user) => (
            <li
              className={styles.item}
              key={user.id}
            >
              <label
                className={styles.label}
                htmlFor={user.id}
              >
                {`${user.last_name ?? 'фамилия'} ${user.name ?? 'имя'} ${user.second_name ?? ''}`}
              </label>
              <input
                type="checkbox"
                id={user.id}
                value={user?.id}
                onChange={onSelectUser}
              />
            </li>
          ))}
        </ul>
      )}
      <Button
        className={styles.button}
        disabled={!selectedUsers.length || isAssigned}
        onClick={onAssign}
      >
        {assignBtnContent}
      </Button>
    </div>
  );
};

export default AssignTestLayout;
