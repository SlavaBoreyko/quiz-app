export interface TestAnswersType {
    [key: number]: string; 
}
// bind
export interface TestQuestionType {
    title: string; 
    answers: TestAnswersType[],
    img: string; 
}
// bind
export interface TestType {
    id: string;
    testName: string;
    questions: TestQuestionType[];
}

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
    status: string;
    description: string;
}

export interface VerdictListType {
    [key: string]: VerdictType; 
}