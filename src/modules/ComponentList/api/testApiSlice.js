import { apiSlice } from '../../../app/api/apiSlice';

const testApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTests: builder.query({
      query: (params) => {
        const { search, sort } = params;
        return {
          url: '/tests/',
          params: {
            search,
            ordering: sort,
          },
        };
      },
      providesTags: ['Tests'],
      transformResponse: (response) => response.results,
    }),
    getObserverTests: builder.query({
      query: (params) => {
        const { id } = params;
        return {
          url: `/tests/${id}/get_user_tests/`,
        };
      },
      transformResponse: (response) => response.result.tests,
      providesTags: ['ObservedTests'],
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
    assignTest: builder.mutation({
      query: (data) => ({
        url: '/tests/appoint_test/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Observeds'],
    }),
  }),
});

export const {
  useGetTestsQuery,
  useDeleteTestMutation,
  useAddTestMutation,
  useAssignTestMutation,
  useGetObserverTestsQuery,
} = testApiSlice;
