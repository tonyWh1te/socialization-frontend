import clsx from 'clsx';
import styles from './Radio.module.css';

const Radio = ({ className, label, radioProps }) => (
  <div className={clsx(styles.wrapper, className)}>
    <label className={styles.label}>
      <input
        // eslint-disable-next-line
        {...radioProps}
        type="radio"
        className={clsx(styles.radio, radioProps?.className)}
      />
      {label}
    </label>
  </div>
);

export default Radio;
