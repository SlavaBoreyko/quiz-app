
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { 
    doc, collection, getDoc, serverTimestamp, addDoc, query, where, getDocs, updateDoc, setDoc 
} from 'firebase/firestore'
import { db } from '../../firebase.config';
import { TestType, VerdictListType } from '../../types/test.types';

const _ = require('lodash');

export const testApi = createApi({
    reducerPath: 'testApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Test', 'Verdict'],
    endpoints: (builder) => ({
        fetchTest: builder.query<any, string>({
            async queryFn(testId) {
                try {
                    const docRef = doc(db, "tests", testId);
                    const testDoc = await getDoc(docRef);
                    const testData = testDoc.data()

                    return { data: testData}
                } catch(err) {
                    return { error: err }
                }
            },
            providesTags: ['Test'],                 
        }),
        addTest: builder.mutation<any, TestType>({
            async queryFn(data) {
                try {
                    await setDoc(doc(db, 'tests', data.id), {
                        ...data,
                    })
                    return { data: 'Added Test Success' }
                } catch(err) {  
                    return { error: err };
                }
                   
            },
            invalidatesTags: ['Test'],
        }),
        addVerdict: builder.mutation<any, VerdictListType>({
            async queryFn(data) {
                try {
                    await addDoc(collection(db, 'verdict'), {
                        ...data,
                    })
                    return { data: 'Added Verdict Success' }
                } catch(err) {  
                    return { error: err };
                }
                   
            },
            invalidatesTags: ['Verdict'],
        }),
    }),
});

export const { useFetchTestQuery, useAddTestMutation } = testApi; 
