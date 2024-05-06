import { Formik, FieldArray, Form } from 'formik';
import { useGetTestQuery } from '../../api/editTestApiSlice';
import { Container, InputText } from '../../../../UI';
import TestCard from '../TestCard/TestCard';
import QuestionPreview from '../QuestionPreview/QuestionPreview';
import QuestionEdit from '../QuestionEdit/QuestionEdit';
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
        open: true,
      },
      {
        id: 2,
        title: 'super Title',
        type: 'text',
        answers: [],
        required: true,
        open: true,
      },
      // {
      //   title: 'Title',
      //   type: 'input',
      //   required: true,
      // },
      // {
      //   title: 'Title',
      //   type: 'textarea',
      //   required: true,
      // },
      // {
      //   title: 'Title',
      //   type: 'checkbox',
      //   answers: [
      //     { id: 1, text: 'Answer1' },
      //     { id: 2, text: 'Answer2' },
      //     { id: 3, text: 'Answer3' },
      //   ],
      //   required: true,
      // },
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
          >
            <Form
              method="post"
              className={styles.form}
            >
              <TestCard className={styles.formTop}>
                <InputText
                  name="title"
                  placeholder="Название теста"
                />
                <InputText
                  name="description"
                  placeholder="Описание теста"
                  as="textarea"
                />
              </TestCard>

              <FieldArray
                name="questions"
                render={(arrayHelpers) =>
                  upgradeTest.questions.map((question, index) => (
                    <TestCard
                      key={question.id}
                      active={question.open}
                    >
                      {question.open ? (
                        <QuestionEdit
                          question={question}
                          index={index}
                        />
                      ) : (
                        <QuestionPreview question={question} />
                      )}
                    </TestCard>
                  ))
                }
              />
            </Form>
          </Formik>
        </div>
      </Container>
    </div>
  );
};

export default TestEditor;
