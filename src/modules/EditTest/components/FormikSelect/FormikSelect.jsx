import { useField } from 'formik';
import { Select } from '../../../../UI';

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
      className="w-1/2"
      options={options}
      selectProps={{
        className,
        name,
        onChange: fieldOnChange,
        ...fieldProps,
        ...selectProps,
      }}
    />
  );
};

export default FormikSelect;
