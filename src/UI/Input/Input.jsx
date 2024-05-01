import { useState } from 'react';
import clsx from 'clsx';
import { overallValidator } from '../../utils/helpers';
import styles from './Input.module.css';

const Input = (props) => {
  const {
    name,
    placeholder,
    onChange,
    value,
    className,
    rightIcon,
    label,
    validator = null,
    submissionError = '', // свойство нужно на случай, когда нужно показать ошибку при подтверждении формы
    resetSubmissionError = null,
    required = false,
    wrapperClassNames = '',
    type = 'text',
    ...inputProps
  } = props;
  const [touched, setTouched] = useState(false);
  const [isValid, setIsValid] = useState({ isValid: true });

  const validationHandler = (inputValue, validatorCallback) => {
    const validatorResponse = overallValidator(inputValue, {
      isRequired: required,
      individualValidator: validatorCallback,
    });

    setIsValid(validatorResponse);
  };

  const onChangeHandler = (onChangeCallback, validatorCallback) => (e) => {
    const inputValue = e.target.value;

    onChangeCallback(e);
    validationHandler(inputValue, validatorCallback);
  };

  const onTouch = () => {
    validationHandler(value, validator);
    setTouched(true);
  };

  const hasValidationErrors = !isValid?.isValid && touched;

  const wrapperClasses = clsx(styles.wrapper, {
    [wrapperClassNames]: !!wrapperClassNames,
  });
  const inputClasses = clsx(
    styles.input,
    { 'pr-10': rightIcon },
    { 'border-[#ff0000] bg-[#ff0000]/15': hasValidationErrors || submissionError },
    className,
  );

  return (
    <div
      className={wrapperClasses}
      role="presentation"
    >
      {label && (
        <label
          htmlFor={name}
          className={styles.label}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          className={inputClasses}
          type={type}
          aria-label={name}
          tabIndex={0}
          name={name}
          onChange={onChangeHandler(onChange, validator)}
          onBlur={onTouch}
          onFocus={resetSubmissionError}
          value={value}
          required={required}
          placeholder={placeholder}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...inputProps}
        />
        {rightIcon && <div className={styles.rightIcon}>{rightIcon}</div>}
      </div>

      {hasValidationErrors && !submissionError && (
        <span className={styles.error}>{isValid?.message}</span>
      )}

      {submissionError && <span className={styles.error}>{submissionError}</span>}
    </div>
  );
};

export default Input;
