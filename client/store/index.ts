import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/slices/userSlice";
import { api } from "@/state/api";

export const store = configureStore({
  // reducer: { user: userReducer }
  reducer: { 
    user: userReducer,
    [api.reducerPath]: api.reducer 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
