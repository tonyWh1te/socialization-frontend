import Sort from '../Sort/Sort';
import SearchBar from '../SearchBar/SearchBar';
import styles from './FilteredList.module.css';

const FilteredList = ({
  items,
  children,
  isLoading,
  isError,
  renderItemContent = () => {},
  onSearch = () => {},
  onSort = () => {},
}) => {
  const sortList = [
    {
      label: 'По умолчанию',
      value: 'id',
    },
    {
      label: 'По имени',
      value: 'title',
    },
    {
      label: 'По дате',
      value: 'created_at',
    },
  ];

  const renderItems = (data, renderItem) => {
    const renderedItems = data?.map((item) => (
      <li
        className={styles.listItem}
        key={item?.id}
      >
        {renderItem(item)}
      </li>
    ));

    return <ul className={styles.list}>{renderedItems}</ul>;
  };

  const loading = isLoading ? <div style={{ textAlign: 'center' }}>Loading...</div> : null;

  const error = isError ? <div style={{ textAlign: 'center' }}>Error</div> : null;

  const content = !isLoading && !isError ? renderItems(items, renderItemContent) : null;

  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <SearchBar
          onSearch={onSearch}
          className={styles.searchBar}
        />
        <Sort
          className={styles.sortWrapper}
          onSort={onSort}
          options={sortList}
        />
      </form>
      {children}
      {loading}
      {error}
      {content}
    </div>
  );
};

export default FilteredList;
