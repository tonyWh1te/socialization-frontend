import { useGetTestQuery } from '../../api/editTestApiSlice';

const TestEditor = ({ id }) => {
  const { data: test, isLoading, isError } = useGetTestQuery(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <div>{test.title}</div>
      <div>{test.description}</div>
    </>
  );
};

export default TestEditor;
