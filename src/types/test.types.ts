
// Compound Test Type: 
export interface AnswerTestType {
    answer: {
        pl: string;
        ua: string;
        or: string
    }; 
    points: number;
    reaction?: string;

}
export interface QuestionTestType {
    question: {
        pl: string;
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
        pl: string;
        ua: string;
        or: string;
    }; 
}
export interface BloggerBigType {
    id: string;
    avatar: string;
    mainBlog: {
        pl: string;
        ua: string;
        or: string;
        soc: string; //insta, youtube,tiktok
        followers: number;
        link: string; 
    }
    name: {
        pl: string;
        ua: string;
        or: string;
    }; 
    description: {
        pl: string;
        ua: string;
        or: string;
    }; 
    topics: {
        pl: string;
        ua: string;
        or: string;
    }
    audience: string[];
    followers: number;
    passedTests: number;
}

export interface CreateBloggerType {
    avatar: string;
    id: string;
    userId: string;
    userEmail: string;
    name: {
        pl: string;
    }; 
    mainBlog: {
        soc: string; 
        followers: number | string;
        link: string; 
    }
    description: {
        pl: string;
    }; 
    // topics: {
    //     pl: string;
    // }
}

export interface TestType {
    id: string;
    testName: {
        pl: string;
        ua: string;
        or: string;
    }; 
    blogger: SimpleBloggerType;
    cover: string;
    questions: QuestionTestType[];
    sumPoints: number;
    payment: string;
    price: string;
}

export interface TestCardType {
    docId: string;
    id: string;
    published: boolean;
    audience: string[];
    cover: string;
    blogger: SimpleBloggerType;
    testName: {
        pl: string;
        ua: string;
        or: string
    }; 
    qLength: number;
    payment: string;
    price: number;
    currency: string;
    // currency: 'USD' | 'PLN';

    type?: string;
    picsMini?: string[];
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