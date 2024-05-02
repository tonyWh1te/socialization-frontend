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
      query: (id) => `/tests/${id}/`,
    }),
  }),
});

export const { useEditTestMutation, useGetTestQuery } = editTestApiSlice;
