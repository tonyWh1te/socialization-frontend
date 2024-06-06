import clsx from 'clsx';
import styles from './Checkbox.module.css';

const Checkbox = ({ className, labelClassName, label, checkboxProps }) => (
  <div className={clsx(styles.wrapper, className)}>
    <label className={clsx(styles.label, labelClassName)}>
      <input
        // eslint-disable-next-line
        {...checkboxProps}
        type="checkbox"
        className={clsx(styles.checkbox, checkboxProps?.className)}
      />
      {label}
    </label>
  </div>
);

export default Checkbox;
