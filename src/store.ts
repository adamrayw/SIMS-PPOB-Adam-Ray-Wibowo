import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import balanceReducer from './features/saldo/saldoSlice';
import layananReducer from './features/layanan/layananSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    saldo: balanceReducer,
    layanan: layananReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch