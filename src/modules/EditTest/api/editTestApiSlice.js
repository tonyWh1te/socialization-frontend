import { apiSlice } from '../../../app/api/apiSlice';

const editTestApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    editTest: builder.mutation({
      query: (test) => ({
        url: `/tests/${test.id}/create_questions/`,
        method: 'POST',
        body: test,
      }),
      invalidatesTags: ['Tests'],
    }),
    getTest: builder.query({
      query: (id) => `/tests/${id}/get_single_test/`,
      keepUnusedDataFor: 0.1,
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
