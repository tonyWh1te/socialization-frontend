import { useGetTestQuery } from '../../../../app/api/common/testApiSlice';

import { SpinnerBig, ErrorMessage, Container } from '../../../../UI';
import styles from './TestForm.module.css';

const TestForm = ({ id }) => {
  const { data: test, isLoading, isError } = useGetTestQuery(id);

  if (isLoading) {
    return <SpinnerBig className="mt-10" />;
  }

  if (isError) {
    return (
      <ErrorMessage
        message="Ошибка загрузки теста"
        className="mt-10"
      />
    );
  }

  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.inner} />
      </Container>
    </div>
  );
};

export default TestForm;
