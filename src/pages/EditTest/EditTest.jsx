import { useParams } from 'react-router-dom';
import { TestEditor } from '../../modules/EditTest';

const EditTest = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Редактирование теста</h1>

      <TestEditor id={id} />
    </div>
  );
};

export default EditTest;
