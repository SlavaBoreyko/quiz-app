
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { 
  collection, query, where,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../../firebase.config';
import { BloggerBigType } from '../../types/test.types';

export interface followingProps {
  id: string;
  value: 1 | -1;
}

export const bloggerApi = createApi({
  reducerPath: 'bloggerApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    fetchBlogger: builder.query<BloggerBigType, string>({
      async queryFn(id) {
        let blogger: any[] = [];
        try {
          const q = query(
            collection(db, "bloggers"), 
            where("id", "==", id),
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => blogger.push(doc.data()));
          return { data:  blogger[0]};
        } catch(err) {
          return { error: err };
        }
      },              
    }),
    fetchBloggerListByAudience: builder.query<BloggerBigType[], string>({
      async queryFn(audienceType) {
        let bloggersList: any[] = [];
        try {
          const q = query(
            collection(db, "bloggers"), 
            where("audience", "array-contains", audienceType),
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => 
            bloggersList.push(doc.data())
          );
          return { data:  bloggersList};
        } catch(err) {
          return { error: err };
        }
      },
    }),
    following: builder.mutation<any, followingProps>({
      async queryFn({id, value}) {
        try {
          const q = query(
            collection(db, "bloggers"), 
            where("id", "==", id),
          );
          const findBlogerDocs = await getDocs(q);
          const blogerRef = doc(db, "bloggers", findBlogerDocs.docs[0].id);
          const blogerDoc = await getDoc(blogerRef);
          if(blogerDoc.exists()) {
            await updateDoc(blogerRef, {
              followers: blogerDoc.data().followers + value
            });
          }
          return { data: '' };
        } catch (error) {
          // console.log(error);
          return { error };
        }
      }
    }),
    testComplete: builder.mutation<any, string>({
      async queryFn(id) {
        try {
          const q = query(
            collection(db, "bloggers"), 
            where("id", "==", id),
          );
          const findBlogerDocs = await getDocs(q);
          const blogerRef = doc(db, "bloggers", findBlogerDocs.docs[0].id);
          const blogerDoc = await getDoc(blogerRef);

          if(blogerDoc.exists()) {
            await updateDoc(blogerRef, {
              passedTests: blogerDoc.data().passedTests + 1
            });
          }
          return { data: '' };
        } catch (error) {
          // console.log(error);
          return { error };
        }
      }
    }),
  }),
});

export const { 
  useFetchBloggerQuery,
  useFollowingMutation,
  useTestCompleteMutation,
  useFetchBloggerListByAudienceQuery
} = bloggerApi; 
