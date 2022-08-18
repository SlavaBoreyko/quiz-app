
// Compound Test Type: 
export interface AnswerTestType {
    answer: string;
    points: number;
    reaction?: string;

}
export interface QuestionTestType {
    question: string;
    img: string;
    answers: AnswerTestType[];
}

export interface SimpleBloggerType {
    avatar: string;
    name: string;
}
export interface TestType {
    id: string;
    testName: string;
    blogger: SimpleBloggerType;
    cover: string;
    questions: QuestionTestType[];
    sumPoints: number;
}
// Add 


//
export interface TestAnswersType {
    [key: number]: string; 
}
// bind

export interface ResultsListType {
    status: string;
    points: number;
    description: string;
}

export interface ResultType {
    id: number,
    testName: string;
    results: ResultsListType[],
}

export interface VerdictType {
    minPoints: number;
    status: string;
    icon: string;
    description: string;
    blogLink?: string;
}

export interface VerdictListType {
    testId: string;
    verdicts: VerdictType[]; 
}