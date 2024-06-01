import { useField } from 'formik';
import Radio from '../../Radio/Radio';

const FormikRadio = ({ className, label, radioProps }) => {
  const { className: radioClassName, ...otherProps } = radioProps;

  const [field] = useField(otherProps);

  return (
    <Radio
      label={label}
      className={className}
      radioProps={{
        ...field,
        ...radioProps,
        className: radioClassName,
      }}
    />
  );
};

export default FormikRadio;
