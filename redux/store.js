import { configureStore } from "@reduxjs/toolkit";
import tweetsReducer from "./slices/tweets";

const store = configureStore({
  reducer: {
    tweets: tweetsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
