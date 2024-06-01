import { createSlice } from '@reduxjs/toolkit';

// TODO: сделать универсальным для игр и тестов

const initialState = {
  testSearch: '',
  sortValue: 'id',
  selectedTest: null,
};

const testsSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    setTestSearch(state, action) {
      state.testSearch = action.payload;
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

export const { setTestSearch, setSortValue, setSelectedTest } = actions;
export default reducer;
