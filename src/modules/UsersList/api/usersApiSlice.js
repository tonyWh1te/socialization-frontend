import { apiSlice } from '../../../app/api/apiSlice';

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (data) => ({
        url: '/users/register_user/',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

// eslint-disable-next-line
export const { useAddUserMutation } = usersApiSlice;
