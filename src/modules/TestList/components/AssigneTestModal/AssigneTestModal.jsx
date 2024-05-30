import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLazyGetUsersQuery } from '../../../../app/api/common/usersApiSlice';
import { useAssignTestMutation } from '../../api/testApiSlice';
import AssignTestLayout from '../AssignTestLayout/AssignTestLayout';
import { Modal, ModalLayout } from '../../../../UI';

const AssigneTestModal = ({ showModal, setShowModal, testId }) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [
    getUsers,
    { isLoading: isUsersLoading, isFetching: isUsersFetching, isError: isUsersError, data: users },
  ] = useLazyGetUsersQuery();
  const [assignTest, { isLoading: isAssignTestLoading }] = useAssignTestMutation();

  useEffect(() => {
    if (showModal) {
      getUsers({ type: 'observer', search: searchValue.toLowerCase() });
    }
  }, [showModal, searchValue]);

  const onSelectUser = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setSelectedUsers((prev) => [...prev, +value]);
    } else {
      setSelectedUsers((prev) => prev.filter((id) => id !== +value));
    }
  };

  const onClose = () => {
    setSelectedUsers([]);
  };

  const onAssign = async () => {
    try {
      await assignTest({ test_id: testId, users_ids: selectedUsers }).unwrap();

      toast.success('Тест назначен');
    } catch (error) {
      toast.error(error?.data?.detail || 'Что-то пошло не так');
    }
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
            isError={isUsersError}
            isUsersLoading={isUsersLoading || isUsersFetching}
            isAssigned={isAssignTestLoading}
          />
        }
      />
    </Modal>
  );
};

export default AssigneTestModal;
