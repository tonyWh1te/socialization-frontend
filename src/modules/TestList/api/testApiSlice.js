import { apiSlice } from '../../../app/api/apiSlice';

const QUERY_URL = 'https://abb84c0f7ff172d6.mokky.dev';

const testApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTests: builder.query({
      query: () => `${QUERY_URL}/tests`,
      providesTags: ['Tests'],
    }),
    deleteTest: builder.mutation({
      query: (id) => ({
        url: `${QUERY_URL}/tests/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tests'],
    }),
    addTest: builder.mutation({
      query: (test) => ({
        url: `${QUERY_URL}/tests`,
        method: 'POST',
        body: test,
      }),
      transformResponse: (response) => response.id,
      invalidatesTags: ['Tests'],
    }),
  }),
});

export const { useGetTestsQuery, useDeleteTestMutation, useAddTestMutation } = testApiSlice;
