import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./slices/couterSlice";
import plantsReducer from "./slices/plantsSlice";

export const store = configureStore({
  reducer: { counter: counterReducer, plants : plantsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
