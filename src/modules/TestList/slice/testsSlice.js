import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
};

const testsSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
  },
});

const { actions, reducer } = testsSlice;

export const { setSearch } = actions;
export default reducer;
