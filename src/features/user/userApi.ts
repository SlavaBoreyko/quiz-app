
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { 
    doc, getDoc, serverTimestamp, addDoc, query, where, updateDoc, collection, getDocs 
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
    testId: string;
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
            async queryFn({testId, points}) {
                try {
                    // const docRef = doc(db, "verdict", key); 
                    const q = query(collection(db, "verdict"), where("testId", "==", testId));
                    const querySnapshot = await getDocs(q); 

                    let verdictsList: any;
                    querySnapshot.forEach((doc) => {
                        verdictsList = doc.data();
                    });

                    const verdictData = getVerdict(points, verdictsList);
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
                    const userDoc = await getDoc(userDocRef);
                    const userDocData = userDoc.data();

                    await updateDoc(userDocRef, {
                        answers: {
                            ...userDocData!.answers, ...data,
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
