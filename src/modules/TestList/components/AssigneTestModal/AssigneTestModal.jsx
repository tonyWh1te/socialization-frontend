import AssignTestLayout from '../AssignTestLayout/AssignTestLayout';
import { Modal, FormModalLayout } from '../../../../UI';

const AssigneTestModal = ({ showModal, setShowModal }) => {
  const a = 1;

  return (
    <Modal
      active={showModal}
      setActive={setShowModal}
    >
      <FormModalLayout
        title="Назначить тест наблюдаемым"
        form={<AssignTestLayout />}
      />
    </Modal>
  );
};

export default AssigneTestModal;
