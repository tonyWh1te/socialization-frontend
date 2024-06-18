import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectCurrentUser } from '../../modules/Auth';
import { TestResult } from '../../modules/ResultTest';

const ResultTest = () => {
  const { id } = useParams();
  const user = useSelector(selectCurrentUser);

  return (
    <TestResult
      testId={id}
      userId={user?.id}
    />
  );
};

export default ResultTest;
