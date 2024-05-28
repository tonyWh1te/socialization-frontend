import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../modules/Auth';
import { TestList } from '../../modules/TestList';

function Tests() {
  const currentUser = useSelector(selectCurrentUser);

  return <TestList currentUser={currentUser} />;
}

export default Tests;
