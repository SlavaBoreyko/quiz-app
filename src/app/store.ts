import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { userApi } from '../features/user/userApi'; 
import { testApi } from '../features/test/testApi';
import userReducer from '../features/user/userSlice';


export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [testApi.reducerPath]: testApi.reducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(userApi.middleware)
        .concat(testApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;