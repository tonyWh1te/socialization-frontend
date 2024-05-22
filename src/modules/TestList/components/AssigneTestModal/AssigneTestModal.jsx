import { useEffect } from 'react';
import { useLazyGetUsersQuery } from '../../../../app/api/common/usersApiSlice';
import AssignTestLayout from '../AssignTestLayout/AssignTestLayout';
import { Modal, FormModalLayout } from '../../../../UI';

const AssigneTestModal = ({ showModal, setShowModal }) => {
  const [getUsers, { isLoading, isError, data: users }] = useLazyGetUsersQuery();

  useEffect(() => {
    if (showModal) {
      getUsers();
    }
  }, [showModal]);

  return (
    <Modal
      active={showModal}
      setActive={setShowModal}
    >
      <FormModalLayout
        title="Назначить тест наблюдаемым"
        form={
          // eslint-disable-next-line
          <AssignTestLayout
            users={users}
            isError={isError}
            isLoading={isLoading}
          />
        }
      />
    </Modal>
  );
};

export default AssigneTestModal;
