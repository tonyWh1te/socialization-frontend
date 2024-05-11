import { Formik, FieldArray, Form } from 'formik';
import { nanoid } from '@reduxjs/toolkit';
import { useGetTestQuery } from '../../api/editTestApiSlice';
import { Container } from '../../../../UI';
import TestCard from '../TestCard/TestCard';
import QuestionPreview from '../QuestionPreview/QuestionPreview';
import TestCardWrapper from '../TestCardWrapper/TestCardWrapper';
import QuestionEdit from '../QuestionEdit/QuestionEdit';
import FormTop from '../FormTop/FormTop';
import { testSchema } from '../../utils/validation.helper';
import { onFieldArrayControl } from '../../utils/form.helper';
import styles from './TestEditor.module.css';

const TestEditor = ({ id }) => {
  const { data: test, isLoading, isError } = useGetTestQuery(id);

  const initQuestion = {
    title: 'Вопрос',
    type: 'text',
    answers: [],
    required: false,
    open: false,
  };

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
            initialValues={upgradeTest}
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
                  render={(arrayHelpers) =>
                    testValues.questions.map((question, index) => (
                      <TestCardWrapper
                        key={question.id}
                        qIndex={index}
                      >
                        <TestCard
                          active={question.open}
                          onClick={onFieldArrayControl(arrayHelpers.insert, index + 1, {
                            id: nanoid(),
                            ...initQuestion,
                          })}
                        >
                          {question.open ? (
                            <QuestionEdit
                              question={question}
                              qIndex={index}
                              arrayHelpers={arrayHelpers}
                            />
                          ) : (
                            <QuestionPreview question={question} />
                          )}
                        </TestCard>
                      </TestCardWrapper>
                    ))
                  }
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
