
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { 
    doc, collection, getDoc, serverTimestamp, addDoc, query, where, getDocs, updateDoc, setDoc 
} from 'firebase/firestore'
import { db } from '../../firebase.config';

export const bloggerApi = createApi({
    reducerPath: 'bloggerApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        fetchBlogger: builder.query<any, string>({
            async queryFn(id) {
                let blogger: any[] = [];
                try {
                    const q = query(
                                collection(db, "bloggers"), 
                                where("id", "==", id),
                              );
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        return blogger.push(doc.data());
                    });
                    return { data:  blogger[0]}
                } catch(err) {
                    return { error: err }
                }
            },              
        }),
    }),
});

export const { useFetchBloggerQuery } = bloggerApi; 
