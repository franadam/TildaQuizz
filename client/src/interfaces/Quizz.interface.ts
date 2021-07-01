interface Question {
  id: string;
  answer: string;
  text: string;
  options: string;
}

interface Quizz {
  id: string;
  name: string;
  score: number;
  isStarted: boolean;
  questions: Question[];
}

export type { Question };
export default Quizz;
