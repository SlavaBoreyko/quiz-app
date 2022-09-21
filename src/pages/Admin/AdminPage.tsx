import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Container from '../../components/Containers/Container/Container';
import { useAddTestMutation } from '../../features/test/testApi';
import { storage } from '../../firebase.config';
import { QuestionTestType, TestType } from '../../types/test.types';
import s from './AdminPage.module.scss';

export interface TestInputsType {
  testName: string;
  cover: string;
}

export const InitialStyte = {
  id: '',
  testName: {
    ua: '',
    or: '',
    pl: '',
  },
  blogger: {
    id: '',
    avatar: '',
    name: {
      ua: '',
      or: '',
      pl: '',
    },
  },
  cover: '',
  questions: [],
  sumPoints: 0,
  payment: 'free',
  price: '',
};

const QuestionInitState = {
  question: {
    pl: '',
    ua: '',
    or: '',
  },
  img: '',
  answers: [],
};

const answersArrayInitState = [
  {   
    points: 0,
    answer: ''
  },
  {   
    points: 0,
    answer: ''
  },
  {   
    points: 0,
    answer: ''
  },
];

const AdminPage = () => {

  const [pageForm, setPageForm] = useState<number>(0);
  const [dataTest, setDataTest] = useState<TestType>(InitialStyte);
  // const { id, testName, cover } = dataTest;
  // File ? 
  const [file, setFile] = useState<any>('');
  const [progress, setProgress] = useState<number | undefined>(undefined);
    
  const [ addTest ] = useAddTestMutation();

  const [questionArray, setQuestionArray] = useState<QuestionTestType[]>([]);
  const [question, setQuestion] = useState<QuestionTestType>(QuestionInitState);
  const [answersArray, setAnswersArray] = useState<any[]>(answersArrayInitState);


  const uploadFile = () => {
    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = 
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is ", + progress + "% done");
        setProgress(progress);
        switch(snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
        default:
          break;  
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          toast.success("Image upload successfully");
          if(pageForm === 0) {
            setDataTest((prev) => ({...prev, cover: downloadURL}));
          } else {
            setQuestion((prev) => ({...prev, img: downloadURL}));
          }
                    
        });
      }
    );
  };

  useEffect(() => {
    file && uploadFile();
  }, [file]);

  const handleChangeAnswers = (e: any, index: number) => {
    setAnswersArray((prevArr) => { 
      let array =  [...prevArr];
      let answer = array[index];
      if(e.target.type === 'number') {
        answer[e.target.name] = +e.target.value;
      } else {
        answer[e.target.name] = e.target.value;
      }
      array[index] = answer;

      return [...array];
    });
        
  };

  const handleChangeTestMain = (e: any) => {
    setDataTest((prev) => ({...prev, [e.target.name]: e.target.value }));
  };

  const handleChange = (e: any) => {
    setQuestion((prev) => ({...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    const saveTest = {...dataTest, questions: [...questionArray]};
    if(pageForm > 0) {
      await addTest(saveTest);
    }
  };

  const clearForm = () => {
    setQuestion({...QuestionInitState});

    setAnswersArray(
      [
        {   
          points: 0,
          answer: ''
        },
        {   
          points: 0,
          answer: ''
        },
        {   
          points: 0,
          answer: ''
        },
      ]
    );
  };

  const nextHandler = (e: any) => {
    e.preventDefault();
    (pageForm > 0) && setQuestionArray((prev) => [...prev, { ...question, answers: answersArray}]);
    clearForm();
    setPageForm((prev) => (prev += 1));
  };

  console.log('dataTest', dataTest);
  console.log('questionArray', questionArray);
    
  return (
    <Container justifyContent='flex-start' locked={false}>
      <form className={s.answersDiv}>
    
        {(pageForm === 0) && (
          <>
            <input 
              type="text" 
              className={s.styleInput}
              value={dataTest.testName.ua} 
              name='testName'
              placeholder='Test Name'
              onChange={handleChangeTestMain}
            />
            <input 
              type="text" 
              className={s.styleInput}
              value={dataTest.id} 
              name='id'
              placeholder='Test id'
              onChange={handleChangeTestMain}
            />
            <input 
              type="file" 
              // value={file} 
              className={s.styleInput}
              name='file' 
              onChange={(e) => {
                const file = (e.target as HTMLInputElement).files;
                if(file) {
                  setFile(file[0]);
                }
              }}/>
          </>
        )}
        

        {/* <input type="text" value={testName} name='testName' onChange={handleChange}/> */}
        {/* <textarea rows={2} /> */}

        {/* <label htmlFor='question'>Question:</label> */}

        {(pageForm > 0) && (
          <>
            <input 
              type="text" 
              value={question.question.ua} 
              className={s.styleInput}
              name='question'
              placeholder='Question'
              onChange={handleChange}
            />
                
            <div className={s.answersDiv}>
              {   
                answersArray.map((answer, index) => (
                  <div className={s.horizonFlex}>
                    <input 
                      className={s.pointsInput}
                      key={`${index}-points`}
                      type="number" 
                      value={answer.points} 
                      name='points'
                      onChange={(e) => handleChangeAnswers(e, index)}
                    />
                    <input 
                      key={`${index}-answer`}
                      className={s.styleInput}
                      type="text" 
                      value={answer.answer} 
                      name='answer'
                      placeholder={`Answer ${index+1}`}
                      onChange={(e) => handleChangeAnswers(e, index)}
                    />
                  </div>
                ))
              }
            </div>

            <input 
              type="file" 
              // value={file} 
              className={s.styleInput}
              name='file' 
              onChange={(e) => {
                const file = (e.target as HTMLInputElement).files;
                if(file) {
                  setFile(file[0]);
                }
              }}/>
          </>
        )}

        <button 
          className={s.styleInput}
          disabled={progress !== undefined && progress < 100}
          onClick={nextHandler}
        >Next +</button>
        <button 
          className={s.styleInput}
          disabled={progress !== undefined && progress < 100}
          onClick={handleSubmit}
        >Save Test</button>
      </form>
    </Container>
  );
};

export default AdminPage;