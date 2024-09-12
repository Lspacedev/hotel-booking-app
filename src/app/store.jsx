import { configureStore } from "@reduxjs/toolkit";
import accomodationsReducer from "./accomodationsSlice";
import userReducer from "./userSlice";

export default configureStore({
  reducer: {
    accomodations: accomodationsReducer,
    user: userReducer,
  },
});
