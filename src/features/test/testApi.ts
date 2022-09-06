
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { 
  doc, collection, getDoc, 
  addDoc, query, where, 
  getDocs, setDoc 
} from 'firebase/firestore';
import { db } from '../../firebase.config';
import { TestCardType, TestType, VerdictListType } from '../../types/test.types';


export const testApi = createApi({
  reducerPath: 'testApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Test', 'TestCard', 'Verdict'],
  endpoints: (builder) => ({
    fetchTest: builder.query<any, string | undefined>({
      async queryFn(testId) {
        if(testId) {
          try {
            const docRef = doc(db, "tests", testId);
            const testDoc = await getDoc(docRef);
            const testData = testDoc.data();

            return { data: testData};
          } catch(err) {
            return { error: err };
          }
        } else {
          return { error: 'testId is undefined' };
        }
      },
      providesTags: ['Test'],                 
    }),
    fetchTestsCardByAudience: builder.query<TestCardType[], string>({
      async queryFn(audienceType) {
        let TestsCardList: any[] = [];
        try {
          const q = query(
            collection(db, "testsCards"), 
            where("audience", "array-contains", audienceType),
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => 
            TestsCardList.push(doc.data())
          );
          return { data: TestsCardList};
        } catch(err) {
          return { error: err };
        }
      },              
    }),
    fetchTestsByBloggerId: builder.query<any, string>({
      async queryFn(bloggerId) {
        let arrayTests: any[] = [];
        try {
          const q = query(
            collection(db, "testsCards"), 
            where("blogger.id", "==", bloggerId),
            // orderBy("desc"),
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => arrayTests.push(doc.data()));

          // setListings((prevState) => [...prevState, ...listingsList])
          return { data: arrayTests};
        } catch(err) {
          return { error: err };
        }
      },
      providesTags: ['TestCard'],                 
    }),
    fetchTestsCardsByListId: builder.query<any, string[] | undefined>({
      async queryFn(listId) {
        // empty listId[] triggers firebase query error
        if(listId && listId.length !== 0) {
          let arrayTests: any[] = [];
          try {
            const q = query(
              collection(db, "testsCards"), 
              where("id", "in", listId),
              // orderBy("desc"),
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => arrayTests.push(doc.data()));
            return { data: arrayTests};
          } catch(err) {
            return { error: err };
          }
        } else {
          return { data: [] };
        }

      },
      providesTags: ['TestCard'],                 
    }),
    addTest: builder.mutation<any, TestType>({
      async queryFn(data) {
        try {
          await setDoc(doc(db, 'tests', data.id), {
            ...data,
          });
          return { data: 'Added Test Success' };
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
          });
          return { data: 'Added Verdict Success' };
        } catch(err) {  
          return { error: err };
        }
                   
      },
      invalidatesTags: ['Verdict'],
    }),
  }),
});

export const { 
  useFetchTestQuery, 
  useAddTestMutation, 
  useFetchTestsCardByAudienceQuery,
  useFetchTestsByBloggerIdQuery,
  useFetchTestsCardsByListIdQuery,
} = testApi; 
