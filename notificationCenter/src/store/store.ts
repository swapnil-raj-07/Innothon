import { configureStore } from '@reduxjs/toolkit'
import notificationReduer from "../actions/notificationSlice"

export const store = configureStore({
  reducer: {
    notificationState: notificationReduer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const notificationSelect = (state:RootState) => state.notificationState