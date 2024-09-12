import { createSlice } from "@reduxjs/toolkit";

export const accomodationsSlice = createSlice({
  name: "accomodations",
  initialState: {
    accomodations: [],
    bookings: [],
    searchTerm: {},
    searchResults: [],
    checkInOut: {},
    guests: 0,
    location: "",
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
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },
    setCheckInOut: (state, action) => {
      state.checkInOut = action.payload;
    },
  },
});
export const {
  setSearchTerm,
  setSearchResults,
  setAccomodations,
  setBookings,
  setCheckInOut,
} = accomodationsSlice.actions;

export default accomodationsSlice.reducer;
