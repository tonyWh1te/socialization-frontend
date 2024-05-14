import { useFormikContext } from 'formik';

const TestCardWrapper = ({ qIndex, children }) => {
  const { setFieldValue, values } = useFormikContext();

  const onSetActive = (activeIndex) => () => {
    if (!values.questions[activeIndex].open) {
      values.questions.map((_, index) => setFieldValue(`questions[${index}].open`, false));

      setFieldValue(`questions[${activeIndex}].open`, true);
    }
  };

  return (
    <div
      role="presentation"
      onClick={onSetActive(qIndex)}
    >
      {children}
    </div>
  );
};

export default TestCardWrapper;
