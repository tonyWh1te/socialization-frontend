import { useState } from 'react';
import { useGetObservedsByTutorQuery } from '../../../../app/api/common/usersApiSlice';
import { FilteredList, Portal } from '../../../../components';
import { Container, ButtonAddItemList, Modal, ModalLayout } from '../../../../UI';
import ObservedItem from '../ObservedItem/ObservedItem';
import AssignObserveds from '../AssignObserveds/AssignObserveds';
import styles from './ObservedList.module.css';

const sortList = [
  {
    label: 'По умолчанию',
    value: 'id',
  },
  {
    label: 'По имени (А-Я)',
    value: 'name',
  },
];

const ObservedList = ({ userId }) => {
  const [searchValue, setSearchValue] = useState('');
  const [sortValue, setSortValue] = useState('id');
  const [showModal, setShowModal] = useState(false);

  const {
    data: curObserveds,
    isLoading,
    isError,
    isFetching,
  } = useGetObservedsByTutorQuery(userId);

  const onSort = (value) => {
    setSortValue(value);
  };

  const onSearch = (query) => {
    setSearchValue(query);
  };

  const onShowModal = () => {
    setShowModal(true);
  };

  return (
    <div className={styles.wrapper}>
      <Container>
        <FilteredList
          items={curObserveds}
          isError={isError}
          sortList={sortList}
          onSearch={onSearch}
          onSort={onSort}
          isLoading={isLoading || isFetching}
          renderItemContent={(user) => <ObservedItem user={user} />}
        >
          <ButtonAddItemList onClick={onShowModal}>Добавить наблюдаемых</ButtonAddItemList>
        </FilteredList>
      </Container>

      <Portal>
        <Modal
          active={showModal}
          setActive={setShowModal}
        >
          <ModalLayout
            title="Добавить наблюдаемых"
            content={
              // eslint-disable-next-line
              <AssignObserveds
                curObserveds={curObserveds}
                userId={userId}
                showModal={setShowModal}
              />
            }
          />
        </Modal>
      </Portal>
    </div>
  );
};

export default ObservedList;
