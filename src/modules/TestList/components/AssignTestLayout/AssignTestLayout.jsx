import { SearchBar } from '../../../../components';
import { Button } from '../../../../UI';
import styles from './AssignTestLayout.module.css';

const AssignTestLayout = ({ users, isError, isLoading, onSearch }) => {
  console.log(isLoading);

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
              />
            </li>
          ))}
        </ul>
      )}
      <Button
        className={styles.button}
        onClick={() => {}}
      >
        Назначить
      </Button>
    </div>
  );
};

export default AssignTestLayout;
