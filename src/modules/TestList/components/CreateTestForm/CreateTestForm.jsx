import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { useAddTestMutation } from '../../api/testApiSlice';
import { InputText } from '../../../../UI';
import { newTestSchema } from '../../utils/validation.helper';

const CreateTestForm = ({ toggleModal }) => {
  const initialState = {
    title: '',
    description: '',
    questions: [],
  };

  const [addTest] = useAddTestMutation();

  const navigate = useNavigate();

  const onSubmit = async (values, { resetForm }) => {
    try {
      const testId = await addTest(values).unwrap();

      resetForm({ values: initialState });
      toggleModal();
      navigate(`/tests/${testId}/edit`);
    } catch (error) {
      toast.error(error?.data?.detail || 'Что-то пошло не так');
    }
  };

  return (
    <Formik
      initialValues={initialState}
      onSubmit={onSubmit}
      validationSchema={newTestSchema}
    >
      {({ isSubmitting, handleSubmit }) => (
        <Form method="post">
          <InputText
            wrapperClassNames="h-[115px]"
            name="title"
            type="text"
            label="Название"
          />
          <InputText
            wrapperClassNames="h-auto"
            as="textarea"
            name="description"
            type="text"
            label="Описание"
          />
          <button
            onClick={handleSubmit}
            type="submit"
          >
            {isSubmitting ? 'Добавление...' : 'Добавить'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateTestForm;
