import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  sortValue: 'id',
};

const testsSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },

    setSortValue(state, action) {
      state.sortValue = action.payload;
    },
  },
});

const { actions, reducer } = testsSlice;

export const { setSearch, setSortValue } = actions;
export default reducer;
