import { TestQuestionType, ResultType, TestType } from '../types/test.types'

const data: TestType[] = [
{
    id: '101',
    testName: 'Test 1', 
    questions: 
    [{ 
        title: 'Чи часто ти виправляєш свою дівчину?', 
        answers: [
            { 1: '1 Awww, poor baby. Too afraid of the scary game sprites? I laugh at you.'},
            { 2: '2 Awww, poor baby. Too afraid of the scary game sprites? I laugh at you.'},
            { 3: '3 Awww, poor baby. Too afraid of the scary game sprites? I laugh at you.'},
        ],
        img: 'img/man1.png',
    },
    { 
        title: 'Question 2', 
        answers: [
            { 1: '4 Awww, poor baby. Too afraid of the scary game sprites? I laugh at you.'},
            { 2: '5 Awww, poor baby. Too afraid of the scary game sprites? I laugh at you.'},
            { 3: '6 Awww, poor baby. Too afraid of the scary game sprites? I laugh at you.'},
        ],
        img: 'img/gym.webp',
    },
    { 
        title: 'Question 3', 
        answers: [
            { 1: '7 Awww, poor baby. Too afraid of the scary game sprites? I laugh at you.'},
            { 2: '8 Awww, poor baby. Too afraid of the scary game sprites? I laugh at you.'},
            { 3: '9 Awww, poor baby. Too afraid of the scary game sprites? I laugh at you.'},
        ],
        img: '',
    },
    { 
        title: 'Question 4', 
        answers: [
            { 1: '4. Awww, poor baby. Too afraid of the scary game sprites? I laugh at you.'},
            { 2: '4 Awww, poor baby. Too afraid of the scary game sprites? I laugh at you.'},
            { 3: '4 Awww, poor baby. Too afraid of the scary game sprites? I laugh at you.'},
        ],
        img: '',
    },
    { 
        title: 'Question 5', 
        answers: [
            { 1: '5. Awww, poor baby. Too afraid of the scary game sprites? I laugh at you.'},
            { 2: '5. Awww, poor baby. Too afraid of the scary game sprites? I laugh at you.'},
            { 3: '5. Awww, poor baby. Too afraid of the scary game sprites? I laugh at you.'},
        ],
        img: '',
    },
    { 
        title: 'Question 6', 
        answers: [
            { 1: '6. Awww, poor baby. Too afraid of the scary game sprites? I laugh at you.'},
            { 2: '6. Awww, poor baby. Too afraid of the scary game sprites? I laugh at you.'},
            { 3: '6. Awww, poor baby. Too afraid of the scary game sprites? I laugh at you.'},
        ],
        img: '',
    }],
},
{
    id: '102',
    testName: 'Test 2', 
    questions: 
    [{ 
        title: '2 Чи часто ти виправляєш свою дівчину?', 
        answers: [
            { 1: '1 Awww, poor baby. Too afraid of the scary game sprites? I laugh at you.'},
            { 2: '2 Awww, poor baby. Too afraid of the scary game sprites? I laugh at you.'},
            { 3: '3 Awww, poor baby. Too afraid of the scary game sprites? I laugh at you.'},
        ],
        img: 'img/man1.png',
    },
    { 
        title: 'Question 2', 
        answers: [
            { 1: '4 Awww, poor baby. Too afraid of the scary game sprites? I laugh at you.'},
            { 2: '5 Awww, poor baby. Too afraid of the scary game sprites? I laugh at you.'},
            { 3: '6 Awww, poor baby. Too afraid of the scary game sprites? I laugh at you.'},
        ],
        img: 'img/gym.webp',
    },
    { 
        title: 'Question 3', 
        answers: [
            { 1: '7 Awww, poor baby. Too afraid of the scary game sprites? I laugh at you.'},
            { 2: '8 Awww, poor baby. Too afraid of the scary game sprites? I laugh at you.'},
            { 3: '9 Awww, poor baby. Too afraid of the scary game sprites? I laugh at you.'},
        ],
        img: '',
    }]
},
]

const result: ResultType[] = [
    {   
        id: 101,
        testName: 'Test 1',
        results: 
        [
            {
                status: 'Alpha',
                points: 45,
                description: `45 Alpha, poor baby. Too afraid of the scary game sprites? 
                Alpha, poor baby. Too afraid of the scary game sprites? 
                IAlpha, poor baby. Too afraid of the Alpha, poor baby. 
                Too afraid of the scary game sprites? I scary game sprites? I`,
            },
            {
                status: 'Betha',
                points: 30,
                description: `30 Betha, poor baby. Too afraid of the scary game sprites? 
                Alpha, poor baby. Too afraid of the scary game sprites? 
                IAlpha, poor baby. Too afraid of the Alpha, poor baby. 
                Too afraid of the scary game sprites? I scary game sprites? I`,
            },
            {
                status: 'Gamma',
                points: 20,
                description: `20 Gamma, poor baby. Too afraid of the scary game sprites? 
                            Alpha, poor baby. Too afraid of the scary game sprites? 
                            IAlpha, poor baby. Too afraid of the Alpha, poor baby. 
                            Too afraid of the scary game sprites? I scary game sprites? I`,
            },
        ]
    },
]



export const getTest = async (id: TestType['id']): Promise<TestType | undefined> => (
    data.find((test) => (test.id === id))
) ;

export const getAllTests = async (): Promise<TestType[]> => data;

export const getResult = async (id: ResultType['id'], points: number) => {

    const resultData = result.find((res) => (res.id === id));
    if (resultData) {
        if (points < resultData.results[2].points) {
            return resultData.results[2]
        }
        else if (points < resultData.results[0].points) {
            return resultData.results[1]
        } 
        else return resultData.results[0];
    }
    else return;
}
