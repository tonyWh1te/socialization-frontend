import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  sortValue: 'id',
  selectedTest: null,
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

    setSelectedTest(state, action) {
      state.selectedTest = action.payload;
    },
  },
});

const { actions, reducer } = testsSlice;

export const { setSearch, setSortValue, setSelectedTest } = actions;
export default reducer;
