import { useEffect, useState } from 'react';
import { useLazyGetUsersQuery } from '../../../../app/api/common/usersApiSlice';
import AssignTestLayout from '../AssignTestLayout/AssignTestLayout';
import { Modal, ModalLayout } from '../../../../UI';

const AssigneTestModal = ({ showModal, setShowModal }) => {
  const [searchValue, setSearchValue] = useState('');

  const [getUsers, { isLoading, isFetching, isError, data: users }] = useLazyGetUsersQuery();

  useEffect(() => {
    if (showModal) {
      getUsers({ type: 'observer', search: searchValue.toLowerCase() });
    }
  }, [showModal, searchValue]);

  const onSearch = (query) => {
    setSearchValue(query);
  };

  return (
    <Modal
      active={showModal}
      setActive={setShowModal}
    >
      <ModalLayout
        title="Назначить тест наблюдаемым"
        content={
          // eslint-disable-next-line
          <AssignTestLayout
            onSearch={onSearch}
            users={users}
            isError={isError}
            isLoading={isLoading || isFetching}
          />
        }
      />
    </Modal>
  );
};

export default AssigneTestModal;
