
// Compound Test Type: 
export interface AnswerTestType {
    answer: {
        ua: string;
        or: string
    }; 
    points: number;
    reaction?: string;

}
export interface QuestionTestType {
    question: {
        ua: string;
        or: string
    }; 
    img: string;
    answers: AnswerTestType[];
}

export interface SimpleBloggerType {
    id: string;
    avatar: string;
    name: {
        ua: string;
        or: string
    }; 
}
export interface TestType {
    id: string;
    testName: {
        ua: string;
        or: string
    }; 
    blogger: SimpleBloggerType;
    cover: string;
    questions: QuestionTestType[];
    sumPoints: number;
}

export interface TestCardType {
    id: string;
    testName: {
        ua: string;
        or: string
    }; 
    blogger: SimpleBloggerType;
    cover: string;
    qLength: number;
}

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