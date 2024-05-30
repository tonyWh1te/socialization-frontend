import { Form } from 'formik';
import { InputText } from '../../../../UI';

const CreateTestForm = ({ isSubmitting, handleSubmit }) => (
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
);

export default CreateTestForm;
