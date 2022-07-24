import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '../features/user/userApi'; 
import { setupListeners } from '@reduxjs/toolkit/query';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        user: userReducer,
        
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;