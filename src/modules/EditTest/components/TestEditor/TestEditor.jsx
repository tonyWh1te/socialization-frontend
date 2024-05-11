import { Formik, FieldArray, Form } from 'formik';
import { nanoid } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { useGetTestQuery, useEditTestMutation } from '../../api/editTestApiSlice';
import { Container, Button, SpinnerMini } from '../../../../UI';
import FormTop from '../FormTop/FormTop';
import AddQuestionButton from '../AddQuestionButton/AddQuestionButton';
import QuestionList from '../QuestionList/QuestionList';
import { testSchema } from '../../utils/validation.helper';
import { onFieldArrayControl } from '../../utils/form.helper';
import { transformTest } from '../../utils/data.helper';
import { INITIAL_QUESTION } from '../../utils/constants';
import styles from './TestEditor.module.css';

const TestEditor = ({ id }) => {
  const { data: test, isLoading, isError } = useGetTestQuery(id);

  const [editTest, { isLoading: isLoadingEdit }] = useEditTestMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const onSubmit = async (values) => {
    try {
      const transformedTest = transformTest(values);

      await editTest(transformedTest);

      toast.success('Тест сохранен');
    } catch (error) {
      toast.error(error?.data?.detail || 'Что-то пошло не так');
    }
  };

  const submitBtnText = isLoadingEdit ? <SpinnerMini /> : 'Сохранить';

  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.inner}>
          <Formik
            initialValues={test}
            onSubmit={onSubmit}
            validationSchema={testSchema}
          >
            {({ values: testValues, handleSubmit }) => (
              <Form
                method="post"
                className={styles.form}
              >
                <FormTop />
                <FieldArray
                  name="questions"
                  render={(arrayHelpers) => {
                    const { questions } = testValues;

                    return questions && questions.length > 0 ? (
                      <QuestionList
                        questions={questions}
                        arrayHelpers={arrayHelpers}
                      />
                    ) : (
                      <AddQuestionButton
                        onClick={onFieldArrayControl(arrayHelpers.push, {
                          id: nanoid(),
                          ...INITIAL_QUESTION,
                        })}
                        className="self-end"
                      >
                        <PlusCircleIcon className="icon h-8 w-8 fill-gray-500" />
                      </AddQuestionButton>
                    );
                  }}
                />

                <Button
                  className={styles.button}
                  type="submit"
                  disabled={isLoadingEdit}
                  onClick={handleSubmit}
                >
                  {submitBtnText}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </div>
  );
};

export default TestEditor;
