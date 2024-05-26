import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetTestsQuery } from '../../api/testApiSlice';
import { setTestSearch, setSortValue } from '../../slice/testsSlice';
import { selectTestSearchValue, selectSortValue, selectSelectedTest } from '../../slice/selectors';

import { Portal, FilteredList } from '../../../../components';
import { Container } from '../../../../UI';
import TestListItem from '../TestListItem/TestListItem';
import ButtonAddTest from '../ButtonAddTest/ButtonAddTest';
import CreateTestModal from '../CreateTestModal/CreateTestModal';
import AssigneTestModal from '../AssigneTestModal/AssigneTestModal';
import styles from './TestList.module.css';

const TestList = () => {
  const [showCreateTestModal, setShowCreateTestModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const searchValue = useSelector(selectTestSearchValue);
  const sortValue = useSelector(selectSortValue);
  const selectedTest = useSelector(selectSelectedTest);

  const {
    data: tests,
    isLoading,
    isError,
    isFetching,
  } = useGetTestsQuery({ search: searchValue.toLowerCase(), sort: sortValue });

  const dispatch = useDispatch();

  const toggleModal = (action) => () => {
    if (action === 'assign') {
      setShowAssignModal((prev) => !prev);
    } else if (action === 'create') {
      setShowCreateTestModal((prev) => !prev);
    }
  };

  const onSearch = (query) => {
    dispatch(setTestSearch(query));
  };

  const onSort = (sortProperty) => {
    dispatch(setSortValue(sortProperty));
  };

  return (
    <div className={styles.wrapper}>
      <Container>
        <FilteredList
          items={tests}
          onSearch={onSearch}
          onSort={onSort}
          isError={isError}
          isLoading={isLoading || isFetching}
          renderItemContent={(test) => (
            <TestListItem
              test={test}
              toggleModal={toggleModal('assign')}
            />
          )}
        >
          <ButtonAddTest onClick={toggleModal('create')} />
        </FilteredList>
      </Container>
      <Portal>
        <CreateTestModal
          toggleModal={toggleModal('create')}
          showModal={showCreateTestModal}
          setShowModal={setShowCreateTestModal}
        />
        <AssigneTestModal
          testId={selectedTest}
          showModal={showAssignModal}
          setShowModal={setShowAssignModal}
        />
      </Portal>
    </div>
  );
};

export default TestList;
