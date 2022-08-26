import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import userReducer from '../features/user/userSlice';
import { userApi } from '../features/user/userApi'; 
import { testApi } from '../features/test/testApi';
import { bloggerApi } from '../features/blogger/bloggerApi';


export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [testApi.reducerPath]: testApi.reducer,
        [bloggerApi.reducerPath]: bloggerApi.reducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
              // Ignore these action types
              ignoredActions: ['userApi.endpoints.fetchFollowingList'],
              // Ignore these field paths in all actions
              ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
              // Ignore these paths in the state
              ignoredPaths: ['items.dates'],
            },
          }).concat(userApi.middleware)
        .concat(testApi.middleware).concat(bloggerApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;