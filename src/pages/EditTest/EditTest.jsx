import { useParams } from 'react-router-dom';

const EditTest = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>
        Редактирование теста
        {id}
      </h1>
    </div>
  );
};

export default EditTest;
