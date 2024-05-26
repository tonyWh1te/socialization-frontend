import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLazyGetObservedsQuery } from '../../../../app/api/common/usersApiSlice';
import { useAssignTestMutation } from '../../api/testApiSlice';
import AssignTestLayout from '../AssignTestLayout/AssignTestLayout';
import { Modal, ModalLayout } from '../../../../UI';

const AssigneTestModal = ({ showModal, setShowModal, testId }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [
    getObserveds,
    { isLoading: isUsersLoading, isFetching: isUsersFetching, isError: isUsersError, data: users },
  ] = useLazyGetObservedsQuery();

  const [assignTest, { isLoading: isAssignTestLoading }] = useAssignTestMutation();

  useEffect(() => {
    if (showModal) {
      getObserveds({ search: '' });
    }
  }, [showModal]);

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

  const onSearch = (isModalShowed) => (query) => {
    if (isModalShowed) {
      getObserveds({ search: query });
    }
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
            onSearch={onSearch(showModal)}
            testId={testId}
            users={users}
            isError={isUsersError}
            isUsersLoading={isUsersLoading || isUsersFetching}
            isAssigning={isAssignTestLoading}
          />
        }
      />
    </Modal>
  );
};

export default AssigneTestModal;
