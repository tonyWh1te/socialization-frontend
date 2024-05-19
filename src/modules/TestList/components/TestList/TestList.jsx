import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetTestsQuery } from '../../api/testApiSlice';
import { setSearch } from '../../slice/testsSlice';
import { selectSearchValue } from '../../slice/selectors';

import { Portal, FilteredList } from '../../../../components';
import { Container } from '../../../../UI';
import TestListItem from '../TestListItem/TestListItem';
import ButtonAddTest from '../ButtonAddTest/ButtonAddTest';
import CreateTestModal from '../CreateTestModal/CreateTestModal';
import styles from './TestList.module.css';

const TestList = () => {
  const [showModal, setShowModal] = useState(false);

  const searchValue = useSelector(selectSearchValue);
  const {
    data: tests,
    isLoading,
    isError,
    isFetching,
  } = useGetTestsQuery(searchValue.toLowerCase());

  const dispatch = useDispatch();

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  if (isLoading || isFetching) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>;
  }

  if (isError) {
    return <div style={{ textAlign: 'center' }}>Error</div>;
  }

  const onSearch = (query) => {
    dispatch(setSearch(query));

    return null;
  };

  return (
    <div className={styles.wrapper}>
      <Container>
        <FilteredList
          items={tests}
          onSearch={onSearch}
        >
          {(data) => (
            <>
              <ButtonAddTest onClick={toggleModal} />
              {data.map((test) => (
                <TestListItem
                  key={test.id}
                  test={test}
                />
              ))}
            </>
          )}
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
