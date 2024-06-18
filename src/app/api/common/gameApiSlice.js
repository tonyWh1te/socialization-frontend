import { apiSlice } from '../apiSlice';

const gameApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGame: builder.query({
      query: (id) => `/games_list/${id}/`,
      keepUnusedDataFor: 0.1,
    }),
  }),
});

// eslint-disable-next-line
export const { useGetGameQuery } = gameApiSlice;
