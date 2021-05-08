
export interface Option {
    label: String
    value: String
}

export interface Answer {
    questionId: Number,
    chosenOption?: Option
}
export interface Question {
    id: Number
    description: String
    options: Option[]
    answer: Option
    chosenOption?: Option
}

export interface Test {
    id: Number
    questions: Question[]
    answers?: Answer[]
    duration?: Number
    result?: Number
    startTime?: Number
}


export interface Response<T> {
    status: Number,
    message: String,
    data: T[],
    count?: Number 
}


export interface SubmittedTestDTO {
    id: Number,
    duration: Number,
    answers: Answer[],
    startTime?: Number
}

export interface OverallStatistics {
    duration: Number
    average: Number
    numberOfTests: Number
}
