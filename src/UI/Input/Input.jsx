import { useState } from 'react';
import clsx from 'clsx';
import styles from './Input.module.css';

const Input = (props) => {
  const {
    name,
    placeholder,
    onChange,
    value,
    errorMessage,
    required,
    className,
    rightIcon,
    wrapperClassNames = '',
    type = 'text',
    ...inputProps
  } = props;

  const [focused, setFocused] = useState(false);

  const onFocus = () => {
    setFocused(true);
  };

  const wrapperClasses = clsx(styles.wrapper, {
    [wrapperClassNames]: !!wrapperClassNames,
  });
  const inputClasses = clsx('peer', styles.input, className, { 'pr-10': rightIcon });
  const errorClasses = clsx('peer-invalid:peer-data-[focused=true]:visible', styles.error);

  return (
    <div
      className={wrapperClasses}
      role="presentation"
    >
      <input
        className={inputClasses}
        type={type}
        aria-label={name}
        data-testid={name}
        tabIndex={0}
        name={name}
        onChange={onChange}
        onBlur={onFocus}
        data-focused={focused}
        value={value}
        required={required}
        placeholder={placeholder}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...inputProps}
      />
      {rightIcon && <div className={styles.rightIcon}>{rightIcon}</div>}
      <span className={errorClasses}>{errorMessage}</span>
    </div>
  );
};

export default Input;
