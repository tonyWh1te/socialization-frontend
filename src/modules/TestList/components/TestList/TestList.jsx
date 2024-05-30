import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetTestsQuery, useGetObserverTestsQuery } from '../../api/testApiSlice';
import { setTestSearch, setSortValue } from '../../slice/testsSlice';
import { selectTestSearchValue, selectSortValue, selectSelectedTest } from '../../slice/selectors';

import { Portal, FilteredList } from '../../../../components';
import { Container } from '../../../../UI';
import TestListItem from '../TestListItem/TestListItem';
import ButtonAddTest from '../ButtonAddTest/ButtonAddTest';
import CreateTestModal from '../CreateTestModal/CreateTestModal';
import AssigneTestModal from '../AssigneTestModal/AssigneTestModal';

import { ROLES } from '../../../../utils/constants';
import styles from './TestList.module.css';

const TestList = ({ currentUser }) => {
  const { id, role } = currentUser;

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
  } = useGetTestsQuery(
    { search: searchValue.toLowerCase(), sort: sortValue },
    { skip: role === ROLES.Observed },
  );

  const {
    data: observedTests,
    isLoading: isObservedTestsLoading,
    isFetching: isObservedTestsFetching,
    isError: isObservedTestsError,
  } = useGetObserverTestsQuery({ id }, { skip: role !== ROLES.Observed });

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
          items={tests || observedTests}
          onSearch={onSearch}
          onSort={onSort}
          isError={isError || isObservedTestsError}
          isLoading={isLoading || isFetching || isObservedTestsLoading || isObservedTestsFetching}
          renderItemContent={(test) => (
            <TestListItem
              test={test}
              toggleModal={toggleModal('assign')}
            />
          )}
        >
          {role !== ROLES.Observed && <ButtonAddTest onClick={toggleModal('create')} />}
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
