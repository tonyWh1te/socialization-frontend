import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLazyGetObservedsQuery } from '../../../../app/api/common/usersApiSlice';
import { useAssignTestMutation } from '../../api/testApiSlice';
import { useAssignGameMutation } from '../../api/gameApiSlice';
import AssignComponentLayout from '../AssignComponentLayout/AssignComponentLayout';
import { Modal, ModalLayout } from '../../../../UI';

const AssignComponentModal = ({ showModal, setShowModal, componentId, listType }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [
    getObserveds,
    { isLoading: isUsersLoading, isFetching: isUsersFetching, isError: isUsersError, data: users },
  ] = useLazyGetObservedsQuery();

  const useAssignMutationHook =
    listType === 'tests' ? useAssignTestMutation : useAssignGameMutation;

  const [assignComponent, { isLoading: isAssignComponentLoading }] = useAssignMutationHook();

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
      await assignComponent({ test_id: componentId, users_ids: selectedUsers }).unwrap();

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
        title={`Назначить ${listType === 'tests' ? 'тест' : 'игру'} наблюдаемым`}
        content={
          // eslint-disable-next-line
          <AssignComponentLayout
            onAssign={onAssign}
            selectedUsers={selectedUsers}
            onSelectUser={onSelectUser}
            onSearch={onSearch(showModal)}
            testId={componentId}
            users={users}
            isError={isUsersError}
            isUsersLoading={isUsersLoading || isUsersFetching}
            isAssigning={isAssignComponentLoading}
          />
        }
      />
    </Modal>
  );
};

export default AssignComponentModal;
