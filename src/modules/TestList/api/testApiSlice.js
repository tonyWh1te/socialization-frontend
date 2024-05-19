import { apiSlice } from '../../../app/api/apiSlice';

const testApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTests: builder.query({
      query: (search) => ({
        url: '/tests/',
        params: {
          search,
        },
      }),
      providesTags: ['Tests'],
      transformResponse: (response) => response.results,
    }),
    deleteTest: builder.mutation({
      query: (id) => ({
        url: `/tests/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tests'],
    }),
    addTest: builder.mutation({
      query: (test) => ({
        url: '/tests/create_test/',
        method: 'POST',
        body: test,
      }),
      transformResponse: (response) => response.result.id,
      invalidatesTags: ['Tests'],
    }),
  }),
});

export const { useGetTestsQuery, useDeleteTestMutation, useAddTestMutation } = testApiSlice;
