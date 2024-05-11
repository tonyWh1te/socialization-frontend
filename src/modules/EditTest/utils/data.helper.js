/**
 * Transforms the test object by mapping over its questions and answers.
 *
 * @param {Object} test - The test object to be transformed.
 * @return {Object} The transformed test object with updated questions and answers.
 */
// eslint-disable-next-line import/prefer-default-export
export const transformTest = (test) => {
  const transformedQuestions = test.questions.map((q) => {
    const { open, id: idQ, ...restQ } = q;

    const transformedAnswers = q.answers.map((a) => {
      const { id: idA, ...restA } = a;
      return restA;
    });

    return { ...restQ, answers: transformedAnswers };
  });

  return { ...test, questions: transformedQuestions };
};
