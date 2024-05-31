import { useField } from 'formik';
import Checkbox from '../Checkbox/Checkbox';

const FormikCheckbox = ({ className, name, onChange, label, checkboxProps }) => {
  const [field] = useField(name);
  const { onChange: onChangeField, ...fieldProps } = field;

  const fieldOnChange = (e) => {
    onChangeField(e);

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <Checkbox
      label={label}
      className={className}
      checkboxProps={{
        onChange: fieldOnChange,
        ...checkboxProps,
        ...fieldProps,
      }}
    />
  );
};

export default FormikCheckbox;
