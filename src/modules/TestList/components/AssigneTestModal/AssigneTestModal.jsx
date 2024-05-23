import { useEffect, useState } from 'react';
import { useLazyGetUsersQuery } from '../../../../app/api/common/usersApiSlice';
import AssignTestLayout from '../AssignTestLayout/AssignTestLayout';
import { Modal, ModalLayout } from '../../../../UI';

const AssigneTestModal = ({ showModal, setShowModal, testId }) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [getUsers, { isLoading, isFetching, isError, data: users }] = useLazyGetUsersQuery();

  useEffect(() => {
    if (showModal) {
      getUsers({ type: 'observer', search: searchValue.toLowerCase() });
    }
  }, [showModal, searchValue]);

  const onSelectUser = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setSelectedUsers((prev) => [...prev, value]);
    } else {
      setSelectedUsers((prev) => prev.filter((id) => id !== value));
    }
  };

  const onClose = () => {
    setSelectedUsers([]);
  };

  const onAssign = () => {
    console.log(testId);
    console.log(selectedUsers);
  };

  const onSearch = (query) => {
    setSearchValue(query);
  };

  return (
    <Modal
      active={showModal}
      setActive={setShowModal}
      handleClose={onClose}
    >
      <ModalLayout
        title="Назначить тест наблюдаемым"
        content={
          // eslint-disable-next-line
          <AssignTestLayout
            onAssign={onAssign}
            selectedUsers={selectedUsers}
            onSelectUser={onSelectUser}
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
