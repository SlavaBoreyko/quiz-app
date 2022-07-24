
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { doc, collection, getDoc, serverTimestamp, addDoc } from 'firebase/firestore'
import { getVerdict } from '../../actions';
import { db } from '../../firebase.config';
import { DemoTest } from './userSlice';

const _ = require('lodash');

export interface FetchVerdictProps {
    key: string;
    points: number;
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        fetchAnswers: builder.query<any, void>({
            async queryFn() {
                try {
                    const docRef = doc(db, 'answers', 'AohXmgei07ZKxSrctZn8WSQcHjG3');
                    const querySnapshot = await getDoc(docRef);
                    const data = querySnapshot?.data();
                    return { data: data}
                } catch(err) {
                    return { error: err }
                }
            },                
        }),
        fetchVerdict: builder.query<any, FetchVerdictProps>({
            async queryFn({key, points}) {
                try {
                    const docRef = doc(db, "verdict", key);
                    const getVerdictDoc = await getDoc(docRef);
                    const dataVerdict = getVerdictDoc.data()
                    // const points = _.get(resData, `${key}.points`);
                    const verdictData = getVerdict(points, dataVerdict);
                    return { data: verdictData }
                } catch(err) {
                    return { error: err }
                }
            },
        }),
        addAnswer: builder.mutation({
            async queryFn(data: DemoTest) {
                try {
                    await addDoc(collection(db, 'answers'), {
                        ...data,
                        timestamp: serverTimestamp(),
                    });
                    return { data: 'Data was added' };
                } catch(err) {  
                    return { error: err };
                }
                   
            },
        }),
    }),
});

export const { useFetchAnswersQuery, useFetchVerdictQuery, useAddAnswerMutation } = userApi; 
