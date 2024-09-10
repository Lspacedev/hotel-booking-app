import { configureStore } from "@reduxjs/toolkit";
import accomodationsReducer from "./accomodationsSlice";

export default configureStore({
  reducer: {
    accomodations: accomodationsReducer,
  },
});
