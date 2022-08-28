
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { 
  collection, query, where,
  getDocs,
} from 'firebase/firestore';
import { db } from '../../firebase.config';
import { BloggerBigType } from '../../types/test.types';

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
  }),
});

export const { 
  useFetchBloggerQuery,
  useFetchBloggerListByAudienceQuery,
} = bloggerApi; 
