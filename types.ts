export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export interface Participant {
  name: string;
  department: string;
}

export interface AnswerDetail {
  question: string;
  selected_option: string;
  correct: boolean;
}
