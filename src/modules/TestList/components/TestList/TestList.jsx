import { useState } from 'react';
import { useGetTestsQuery } from '../../api/testApiSlice';
import { Portal } from '../../../../components';
import { Modal } from '../../../../UI';
import TestListItem from '../TestListItem/TestListItem';
import ButtonAddTest from '../ButtonAddTest/ButtonAddTest';
import CreateTestForm from '../CreateTestForm/CreateTestForm';
import styles from './TestList.module.css';

const TestList = () => {
  const [showModal, setShowModal] = useState(false);
  const { data: tests, isLoading, isError } = useGetTestsQuery();

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  if (isLoading) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>;
  }

  if (isError) {
    return <div style={{ textAlign: 'center' }}>Error</div>;
  }

  return (
    <>
      <div className={styles.list}>
        <ButtonAddTest onClick={toggleModal} />
        {tests.map((test) => (
          <TestListItem
            key={test.id}
            test={test}
          />
        ))}
      </div>
      <Portal>
        <Modal
          active={showModal}
          setActive={setShowModal}
        >
          <CreateTestForm toggleModal={toggleModal} />
        </Modal>
      </Portal>
    </>
  );
};

export default TestList;
