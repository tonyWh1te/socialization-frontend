import { useState } from 'react';
import clsx from 'clsx';
import { Select } from '../../UI';
import styles from './Sort.module.css';

const Sort = ({ options, className, value, onSort = () => {} }) => {
  const [sortValue, setSortValue] = useState(value);

  const onChange = (event) => {
    setSortValue(event.target.value);
    onSort(event.target.value);
  };

  return (
    <Select
      options={options}
      className={clsx(styles.wrapper, className)}
      selectProps={{
        className: styles.select,
        name: 'sort',
        value,
        onChange,
      }}
    />
  );
};

export default Sort;
