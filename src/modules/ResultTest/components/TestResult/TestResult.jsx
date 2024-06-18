import { useGetResultTestQuery } from '../../api/resultTestApiSlice';
import { SpinnerBig, ErrorMessage, Container, TestHeader } from '../../../../UI';
import TestResultBody from '../TestResultBody/TestResultBody';
import TestResultFooter from '../TestResultFooter/TestResultFooter';
import styles from './TestResult.module.css';

const TestResult = ({ testId, userId }) => {
  const { data, isError, isLoading, isFetching } = useGetResultTestQuery({
    test_id: testId,
    user_id: userId,
  });

  if (isLoading || isFetching) {
    return <SpinnerBig className="mt-10" />;
  }

  //   if (isError) {
  //     return (
  //       <ErrorMessage
  //         message="Ошибка загрузки теста"
  //         className="mt-10"
  //       />
  //     );
  //   }

  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.inner}>
          <TestHeader
            title="Тест на гея"
            description="Тест пройден"
          />
          <TestResultBody />
          <TestResultFooter />
        </div>
      </Container>
    </div>
  );
};

export default TestResult;
