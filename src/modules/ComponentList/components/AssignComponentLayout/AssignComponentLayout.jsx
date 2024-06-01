import { SearchBar } from '../../../../components';
import { Button, SpinnerMini, ErrorMessage } from '../../../../UI';
import styles from './AssignComponentLayout.module.css';

const AssignComponentLayout = (props) => {
  const {
    users,
    isError,
    isUsersLoading,
    onSearch,
    selectedUsers,
    onSelectUser,
    onAssign,
    isAssigning,
    testId,
  } = props;

  const assignBtnContent = isAssigning ? <SpinnerMini /> : 'Назначить';

  return (
    <div className="text-center">
      <SearchBar
        className={styles.search}
        onSearch={onSearch}
      />
      {isUsersLoading && <SpinnerMini className={styles.spinner} />}
      {isError && (
        <ErrorMessage
          message="Ошибка загрузки пользователей"
          className={styles.error}
        />
      )}
      {!isUsersLoading && !isError && users && (
        <ul className={styles.list}>
          {users.map((user) => {
            const isAssigned = user.tests.some(({ test }) => test.id === testId);

            return (
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
                  defaultChecked={isAssigned}
                  disabled={isAssigned}
                  onChange={onSelectUser}
                />
              </li>
            );
          })}
        </ul>
      )}
      <Button
        className={styles.button}
        disabled={!selectedUsers.length || isAssigning}
        onClick={onAssign}
      >
        {assignBtnContent}
      </Button>
    </div>
  );
};

export default AssignComponentLayout;
