export type AnswersType = number[]; 

// DEmo 
export interface DemoTestType {
    id: number;
    points: number;
    AnswersArray: AnswersType;
}

export interface UserAnswersType {
    [key: string]: {
        points: number;
        answersArray: AnswersType;
    }
}
