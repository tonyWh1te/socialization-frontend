import { Button } from '../../../../UI';
import styles from './AssignTestLayout.module.css';

const AssignTestLayout = ({ users, isError, isLoading }) => (
  <>
    {isLoading && <p>Загрузка...</p>}
    {isError && <p>Произошла ошибка</p>}
    {users && (
      <ul className={styles.list}>
        {users.map((user) => (
          <li
            className={styles.item}
            key={user.id}
          >
            <label htmlFor={user.id}>{user.email}</label>
            <input
              type="checkbox"
              id={user.id}
              value={user?.id}
            />
          </li>
        ))}
      </ul>
    )}
    <Button onClick={() => {}}>Назначить</Button>
  </>
);

export default AssignTestLayout;
