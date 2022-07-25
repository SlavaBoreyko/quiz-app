import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {userApi} from './userApi';

import { getAuth } from 'firebase/auth';

export interface UserAnswersType {
    [key: string]: {
        answersArray: number[];
        points: number;
    }
}

export interface UserState {
    id: string | undefined;
    name: string | null | undefined;
    email: string | null | undefined;
    answers: UserAnswersType | undefined; 
}

const userInitState: UserState = {
        id: undefined,
        name: undefined,
        email: undefined,
        answers:undefined,
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
        },
        addDemoAnswer(state: UserState, action: PayloadAction<UserAnswersType>) {
            localStorage.setItem('demoTest', JSON.stringify(action.payload));
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            userApi.endpoints.fetchAnswers.matchFulfilled,
            (state, { payload }) => {
                state.answers = payload
            }
        )
      },
});

export const { setCurrentUser, addDemoAnswer } = userSlice.actions;
export default userSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.user;