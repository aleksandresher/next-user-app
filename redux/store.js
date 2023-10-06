import { configureStore } from "@reduxjs/toolkit";
import usersSliceReducer from "./features/user-slice";

export const store = configureStore({
  reducer: {
    users: usersSliceReducer,
  },
});

export default store;
