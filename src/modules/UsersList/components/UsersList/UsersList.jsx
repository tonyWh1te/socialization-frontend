import { useGetUsersQuery } from '../../../../app/api/common/usersApiSlice';

import { Container } from '../../../../UI';
import { FilteredList } from '../../../../components';
import UserItem from '../UserItem/UserItem';
import styles from './UsersList.module.css';

const UsersList = () => {
  const { data, isLoading, isFetching, isError } = useGetUsersQuery();

  return (
    <div className={styles.wrapper}>
      <Container>
        <FilteredList
          items={data}
          isError={isError}
          isLoading={isLoading || isFetching}
          renderItemContent={(user) => <UserItem user={user} />}
        />
      </Container>
    </div>
  );
};

export default UsersList;
