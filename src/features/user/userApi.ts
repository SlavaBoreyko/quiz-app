
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { 
  doc, getDoc, query,
  where, updateDoc, collection, 
  getDocs 
} from 'firebase/firestore';
import { getVerdict } from '../../actions';
import { db } from '../../firebase.config';
import { UserAnswersType } from './userSlice';

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

export interface updateFollowingList {
  id: string;
  bloggerId: string;
}


export interface setLanguage {
  id: string;
  language: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['UserAnswersType', 'FollowingList'],
  endpoints: (builder) => ({
    fetchAnswers: builder.query<UserAnswersType, string>({
      async queryFn(userId) {
        try {
          const docRef = doc(db, "users", userId);
          const userDoc = await getDoc(docRef);
          const userData = userDoc.data();

          return { data: userData!.answers};
        } catch(err) {
          return { error: err };
        }
      }, 
      providesTags: ['UserAnswersType'],               
    }),

    fetchFollowingList: builder.query<string[], string>({
      async queryFn(userId) {
        try {
          const docRef = doc(db, "users", userId);
          const userDoc = await getDoc(docRef);
          const userData = userDoc.data();

          let followingList: string[] = [];
          if(userData && userData.following) {
            followingList = userData.following;
          }
          return { data: followingList};
        } catch(err) {
          return { error: err };
        }
      }, 
      providesTags: ['FollowingList'],               
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
          return { data: verdictData };
        } catch(err) {
          return { error: err };
        }
      },
      providesTags: ['UserAnswersType'],  
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
          });
          return { data: 'addAnswer 200' };
        } catch(err) {  
          return { error: err };
        }
                   
      },
      invalidatesTags: ['UserAnswersType'],
    }),
    follow: builder.mutation<any, updateFollowingList>({
      async queryFn({id, bloggerId}) {
        try {
          const userDocRef = doc(db, "users", id);
          const userDoc = await getDoc(userDocRef);
          if(userDoc.exists()) {
            const userDocData = userDoc.data();
            if(userDocData.following && 
                            !userDocData.following.includes(bloggerId)
            ) {
              await updateDoc(userDocRef, {
                following: [
                  ...userDocData!.following, bloggerId,
                ]
              });
              console.log('following: [...following, bloggerId]');

            } else if (userDocData.following === undefined 
                            || userDocData.following.length < 1
            )  {
              // create following array
              await updateDoc(userDocRef, {
                following: [bloggerId]
              });
              console.log('following: [bloggerId]');
            }
          }
          return { data: 'follow 200' };
        } catch(err) {  
          return { error: err };
        }
      },
      invalidatesTags: ['FollowingList'],  
    }),

    unfollow: builder.mutation<any, updateFollowingList>({
      async queryFn({id, bloggerId}) {
        try {
          const userDocRef = doc(db, "users", id);
          const userDoc = await getDoc(userDocRef);
                    

          console.log('unfollow before userDocData!.following');
                    
          if(userDoc.exists()) {
            const userDocData = userDoc.data();
            if(userDocData.following 
                            && userDocData.following.includes(bloggerId)
            ) {
              const followingList = userDocData!.following;
              const index = followingList.indexOf(bloggerId);
              if (index !== -1) {
                followingList.splice(index, 1);
              }
              console.log('followingList after Splice', followingList);
              await updateDoc(userDocRef, {
                following: [
                  ...followingList,
                ]
              });
            }
          } 
          return { data: 'unfollow 200' };
        } catch(err) {  
          return { error: err };
        }
      },
      invalidatesTags: ['FollowingList'],  
    }),

    addLanguage: builder.mutation<any, setLanguage>({
      async queryFn({id, language}) {
        try {
          const userDocRef = doc(db, "users", id);
          // const userDoc = await getDoc(userDocRef);
          // const userDocData = userDoc.data();

          await updateDoc(userDocRef, {
            language: language
          });
          return { data: 'addLanguage 200' };
        } catch(err) {  
          return { error: err };
        } 
      },
      // invalidatesTags: ['User'],
    }),
  }),
});

export const { 
  useFetchAnswersQuery, 
  useFetchVerdictQuery, 
  useAddAnswerMutation,
  useFollowMutation,
  useUnfollowMutation,
  useFetchFollowingListQuery,
} = userApi; 
