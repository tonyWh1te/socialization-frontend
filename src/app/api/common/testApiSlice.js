import { apiSlice } from '../apiSlice';

const testApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTest: builder.query({
      query: (id) => `/tests/${id}/get_single_test/`,
      keepUnusedDataFor: 0.1,
      transformResponse: (response) => response.result,
    }),
  }),
});

// eslint-disable-next-line
export const { useGetTestQuery } = testApiSlice;
