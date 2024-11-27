import { createSlice } from "@reduxjs/toolkit";

export const accomodationsSlice = createSlice({
  name: "accomodations",
  initialState: {
    accomodations: [],
    bookings: [],
    searchTerm: {},
    searchResults: [],
    checkInOut: {},
    guests: {},
    location: "",
    filters: { filters: [] },
    sort: {},
    tags: { tags: [] },
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
    setGuests: (state, action) => {
      state.guests = action.payload;
    },
    setFilters: (state, action) => {},
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setTags: (state, action) => {
      const type = action.payload.type;
      const tags = state.tags.tags;

      if (type === "ADD") {
        state.tags.tags = [...tags, action.payload.filter];
      } else if (type === "REMOVE") {
        state.tags.tags = tags.filter((tag) => tag !== action.payload.filter);
      }
    },
  },
});
export const {
  setSearchTerm,
  setSearchResults,
  setAccomodations,
  setBookings,
  setCheckInOut,
  setGuests,
  setFilters,
  setSort,
  setTags,
} = accomodationsSlice.actions;

export default accomodationsSlice.reducer;
