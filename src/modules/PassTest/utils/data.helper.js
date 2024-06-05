// eslint-disable-next-line import/prefer-default-export
export const transformAnswers = (answers) =>
  Object.keys(answers).reduce((acc, key) => {
    const answersQuestion = answers[key];

    return Array.isArray(answersQuestion)
      ? [...acc, ...answersQuestion.map((a) => +a)]
      : [...acc, +answersQuestion];
  }, []);
