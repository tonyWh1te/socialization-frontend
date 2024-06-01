import { Formik, Form } from 'formik';
import { useGetTestQuery } from '../../../../app/api/common/testApiSlice';

import { SpinnerBig, ErrorMessage, Container, Button } from '../../../../UI';
import TestHeader from '../TestHeader/TestHeader';
import QuestionItem from '../QuestionItem/QuestionItem';

import { createValidationShema } from '../../utils/validation.helper';
import styles from './TestForm.module.css';

const TestForm = ({ testId, userId }) => {
  const { data: test, isLoading, isError } = useGetTestQuery(testId);

  const initValues = {};

  if (isLoading) {
    return <SpinnerBig className="mt-10" />;
  }

  if (isError) {
    return (
      <ErrorMessage
        message="Ошибка загрузки теста"
        className="mt-10"
      />
    );
  }

  if (test) {
    test.questions.forEach((q) => {
      initValues[q.id] = q.type === 'checkbox' ? [] : '';
    });
  }

  const onSubmit = (values) => {
    console.log({ test_id: +testId, user_id: userId, values: values });
  };

  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.inner}>
          <TestHeader
            title={test.title}
            description={test.description}
          />
          <Formik
            initialValues={initValues}
            onSubmit={onSubmit}
            validationSchema={createValidationShema(test?.questions || [])}
          >
            {({ handleSubmit }) => (
              <Form
                method="post"
                className={styles.form}
              >
                {test.questions.map((question) => (
                  <QuestionItem
                    key={question.id}
                    question={question}
                  />
                ))}
                <Button
                  type="submit"
                  disabled={false}
                  onClick={handleSubmit}
                >
                  Отправить
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </div>
  );
};

export default TestForm;
