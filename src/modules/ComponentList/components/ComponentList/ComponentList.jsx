import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetTestsQuery, useGetObserverTestsQuery } from '../../api/testApiSlice';
import { useGetGamesQuery, useGetObserverGamesQuery } from '../../api/gameApiSlice';
import { setTestSearch, setSortValue } from '../../slice/testsSlice';
import { selectTestSearchValue, selectSortValue, selectSelectedTest } from '../../slice/selectors';

import { Portal, FilteredList } from '../../../../components';
import { Container } from '../../../../UI';
import TestListItem from '../TestListItem/TestListItem';
import GameListItem from '../GameListItem/GameListItem';
import ButtonAddComponent from '../ButtonAddTest/ButtonAddComponent';
import CreateTestModal from '../CreateTestModal/CreateTestModal';
import AddGameModal from '../AddGameModal/AddGameModal';
import AssignComponentModal from '../AssignComponentModal/AssignComponentModal';

import { ROLES } from '../../../../utils/constants';
import styles from './ComponentList.module.css';

const ComponentList = ({ currentUser, listType }) => {
  const { id, role } = currentUser;

  const [showCreateTestModal, setShowCreateTestModal] = useState(false);
  const [showAddGameModal, setShowAddGameModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const searchValue = useSelector(selectTestSearchValue);
  const sortValue = useSelector(selectSortValue);
  const selectedTest = useSelector(selectSelectedTest);

  const useGetAdminQueryHook = listType === 'tests' ? useGetTestsQuery : useGetGamesQuery;
  const useGetObserverQueryHook =
    listType === 'tests' ? useGetObserverTestsQuery : useGetObserverGamesQuery;

  const {
    data: components,
    isLoading,
    isError,
    isFetching,
  } = useGetAdminQueryHook(
    { search: searchValue.toLowerCase(), sort: sortValue },
    { skip: role === ROLES.observed.code },
  );

  const {
    data: observedComponents,
    isLoading: isObservedComponentsLoading,
    isFetching: isObservedComponentsFetching,
    isError: isObservedComponentsError,
  } = useGetObserverQueryHook({ id }, { skip: role !== ROLES.observed.code });

  const dispatch = useDispatch();

  const toggleModal = (action) => () => {
    if (action === 'assign') {
      setShowAssignModal((prev) => !prev);
    } else if (action === 'create') {
      setShowCreateTestModal((prev) => !prev);
    } else if (action === 'add') {
      setShowAddGameModal((prev) => !prev);
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
          items={components || observedComponents}
          onSearch={onSearch}
          onSort={onSort}
          isError={isError || isObservedComponentsError}
          isLoading={
            isLoading || isFetching || isObservedComponentsLoading || isObservedComponentsFetching
          }
          renderItemContent={(item) => {
            if (listType === 'tests') {
              return (
                <TestListItem
                  test={item}
                  toggleModal={toggleModal('assign')}
                />
              );
            }
            if (listType === 'games') {
              return (
                <GameListItem
                  game={item}
                  toggleModal={toggleModal('assign')}
                />
              );
            }
            return null;
          }}
        >
          {role !== ROLES.observed.code && (
            <ButtonAddComponent
              onClick={listType === 'tests' ? toggleModal('create') : toggleModal('add')}
              type={listType === 'tests' ? 'tests' : 'games'}
            />
          )}
        </FilteredList>
      </Container>
      <Portal>
        {(() => {
          if (listType === 'tests') {
            return (
              <>
                <CreateTestModal
                  toggleModal={toggleModal('create')}
                  showModal={showCreateTestModal}
                  setShowModal={setShowCreateTestModal}
                />
                <AssignComponentModal
                  componentId={selectedTest}
                  showModal={showAssignModal}
                  setShowModal={setShowAssignModal}
                  listType={listType}
                />
              </>
            );
          }
          if (listType === 'games') {
            return (
              <>
                <AddGameModal
                  toggleModal={toggleModal('add')}
                  showModal={showAddGameModal}
                  setShowModal={setShowAddGameModal}
                />
                <AssignComponentModal
                  componentId={selectedTest}
                  showModal={showAssignModal}
                  setShowModal={setShowAssignModal}
                  listType={listType}
                />
              </>
            );
          }
          return null;
        })()}
      </Portal>
    </div>
  );
};

export default ComponentList;
