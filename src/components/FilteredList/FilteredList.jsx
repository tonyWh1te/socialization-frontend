import Sort from '../Sort/Sort';
import SearchBar from '../SearchBar/SearchBar';
import styles from './FilteredList.module.css';

const FilteredList = ({ items, children, onSearch = () => {}, onSort = () => {} }) => (
  <div className={styles.wrapper}>
    <form className={styles.form}>
      <SearchBar
        onSearch={onSearch}
        className={styles.searchBar}
      />
      <Sort onSort={onSort} />
    </form>

    <ul className={styles.list}>{children(items)}</ul>
  </div>
);
export default FilteredList;
