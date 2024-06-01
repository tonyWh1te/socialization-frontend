import { useField } from 'formik';
import Select from '../../Select/Select';

const FormikSelect = ({ name, options, className, onChange, selectProps }) => {
  const [field] = useField(name);
  const { onChange: onChangeField, ...fieldProps } = field;

  const fieldOnChange = (e) => {
    onChangeField(e);

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <Select
      className={className}
      options={options}
      selectProps={{
        ...fieldProps,
        ...selectProps,
        className,
        onChange: fieldOnChange,
      }}
    />
  );
};

export default FormikSelect;
