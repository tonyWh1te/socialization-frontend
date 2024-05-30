import { useParams } from 'react-router-dom';
import { TestForm } from '../../modules/PassTest';

const PassTest = () => {
  const { id } = useParams();

  return <TestForm id={id} />;
};

export default PassTest;
