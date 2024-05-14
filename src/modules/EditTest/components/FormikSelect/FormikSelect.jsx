import { useField } from 'formik';
import clsx from 'clsx';
import styles from './FormikSelect.module.css';

const FormikSelect = ({
  name,
  options,
  className,
  onChange,
  ariaLabel = 'Выбор варианта',
  ...selectProps
}) => {
  const [field] = useField(name);
  const { onChange: onChangeField, ...fieldProps } = field;

  const classNames = clsx(styles.select, className);

  const fieldOnChange = (e) => {
    onChangeField(e);

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <select
      className={classNames}
      name={name}
      aria-label={ariaLabel}
      onChange={fieldOnChange}
      /* eslint-disable */
      {...fieldProps}
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
