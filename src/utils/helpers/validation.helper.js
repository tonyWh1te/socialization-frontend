/**
 * Common validator for form fields
 *
 * @param {any} value - The value to be validated.
 * @param {Object} options - The options for validation.
 * @param {boolean} options.isRequired - Indicates if the value is required.
 * @param {Function} options.individualValidator - The individual validator function.
 * @return {Object} - The validation result.
 * @return {boolean} return.isValid - Indicates if the value is valid.
 * @return {string} return.message - The validation error message, if any.
 */

// eslint-disable-next-line
export const overallValidator = (
  value,
  options = { isRequired: false, individualValidator: null },
) => {
  if (options.isRequired && !value) {
    return {
      isValid: false,
      message: 'Поле обязательно для заполнения',
    };
  }

  if (options.individualValidator) {
    return options.individualValidator(value);
  }

  return {
    isValid: true,
    message: '',
  };
};
