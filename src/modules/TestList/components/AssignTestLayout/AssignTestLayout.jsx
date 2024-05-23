import { SearchBar } from '../../../../components';
import { Button } from '../../../../UI';
import styles from './AssignTestLayout.module.css';

const AssignTestLayout = (props) => {
  const { users, isError, isLoading, onSearch, selectedUsers, onSelectUser, onAssign } = props;

  return (
    <div className="text-center">
      <SearchBar
        className={styles.search}
        onSearch={onSearch}
      />
      {isLoading && <p>Загрузка...</p>}
      {isError && <p>Произошла ошибка</p>}
      {!isLoading && !isError && users && (
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
        disabled={!selectedUsers.length}
        onClick={onAssign}
      >
        Назначить
      </Button>
    </div>
  );
};

export default AssignTestLayout;
