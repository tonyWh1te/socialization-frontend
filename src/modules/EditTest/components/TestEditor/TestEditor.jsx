import { Formik, FieldArray, Form } from 'formik';
import { nanoid } from '@reduxjs/toolkit';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { useGetTestQuery } from '../../api/editTestApiSlice';
import { Container } from '../../../../UI';
import FormTop from '../FormTop/FormTop';
import AddQuestionButton from '../AddQuestionButton/AddQuestionButton';
import QuestionList from '../QuestionList/QuestionList';
import { testSchema } from '../../utils/validation.helper';
import { onFieldArrayControl } from '../../utils/form.helper';
import { INITIAL_QUESTION } from '../../utils/constants';
import styles from './TestEditor.module.css';

const TestEditor = ({ id }) => {
  const { data: test, isLoading, isError } = useGetTestQuery(id);

  const upgradeTest = {
    ...test,
    questions: [
      {
        id: 1,
        title: 'Title',
        type: 'radio',
        answers: [
          { id: 1, text: 'Answer1' },
          { id: 2, text: 'Answer2' },
          { id: 3, text: 'Answer3' },
        ],
        required: true,
        open: false,
      },
      {
        id: 2,
        title: 'super Title',
        type: 'text',
        answers: [],
        required: true,
        open: false,
      },
      {
        id: 3,
        title: 'super Title',
        type: 'text',
        answers: [],
        required: true,
        open: false,
      },
    ],
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.inner}>
          <Formik
            initialValues={test}
            onSubmit={() => {}}
            validationSchema={testSchema}
          >
            {({ values: testValues }) => (
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
                      >
                        <PlusCircleIcon className="icon h-8 w-8 fill-gray-500" />
                      </AddQuestionButton>
                    );
                  }}
                />
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </div>
  );
};

export default TestEditor;
