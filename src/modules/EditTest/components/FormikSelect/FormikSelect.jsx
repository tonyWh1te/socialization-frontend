import { useField } from 'formik';
import clsx from 'clsx';
import styles from './FormikSelect.module.css';

const FormikSelect = ({
  name,
  options,
  className,
  ariaLabel = 'Выбор варианта',
  ...selectProps
}) => {
  const [field] = useField(name);

  const classNames = clsx(styles.select, className);

  return (
    <select
      className={classNames}
      name={name}
      aria-label={ariaLabel}
      /* eslint-disable */
      {...field}
      {...selectProps}
      /* eslint-enable */
    >
      {options.map(({ value, label }) => (
        <option
          key={value}
          value={value}
          className={styles.option}
        >
          {label}
        </option>
      ))}
    </select>
  );
};

export default FormikSelect;
