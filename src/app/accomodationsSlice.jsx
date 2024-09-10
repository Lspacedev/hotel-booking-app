import { createSlice } from "@reduxjs/toolkit";

export const accomodationsSlice = createSlice({
  name: "accomodations",
  initialState: {
    accomodations: [],
    searchTerm: {},
    searchResults: [],
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setAccomodations: (state, action) => {
      state.accomodations = action.payload;
    },
  },
});
export const { setSearchTerm, setSearchResults, setAccomodations } =
  accomodationsSlice.actions;

export default accomodationsSlice.reducer;
