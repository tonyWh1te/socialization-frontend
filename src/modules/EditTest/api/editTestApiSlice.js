import { apiSlice } from '../../../app/api/apiSlice';

const editTestApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    editTest: builder.mutation({
      query: (test) => ({
        url: `/tests/${test.id}/`,
        method: 'PATCH',
        body: test,
      }),
    }),
    getTest: builder.query({
      query: (id) => `/tests/${id}/get_single_test/`,
      transformResponse: (response) => {
        const test = response.result;
        const transformedQuestions = test.questions.map((question) => ({
          ...question,
          open: false,
        }));

        return { ...test, questions: transformedQuestions };
      },
    }),
  }),
});

export const { useEditTestMutation, useGetTestQuery } = editTestApiSlice;
