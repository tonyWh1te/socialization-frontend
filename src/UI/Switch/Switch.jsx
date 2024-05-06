import styles from './Switch.module.css';

const Switch = ({ onChange, checked, disabled = false, name, ariaLabel }) => {
  const handleChange = () => {
    onChange(!checked);
  };

  return (
    <label
      htmlFor={name}
      className={styles.switch}
      aria-label={ariaLabel}
    >
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      <span
        className={styles.slider}
        aria-hidden="true"
      />
    </label>
  );
};

export default Switch;
