
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { 
  collection, query, where,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  addDoc,
  setDoc,
} from 'firebase/firestore';
import { db } from '../../firebase.config';
import { validationDataType } from '../../types/code.types';
import { BloggerBigType, CreateBloggerType } from '../../types/test.types';

export interface followingProps {
  id: string;
  value: 1 | -1;
}

export interface updateBloggerType {
  bloggerId: string;
  formData: BloggerBigType;
}

export const bloggerApi = createApi({
  reducerPath: 'bloggerApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['BloggerData', 'InviteCode'],
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
      providesTags: ['BloggerData'],    
    }),
    validateInviteCode: builder.query<validationDataType, string | undefined>({
      async queryFn(inviteCode) {
        let code: any[] = [];
        if(inviteCode) {
          try {
            const q = query(
              collection(db, "invite-code"), 
              where("code", "==", inviteCode),
            );
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
              return { 
                data:  {
                  id: undefined,
                  validated: false
                }
              };
            }
            else querySnapshot.forEach(
              (doc) => code.push({
                id: doc.id,
                data: doc.data()
              }));

            if (code[0].data.used === false) 
              return { 
                data:  {
                  id: code[0].id,
                  validated: true,
                }
              };
            if (code[0].data.used === true )
              return { 
                data:  {
                  id: code[0].id,
                  validated: false,
                }
              };
            return { 
              data:  {
                id: undefined,
                validated: false,
              }
            };
          } catch(err) {
            return { error: err };
          }
        } else return { 
          data:  {
            id: undefined,
            validated: false
          }
        };
      },   
      providesTags: ['InviteCode'],    
    }),
    disabledInviteCode: builder.mutation<any, string>({
      async queryFn(idCode) {
        try {
          const docRef = doc(db, "invite-code", idCode);
          const updateCode = await updateDoc(docRef, {
            used: true,
          });
          return { data:  {disabled: 'true'}};
        } catch(err) {
          return { error: err };
        }
      },
      // invalidatesTags: ['InviteCode'],               
    }),
    createNewBlogger: builder.mutation<any, CreateBloggerType>({
      async queryFn(formData) {
        try {
          console.log({...formData});
          const docRef = await addDoc(collection(db, "bloggers"), {
            ...formData
          });
          // reference to users collection
          const docRefUser = doc(db, 'users', formData.userId);
          const updateUser = await updateDoc(docRefUser, {
            blogger:{ 
              id: docRef.id,
              nickname: formData.id,
            }
          });
          return { data:  {id: docRef.id}};
        } catch(err) {
          return { error: err };
        }
      },
      invalidatesTags: ['BloggerData'],               
    }),
    updateBloggerById: builder.mutation<any, any>({
      async queryFn({ bloggerId, formData }) {
        try {
          const docRefBlogger = doc(db, 'bloggers', bloggerId);
          const updateBlogger = await updateDoc(docRefBlogger, {...formData});
          return { data:  'Updated success'};
        } catch(err) {
          return { error: err };
        }
      }, 
      invalidatesTags: ['BloggerData'],               
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
          return { error };
        }
      }
    }),
  }),
});

export const { 
  useValidateInviteCodeQuery,
  useDisabledInviteCodeMutation,
  useCreateNewBloggerMutation,
  useUpdateBloggerByIdMutation,
  useFetchBloggerQuery,
  useFollowingMutation,
  useTestCompleteMutation,
  useFetchBloggerListByAudienceQuery,
} = bloggerApi; 
