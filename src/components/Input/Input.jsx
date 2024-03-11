import { useState } from 'react';
import clsx from 'clsx';
import styles from './Input.module.css';

const Input = (props) => {
  const {
    name,
    onChange,
    value,
    errorMessage,
    required,
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
  const inputClasses = clsx('peer', styles.input);
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
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...inputProps}
      />

      <span className={errorClasses}>{errorMessage}</span>
    </div>
  );
};

export default Input;
