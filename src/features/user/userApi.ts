
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { 
    doc, collection, getDoc, serverTimestamp, addDoc, query, where, getDocs, updateDoc 
} from 'firebase/firestore'
import { getVerdict } from '../../actions';
import { db } from '../../firebase.config';
import { UserAnswersType } from './userSlice';

const _ = require('lodash');

export interface fetchedAnswersType {
    [key:string]: {
        answersArray: number[];
        points: number;
    }
}

export interface FetchVerdictProps {
    key: string;
    points: number;
}

export interface updateAnswersProps {
    id: string;
    data: UserAnswersType;
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['UserAnswersType'],
    endpoints: (builder) => ({
        fetchAnswers: builder.query<UserAnswersType, string>({
            async queryFn(userId) {
                try {
                    const docRef = doc(db, "users", userId);
                    const userDoc = await getDoc(docRef);
                    const userData = userDoc.data()

                    return { data: userData!.answers}
                } catch(err) {
                    return { error: err }
                }
            }, 
            providesTags: ['UserAnswersType'],               
        }),

        fetchVerdict: builder.query<any, FetchVerdictProps>({
            async queryFn({key, points}) {
                try {
                    const docRef = doc(db, "verdict", key);
                    const getVerdictDoc = await getDoc(docRef);
                    const dataVerdict = getVerdictDoc.data()
                    const verdictData = getVerdict(points, dataVerdict);
                    return { data: verdictData }
                } catch(err) {
                    return { error: err }
                }
            },
        }),
        addAnswer: builder.mutation<any, updateAnswersProps>({
            async queryFn({id, data}) {
                try {
                    const userDocRef = doc(db, "users", id);
                    // !!! change to add to 'answers' field implicity 
                    await updateDoc(userDocRef, {
                        answers: {
                            ...data,
                        }
                    })
                    return { data: 'addAnswer 200' }
                } catch(err) {  
                    return { error: err };
                }
                   
            },
            invalidatesTags: ['UserAnswersType'],
        }),
    }),
});

export const { useFetchAnswersQuery, useFetchVerdictQuery, useAddAnswerMutation } = userApi; 
