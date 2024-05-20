import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetTestsQuery } from '../../api/testApiSlice';
import { setSearch, setSortValue } from '../../slice/testsSlice';
import { selectSearchValue, selectSortValue } from '../../slice/selectors';

import { Portal, FilteredList } from '../../../../components';
import { Container } from '../../../../UI';
import TestListItem from '../TestListItem/TestListItem';
import ButtonAddTest from '../ButtonAddTest/ButtonAddTest';
import CreateTestModal from '../CreateTestModal/CreateTestModal';
import styles from './TestList.module.css';

const TestList = () => {
  const [showModal, setShowModal] = useState(false);

  const searchValue = useSelector(selectSearchValue);
  const sortValue = useSelector(selectSortValue);

  const {
    data: tests,
    isLoading,
    isError,
    isFetching,
  } = useGetTestsQuery({ search: searchValue.toLowerCase(), sort: sortValue });

  const dispatch = useDispatch();

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const onSearch = (query) => {
    dispatch(setSearch(query));
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
          renderItemContent={(test) => <TestListItem test={test} />}
        >
          <ButtonAddTest onClick={toggleModal} />
        </FilteredList>
      </Container>
      <Portal>
        <CreateTestModal
          toggleModal={toggleModal}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </Portal>
    </div>
  );
};

export default TestList;
