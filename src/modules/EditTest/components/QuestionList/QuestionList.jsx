import { nanoid } from '@reduxjs/toolkit';
import TestCardWrapper from '../TestCardWrapper/TestCardWrapper';
import TestCard from '../TestCard/TestCard';
import QuestionPreview from '../QuestionPreview/QuestionPreview';
import QuestionEdit from '../QuestionEdit/QuestionEdit';
import { onFieldArrayControl } from '../../utils/form.helper';
import { INITIAL_QUESTION } from '../../utils/constants';

const QuestionList = ({ questions, arrayHelpers }) =>
  questions.map((question, index) => (
    <TestCardWrapper
      key={question.id}
      qIndex={index}
    >
      <TestCard
        active={question.open}
        onClick={onFieldArrayControl(arrayHelpers.insert, index + 1, {
          id: nanoid(),
          ...INITIAL_QUESTION,
        })}
      >
        {question.open ? (
          <QuestionEdit
            question={question}
            qIndex={index}
            arrayHelpers={arrayHelpers}
          />
        ) : (
          <QuestionPreview question={question} />
        )}
      </TestCard>
    </TestCardWrapper>
  ));

export default QuestionList;
