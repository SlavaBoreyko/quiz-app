import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {userApi} from './userApi';

import { getAuth } from 'firebase/auth';

export interface UserAnswersType {
    [key: string]: {
        answersArray: number[];
        points: number;
        // timestamp: any;
    }
}

export interface UserState {
    id: string | undefined;
    name: string | null | undefined;
    email: string | null | undefined;
    photoUrl: string | null | undefined;
    answers: UserAnswersType | undefined; 
    language?: string;
    following?: string[];
}

const userInitState: UserState = {
        id: undefined,
        name: undefined,
        email: undefined,
        photoUrl: undefined,
        answers: undefined,
        language: undefined,
        following: undefined,
}

const userSlice = createSlice({
    name: 'user',
    initialState: userInitState,
    reducers: {
        setCurrentUser(state: UserState) {
            const auth = getAuth();
            state.id = auth.currentUser?.uid;
            state.name = auth.currentUser?.displayName;
            state.email = auth.currentUser?.email;
            state.photoUrl = auth.currentUser?.photoURL;
            const UserLanguage = localStorage.getItem('i18nextLng');
            state.language = (UserLanguage !== null && UserLanguage !== undefined) ? UserLanguage : 'ua';
            // state.following =auth.currentUser?.following
            // state.language = localStorage.getItem('i18nextLng') !== null ? localStorage.getItem('i18nextLng') : 'ua';
        },
        addDemoAnswer(state: UserState, action: PayloadAction<UserAnswersType>) {
            localStorage.setItem('demoTest', JSON.stringify(action.payload));
        },
        addUserLanguage(state: UserState, action: PayloadAction<string>) {
            state.language = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder.addMatcher(
            userApi.endpoints.fetchAnswers.matchFulfilled,
            (state, { type, payload }) => {
                state.answers = payload
            },
        );
        builder.addMatcher(
            userApi.endpoints.fetchFollowingList.matchFulfilled,
            (state, { type, payload }) => {
                state.following = payload
            },
        );
    }
    // (builder) => {
    //     builder.addMatcher(
    //         userApi.endpoints.fetchAnswers.matchFulfilled,
    //         (state, { payload }) => {
    //             state.answers = payload
    //         },
    //     )
    // },
});

export const { setCurrentUser, addDemoAnswer, addUserLanguage } = userSlice.actions;
export default userSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.user;